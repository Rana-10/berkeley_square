"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { completedDeals, completionStats } from "@/data/fundingCompletions";

const categories = ["All", "Bridging", "Development", "Refinancing", "Commercial", "Acquisition"] as const;

export function FundingCompletionsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredDeals = useMemo(
    () => activeCategory === "All"
      ? completedDeals
      : completedDeals.filter((deal) => deal.type === activeCategory),
    [activeCategory]
  );

  return (
    <div className="space-y-16">
      {/* 1. Top-Level Completion Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {completionStats.map((stat) => (
          <TiltCard key={stat.label} className="p-7">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Metric</span>
              <span className="h-1.5 w-1.5 rounded-full bg-legacy-red shadow-[0_0_6px_#C43A31]" />
            </div>
            <p className="display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white [html.light_&]:text-[#121316]">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </p>
            <h3 className="mt-3 text-base sm:text-lg font-bold text-white/90 [html.light_&]:text-[#121316]">{stat.label}</h3>
            <p className="mt-2 text-sm leading-6 text-legacy-muted [html.light_&]:text-[#555d6b]">{stat.caption}</p>
          </TiltCard>
        ))}
      </div>

      {/* 3. Filterable Completed Transactions Showcase */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 [html.light_&]:border-[#DDD7CA] pb-6">
          <div>
            <span className="eyebrow">Verified Track Record</span>
            <h2 className="display mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-white [html.light_&]:text-[#121316]">Selected Facility Completions</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 rounded-full border border-white/10 [html.light_&]:border-[#DDD7CA] bg-white/[0.03] [html.light_&]:bg-[#F6F2EA] p-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`focus-ring rounded-full px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "border border-legacy-red/40 bg-legacy-red text-white shadow-[0_0_15px_rgba(196,58,49,0.4)]"
                    : "text-slate-400 [html.light_&]:text-[#555d6b] hover:text-white [html.light_&]:hover:text-[#121316] [html.light_&]:hover:bg-white/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDeals.map((deal) => (
            <RevealItem key={deal.id}>
              <TiltCard className="flex h-full flex-col justify-between p-7">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/15 [html.light_&]:border-[#DDD7CA] bg-white/5 [html.light_&]:bg-[#F6F2EA] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-slate-300 [html.light_&]:text-[#444444]">
                      {deal.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 [html.light_&]:text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 [html.light_&]:bg-emerald-600 animate-pulse" /> {deal.status}
                    </span>
                  </div>

                  {/* Amount & Location */}
                  <div className="mt-6">
                    <p className="display text-3xl sm:text-4xl font-bold text-white [html.light_&]:text-[#121316]">
                      {deal.amount}
                    </p>
                    <p className="mt-1 text-base sm:text-lg font-semibold text-slate-300 [html.light_&]:text-[#2A2927]">
                      {deal.location}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-legacy-muted [html.light_&]:text-[#555d6b]">
                    {deal.summary}
                  </p>
                </div>

                {/* Card Specs */}
                <div className="mt-6 border-t border-white/[0.08] [html.light_&]:border-[#DDD7CA] pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-400 [html.light_&]:text-[#706D68]">
                    <span>LTV / Facility Structure</span>
                    <span className="font-bold text-white [html.light_&]:text-[#121316]">{deal.ltv}</span>
                  </div>
                  {deal.gdv && (
                    <div className="flex justify-between text-slate-400 [html.light_&]:text-[#706D68]">
                      <span>Gross Development Value</span>
                      <span className="font-bold text-white [html.light_&]:text-[#121316]">{deal.gdv}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400 [html.light_&]:text-[#706D68]">
                    <span>Execution Speed</span>
                    <span className="font-bold text-legacy-red">{deal.timeframe}</span>
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
