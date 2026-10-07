"use client";

import Field, { inputCls } from "@/components/Field";
import { AMENITY_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Shared room form used by Add Room and the Edit modal. */
export default function RoomForm({ form, setForm, errors = {} }) {
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleAmenity = (a) =>
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Room Name" error={errors.name} className="sm:col-span-2">
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Study Room A-302"
            className={inputCls}
          />
        </Field>

        <Field label="Description" error={errors.description} className="sm:col-span-2">
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            maxLength={400}
            placeholder="Quiet private room with natural lighting and high-speed Wi-Fi."
            className={cn(inputCls, "h-auto resize-none py-2.5")}
          />
        </Field>

        <Field label="Image URL" error={errors.image} className="sm:col-span-2" hint="Direct link to a room photo.">
          <input
            type="url"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="https://images.unsplash.com/…"
            className={inputCls}
          />
        </Field>

        <Field label="Floor" error={errors.floor}>
          <input
            type="number"
            min={1}
            max={50}
            value={form.floor}
            onChange={(e) => set("floor", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Capacity (people)" error={errors.capacity}>
          <input
            type="number"
            min={1}
            max={100}
            value={form.capacity}
            onChange={(e) => set("capacity", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Hourly Rate ($)" error={errors.price} className="sm:col-span-2">
          <input
            type="number"
            min={1}
            max={1000}
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="5"
            className={inputCls}
          />
        </Field>
      </div>

      <div>
        <span className="block text-sm font-semibold text-ink">Amenities</span>
        <p className="mt-1 text-xs text-muted">Select everything this room offers.</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {AMENITY_OPTIONS.map((a) => {
            const checked = form.amenities.includes(a);
            return (
              <label
                key={a}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition",
                  checked ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface text-ink hover:border-muted"
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleAmenity(a)}
                />
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px]",
                    checked ? "border-accent bg-accent text-white" : "border-line"
                  )}
                >
                  {checked ? "✓" : ""}
                </span>
                {a}
              </label>
            );
          })}
        </div>
        {errors.amenities && <p className="mt-2 text-xs font-medium text-danger">{errors.amenities}</p>}
      </div>
    </div>
  );
}

export const EMPTY_ROOM = {
  name: "",
  description: "",
  image: "",
  floor: "1",
  capacity: "2",
  price: "",
  amenities: [],
};

export function validateRoom(form) {
  const e = {};
  if (form.name.trim().length < 3) e.name = "Room name must be at least 3 characters.";
  if (form.description.trim().length < 10) e.description = "Please write at least 10 characters.";
  if (!/^https?:\/\/\S+$/i.test(form.image)) e.image = "Enter a valid image URL (https://…).";
  if (!(Number(form.floor) >= 1)) e.floor = "Floor must be 1 or greater.";
  if (!(Number(form.capacity) >= 1)) e.capacity = "Capacity must be at least 1 person.";
  if (!(Number(form.price) >= 1)) e.price = "Hourly rate must be at least $1.";
  if (form.amenities.length === 0) e.amenities = "Select at least one amenity.";
  return e;
}
