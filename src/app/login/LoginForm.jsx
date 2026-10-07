"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { errorMessage, safeNext } from "@/lib/utils";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Field, { inputCls } from "@/components/Field";
import { GoogleIcon } from "@/components/SocialIcons";
import { PageFade } from "@/components/Animate";

function LoginForm() {
  const { user, loading, login, google } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next")) || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  // Already signed in? Go straight to the intended destination.
  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, user, next, router]);

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      router.push(next);
      router.refresh();
    } catch (err) {
      toast.error(errorMessage(err, "Invalid email or password."));
    } finally {
      setBusy(false);
    }
  };

  const submitGoogle = async () => {
    setGoogleBusy(true);
    try {
      await google();
      toast.success("Welcome back!");
      router.push(next);
      router.refresh();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setGoogleBusy(false);
    }
  };

  return (
    <PageFade className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=75"
          alt="Quiet library interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1520]/90 via-[#0b1520]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12">
          <p className="font-serif text-3xl leading-snug text-white">
            “A calm room, a clear mind, and an hour that belongs entirely to you.”
          </p>
          <p className="mt-4 text-sm font-medium tracking-wide text-white/70">— The StudyNook promise</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-md">
          <Logo className="mb-10" />
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink">Welcome back</h1>
          <p className="mt-2 text-base text-muted">Continue to your focused workspace.</p>

          <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@university.edu"
                className={inputCls}
              />
            </Field>
            <Field label="Password" error={errors.password}>
              <input
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className={inputCls}
              />
            </Field>

            <Button type="submit" loading={busy} className="w-full" size="lg">
              {busy ? "Signing in…" : "Login"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">or</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <Button variant="secondary" className="w-full" size="lg" onClick={submitGoogle} loading={googleBusy}>
            <GoogleIcon className="h-5 w-5" /> Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register${searchParams.get("next") ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="font-semibold text-accent hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </PageFade>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
