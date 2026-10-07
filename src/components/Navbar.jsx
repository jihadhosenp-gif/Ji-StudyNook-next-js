"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
];
const privateLinks = [
  { href: "/add-room", label: "Add Room" },
  { href: "/my-listings", label: "My Listings" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b transition-all duration-300",
        scrolled ? "border-line bg-paper/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-accent" : "text-muted hover:text-ink"
                )}
              >
                {l.label}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {loading ? (
              <div className="skeleton h-10 w-28" />
            ) : user ? (
              <UserMenu />
            ) : (
              <>
                <Button href="/login" variant="ghost" size="sm" className="h-10">Login</Button>
                <Button href="/register" size="sm" className="h-10">Register</Button>
              </>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} pathname={pathname} />
    </header>
  );
}
