import { CalendarRange, Compass, Rocket, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/Animate";

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    text: "Browse available study rooms and filter by the amenities you need.",
  },
  {
    n: "02",
    icon: CalendarRange,
    title: "Choose",
    text: "Select your preferred date and hourly slot in a couple of clicks.",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Book",
    text: "Confirm your reservation instantly — no waiting, no conflicts.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Focus",
    text: "Show up, settle in, and get productive in your quiet corner.",
  },
];

/** Elegant numbered step cards. */
export default function HowItWorks() {
  return (
    <section className="border-y border-line bg-surface-2/60">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="How StudyNook Works"
            title="Study Smarter in 4 Simple Steps"
            subtitle="From searching to studying — the whole flow takes less than a minute."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <span className="pointer-events-none absolute right-5 top-4 font-serif text-5xl text-accent/15 transition-colors group-hover:text-accent/25">
                  {s.n}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
