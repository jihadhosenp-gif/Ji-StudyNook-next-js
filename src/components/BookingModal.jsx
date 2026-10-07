"use client";

import { useState } from "react";
import { AlertTriangle, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { bookingsApi } from "@/lib/api";
import { TIME_OPTIONS } from "@/lib/constants";
import { currency, errorMessage, hourOf, todayISO } from "@/lib/utils";
import Modal from "./Modal";
import Field, { inputCls } from "./Field";
import Button from "./Button";

/**
 * "Reserve your study space" modal: date, start/end time, note, live total.
 * Shows inline validation and an elegant inline conflict message — never alert().
 */
export default function BookingModal({ open, onClose, room, initial, onSuccess }) {
  // The inner form mounts only while the modal is open, so its state resets
  // automatically every time — no setState-in-effect needed.
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Reserve your study space"
      subtitle={room?.name}
      maxWidth="max-w-md"
    >
      <BookingForm room={room} initial={initial} onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
}

function BookingForm({ room, initial, onClose, onSuccess }) {
  const [date, setDate] = useState(initial?.date || todayISO());
  const [startTime, setStartTime] = useState(initial?.startTime || "");
  const [endTime, setEndTime] = useState(initial?.endTime || "");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [conflict, setConflict] = useState(false);
  const [busy, setBusy] = useState(false);

  const startHour = startTime ? hourOf(startTime) : null;
  const endOptions = TIME_OPTIONS.filter((t) => startHour === null || hourOf(t) > startHour);
  const valid = startTime && endTime && hourOf(endTime) > startHour;
  const hours = valid ? hourOf(endTime) - startHour : 0;
  const total = hours * (room?.price ?? 0);

  const validate = () => {
    const e = {};
    if (!date) e.date = "Please choose a date.";
    else if (date < todayISO()) e.date = "The date cannot be in the past.";
    if (!startTime) e.startTime = "Please choose a start time.";
    if (!endTime) e.endTime = "Please choose an end time.";
    else if (startTime && hourOf(endTime) <= hourOf(startTime))
      e.endTime = "End time must be later than start time.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    setConflict(false);
    if (!validate()) return;
    setBusy(true);
    try {
      await bookingsApi.create({ roomId: room._id, date, startTime, endTime, note });
      toast.success("Room booked successfully!");
      onSuccess?.();
      onClose();
    } catch (err) {
      if (err?.response?.status === 409) {
        setConflict(true);
      } else {
        toast.error(errorMessage(err));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={busy ? () => {} : onClose}
      title="Reserve your study space"
      subtitle={room?.name}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <Field label="Date" error={errors.date}>
          <input
            type="date"
            value={date}
            min={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Start time" error={errors.startTime}>
            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="End time" error={errors.endTime}>
            <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {endOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Special note" hint="Optional — accessibility needs, group size, etc.">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            maxLength={300}
            placeholder="Any note for the library…"
            className={`${inputCls} h-auto resize-none py-2.5`}
          />
        </Field>

        {conflict && (
          <div className="flex gap-3 rounded-xl border border-[#e3a949]/40 bg-warn-soft p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
            <div className="text-sm">
              <p className="font-semibold text-ink">This room is already booked for this time.</p>
              <p className="mt-0.5 text-muted">Please choose another time slot.</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3">
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <CalendarDays className="h-4 w-4 text-accent" />
            {valid ? `${hours} ${hours === 1 ? "hour" : "hours"}` : "Select a time range"}
          </span>
          <span className="font-heading text-lg font-extrabold text-ink">Total: {currency(total)}</span>
        </div>

        <Button onClick={handleSubmit} loading={busy} className="w-full" size="lg">
          {busy ? "Confirming…" : "Confirm Booking"}
        </Button>
        <p className="text-center text-xs text-muted">
          Calculation: {currency(room?.price ?? 0)} × {valid ? hours : 0} hours
        </p>
      </div>
    </Modal>
  );
}
