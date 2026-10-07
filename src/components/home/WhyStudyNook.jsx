import { CalendarClock, PlugZap, ShieldCheck, VolumeX } from "lucide-react";
import { Reveal } from "@/components/Animate";

const features = [
  {
    icon: VolumeX,
    title: "Quiet Spaces",
    text: "Dedicated environments designed for concentration — no chatter, no distractions.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Booking",
    text: "Choose the date and hourly slot that works for you, down to the hour.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Availability",
    text: "Real-time booking conflict prevention so a reserved room is always truly reserved.",
  },
  {
    icon: PlugZap,
    title: "Modern Amenities",
    text: "Wi-Fi, projectors, whiteboards and power outlets in every room that needs them.",
  },
];

/** Editorial "Why StudyNook" section. */
export default function WhyStudyNook() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">Why StudyNook</p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Everything you need for uninterrupted focus.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            StudyNook pairs the calm of a traditional reading room with the speed of modern booking
            software. Every detail is designed to get you seated and studying faster.
          </p>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-accent to-transparent" />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper text-accent">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
