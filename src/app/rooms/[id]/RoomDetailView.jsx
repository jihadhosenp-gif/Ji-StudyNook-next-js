"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, Layers, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { roomsApi } from "@/lib/api";
import { TIME_OPTIONS } from "@/lib/constants";
import { currency, errorMessage, hourOf, todayISO } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import Breadcrumb from "@/components/Breadcrumb";
import AmenityChip from "@/components/AmenityChip";
import Button from "@/components/Button";
import Field, { inputCls } from "@/components/Field";
import BookingModal from "@/components/BookingModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import { PageFade } from "@/components/Animate";

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-muted">
        <Icon className="h-3.5 w-3.5 text-accent" /> {label}
      </div>
      <p className="mt-1.5 font-heading text-base font-bold text-ink">{value}</p>
    </div>
  );
}

export default function RoomDetailView({ roomId }) {
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | missing
  const [broken, setBroken] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Booking panel state (pre-fills the modal).
  const [date, setDate] = useState(todayISO());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const fetchRoom = () =>
    roomsApi
      .get(roomId)
      .then((r) => {
        setRoom(r);
        setStatus("ready");
      })
      .catch((err) => {
        setStatus("missing");
        if (err?.response?.status !== 404) toast.error(errorMessage(err));
      });

  useEffect(() => {
    fetchRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  if (status === "loading") return <LoadingSpinner label="Loading room…" />;

  if (status === "missing" || !room) {
    return (
      <div className="flex flex-1 items-center justify-center px-5 py-24">
        <EmptyState
          title="Room not found"
          message="This study room may have been removed or the link is incorrect."
          actionLabel="Back to Rooms"
          actionHref="/rooms"
        />
      </div>
    );
  }

  const startHour = startTime ? hourOf(startTime) : null;
  const endOptions = TIME_OPTIONS.filter((t) => startHour === null || hourOf(t) > startHour);
  const validRange = Boolean(startTime && endTime && hourOf(endTime) > startHour);
  const hours = validRange ? hourOf(endTime) - startHour : 0;
  const total = hours * room.price;

  return (
    <PageFade className="flex-1">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        <Breadcrumb items={[{ href: "/rooms", label: "Rooms" }, { label: room.name }]} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          {/* Left: gallery + info */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-soft">
              {!broken ? (
                <Image
                  src={room.image}
                  alt={room.name}
                  onError={(e) => {
                    setBroken(true);
                    e.currentTarget.style.display = "none";
                  }}
                  fill
                  className="aspect-[16/9] w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center text-muted">
                  StudyNook
                </div>
              )}
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-bold text-accent backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Available
              </span>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                    {room.name}
                  </h1>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="h-4 w-4 text-accent" />
                    Central Library · Floor {room.floor}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface px-4 py-2.5 text-center shadow-soft">
                  <p className="font-heading text-2xl font-extrabold text-ink">{currency(room.price)}</p>
                  <p className="text-[11px] font-medium text-muted">per hour</p>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{room.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoTile icon={Users} label="Capacity" value={`${room.capacity} seats`} />
                <InfoTile icon={Layers} label="Floor" value={`Floor ${room.floor}`} />
                <InfoTile icon={Clock} label="Bookings" value={`${room.bookingCount ?? 0} booked`} />
                <InfoTile icon={CheckCircle2} label="Status" value="Available" />
              </div>

              <div className="mt-8">
                <h2 className="font-heading text-lg font-bold text-ink">Amenities</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(room.amenities ?? []).map((a) => (
                    <AmenityChip key={a} label={a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Right: booking panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-lift">
              <h2 className="font-heading text-xl font-bold text-ink">Reserve this room</h2>
              <p className="mt-1 text-sm text-muted">
                Pick a date and an hourly slot — conflicts are blocked automatically.
              </p>

              <div className="mt-5 space-y-4">
                <Field label="Date">
                  <input
                    type="date"
                    value={date}
                    min={todayISO()}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start time">
                    <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputCls}>
                      <option value="">--</option>
                      {TIME_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="End time">
                    <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputCls}>
                      <option value="">--</option>
                      {endOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3">
                  <span className="text-sm text-muted">
                    <CalendarDays className="mr-1.5 inline h-4 w-4 text-accent" />
                    {validRange ? `${hours} ${hours === 1 ? "hour" : "hours"}` : "Select a slot"}
                  </span>
                  <span className="font-heading text-lg font-extrabold text-ink">
                    Total: {currency(total)}
                  </span>
                </div>

                {user ? (
                  <Button onClick={() => setModalOpen(true)} className="w-full" size="lg">
                    Confirm Booking
                  </Button>
                ) : (
                  <Button href={`/login?next=/rooms/${room._id}`} className="w-full" size="lg" variant="secondary">
                    Login to Book
                  </Button>
                )}
                {!user && <p className="text-center text-xs text-muted">Sign in to reserve this room in seconds.</p>}
              </div>
            </div>

            <Link
              href="/rooms"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all rooms
            </Link>
          </aside>
        </div>
      </div>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        room={room}
        initial={{ date, startTime, endTime }}
        onSuccess={fetchRoom}
      />
    </PageFade>
  );
}
