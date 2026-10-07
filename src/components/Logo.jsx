import Link from "next/link";
import { cn } from "@/lib/utils";

// Mark: an open book whose pages form a roofed nook, with a location dot (the "quiet corner").
export function LogoMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="11" className="fill-accent" />
      <path d="M8 29V16.5L20 8l12 8.5V29" stroke="var(--accent-ink)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" opacity=".55" />
      <path d="M11 29c3-1.6 6-1.6 9 0 3-1.6 6-1.6 9 0V19c-3-1.4-6-1.4-9 0-3-1.4-6-1.4-9 0v10Z" stroke="var(--accent-ink)" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
      <path d="M20 19v10" stroke="var(--accent-ink)" strokeWidth="1.8" />
      <circle cx="20" cy="13.5" r="2.2" className="fill-gold" />
    </svg>
  );
}

export default function Logo({ className, markClassName, light = false, href = "/" }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5", className)} aria-label="StudyNook home">
      <LogoMark className={markClassName} />
      <span className={cn("font-heading text-xl font-extrabold tracking-tight", light ? "text-white" : "text-ink")}>
        Study<span className={light ? "text-[#6fd3bb]" : "text-accent"}>Nook</span>
      </span>
    </Link>
  );
}
