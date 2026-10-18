"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  Clock,
  Coins,
  Globe2,
  Hammer,
  Landmark,
  Percent,
  RotateCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { TiltCard } from "@/components/animations/TiltCard";

const bespokeSolutions = [
  {
    id: "bridging",
    title: "Bespoke Bridging & Auction Debt",
    badge: "Speed & Agility",
    icon: Zap,
    facilitySize: "£100k – £100M",
    ltv: "Up to 75% LTV",
    speed: "48hr Term Sheet · 14 Day Completion",
    idealFor: "Broken chains, auction purchases, time-sensitive acquisitions, short lease extensions.",
    structure: "2nd Charge, rolled-up interest, no early repayment penalties on selected lines.",
    propertyType: "Prime Residential & Commercial W1/SW1"
  },
  {
    id: "dev-stretch",
    title: "Development Stretch Senior",
    badge: "Maximum LTV",
    icon: Hammer,
    facilitySize: "£250k – £100M",
    ltv: "Up to 70% LTGDV / 88% LTC",
    speed: "Phased Tranche Drawdowns",
    idealFor: "Ground-up residential schemes, luxury conversions, heavy airspace extensions.",
    structure: "Senior debt with blended mezzanine tranche, fully rolled interest during build.",
    propertyType: "Multi-Unit Schemes & High-End Townhomes"
  },
  {
    id: "mezzanine",
    title: "Mezzanine & Equity Stretcher",
    badge: "Capital Optimization",
    icon: Coins,
    facilitySize: "£500k – £10,000,000",
    ltv: "Up to 90% Loan-to-Cost",
    speed: "Co-Terminus with Senior Lenders",
    idealFor: "Developers seeking to minimize cash equity exposure across multiple live schemes.",
    structure: "2nd charge subordinated debt behind clearing banks or institutional senior lenders.",
    propertyType: "Mixed-Use & Prime Residential"
  },
  {
    id: "spv-offshore",
    title: "Offshore Trusts & Complex SPVs",
    badge: "High Net Worth",
    icon: Globe2,
    facilitySize: "£1,000,000 – £40,000,000",
    ltv: "Up to 75% LTV",
    speed: "Discreet Bespoke Underwriting",
    idealFor: "International UHNW buyers, Jersey/Guernsey/BVI structures, non-UK resident borrowers.",
    structure: "Multi-jurisdictional security, non-recourse & limited guarantee facilities.",
    propertyType: "Mayfair, Belgravia & Prime London Freeholds"
  },
  {
    id: "commercial-refi",
    title: "Unregulated Residential and Commercial Refinance",
    badge: "Cashflow Release",
    icon: Building,
    facilitySize: "£100k – £100M",
    ltv: "Up to 70% LTV",
    speed: "2-3 Week Execution",
    idealFor: "Equity release, repositioning secondary offices into ESG workspace, mixed-use blocks.",
    structure: "Term facilities with interest-only options and flexible ICR hurdles.",
    propertyType: "City Office, Semi-Commercial & Retail"
  },
  {
    id: "planning-gain",
    title: "Planning Gain & Conversion Bridging",
    badge: "Value Creation",
    icon: TrendingUp,
    facilitySize: "£1,000,000 – £18,000,000",
    ltv: "Up to 70% of Current Use Value",
    speed: "Seamless Conversion into Senior Debt",
    idealFor: "Sites pending planning determination or Class MA permitted development conversions.",
    structure: "Short-term bridge that rolls into full development facility upon planning grant.",
    propertyType: "Unconsented Land & Commercial-to-Resi"
  }
];

export function BespokeFinanceOrbitSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const activeSolution = bespokeSolutions[selectedIndex];
  const Icon = activeSolution.icon;

  // Auto rotate solutions every 6s when not paused
  useEffect(() => {
    if (!isAutoRotating) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % bespokeSolutions.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoRotating]);

  return (
    <section className="relative py-24 select-none overflow-hidden [html.light_&]:bg-[#DCE6D6]">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-red opacity-50 [html.light_&]:opacity-25" />

      <div className="container relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/50 [html.light_&]:bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/85 [html.light_&]:text-[#222222] shadow-lg backdrop-blur-xl mb-4">
            <Sparkles size={14} className="text-legacy-red" />
            Bespoke Capital Structuring
          </div>
          <h2 className="display text-2xl sm:text-3xl md:text-4xl text-white [html.light_&]:text-[#181818] font-bold leading-tight">
            Your deal isn’t standard. <br className="hidden md:inline" />
            <span className="text-silver [html.light_&]:text-[#666460]">Why should your finance be?</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-300 [html.light_&]:text-[#4A4844] max-w-2xl mx-auto leading-relaxed">
            Conventional high-street lenders rely on rigid tick-box criteria. We engineer custom debt and liquidity packages around complex assets, offshore ownerships, and fast-moving market opportunities.
          </p>
        </div>

        {/* Orbiting / Interactive 3D Stage */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: 3D Property Core with Concentric Gyroscope Rings */}
          <div
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
            className="relative flex items-center justify-center p-6 md:p-12 min-h-[460px] rounded-3xl border border-white/15 [html.light_&]:border-[#D8D3C8] bg-gradient-to-br from-[#121218]/90 via-[#0a0a0e]/90 to-[#070709]/90 [html.light_&]:from-white/90 [html.light_&]:via-[#F4F7F0]/90 [html.light_&]:to-[#F2EFE9]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_80px_rgba(0,0,0,0.8)] [html.light_&]:shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
          >
            {/* Outer Concentric Orbit Track */}
            <div className="absolute h-80 w-80 md:h-96 md:w-96 rounded-full border border-white/10 [html.light_&]:border-black/10 border-dashed animate-[spin_40s_linear_infinite]" />
            <div className="absolute h-64 w-64 md:h-72 md:w-72 rounded-full border border-legacy-red/30 animate-[spin-reverse_25s_linear_infinite]" />

            {/* Central Property Core Container */}
            <div className="relative z-10 h-44 w-44 md:h-52 md:w-52 rounded-full border-2 border-legacy-red/60 p-2 bg-black/70 [html.light_&]:bg-white shadow-[0_0_50px_rgba(225,18,45,0.35)]">
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                  alt="Prime London Security Asset"
                  fill
                  sizes="220px"
                  quality={80}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Security Asset
                  </span>
                  <p className="display text-base md:text-lg font-bold text-white mt-1">
                    Mayfair W1
                  </p>
                  <span className="text-[10px] text-white/70 font-mono">
                    Valuation: £8.5M
                  </span>
                </div>
              </div>
            </div>

            {/* Orbiting Satellite Solution Chips around the Core */}
            {bespokeSolutions.map((sol, index) => {
              const total = bespokeSolutions.length;
              const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
              const radius = 160; // Distance from center (px)
              const isCurrent = index === selectedIndex;
              const SolIcon = sol.icon;

              return (
                <button
                  key={sol.id}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsAutoRotating(false);
                  }}
                  style={{
                    transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`
                  }}
                  className={`absolute z-20 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 shadow-xl backdrop-blur-xl ${
                    isCurrent
                      ? "scale-110 border-2 border-legacy-red bg-legacy-red text-white shadow-[0_0_25px_rgba(225,18,45,0.6)]"
                      : "border border-white/20 [html.light_&]:border-[#D8D3C8] bg-black/80 [html.light_&]:bg-white [html.light_&]:text-[#222222] text-white/80 hover:border-legacy-red/60 hover:text-white [html.light_&]:hover:text-black hover:scale-105"
                  }`}
                >
                  <SolIcon size={14} className={isCurrent ? "text-white" : "text-legacy-red"} />
                  <span className="hidden sm:inline">{sol.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Solution Detail Panel (Updates with selected solution) */}
          <div
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <TiltCard className="p-8 md:p-10 flex flex-col justify-between h-full border-white/15 [html.light_&]:border-[#C6D3C0] [html.light_&]:bg-white [html.light_&]:shadow-lg">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 [html.light_&]:border-[#C6D3C0] pb-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-xl border border-legacy-red/50 bg-legacy-red/10 text-legacy-red shadow-[0_0_15px_rgba(225,18,45,0.25)]">
                          <Icon size={22} />
                        </div>
                        <div>
                          <span className="eyebrow">{activeSolution.badge}</span>
                          <h3 className="display text-2xl text-white [html.light_&]:text-[#181818] font-bold">
                            {activeSolution.title}
                          </h3>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white/40 [html.light_&]:text-[#888580]">
                        0{selectedIndex + 1}/06
                      </span>
                    </div>

                    {/* Key Metrics Strip */}
                    <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-white/10 [html.light_&]:border-[#C6D3C0] bg-white/[0.03] [html.light_&]:bg-[#F4F7F0] p-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#666460]">Facility Sizing</p>
                        <p className="font-mono text-lg font-bold text-white [html.light_&]:text-[#181818] mt-0.5">{activeSolution.facilitySize}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#666460]">MAX LTV</p>
                        <p className="font-mono text-lg font-bold text-legacy-red mt-0.5">{activeSolution.ltv}</p>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-6 space-y-3.5 text-xs">
                      <div>
                        <span className="font-semibold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#666460] block">Execution Speed</span>
                        <p className="text-white/90 [html.light_&]:text-[#181818] text-sm mt-0.5 font-medium flex items-center gap-1.5">
                          <Clock size={14} className="text-legacy-red" /> {activeSolution.speed}
                        </p>
                      </div>

                      <div>
                        <span className="font-semibold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#666460] block">Engineered For</span>
                        <p className="text-slate-300 [html.light_&]:text-[#4A4844] text-sm mt-0.5 leading-relaxed">{activeSolution.idealFor}</p>
                      </div>

                      <div>
                        <span className="font-semibold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#666460] block">Facility Security Structure</span>
                        <p className="text-slate-300 [html.light_&]:text-[#4A4844] text-sm mt-0.5 leading-relaxed">{activeSolution.structure}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Navigation */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 [html.light_&]:border-[#C6D3C0] pt-6">
                    <ButtonLink href="/loan-application" className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider">
                      Structure This Facility <ArrowRight size={15} />
                    </ButtonLink>

                    {/* Solution Selector Dots */}
                    <div className="flex items-center gap-2">
                      {bespokeSolutions.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setSelectedIndex(i);
                            setIsAutoRotating(false);
                          }}
                          className={`h-2 rounded-full transition-all ${
                            i === selectedIndex
                              ? "w-7 bg-legacy-red shadow-[0_0_8px_#e1122d]"
                              : "w-2 bg-white/25 [html.light_&]:bg-black/20 hover:bg-white/50 [html.light_&]:hover:bg-black/40"
                          }`}
                          aria-label={`Select solution ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
