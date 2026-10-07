import Button from "./Button";

/** Friendly empty state — never leave a blank screen. */
export default function EmptyState({ icon: Icon, title, message, actionLabel, actionHref, onAction, className }) {
  return (
    <div
      className={
        className ||
        "mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed border-line bg-surface/70 px-6 py-14 text-center"
      }
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        {Icon ? <Icon className="h-6 w-6" /> : <span className="font-heading text-xl font-bold">S</span>}
      </div>
      <h3 className="mt-5 font-heading text-xl font-bold text-ink">{title}</h3>
      {message && <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>}
      {(actionLabel || onAction) && (
        <div className="mt-6">
          {actionHref ? (
            <Button href={actionHref}>{actionLabel}</Button>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  );
}
