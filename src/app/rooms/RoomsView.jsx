"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SearchX, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { roomsApi } from "@/lib/api";
import { DEFAULT_FILTERS, filterRooms } from "@/lib/constants";
import { errorMessage } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import RoomGrid from "@/components/RoomGrid";
import { RoomGridSkeleton } from "@/components/RoomSkeleton";
import EmptyState from "@/components/EmptyState";
import { PageFade } from "@/components/Animate";
import {
  AmenityChecks,
  CapacityRows,
  Chip,
  Dropdown,
  FilterControls,
  FilterSheet,
  FloorRows,
  PriceRange,
  activeChips,
  filterCount,
} from "@/components/RoomFilters";

export default function RoomsView() {
  const [rooms, setRooms] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [error, setError] = useState(false);

  const fetchRooms = () =>
    roomsApi
      .list()
      .then((rooms) => setRooms(rooms ?? []))
      .catch((err) => {
        setRooms([]);
        setError(true);
        toast.error(errorMessage(err));
      });

  // Event-handler version (retry button): resets to the skeleton first.
  const load = () => {
    setRooms(null);
    setError(false);
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const floors = useMemo(
    () => [...new Set((rooms ?? []).map((r) => r.floor))].sort((a, b) => a - b),
    [rooms]
  );
  const results = useMemo(() => (rooms ? filterRooms(rooms, filters) : []), [rooms, filters]);
  const chips = activeChips(filters);
  const count = filterCount(filters);
  const clearFilters = () => setFilters(DEFAULT_FILTERS);
  const removeChip = (chip) => setFilters((f) => ({ ...f, ...chip.clear }));

  return (
    <PageFade className="flex-1">
      <section className="border-b border-line bg-surface-2/50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <Breadcrumb items={[{ label: "Rooms" }]} />
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Find a Space That Fits Your Focus
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Browse quiet and comfortable study rooms available across your library.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={filters.q}
              onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
              placeholder="Search study rooms..."
              aria-label="Search study rooms"
              className="h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-accent"
            />
          </div>
          <div className="hidden flex-wrap items-center gap-3 lg:flex">
            <Dropdown label="Amenities" active={filters.amenities.length > 0}>
              <AmenityChecks filters={filters} setFilters={setFilters} />
            </Dropdown>
            <Dropdown label={filters.floor === "all" ? "Floor" : `Floor ${filters.floor}`} active={filters.floor !== "all"}>
              <FloorRows filters={filters} setFilters={setFilters} floors={floors} />
            </Dropdown>
            <Dropdown label={filters.capacity ? `${filters.capacity}+ people` : "Capacity"} active={filters.capacity > 0}>
              <CapacityRows filters={filters} setFilters={setFilters} />
            </Dropdown>
            <Dropdown label={filters.maxPrice < 20 ? `Under $${filters.maxPrice}` : "Price"} active={filters.maxPrice < 20}>
              <PriceRange filters={filters} setFilters={setFilters} />
            </Dropdown>
          </div>
          <button
            onClick={() => setSheetOpen(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <Chip key={c.key} label={c.label} onRemove={() => removeChip(c)} />
            ))}
            <button
              onClick={clearFilters}
              className="ml-1 text-xs font-semibold text-muted underline underline-offset-2 transition hover:text-danger"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="mt-8 mb-5">
          <p className="font-heading text-sm font-bold text-ink sm:text-base">
            {rooms === null ? (
              <span className="text-muted">Searching rooms…</span>
            ) : (
              <>
                {results.length} study {results.length === 1 ? "room" : "rooms"} available
              </>
            )}
          </p>
        </div>

        {rooms === null ? (
          <RoomGridSkeleton count={6} />
        ) : error ? (
          <EmptyState
            title="We couldn't load the rooms"
            message="Something went wrong while fetching the study rooms. Please try again."
            actionLabel="Retry"
            onAction={load}
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No rooms found"
            message="Try changing your filters or searching for another room."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        ) : (
          <RoomGrid rooms={results} />
        )}
      </section>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        resultCount={results.length}
        onClear={clearFilters}
      >
        <FilterControls filters={filters} setFilters={setFilters} floors={floors} />
      </FilterSheet>
    </PageFade>
  );
}
