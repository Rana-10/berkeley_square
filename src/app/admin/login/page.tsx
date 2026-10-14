"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { BSQLogo } from "@/components/ui/BSQLogo";
import { useTheme } from "@/components/theme/ThemeContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setMessage(body?.error ?? "Unable to sign in.");
        return;
      }

      router.push("/admin/applications");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main suppressHydrationWarning className="container grid min-h-screen place-items-center py-16 text-theme-primary">
      <form suppressHydrationWarning onSubmit={submitLogin} autoComplete="off" className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-surface p-8 shadow-theme-card">
        <div suppressHydrationWarning className="flex justify-center mb-6">
          <BSQLogo variant="full" theme={theme} size="md" priority />
        </div>
        <p className="eyebrow text-center">Admin Deal Desk</p>
        <h1 className="mt-1 text-2xl font-bold text-center">Executive Portal Sign In</h1>
        <div className="mt-8 grid gap-4" suppressHydrationWarning>
          <label className="grid gap-2 text-sm" suppressHydrationWarning>
            <span className="font-semibold">Email</span>
            <input
              suppressHydrationWarning
              type="email"
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-theme-primary"
              required
            />
          </label>
          <label className="grid gap-2 text-sm" suppressHydrationWarning>
            <span className="font-semibold">Password</span>
            <span className="relative" suppressHydrationWarning>
              <input
                suppressHydrationWarning
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3 pr-12 text-theme-primary"
                required
              />
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-theme-muted transition-colors hover:bg-theme-border hover:text-theme-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {mounted ? (showPassword ? <EyeOff size={18} /> : <Eye size={18} />) : <span className="h-4 w-4" />}
              </button>
            </span>
          </label>
        </div>
        {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
        <button
          suppressHydrationWarning
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-xl bg-legacy-red px-5 py-3 text-xs font-bold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in" : "Enter admin panel"}
        </button>
      </form>
    </main>
  );
}
