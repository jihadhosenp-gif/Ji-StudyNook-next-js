// Demo-mode Axios adapter. Used ONLY when NEXT_PUBLIC_API_URL is not set so the UI can be
// explored without a backend. It mimics the documented /api contract.
import { handleBookings } from "./mockBookings";
import { load, save, publicUser, SESSION_KEY } from "./mockDb";

export function respond(config, status, data) {
  const response = { data, status, statusText: String(status), headers: {}, config, request: {} };
  if (status >= 200 && status < 300) return Promise.resolve(response);
  const err = new Error(data?.message || "Request failed");
  err.response = response;
  err.isAxiosError = true;
  return Promise.reject(err);
}

const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms));

export default async function mockAdapter(config) {
  await delay();
  const db = load();
  const method = (config.method || "get").toLowerCase();
  const url = (config.url || "").replace(/^https?:\/\/[^/]+/, "").split("?")[0];
  const body = typeof config.data === "string" ? JSON.parse(config.data || "{}") : config.data || {};
  const me = db.users.find((u) => u._id === localStorage.getItem(SESSION_KEY));
  const unauth = () => respond(config, 401, { message: "Please log in to continue." });
  const ok = (data, status = 200) => respond(config, status, data);
  const fail = (status, message) => respond(config, status, { message });

  // ---- Auth ----
  if (url === "/api/auth/me" && method === "get") return me ? ok({ user: publicUser(me) }) : unauth();
  if (url === "/api/auth/logout" && method === "post") {
    localStorage.removeItem(SESSION_KEY);
    return ok({ message: "Logged out" });
  }
  if (url === "/api/auth/login" && method === "post") {
    const u = db.users.find((x) => x.email.toLowerCase() === (body.email || "").toLowerCase() && x.password === body.password);
    if (!u) return fail(401, "Invalid email or password.");
    localStorage.setItem(SESSION_KEY, u._id);
    return ok({ user: publicUser(u) });
  }
  if (url === "/api/auth/register" && method === "post") {
    if (db.users.some((x) => x.email.toLowerCase() === (body.email || "").toLowerCase()))
      return fail(409, "An account with this email already exists.");
    const u = { _id: `u_${Date.now()}`, name: body.name, email: body.email, photo: body.photo || "", password: body.password };
    db.users.push(u);
    save(db);
    localStorage.setItem(SESSION_KEY, u._id);
    return ok({ user: publicUser(u) }, 201);
  }
  if (url === "/api/auth/google" && method === "post") {
    let u = db.users.find((x) => x.email === "google.demo@studynook.com");
    if (!u) {
      u = { _id: "u_google", name: "Alex Morgan", email: "google.demo@studynook.com", photo: "", password: "" };
      db.users.push(u);
      save(db);
    }
    localStorage.setItem(SESSION_KEY, u._id);
    return ok({ user: publicUser(u) });
  }

  // ---- Rooms ----
  if (url === "/api/rooms" && method === "get") {
    const sorted = [...db.rooms].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (config.params?.mine) return ok({ rooms: me ? sorted.filter((r) => r.ownerId === me._id) : [] });
    return ok({ rooms: sorted });
  }
  if (url === "/api/rooms" && method === "post") {
    if (!me) return unauth();
    const room = {
      _id: `r_${Date.now()}`,
      ...body,
      floor: Number(body.floor),
      capacity: Number(body.capacity),
      price: Number(body.price),
      ownerId: me._id,
      ownerName: me.name,
      bookingCount: 0,
      createdAt: new Date().toISOString(),
    };
    db.rooms.push(room);
    save(db);
    return ok({ room }, 201);
  }
  const roomMatch = url.match(/^\/api\/rooms\/([^/]+)$/);
  if (roomMatch) {
    const idx = db.rooms.findIndex((r) => r._id === roomMatch[1]);
    if (idx < 0) return fail(404, "Room not found.");
    if (method === "get") return ok({ room: db.rooms[idx] });
    if (!me) return unauth();
    if (db.rooms[idx].ownerId !== me._id) return fail(403, "You can only change your own rooms.");
    if (method === "put") {
      db.rooms[idx] = { ...db.rooms[idx], ...body, floor: Number(body.floor), capacity: Number(body.capacity), price: Number(body.price) };
      save(db);
      return ok({ room: db.rooms[idx] });
    }
    if (method === "delete") {
      db.rooms.splice(idx, 1);
      save(db);
      return ok({ message: "Deleted" });
    }
  }

  const res = handleBookings({ db, me, url, method, body });
  if (res) return respond(config, res.status, res.data);
  return fail(404, "Not found.");
}
