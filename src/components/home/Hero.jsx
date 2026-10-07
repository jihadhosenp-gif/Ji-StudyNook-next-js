"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users, Wifi, Projector } from "lucide-react";
import Button from "@/components/Button";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Warm ambient backdrop — subtle, not a generic SaaS gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 82% 18%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%), radial-gradient(50% 40% at 8% 90%, color-mix(in srgb, var(--gold) 10%, transparent), transparent 70%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-20">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Smart Study Room Booking
          </span>

          <h1 className="mt-6 font-heading text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]">
            Find Your Perfect
            <br />
            Study Room
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Discover quiet, comfortable spaces designed for focused learning. Book the right room, at
            the right time, without the hassle.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/rooms" size="lg">
              Explore Rooms <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/add-room" variant="secondary" size="lg">
              List Your Room
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <Wifi className="h-4 w-4 text-accent" /> High-speed Wi-Fi
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" /> Solo & group rooms
            </span>
            <span className="inline-flex items-center gap-2">
              <Projector className="h-4 w-4 text-accent" /> Fully equipped
            </span>
          </div>
        </div>

        {/* Right: layered visual composition */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div
            aria-hidden
            className="absolute -right-3 -top-3 h-28 w-28 rounded-3xl border border-gold/50 sm:h-36 sm:w-36"
          />
          <div
            aria-hidden
            className="absolute -bottom-4 -left-4 h-24 w-24 rounded-3xl border border-accent/40 sm:h-32 sm:w-32"
          />

          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=75"
              alt="A calm modern library reading room with warm lighting"
              fill
              className="object-cover aspect-[4/3] sm:aspect-[5/4]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Central Library · Quiet Wing
            </div>
          </div>

          {/* Floating availability card */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 left-2 w-[240px] rounded-2xl border border-line bg-surface/95 p-4 shadow-lift backdrop-blur-md sm:-bottom-8 sm:left-[-1.5rem] sm:w-[264px]"
          >
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available Now
            </div>
            <p className="mt-2 font-heading text-base font-bold text-ink">Study Room A-302</p>
            <p className="mt-1 text-xs text-muted">4 Seats · Wi-Fi · Projector</p>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs">
              <span className="font-medium text-muted">Floor 3</span>
              <span className="font-heading font-extrabold text-ink">$5/hr</span>
            </div>
          </motion.div>

          {/* Small floating booking chip */}
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-5 right-2 rounded-2xl border border-line bg-surface px-4 py-3 shadow-lift sm:right-[-1rem]"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Next slot</p>
            <p className="mt-0.5 font-heading text-sm font-extrabold text-ink">Today · 14:00</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

