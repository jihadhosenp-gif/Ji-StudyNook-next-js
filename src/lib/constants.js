export const TIME_OPTIONS = Array.from({ length: 13 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

export const AMENITY_OPTIONS = [
  "Wi-Fi",
  "Whiteboard",
  "Projector",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export const MAX_PRICE = 20;

export const DEFAULT_FILTERS = {
  q: "",
  amenities: [],
  floor: "all",
  capacity: 0,
  maxPrice: MAX_PRICE,
};

export const CAPACITY_OPTIONS = [
  { value: 0, label: "Any capacity" },
  { value: 2, label: "2+ people" },
  { value: 4, label: "4+ people" },
  { value: 6, label: "6+ people" },
  { value: 8, label: "8+ people" },
];

export function filterRooms(rooms, f) {
  const q = f.q.trim().toLowerCase();
  return rooms.filter((r) => {
    if (q && !`${r.name} ${r.description} ${r.amenities.join(" ")}`.toLowerCase().includes(q)) return false;
    if (f.floor !== "all" && String(r.floor) !== String(f.floor)) return false;
    if (f.capacity && r.capacity < f.capacity) return false;
    if (f.maxPrice < MAX_PRICE && r.price > f.maxPrice) return false;
    if (f.amenities.length && !f.amenities.every((a) => r.amenities.includes(a))) return false;
    return true;
  });
}
