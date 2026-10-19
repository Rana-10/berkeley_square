"use client";

import { usePauseWhenOffScreen } from "@/lib/usePauseWhenOffScreen";

const tickerItems = [
  "Specialist Bridging Finance",
  "Mayfair Property Advisory",
  "Turnkey Construction Delivery",
  "Portfolio Restructuring",
  "Development Funding",
  "Tailored Capital Structuring",
  "Discreet Capital Execution"
];

export function BrandTicker() {
  const { ref, isVisible } = usePauseWhenOffScreen<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-white/10 bg-black/40 py-4 select-none backdrop-blur-md [html.light_&]:bg-[#F3EEE4] [html.light_&]:border-[#E8E5E0]"
    >
      {/* Edge Gradient Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#080808] to-transparent [html.light_&]:from-[#F3EEE4]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#080808] to-transparent [html.light_&]:from-[#F3EEE4]" />

      <div
        className="flex w-max animate-[ticker_35s_linear_infinite] hover:[animation-play-state:paused]"
        style={{ animationPlayState: isVisible ? "running" : "paused" }}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-8 px-4" aria-hidden={copyIndex === 1}>
            {tickerItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-6 text-xs font-bold uppercase tracking-[0.22em] text-white/75 [html.light_&]:text-[#181818]/80"
              >
                <span>{item}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-legacy-red shadow-[0_0_8px_#C43A31]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
