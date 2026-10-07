import { hourOf, todayISO } from "./utils";
import { save } from "./mockDb";

// Returns { status, data } or null if the route isn't a bookings route.
export function handleBookings({ db, me, url, method, body }) {
  const unauth = { status: 401, data: { message: "Please log in to continue." } };

  if (url === "/api/bookings" && method === "post") {
    if (!me) return unauth;
    const room = db.rooms.find((r) => r._id === body.roomId);
    if (!room) return { status: 404, data: { message: "Room not found." } };
    const s = hourOf(body.startTime);
    const e = hourOf(body.endTime);
    if (body.date < todayISO() || e <= s) return { status: 400, data: { message: "Invalid date or time range." } };
    const clash = db.bookings.some(
      (b) => b.roomId === room._id && b.date === body.date && b.status === "confirmed" && s < hourOf(b.endTime) && e > hourOf(b.startTime)
    );
    if (clash) return { status: 409, data: { message: "That time slot is already booked." } };
    const booking = {
      _id: `b_${Date.now()}`,
      roomId: room._id,
      roomName: room.name,
      roomImage: room.image,
      userId: me._id,
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      note: body.note || "",
      totalPrice: (e - s) * room.price,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    db.bookings.push(booking);
    room.bookingCount = (room.bookingCount || 0) + 1;
    save(db);
    return { status: 201, data: { booking } };
  }

  if (url === "/api/bookings/my" && method === "get") {
    if (!me) return unauth;
    const list = db.bookings.filter((b) => b.userId === me._id).sort((a, b) => b.date.localeCompare(a.date));
    return { status: 200, data: { bookings: list } };
  }

  const cancel = url.match(/^\/api\/bookings\/([^/]+)\/cancel$/);
  if (cancel && method === "patch") {
    if (!me) return unauth;
    const b = db.bookings.find((x) => x._id === cancel[1] && x.userId === me._id);
    if (!b) return { status: 404, data: { message: "Booking not found." } };
    b.status = "cancelled";
    save(db);
    return { status: 200, data: { booking: b } };
  }
  return null;
}
