import { Loader2 } from "lucide-react";

/** Centered animated loader for booking-style pages. */
export default function LoadingSpinner({ label = "Loading…" }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border-2 border-line" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />
        <Loader2 className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-accent" />
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
