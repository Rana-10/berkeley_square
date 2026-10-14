"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Hammer,
  Key,
  Landmark,
  Percent,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import { TiltCard } from "@/components/animations/TiltCard";
import { cn } from "@/lib/utils";

export const financialSpecialists = [
  {
    id: "bridging-loan-specialist",
    title: "Bridging Loan Specialist",
    tagline: "Ultra-Fast Liquidity & Time-Critical Property Acquisition",
    icon: Zap,
    accentColor: "from-amber-500/20 via-legacy-red/10 to-transparent",
    badge: "Bridging Specialist",
    facilityRange: "£100k – £100M",
    maxLtv: "Up to 80% LTV",
    speed: "Drawdown within 14 days",
    overview:
      "Market-leading bridging finance engineered for fast execution. Renowned for completing transactions when conventional lenders cannot meet critical deadlines.",
    highlights: [
      "2nd charge facility security structures",
      "Auction purchases with guaranteed completion pathways",
      "100% rolled-up interest options (no monthly servicing required)",
      "Cross-collateralisation & foreign national HNWI structures"
    ],
    ctaText: "Apply for Bridging Finance",
    loanTypeParam: "bridging"
  },
  {
    id: "commercial-finance-specialist",
    title: "Commercial Finance Specialist",
    tagline: "Prime Offices, Mixed-Use Freeholds, Retail & Industrial Assets",
    icon: Building2,
    accentColor: "from-blue-500/20 via-legacy-red/10 to-transparent",
    badge: "Commercial Specialist",
    facilityRange: "£250k – £50M+",
    maxLtv: "Up to 75% LTV",
    speed: "Term sheet in 24–48 hrs",
    overview:
      "Structured commercial property debt across owner-occupier, investment commercial, and semi-commercial assets across London and UK gateway hubs.",
    highlights: [
      "Prime office buildings, industrial parks & logistics facilities",
      "Mixed-use development portfolios & high street commercial",
      "Commercial portfolio refinancing & equity release lines",
      "Interest-only and capital-and-interest long-term debt"
    ],
    ctaText: "Structure Commercial Debt",
    loanTypeParam: "commercial"
  },
  {
    id: "development-finance-specialist",
    title: "Development Finance Specialist",
    tagline: "Ground-Up New Builds, Heavy Refurbishments & Conversions",
    icon: Hammer,
    accentColor: "from-emerald-500/20 via-legacy-red/10 to-transparent",
    badge: "Development Specialist",
    facilityRange: "£100M+",
    maxLtv: "Up to 70% LTGDV / 88% LTC",
    speed: "Staged QS drawdowns",
    overview:
      "Comprehensive development funding solutions supporting developers from planning through construction, fit-out, and exit refinancing.",
    highlights: [
      "Senior, stretched senior & mezzanine development tranches",
      "Permitted Development (Class MA) & airspace additions",
      "Staged tranche drawdowns aligned with QS monitoring reports",
      "Developer exit bridging to allow orderly unit sales"
    ],
    ctaText: "Finance Development Project",
    loanTypeParam: "development"
  },
  {
    id: "buy-to-let-mortgage-specialist",
    title: "Buy-to-Let Mortgage Specialist",
    tagline: "Prime Portfolios, HMOs, MUFBs & Expat/Offshore SPV Facilities",
    icon: Key,
    accentColor: "from-purple-500/20 via-legacy-red/10 to-transparent",
    badge: "Buy-to-Let Specialist",
    facilityRange: "£150k – £20M+",
    maxLtv: "Up to 80% LTV",
    speed: "Fixed & tracker lines",
    overview:
      "Tailored mortgage solutions for residential landlords, professional property investors, and international buyers expanding UK rental portfolios.",
    highlights: [
      "HMOs (Houses in Multiple Occupation) & Multi-Unit Freehold Blocks (MUFBs)",
      "UK Limited Company (SPV), LLP, & offshore trust borrowing",
      "Expat & foreign national investor mortgage pathways",
      "Portfolio aggregation & large-scale capital refinancing"
    ],
    ctaText: "Explore Buy-to-Let Mortgages",
    loanTypeParam: "mortgage"
  }
];

