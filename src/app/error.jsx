"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import Button from "@/components/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-20">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-soft text-danger">
          <RefreshCw className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          We couldn&apos;t load this page. Please try again or go back home.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg">
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Button href="/" variant="secondary" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}