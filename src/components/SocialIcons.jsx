// Brand glyphs as inline SVG (the "X" mark replaces the old Twitter bird).
export function XIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9S15.600 3.600 14.300 3.600c-2.700 0-4.400 1.600-4.400 4.500v2.400H7.100v3.300h2.800V22h3.600Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.55h.05c.53-1 1.83-2.05 3.77-2.05 4.030 0 4.780 2.650 4.780 6.100V21h-4v-4.900c0-1.170-.02-2.670-1.630-2.670-1.630 0-1.880 1.270-1.880 2.590V21h-4V9.750Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GoogleIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.250c0-.780-.070-1.530-.200-2.250H12v4.260h5.900a5.040 5.040 0 0 1-2.190 3.310v2.750h3.540c2.070-1.910 3.250-4.720 3.250-8.070Z" />
      <path fill="#34A853" d="M12 23c2.950 0 5.430-.98 7.240-2.650l-3.540-2.750c-.98.660-2.230 1.060-3.700 1.060-2.850 0-5.260-1.930-6.120-4.520H2.220v2.840A10.990 10.990 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.880 14.140a6.600 6.600 0 0 1 0-4.280V7.020H2.220a11 11 0 0 0 0 9.960l3.660-2.840Z" />
      <path fill="#EA4335" d="M12 5.380c1.610 0 3.050.55 4.180 1.640l3.130-3.130C17.430 2.100 14.950 1 12 1 7.700 1 3.990 3.470 2.220 7.020l3.660 2.840C6.740 7.310 9.150 5.380 12 5.380Z" />
    </svg>
  );
}
