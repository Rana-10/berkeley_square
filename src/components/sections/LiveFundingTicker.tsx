"use client";

import { CheckCircle2, Clock, Landmark, Sparkles } from "lucide-react";
import { completedDeals } from "@/data/fundingCompletions";
import { usePauseWhenOffScreen } from "@/lib/usePauseWhenOffScreen";

export function LiveFundingTicker() {
  const { ref, isVisible } = usePauseWhenOffScreen<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-[#070709] via-[#0e0e13] to-[#070709] py-3.5 select-none backdrop-blur-md [html.light_&]:bg-[#F4F7F0] [html.light_&]:border-[#E8E5E0]"
    >
      {/* Edge Gradient Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#070709] to-transparent [html.light_&]:from-[#F4F7F0]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#070709] to-transparent [html.light_&]:from-[#F4F7F0]" />

      {/* Ticker Track */}
      <div
        className="flex w-max animate-[ticker_42s_linear_infinite] hover:[animation-play-state:paused]"
        style={{ animationPlayState: isVisible ? "running" : "paused" }}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-6 px-3" aria-hidden={copyIndex === 1}>
            {completedDeals.map((deal) => (
              <div
                key={deal.id}
                className="group flex items-center gap-3.5 rounded-full border border-white/[0.1] bg-black/60 px-4 py-2 shadow-sm transition-all duration-300 hover:border-legacy-red/40 hover:bg-black/90 [html.light_&]:bg-white [html.light_&]:border-[#E8E5E0] [html.light_&]:shadow-[0_2px_10px_rgba(0,0,0,0.03)] [html.light_&]:hover:bg-white [html.light_&]:hover:border-legacy-red/40"
              >
                {/* Live Status Indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </span>

                {/* Amount */}
                <span className="font-mono text-sm font-bold tracking-tight text-white group-hover:text-legacy-red transition-colors [html.light_&]:text-[#181818]">
                  {deal.amount}
                </span>

                <span className="h-3 w-px bg-white/20 [html.light_&]:bg-black/15" />

                {/* Deal Type & Location */}
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-[#181818]">
                  {deal.type}
                </span>

                <span className="text-xs text-slate-400 [html.light_&]:text-[#555d6b]">
                  · {deal.location}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300 [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.03] [html.light_&]:text-[#555d6b]">
                  <Clock size={10} className="text-legacy-red" /> {deal.timeframe}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
