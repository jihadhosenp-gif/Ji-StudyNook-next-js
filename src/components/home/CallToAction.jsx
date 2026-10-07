import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import { Reveal } from "@/components/Animate";

/** Premium dark CTA band with restrained decorative elements. */
export default function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-[#0b1520] px-6 py-16 text-center sm:px-12 lg:py-20">
          {/* Decorative rings */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full border border-[#3fb59a]/25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full border border-white/10"
          />
          <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6fd3bb]">Ready when you are</p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your next productive session starts here.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
              Stop searching for the perfect place to study. Find your space and start focusing.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/rooms" size="lg">
                Explore Rooms <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/add-room" variant="outlineLight" size="lg">
                List Your Room
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
