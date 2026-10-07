export const cn = (...classes) => classes.filter(Boolean).join(" ");

export function currency(n) {
  const v = Number(n) || 0;
  return `$${Number.isInteger(v) ? v : v.toFixed(2)}`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export function toISO(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayISO() {
  return toISO(new Date());
}

export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const hourOf = (time) => parseInt(time.split(":")[0], 10);

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function errorMessage(err, fallback = "Something went wrong.") {
  return err?.response?.data?.message || fallback;
}

export function safeNext(next) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : null;
}

export function initials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join("") || "U"
  );
}
