"use client";

import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerCardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
}

export function ShimmerCard({
  children,
  className,
  glow = true,
  interactive = true,
  ...props
}: ShimmerCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--card-mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--card-mouse-y", `${y}px`);
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-legacy-panel/85 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] [html.light_&]:bg-white [html.light_&]:border-[#E8E5E0] [html.light_&]:shadow-[0_10px_30px_rgba(0,0,0,0.03)] [html.light_&]:hover:border-slate-400/40 [html.light_&]:hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)]",
        className
      )}
      {...props}
    >
      {/* 1. Dynamic Cursor Light Follow Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(225, 18, 45, 0.14), transparent 65%)"
        }}
      />

      {/* 2. Shimmering Ambient Diagonal Light Beam Sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[150%] rotate-45 transform-gpu bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-opacity duration-700 group-hover:animate-shimmer-sweep group-hover:opacity-100 [html.light_&]:via-black/[0.02]"
      />

      {/* 3. Hairline Top Glass Highlight Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100 [html.light_&]:via-black/10"
      />

      {/* 4. Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
