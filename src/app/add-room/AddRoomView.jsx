"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { roomsApi } from "@/lib/api";
import { errorMessage } from "@/lib/utils";
import RoomForm, { EMPTY_ROOM, validateRoom } from "@/components/RoomForm";
import RoomCard from "@/components/RoomCard";
import Button from "@/components/Button";
import { PageFade } from "@/components/Animate";

export default function AddRoomView() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_ROOM);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validateRoom(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setBusy(true);
    try {
      await roomsApi.create({
        ...form,
        floor: Number(form.floor),
        capacity: Number(form.capacity),
        price: Number(form.price),
      });
      toast.success("Room added successfully.");
      router.push("/my-listings");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  // Live preview card — placeholders keep it looking designed even when empty.
  const preview = {
    _id: "preview",
    name: form.name || "Your room name",
    description: form.description || "A short, inviting description of the space will appear here.",
    image:
      form.image ||
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=70",
    floor: form.floor || "–",
    capacity: Number(form.capacity) || 1,
    price: Number(form.price) || 0,
    amenities: form.amenities,
  };

  return (
    <PageFade className="flex-1">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          List a Study Room
        </h1>
        <p className="mt-2 max-w-xl text-base text-muted">
          Give students a comfortable place to focus and learn.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          {/* Form */}
          <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
            <RoomForm form={form} setForm={setForm} errors={errors} />
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
              <Button href="/my-listings" variant="secondary" type="button">
                Cancel
              </Button>
              <Button type="submit" loading={busy} size="lg">
                {busy ? "Publishing…" : "Publish Room"}
              </Button>
            </div>
          </form>

          {/* Live preview */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Live preview</p>
            <RoomCard room={preview} footer={<span className="text-sm font-semibold text-muted">View Details →</span>} />
            <p className="mt-4 rounded-xl border border-line bg-surface-2/60 p-4 text-xs leading-relaxed text-muted">
              This is exactly how your room will appear in the rooms grid. Add a photo and a catchy
              name to make it stand out.
            </p>
          </aside>
        </div>
      </div>
    </PageFade>
  );
}
