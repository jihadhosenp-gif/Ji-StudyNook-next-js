"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { roomsApi } from "@/lib/api";
import { errorMessage } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import RoomForm, { validateRoom } from "@/components/RoomForm";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import Button from "@/components/Button";
import { PageFade } from "@/components/Animate";
import ListingCard from "./ListingCard";

export default function MyListingsView() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [saveBusy, setSaveBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    roomsApi
      .list({ mine: true })
      .then(setRooms)
      .catch((err) => {
        setRooms([]);
        toast.error(errorMessage(err));
      });
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (room) => {
    setEditTarget(room);
    setEditForm({
      name: room.name,
      description: room.description,
      image: room.image,
      floor: String(room.floor),
      capacity: String(room.capacity),
      price: String(room.price),
      amenities: [...(room.amenities ?? [])],
    });
    setEditErrors({});
  };

  const saveRoom = async () => {
    const e = validateRoom(editForm);
    setEditErrors(e);
    if (Object.keys(e).length > 0) return;
    setSaveBusy(true);
    try {
      const updated = await roomsApi.update(editTarget._id, {
        ...editForm,
        floor: Number(editForm.floor),
        capacity: Number(editForm.capacity),
        price: Number(editForm.price),
      });
      setRooms((list) => list.map((r) => (r._id === updated._id ? updated : r)));
      toast.success("Room updated successfully.");
      setEditTarget(null);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSaveBusy(false);
    }
  };

  const deleteRoom = async () => {
    try {
      await roomsApi.remove(deleteTarget._id);
      setRooms((list) => list.filter((r) => r._id !== deleteTarget._id));
      toast.success("Room deleted successfully.");
    } catch (err) {
      toast.error(errorMessage(err));
      throw err; // keep the confirmation modal open on failure
    }
  };

  return (
    <PageFade className="flex-1">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              My Study Rooms
            </h1>
            <p className="mt-2 text-base text-muted">
              Manage the rooms you list on StudyNook{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
            </p>
          </div>
          <Button href="/add-room">
            <Plus className="h-4 w-4" /> Add Room
          </Button>
        </div>

        <div className="mt-8">
          {rooms === null ? (
            <LoadingSpinner label="Loading your listings…" />
          ) : rooms.length === 0 ? (
            <EmptyState
              title="You haven't listed a room yet."
              message="Share a quiet corner with fellow students — it takes less than two minutes."
              actionLabel="Add Your First Room"
              actionHref="/add-room"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <ListingCard
                  key={room._id}
                  room={room}
                  onEdit={() => openEdit(room)}
                  onDelete={() => setDeleteTarget(room)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        open={Boolean(editTarget)}
        onClose={() => setEditTarget(null)}
        title="Edit room"
        subtitle={editTarget?.name}
        maxWidth="max-w-2xl"
      >
        {editForm && (
          <>
            <RoomForm form={editForm} setForm={setEditForm} errors={editErrors} />
            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={() => setEditTarget(null)} disabled={saveBusy}>
                Cancel
              </Button>
              <Button onClick={saveRoom} loading={saveBusy}>
                {saveBusy ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteRoom}
        title="Delete this room?"
        message="This action cannot be undone. The room will be removed from search results immediately."
        confirmLabel="Delete Room"
        cancelLabel="Keep Room"
        loadingLabel="Deleting…"
      />
    </PageFade>
  );
}
