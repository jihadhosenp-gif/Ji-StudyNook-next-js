"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, ChevronDown, LayoutDashboard, LogOut, PlusCircle, Rows3 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Avatar from "./Avatar";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarCheck },
  { href: "/my-listings", label: "My Listings", icon: Rows3 },
  { href: "/add-room", label: "Add Room", icon: PlusCircle },
];

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const onLogout = async () => {
    setOpen(false);
    await logout();
    toast.success("You've been logged out.");
    router.push("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-xl border border-line bg-surface pl-1.5 pr-2.5 transition hover:border-accent"
      >
        <Avatar user={user} className="h-7 w-7" />
        <span className="hidden max-w-[110px] truncate text-sm font-medium lg:block">{user.name}</span>
        <ChevronDown className={`h-4 w-4 text-muted transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-64 origin-top-right rounded-2xl border border-line bg-surface p-2 shadow-lift"
          >
            <div className="border-b border-line px-3 pb-3 pt-2">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="py-1.5">
              {items.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} role="menuitem" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink hover:bg-surface-2">
                  <Icon className="h-4 w-4 text-muted" /> {label}
                </Link>
              ))}
            </div>
            <button onClick={onLogout} role="menuitem" className="flex w-full items-center gap-3 rounded-lg border-t border-line px-3 py-2.5 text-sm text-danger hover:bg-danger-soft">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
