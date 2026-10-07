import { Check } from "lucide-react";

/** Premium amenity chip with a leading check mark. */
export default function AmenityChip({ label, size = "md" }) {
  return (
    <span
      className={
        size === "sm"
          ? "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink"
          : "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink"
      }
    >
      <Check className={size === "sm" ? "h-3 w-3 text-accent" : "h-3.5 w-3.5 text-accent"} />
      {label}
    </span>
  );
}
