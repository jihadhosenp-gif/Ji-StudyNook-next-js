import { Reveal } from "@/components/Animate";

const stats = [
  { value: "250+", label: "Study Rooms" },
  { value: "1,200+", label: "Students" },
  { value: "98%", label: "Booking Success" },
  { value: "24/7", label: "Availability" },
];

/** Minimalist trust strip — typography-led, not a dashboard. */
export default function Stats() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.07}
            className={`text-center lg:border-l lg:border-line ${
              i === 0 ? "lg:border-l-0" : ""
            } ${i === 2 ? "border-t border-line pt-10 lg:border-t-0 lg:pt-0" : ""} ${
              i === 3 ? "border-t border-line pt-10 lg:border-t-0 lg:pt-0" : ""
            }`}
          >
            <p className="font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