export function FinancialSpecialistsGrid() {
  const [activeSpecialist, setActiveSpecialist] = useState<string>(financialSpecialists[0].id);

  return (
    <section className="relative overflow-hidden py-16 font-sans select-none" id="specialist-divisions">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-md [html.light_&]:border-black/10 [html.light_&]:bg-white [html.light_&]:text-[#181818] [html.light_&]:shadow-sm">
          <Sparkles size={14} className="text-legacy-red" />
          <span>Core Lending Disciplines</span>
        </div>
        <h2 className="display text-2xl sm:text-3xl md:text-4xl font-bold text-white [html.light_&]:text-[#121316] tracking-tight leading-tight">
          Specialist Financial Solutions
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 [html.light_&]:text-[#555d6b] leading-relaxed">
          Berkeley Square Capital delivers targeted lending across four distinct property finance disciplines. Each facility is custom-structured by dedicated sector specialists.
        </p>
      </div>

      {/* 4 Specialist Pillars Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {financialSpecialists.map((spec) => {
          const Icon = spec.icon;
          const isSelected = activeSpecialist === spec.id;

          return (
            <div
              key={spec.id}
              onClick={() => setActiveSpecialist(spec.id)}
              className={cn(
                "group relative rounded-3xl border p-7 sm:p-8 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between cursor-pointer",
                isSelected
                  ? "border-legacy-red/60 bg-gradient-to-b from-[#161217] to-[#0d0d12] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(225,18,45,0.15)] ring-1 ring-legacy-red/40 [html.light_&]:bg-white [html.light_&]:bg-none [html.light_&]:border-legacy-red/60 [html.light_&]:shadow-[0_15px_40px_rgba(0,0,0,0.06),0_0_20px_rgba(225,18,45,0.08)]"
                  : "border-white/10 bg-[#0c0c12]/80 hover:border-white/20 hover:bg-[#12121a] [html.light_&]:bg-white [html.light_&]:bg-none [html.light_&]:border-[#E8E5E0] [html.light_&]:hover:border-slate-300 [html.light_&]:shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
              )}
            >
              {/* Subtle Top Glow */}
              <div
                className={cn(
                  "absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-legacy-red/60 to-transparent opacity-0 transition-opacity duration-500",
                  isSelected && "opacity-100"
                )}
              />

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-legacy-red/40 bg-legacy-red/15 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-legacy-light [html.light_&]:bg-legacy-red/10 [html.light_&]:text-legacy-red">
                      <Sparkles size={11} className="text-legacy-red" />
                      <span>{spec.badge}</span>
                    </span>
                    <h3 className="display text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#121316] mt-2 group-hover:text-legacy-light [html.light_&]:group-hover:text-legacy-red transition-colors">
                      {spec.title}
                    </h3>
                  </div>

                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5 text-legacy-red group-hover:scale-110 group-hover:border-legacy-red/50 [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.03] transition-all shrink-0">
                    <Icon size={24} />
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-300 [html.light_&]:text-[#181818] font-mono tracking-tight mb-4">
                  {spec.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300/90 [html.light_&]:text-[#555d6b] leading-relaxed mb-6">
                  {spec.overview}
                </p>

                {/* Key Facility Parameters */}
                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/40 p-3.5 mb-6 text-center font-mono [html.light_&]:border-[#E8E5E0] [html.light_&]:bg-[#FAF8F5]">
                  <div className="border-r border-white/10 [html.light_&]:border-black/10 pr-2">
                    <span className="block text-[9.5px] uppercase text-slate-400 [html.light_&]:text-[#7a828e]">Facility Size</span>
                    <span className="block text-xs sm:text-sm font-bold text-white [html.light_&]:text-[#121316] mt-0.5">{spec.facilityRange}</span>
                  </div>
                  <div className="border-r border-white/10 [html.light_&]:border-black/10 px-2">
                    <span className="block text-[9.5px] uppercase text-slate-400 [html.light_&]:text-[#7a828e]">Gearing</span>
                    <span className="block text-xs sm:text-sm font-bold text-emerald-400 [html.light_&]:text-emerald-600 mt-0.5">{spec.maxLtv}</span>
                  </div>
                  <div className="pl-2">
                    <span className="block text-[9.5px] uppercase text-slate-400 [html.light_&]:text-[#7a828e]">Timeline</span>
                    <span className="block text-xs sm:text-sm font-bold text-legacy-red mt-0.5">{spec.speed}</span>
                  </div>
                </div>

                {/* Checklist of Capabilities */}
                <div className="space-y-2.5 mb-8">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 [html.light_&]:text-[#7a828e] mb-2">
                    Specialist Capability Matrix:
                  </span>
                  {spec.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 [html.light_&]:text-[#555d6b]">
                      <CheckCircle2 size={14} className="text-legacy-red shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/loan-application?type=${spec.loanTypeParam}`}
                className="inline-flex items-center justify-between w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white group-hover:border-legacy-red group-hover:bg-gradient-to-r group-hover:from-legacy-deepRed group-hover:to-legacy-red transition-all shadow-md [html.light_&]:border-black/15 [html.light_&]:bg-black/[0.04] [html.light_&]:text-[#121316] [html.light_&]:hover:text-white"
              >
                <span>{spec.ctaText}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
