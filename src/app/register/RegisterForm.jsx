"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { cn, errorMessage, safeNext } from "@/lib/utils";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Field, { inputCls } from "@/components/Field";
import { GoogleIcon } from "@/components/SocialIcons";
import { PageFade } from "@/components/Animate";

function Rule({ ok, children }) {
  return (
    <li className={cn("flex items-center gap-2 text-xs", ok ? "text-accent" : "text-muted")}>
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full border",
          ok ? "border-accent bg-accent text-white" : "border-line"
        )}
      >
        {ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5 opacity-50" />}
      </span>
      {children}
    </li>
  );
}

function RegisterForm() {
  const { user, loading, register, google } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next")) || "/dashboard";

  const [form, setForm] = useState({ name: "", email: "", photo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, user, next, router]);

  const rules = useMemo(
    () => ({
      len: form.password.length >= 6,
      upper: /[A-Z]/.test(form.password),
      lower: /[a-z]/.test(form.password),
    }),
    [form.password]
  );

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.photo && !/^https?:\/\/\S+$/i.test(form.photo)) e.photo = "Enter a valid image URL.";
    if (!rules.len || !rules.upper || !rules.lower)
      e.password = "Password does not meet the requirements below.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      await register(form);
      toast.success("Welcome to StudyNook!");
      router.push(next);
      router.refresh();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const submitGoogle = async () => {
    setGoogleBusy(true);
    try {
      await google();
      toast.success("Welcome to StudyNook!");
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
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1400&q=75"
          alt="Books on library shelves"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1520]/90 via-[#0b1520]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12">
          <p className="font-serif text-3xl leading-snug text-white">
            “Every great idea starts with a place to think.”
          </p>
          <p className="mt-4 text-sm font-medium tracking-wide text-white/70">— Join 1,200+ students</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-md">
          <Logo className="mb-10" />
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink">
            Create your StudyNook account
          </h1>
          <p className="mt-2 text-base text-muted">Find your quiet corner in under a minute.</p>

          <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
            <Field label="Name" error={errors.name}>
              <input
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Alex Morgan"
                className={inputCls}
              />
            </Field>
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
            <Field label="Photo URL" error={errors.photo} hint="Optional — paste a profile image link.">
              <input
                type="url"
                value={form.photo}
                onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
                placeholder="https://…"
                className={inputCls}
              />
            </Field>
            <Field label="Password" error={errors.password}>
              <input
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className={inputCls}
              />
            </Field>

            <ul className="grid grid-cols-1 gap-1.5 rounded-xl border border-line bg-surface p-3.5 sm:grid-cols-3">
              <Rule ok={rules.len}>6+ characters</Rule>
              <Rule ok={rules.upper}>Uppercase letter</Rule>
              <Rule ok={rules.lower}>Lowercase letter</Rule>
            </ul>

            <Button type="submit" loading={busy} className="w-full" size="lg">
              {busy ? "Creating account…" : "Register"}
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
            Already have an account?{" "}
            <Link
              href={`/login${searchParams.get("next") ? `?next=${encodeURIComponent(next)}` : ""}`}
              className="font-semibold text-accent hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </PageFade>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
