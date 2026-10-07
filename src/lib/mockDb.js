// Demo-mode data store (only used when NEXT_PUBLIC_API_URL is not set).
export const DB_KEY = "studynook-demo-db";
export const SESSION_KEY = "studynook-demo-session";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

function seed() {
  const owner = { _id: "u_seed", name: "StudyNook Library", email: "library@studynook.com", password: "Library1", photo: "" };
  const mk = (i, name, description, image, floor, capacity, price, amenities, bookingCount) => ({
    _id: `r_${i}`,
    name,
    description,
    image: img(image),
    floor,
    capacity,
    price,
    amenities,
    ownerId: owner._id,
    ownerName: owner.name,
    bookingCount,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  });
  return {
    users: [owner],
    bookings: [],
    rooms: [
      mk(1, "Study Room A-302", "Quiet private room with natural lighting and high-speed Wi-Fi.", "photo-1497366811353-6870744d04b2", 3, 4, 5, ["Wi-Fi", "Whiteboard", "Power Outlets", "Quiet Zone", "Projector"], 42),
      mk(2, "The Reading Loft", "A calm mezzanine nook surrounded by shelves, perfect for solo deep work.", "photo-1521587760476-6c12a4b040da", 2, 2, 3, ["Wi-Fi", "Quiet Zone", "Power Outlets"], 31),
      mk(3, "Collaboration Studio B-110", "Spacious studio with a projector and wall-sized whiteboard for group projects.", "photo-1517502884422-41eaead166d4", 1, 8, 12, ["Wi-Fi", "Projector", "Whiteboard", "Air Conditioning", "Power Outlets"], 56),
      mk(4, "Garden View Carrel", "Single-seat carrel facing the courtyard with warm, soft lighting.", "photo-1519389950473-47ba0277781c", 4, 1, 2, ["Wi-Fi", "Quiet Zone"], 18),
      mk(5, "Thesis Room C-204", "Sound-dampened room for thesis writing, with ergonomic seating and climate control.", "photo-1524758631624-e2822e304c36", 2, 3, 6, ["Wi-Fi", "Air Conditioning", "Quiet Zone", "Power Outlets"], 27),
      mk(6, "Seminar Hall D-401", "Large seminar room for presentations and study circles, up to ten seats.", "photo-1431540015161-0bf868a2d407", 4, 10, 18, ["Wi-Fi", "Projector", "Whiteboard", "Air Conditioning"], 12),
      mk(7, "Lamplight Nook", "Intimate corner room with a vintage reading lamp and a big oak desk.", "photo-1507842217343-583bb7270b66", 3, 2, 4, ["Wi-Fi", "Quiet Zone", "Power Outlets"], 22),
      mk(8, "Focus Pod F-05", "Compact pod with power outlets and air conditioning for short sprints.", "photo-1497215728101-856f4ea42174", 1, 1, 2, ["Power Outlets", "Air Conditioning", "Quiet Zone"], 64),
    ],
  };
}

export const save = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));

export function load() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const db = seed();
  save(db);
  return db;
}

export const publicUser = (u) => (u ? { _id: u._id, name: u.name, email: u.email, photo: u.photo } : null);
