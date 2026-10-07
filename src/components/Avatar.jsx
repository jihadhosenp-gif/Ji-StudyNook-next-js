"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, initials } from "@/lib/utils";

export default function Avatar({ user, className }) {
  const [broken, setBroken] = useState(false);
  const base = "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-accent font-semibold";
  if (user?.photo && !broken) {
    return (
      <Image
        src={user.photo}
        alt={user.name}
        onError={(e) => {
          setBroken(true);
          e.currentTarget.style.display = "none";
        }}
        fill
        className={cn(base, "object-cover", className)}
        sizes="2.5rem"
      />
    );
  }
  return <span className={cn(base, "text-xs", className)}>{initials(user?.name)}</span>;
}
