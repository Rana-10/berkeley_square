"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      suppressHydrationWarning
      className="site-loader"
      role="status"
      aria-label="Loading Berkeley Square Capital"
    >
      {/* Ambient background glow behind the logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-radial-red opacity-50 blur-3xl"
      />

      <div
        suppressHydrationWarning
        className="relative z-10 text-center flex flex-col items-center px-6"
      >
        {/* Prominent High-Resolution Emblem */}
        <div
          suppressHydrationWarning
          className="relative mb-6 flex items-center justify-center"
        >
          {/* Subtle pulse ring around emblem */}
          <div className="absolute inset-0 -m-3 rounded-full border border-legacy-red/25 opacity-70 animate-ping" />
          <Image
            suppressHydrationWarning
            src="/branding/bsq-emblem-dark.png"
            alt="Berkeley Square Capital"
            width={240}
            height={186}
            priority
            className="h-24 sm:h-28 md:h-32 w-auto object-contain filter drop-shadow-[0_8px_32px_rgba(225,18,45,0.6)] animate-pulse"
          />
        </div>

        {/* Minimalist Authority Title Lockup */}
        <div suppressHydrationWarning className="space-y-1">
          <p
            suppressHydrationWarning
            className="font-sans text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.24em] text-white leading-tight"
          >
            Berkeley Square
          </p>
          <div
            suppressHydrationWarning
            className="flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.38em] text-legacy-muted"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-legacy-red shadow-[0_0_8px_#e1122d]" />
            <span>Capital</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-legacy-red shadow-[0_0_8px_#e1122d]" />
          </div>
        </div>

        {/* Laser Stream Indicator */}
        <div suppressHydrationWarning className="loader-line mt-7 w-48 sm:w-56" />

        {/* Core Subtitle */}
        <p
          suppressHydrationWarning
          className="mt-4 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-white/45"
        >
          London Mayfair · Private Office
        </p>
      </div>
    </div>
  );
}
