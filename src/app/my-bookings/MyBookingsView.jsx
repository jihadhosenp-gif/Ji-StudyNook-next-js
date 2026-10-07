"use client";

import { useEffect, useState } from "react";
import { CalendarX2 } from "lucide-react";
import { toast } from "sonner";
import { bookingsApi } from "@/lib/api";
import { errorMessage, todayISO } from "@/lib/utils";
import BookingCard from "@/components/BookingCard";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PageFade } from "@/components/Animate";

export default function MyBookingsView() {
  const [bookings, setBookings] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);

  const load = () => {
    bookingsApi
      .mine()
      .then(setBookings)
      .catch((err) => {
        setBookings([]);
        toast.error(errorMessage(err));
      });
  };

  useEffect(() => {
    load();
  }, []);

  const cancelBooking = async () => {
    try {
      await bookingsApi.cancel(cancelTarget._id);
      setBookings((list) =>
        list.map((b) => (b._id === cancelTarget._id ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Booking cancelled.");
    } catch (err) {
      toast.error(errorMessage(err));
      throw err; // keep the modal open on failure
    }
  };

  const canCancel = (b) => b.status === "confirmed" && b.date >= todayISO();

  return (
    <PageFade className="flex-1">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:py-14">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          My Bookings
        </h1>
        <p className="mt-2 text-base text-muted">
          Manage your upcoming and past study sessions in one place.
        </p>

        <div className="mt-8">
          {bookings === null ? (
            <LoadingSpinner label="Loading your bookings…" />
          ) : bookings.length === 0 ? (
            <EmptyState
              icon={CalendarX2}
              title="Your study journey starts here."
              message="You haven't booked a study room yet."
              actionLabel="Explore Rooms"
              actionHref="/rooms"
            />
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <BookingCard key={b._id} booking={b}>
                  {canCancel(b) && (
                    <button
                      onClick={() => setCancelTarget(b)}
                      className="h-9 rounded-lg border border-danger/40 px-4 text-sm font-semibold text-danger transition hover:bg-danger hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </BookingCard>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        onConfirm={cancelBooking}
        title="Cancel this booking?"
        message="This action cannot be undone. The slot will be released for other students."
        confirmLabel="Cancel Booking"
        cancelLabel="Keep Booking"
        loadingLabel="Cancelling…"
      />
    </PageFade>
  );
}
