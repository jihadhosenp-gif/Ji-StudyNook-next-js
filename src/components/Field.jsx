import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputCls =
  "h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-accent";

export const labelCls = "block text-sm font-semibold text-ink";

/** Label + control + inline error/hint, used by every form in the app. */
export default function Field({ label, error, hint, children, className }) {
  return (
    <div className={cn("", className)}>
      {label && <span className={labelCls}>{label}</span>}
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger">
          <CircleAlert className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
