"use client";

import Link, { type LinkProps } from "next/link";
import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Magnetic } from "@/components/animations/Magnetic";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "silver";
  magnetic?: boolean;
};

const styles = {
  primary:
    "relative overflow-hidden rounded-full border border-red-500/40 bg-gradient-to-r from-legacy-deepRed via-legacy-red to-[#ff2b4e] text-white shadow-[0_0_25px_rgba(225,18,45,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_0_35px_rgba(225,18,45,0.55)] hover:border-red-400/70 active:scale-[0.98]",
  secondary:
    "relative overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl hover:border-white/35 hover:bg-white/[0.12] hover:text-white active:scale-[0.98]",
  silver:
    "relative overflow-hidden rounded-full border border-slate-300/30 bg-gradient-to-r from-slate-200 via-white to-slate-300 text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] active:scale-[0.98]",
  ghost:
    "relative overflow-hidden rounded-full text-slate-300 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
};

export function Button({
  className,
  variant = "primary",
  magnetic = true,
  children,
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty("--btn-mouse-x", `${x}px`);
    btnRef.current.style.setProperty("--btn-mouse-y", `${y}px`);
  }

  const content = (
    <button
      ref={btnRef}
      onPointerMove={handlePointerMove}
      suppressHydrationWarning
      className={cn(
        "group focus-ring inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300",
        styles[variant],
        className
      )}
      {...props}
    >
      {/* Dynamic ambient cursor sheen highlight via stylesheet classes */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          variant === "primary" ? "btn-sheen-primary" : "btn-sheen-secondary"
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2" suppressHydrationWarning>
        {children}
      </span>
    </button>
  );

  if (!magnetic) return content;

  return <Magnetic strength={0.28}>{content}</Magnetic>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  magnetic = true,
  className,
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  magnetic?: boolean;
  className?: string;
} & Omit<LinkProps, "href">) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    linkRef.current.style.setProperty("--btn-mouse-x", `${x}px`);
    linkRef.current.style.setProperty("--btn-mouse-y", `${y}px`);
  }

  const content = (
    <Link
      ref={linkRef}
      href={href}
      onPointerMove={handlePointerMove}
      suppressHydrationWarning
      className={cn(
        "group focus-ring inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300",
        styles[variant],
        className
      )}
      {...props}
    >
      {/* Dynamic ambient cursor sheen highlight via stylesheet classes */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          variant === "primary" ? "btn-sheen-primary" : "btn-sheen-secondary"
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2" suppressHydrationWarning>
        {children}
      </span>
    </Link>
  );

  if (!magnetic) return content;

  return <Magnetic strength={0.28}>{content}</Magnetic>;
}
