"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, Layers, Pencil, Trash2, Users } from "lucide-react";
import { currency } from "@/lib/utils";

/** One card on My Listings: image, meta, booking count, edit + delete. */
export default function ListingCard({ room, onEdit, onDelete }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {!broken ? (
          <Image
            src={room.image}
            alt={room.name}
            onError={(e) => {
              setBroken(true);
              e.currentTarget.style.display = "none";
            }}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
        <span className="absolute right-3 top-3 rounded-full bg-[#0f1a24]/85 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {currency(room.price)}/hr
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-bold text-ink">{room.name}</h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-accent" /> Floor {room.floor}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-accent" /> {room.capacity} seats
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-accent" /> {room.bookingCount ?? 0} bookings
          </span>
        </div>

        <div className="mt-auto flex gap-2 border-t border-line pt-4">
          <button
            onClick={onEdit}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-line text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-danger/40 text-sm font-semibold text-danger transition hover:bg-danger hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
