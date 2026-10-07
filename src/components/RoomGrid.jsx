"use client";

import { motion } from "framer-motion";
import RoomCard from "./RoomCard";

/** Responsive 1 / 2 / 3 column grid of equal-height room cards. */
export default function RoomGrid({ rooms, stagger = true }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room, i) => (
        <motion.div
          key={room._id}
          initial={stagger ? { opacity: 0, y: 16 } : false}
          whileInView={stagger ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.06, ease: "easeOut" }}
          className="h-full"
        >
          <RoomCard room={room} />
        </motion.div>
      ))}
    </div>
  );
}
