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
    "border border-[#112A22] bg-[#112A22] text-white uppercase tracking-[0.14em] hover:border-legacy-red hover:bg-legacy-red active:translate-y-px",
  secondary:
    "border border-[#181818]/70 bg-transparent text-[#181818] uppercase tracking-[0.14em] hover:bg-[#112A22] hover:text-white active:translate-y-px",
  silver:
    "border border-[#112A22] bg-[#EBE5D9] text-[#181818] uppercase tracking-[0.14em] hover:bg-[#112A22] hover:text-white active:translate-y-px",
  ghost:
    "bg-transparent text-[#181818] underline decoration-[#181818]/40 underline-offset-4 hover:decoration-legacy-red hover:text-legacy-red"
};

export function Button({
  className,
  variant = "primary",
  magnetic = false,
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
        "group focus-ring inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-xs font-semibold transition-colors duration-300",
        styles[variant],
        className
      )}
      {...props}
    >
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
  magnetic = false,
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
        "group focus-ring inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-xs font-semibold transition-colors duration-300",
        styles[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2" suppressHydrationWarning>
        {children}
      </span>
    </Link>
  );

  if (!magnetic) return content;

  return <Magnetic strength={0.28}>{content}</Magnetic>;
}
