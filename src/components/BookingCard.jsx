"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { cn, currency, formatDate } from "@/lib/utils";

/** Booking row used on My Bookings: image, details, status badge, actions. */
export default function BookingCard({ booking, children }) {
  const [broken, setBroken] = useState(false);
  const confirmed = booking.status === "confirmed";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-soft sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:h-24 sm:w-32">
        {!broken ? (
          <Image
            src={booking.roomImage}
            alt={booking.roomName}
            onError={(e) => {
              setBroken(true);
              e.currentTarget.style.display = "none";
            }}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 8rem"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <Link
            href={`/rooms/${booking.roomId}`}
            className="font-heading text-base font-bold text-ink transition hover:text-accent"
          >
            {booking.roomName}
          </Link>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
              confirmed ? "bg-accent-soft text-accent" : "bg-danger-soft text-danger"
            )}
          >
            {confirmed ? "Confirmed" : "Cancelled"}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-accent" />
            {formatDate(booking.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {booking.startTime} – {booking.endTime}
          </span>
        </div>

        {booking.note && <p className="mt-1 truncate text-xs italic text-muted">“{booking.note}”</p>}

        <div className="mt-2 font-heading text-base font-extrabold text-ink">
          {currency(booking.totalPrice)}
          <span className="text-xs font-medium text-muted"> total</span>
        </div>
      </div>

      {children && <div className="flex shrink-0 flex-col gap-2 sm:items-end">{children}</div>}
    </div>
  );
}
