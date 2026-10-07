"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { AMENITY_OPTIONS, CAPACITY_OPTIONS, MAX_PRICE } from "@/lib/constants";
import { cn, currency } from "@/lib/utils";

export function Dropdown({ label, active, children, width = "w-64" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-xl border bg-surface px-4 text-sm font-medium transition",
          active ? "border-accent text-accent" : "border-line text-muted hover:border-muted hover:text-ink"
        )}
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute left-0 top-12 z-30 origin-top rounded-2xl border border-line bg-surface p-3 shadow-lift",
              width
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckRow({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-ink transition hover:bg-surface-2">
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded border transition",
          checked ? "border-accent bg-accent" : "border-line bg-surface"
        )}
        style={{ height: 18, width: 18 }}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}

function RadioRow({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-ink transition hover:bg-surface-2">
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
          checked ? "border-accent" : "border-line"
        )}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-accent" />}
      </span>
      <input type="radio" className="sr-only" checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}

/* ------------------------------ filter sections ---------------------------- */

export function AmenityChecks({ filters, setFilters }) {
  const toggle = (a) =>
    setFilters((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  return (
    <div className="space-y-0.5">
      {AMENITY_OPTIONS.map((a) => (
        <CheckRow key={a} checked={filters.amenities.includes(a)} onChange={() => toggle(a)}>
          {a}
        </CheckRow>
      ))}
    </div>
  );
}

export function FloorRows({ filters, setFilters, floors }) {
  return (
    <div className="space-y-0.5">
      <RadioRow checked={filters.floor === "all"} onChange={() => setFilters((f) => ({ ...f, floor: "all" }))}>
        Any floor
      </RadioRow>
      {floors.map((fl) => (
        <RadioRow
          key={fl}
          checked={String(filters.floor) === String(fl)}
          onChange={() => setFilters((f) => ({ ...f, floor: fl }))}
        >
          Floor {fl}
        </RadioRow>
      ))}
    </div>
  );
}

export function CapacityRows({ filters, setFilters }) {
  return (
    <div className="space-y-0.5">
      {CAPACITY_OPTIONS.map((c) => (
        <RadioRow
          key={c.value}
          checked={filters.capacity === c.value}
          onChange={() => setFilters((f) => ({ ...f, capacity: c.value }))}
        >
          {c.label}
        </RadioRow>
      ))}
    </div>
  );
}

export function PriceRange({ filters, setFilters }) {
  return (
    <div className="w-56">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">Per hour</p>
        <span className="text-xs font-semibold text-accent">
          {filters.maxPrice >= MAX_PRICE ? "Any price" : `Under ${currency(filters.maxPrice)}`}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={MAX_PRICE}
        value={filters.maxPrice}
        onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
        className="w-full accent-[var(--accent)]"
        aria-label="Maximum price per hour"
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted">
        <span>$1</span>
        <span>${MAX_PRICE}+</span>
      </div>
    </div>
  );
}

/** All filter sections with headings — used in the mobile bottom sheet. */
export function FilterControls({ filters, setFilters, floors }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Amenities</p>
        <AmenityChecks filters={filters} setFilters={setFilters} />
      </div>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Floor</p>
        <FloorRows filters={filters} setFilters={setFilters} floors={floors} />
      </div>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Capacity</p>
        <CapacityRows filters={filters} setFilters={setFilters} />
      </div>
      <div>
        <PriceRange filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

/* ------------------------------- chip helpers ------------------------------ */

export function activeChips(filters) {
  const chips = [];
  if (filters.q.trim()) chips.push({ key: "q", label: `“${filters.q.trim()}”`, clear: { q: "" } });
  filters.amenities.forEach((a) =>
    chips.push({
      key: `a-${a}`,
      label: a,
      clear: { amenities: filters.amenities.filter((x) => x !== a) },
    })
  );
  if (filters.floor !== "all")
    chips.push({ key: "floor", label: `Floor ${filters.floor}`, clear: { floor: "all" } });
  if (filters.capacity)
    chips.push({ key: "cap", label: `${filters.capacity}+ people`, clear: { capacity: 0 } });
  if (filters.maxPrice < MAX_PRICE)
    chips.push({ key: "price", label: `Under ${currency(filters.maxPrice)}`, clear: { maxPrice: MAX_PRICE } });
  return chips;
}

export function filterCount(filters) {
  return (
    filters.amenities.length +
    (filters.floor !== "all" ? 1 : 0) +
    (filters.capacity ? 1 : 0) +
    (filters.maxPrice < MAX_PRICE ? 1 : 0)
  );
}

/** Removable active-filter chip. */
export function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="rounded-full p-0.5 transition hover:bg-accent hover:text-white"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

/* ------------------------------ mobile sheet ------------------------------- */

export function FilterSheet({ open, onClose, children, resultCount, onClear }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-[75] max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-line bg-paper p-6 shadow-lift lg:hidden"
            role="dialog"
            aria-label="Filters"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line" />
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-ink">Filters</h3>
              <button
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {children}

            <div className="sticky bottom-0 -mx-6 mt-6 flex gap-3 border-t border-line bg-paper px-6 pb-2 pt-4">
              <button
                onClick={onClear}
                className="h-11 flex-1 rounded-xl border border-line bg-surface text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
              >
                Clear all
              </button>
              <button
                onClick={onClose}
                className="h-11 flex-[1.4] rounded-xl bg-accent text-sm font-semibold text-white transition hover:brightness-110"
              >
                Show {resultCount} {resultCount === 1 ? "room" : "rooms"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
