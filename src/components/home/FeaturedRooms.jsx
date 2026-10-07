"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { roomsApi } from "@/lib/api";
import { errorMessage } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import RoomGrid from "@/components/RoomGrid";
import { RoomGridSkeleton } from "@/components/RoomSkeleton";
import EmptyState from "@/components/EmptyState";
import Button from "@/components/Button";
import { Reveal } from "@/components/Animate";

/** Latest 6 rooms on the landing page. */
export default function FeaturedRooms() {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    let active = true;
    roomsApi
      .list()
      .then((r) => active && setRooms(r.slice(0, 6)))
      .catch((err) => {
        if (active) setRooms([]);
        toast.error(errorMessage(err));
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Available Study Rooms"
          title="Spaces Made for Focus"
          subtitle="Explore our newest study rooms and find the environment that matches your workflow."
        />
      </Reveal>

      <div className="mt-12">
        {rooms === null ? (
          <RoomGridSkeleton count={6} />
        ) : rooms.length === 0 ? (
          <EmptyState
            title="No rooms available yet"
            message="Study rooms will appear here as soon as they are listed."
          />
        ) : (
          <RoomGrid rooms={rooms} />
        )}
      </div>

      <div className="mt-12 text-center">
        <Button href="/rooms" variant="secondary" size="lg">
          Browse All Rooms
        </Button>
      </div>
    </section>
  );
}
