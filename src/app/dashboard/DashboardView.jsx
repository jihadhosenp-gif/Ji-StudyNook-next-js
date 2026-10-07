"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarCheck, CalendarClock, Clock, DoorOpen, Plus } from "lucide-react";
import { bookingsApi, roomsApi } from "@/lib/api";
import { currency, formatDate, greeting, todayISO } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { PageFade } from "@/components/Animate";
import { RoomGridSkeleton } from "@/components/RoomSkeleton";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm font-medium text-muted">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-muted/80">{hint}</p>}
    </div>
  );
}

export default function DashboardView() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.allSettled([bookingsApi.mine(), roomsApi.list({ mine: true })]).then(([b, r]) => {
      if (!active) return;
      setData({
        bookings: b.status === "fulfilled" ? b.value : [],
        rooms: r.status === "fulfilled" ? r.value : [],
      });
    });
    return () => {
      active = false;
    };
  }, []);

  const bookings = data?.bookings ?? [];
  const rooms = data?.rooms ?? [];
  const upcoming = bookings
    .filter((b) => b.status === "confirmed" && b.date >= todayISO())
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const totalHours = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (Number(b.endTime.split(":")[0]) - Number(b.startTime.split(":")[0])), 0);

  return (
    <PageFade className="flex-1">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        {/* Welcome */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar user={user} className="h-14 w-14 text-lg" />
            <div>
              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {greeting()}, {user?.name?.split(" ")[0]}.
              </h1>
              <p className="mt-1 text-base text-muted">Ready to find your next productive space?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button href="/rooms" variant="secondary">
              Explore Rooms
            </Button>
            <Button href="/add-room">
              <Plus className="h-4 w-4" /> Add Room
            </Button>
          </div>
        </div>

        {data === null ? (
          <div className="mt-8">
            <RoomGridSkeleton count={3} />
          </div>
        ) : (
          <StatGrid bookings={bookings} rooms={rooms} upcoming={upcoming} totalHours={totalHours} />
        )}
      </div>
    </PageFade>
  );
}

function StatGrid({ bookings, rooms, upcoming, totalHours }) {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CalendarClock}
          label="Upcoming Booking"
          value={upcoming ? formatDate(upcoming.date).split(",").slice(0, 2).join(",") : "—"}
          hint={upcoming ? `${upcoming.roomName} · ${upcoming.startTime}` : "No upcoming sessions"}
        />
        <StatCard icon={CalendarCheck} label="Total Bookings" value={bookings.length} hint="All time" />
        <StatCard icon={DoorOpen} label="Listed Rooms" value={rooms.length} hint="Rooms you own" />
        <StatCard icon={Clock} label="Total Hours" value={`${totalHours}h`} hint="Confirmed study time" />
      </div>
      {/* Upcoming booking spotlight + quick actions */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-ink">Upcoming session</h2>
            <Link
              href="/my-bookings"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {upcoming ? (
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-line bg-paper p-4">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-accent text-white">
                <span className="text-[10px] font-bold uppercase leading-none opacity-80">
                  {new Date(upcoming.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="font-heading text-lg font-extrabold leading-tight">
                  {Number(upcoming.date.split("-")[2])}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold text-ink">{upcoming.roomName}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {formatDate(upcoming.date)} · {upcoming.startTime}–{upcoming.endTime}
                </p>
              </div>
              <span className="ml-auto font-heading text-sm font-extrabold text-accent">
                {currency(upcoming.totalPrice)}
              </span>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">
              Nothing booked yet — your next productive session is one click away.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
          <h2 className="font-heading text-lg font-bold text-ink">Quick actions</h2>
          <div className="mt-4 grid gap-3">
            {[
              { href: "/rooms", label: "Find a study room" },
              { href: "/my-listings", label: "Manage your listings" },
              { href: "/add-room", label: "List a new room" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex items-center justify-between rounded-xl border border-line bg-paper p-4 transition hover:border-accent"
              >
                <span className="text-sm font-semibold text-ink">{a.label}</span>
                <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
