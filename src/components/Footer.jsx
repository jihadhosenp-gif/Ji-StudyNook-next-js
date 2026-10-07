import Link from "next/link";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "./SocialIcons";

const explore = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/#why", label: "About" },
];
const forUsers = [
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-room", label: "Add Room" },
  { href: "/my-listings", label: "My Listings" },
];
const socials = [
  { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
  { href: "https://x.com", label: "X", Icon: XIcon },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
];

function Column({ heading, links }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-ink">{heading}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 font-serif text-lg text-muted">Find your quiet corner.</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A premium digital library where finding a quiet place to focus feels effortless.
          </p>
        </div>

        <Column heading="Explore" links={explore} />
        <Column heading="For Users" links={forUsers} />

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-ink">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a href="mailto:hello@studynook.com" className="transition-colors hover:text-accent">
                hello@studynook.com
              </a>
            </li>
            <li>
              <a href="tel:+8801000000000" className="transition-colors hover:text-accent">
                +880 1XXX-XXXXXX
              </a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-2.5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-muted transition hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center text-sm text-muted sm:px-8">
          © 2026 StudyNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
