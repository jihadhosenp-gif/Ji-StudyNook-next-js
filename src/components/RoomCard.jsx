"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Layers, Users } from "lucide-react";
import { cn, currency } from "@/lib/utils";

const AMENITY_PREVIEW = 3;

/**
 * Equal-height room card used across Home, Rooms, My Listings contexts.
 * Hover: image zoom, 5px lift, visible border, arrow nudge, stronger shadow.
 */
export default function RoomCard({ room, footer }) {
  const [broken, setBroken] = useState(false);
  const shown = room.amenities?.slice(0, AMENITY_PREVIEW) ?? [];
  const extra = (room.amenities?.length ?? 0) - shown.length;

  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-soft transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift"
      )}
    >
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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-2 text-sm text-muted">
            StudyNook
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-2.5 py-1 text-[11px] font-semibold text-accent backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Available
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-[#0f1a24]/85 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {currency(room.price)}/hr
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent">
          {room.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted line-clamp-2">{room.description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-accent" />
            Floor {room.floor}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-accent" />
            {room.capacity} {room.capacity === 1 ? "person" : "people"}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {shown.map((a) => (
            <span
              key={a}
              className="rounded-md border border-line bg-paper px-2 py-0.5 text-[11px] font-medium text-ink"
            >
              {a}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-md border border-dashed border-line px-2 py-0.5 text-[11px] font-medium text-muted">
              +{extra} more
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="font-heading text-lg font-extrabold text-ink">
            {currency(room.price)}
            <span className="text-xs font-medium text-muted">/hr</span>
          </span>
          {footer || (
            <Link
              href={`/rooms/${room._id}`}
              className="inline-flex items-center gap-1.5 rounded-lg px-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
            >
              View Details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
