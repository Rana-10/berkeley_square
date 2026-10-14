"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/animations/Magnetic";

export function PersistentGetFundedButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 select-none" suppressHydrationWarning>
      <Magnetic strength={0.3}>
        <Link
          href="/loan-application"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex items-center gap-2 sm:gap-3 rounded-full border border-red-500/50 bg-gradient-to-r from-[#7a0c1b] via-[#c91028] to-[#ff2b4e] p-1 sm:p-1.5 pr-3.5 sm:pr-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_25px_rgba(225,18,45,0.45)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-red-400/80 hover:shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_50px_rgba(225,18,45,0.65)] active:scale-[0.98]"
        >
          {/* Clean Solid Monogram Icon */}
          <div className="relative grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/30 bg-black/40 shadow-inner shrink-0">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white" />
          </div>

          {/* Core Button Typography */}
          <div className="text-left">
            <div className="flex items-center gap-1">
              <span className="font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white whitespace-nowrap">
                GET FUNDED
              </span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <span className="block font-mono text-[8px] sm:text-[9px] font-bold tracking-wider text-white/80 uppercase whitespace-nowrap">
              £100k – £100M+ · 48hr
            </span>
          </div>
        </Link>
      </Magnetic>
    </div>
  );
}
