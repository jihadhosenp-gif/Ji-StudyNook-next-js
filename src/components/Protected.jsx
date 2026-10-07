"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

/**
 * Guards private routes. Unauthenticated visitors are sent to /login with a
 * `next` param so they return to the intended page after signing in.
 */
export default function Protected({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) return <LoadingSpinner label="Preparing your workspace…" />;
  return <>{children}</>;
}
