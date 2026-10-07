"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import Avatar from "./Avatar";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

export default function MobileMenu({ open, onClose, links, pathname }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onLogout = async () => {
    onClose();
    await logout();
    toast.success("You've been logged out.");
    router.push("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden" />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col bg-paper p-5 shadow-lift md:hidden"
            role="dialog"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={onClose} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-xl border border-line">
                <X className="h-5 w-5" />
              </button>
            </div>
            {user && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
                <Avatar user={user} className="h-10 w-10" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
              </div>
            )}
            <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className={cn(
                    "rounded-xl px-4 py-3 font-heading text-lg font-semibold",
                    pathname === l.href ? "bg-accent-soft text-accent" : "text-ink hover:bg-surface-2"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-3 border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Theme</span>
                <ThemeToggle />
              </div>
              {user ? (
                <Button variant="secondary" className="w-full" onClick={onLogout}>
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button href="/login" variant="secondary" onClick={onClose}>Login</Button>
                  <Button href="/register" onClick={onClose}>Register</Button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
