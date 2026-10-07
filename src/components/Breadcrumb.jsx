import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

/** Breadcrumb trail: Home / Rooms / … */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
      <Link href="/" className="inline-flex items-center gap-1.5 transition hover:text-accent">
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      {items.map((item, i) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-muted/60" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="transition hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
