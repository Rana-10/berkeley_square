"use client";

import { Award, Clock, Landmark, ShieldCheck, TrendingUp } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

const fundingStats = [
  {
    icon: Landmark,
    label: "Total Funding Deployed",
    value: 350,
    prefix: "£",
    suffix: "M+",
    description: "Property-backed senior & mezzanine debt delivered across prime UK assets."
  },
  {
    icon: TrendingUp,
    label: "Transactions Completed",
    value: 320,
    prefix: "",
    suffix: "+",
    description: "Successful acquisition, bridging, development, and portfolio refinancing cases."
  },
  {
    icon: Clock,
    label: "Indicative Decision",
    value: 48,
    prefix: "",
    suffix: " hrs",
    description: "Rapid appraisal turnarounds for time-critical auction & off-market purchases."
  },
  {
    icon: ShieldCheck,
    label: "Pipeline Evaluated",
    value: 1.2,
    prefix: "£",
    suffix: "B+",
    description: "Comprehensive deal appraisal and security valuation analysis since inception."
  }
];

export function StatsCounterSection({
  title = "Institutional Strength, Private Office Agility.",
  eyebrow = "Proven Track Record"
}: {
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white [html.light_&]:text-[#121316]">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-legacy-muted [html.light_&]:text-[#555d6b]">
            Delivering specialist liquidity and strategic advisory across the United Kingdom with absolute discretion and speed.
          </p>
        </div>

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fundingStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <RevealItem key={stat.label}>
                <TiltCard className="flex h-full flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red transition-colors group-hover:bg-legacy-red group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <span className="h-2 w-2 rounded-full bg-legacy-red shadow-[0_0_8px_#e1122d]" />
                    </div>

                    <div className="mt-6">
                      <p className="display text-3xl sm:text-4xl lg:text-5xl text-white [html.light_&]:text-[#121316] font-bold">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </p>
                      <h3 className="mt-2 text-base sm:text-lg font-bold text-white/90 [html.light_&]:text-[#121316]">
                        {stat.label}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 border-t border-white/[0.08] [html.light_&]:border-[#E4DFD4] pt-4 text-sm leading-6 text-legacy-muted [html.light_&]:text-[#555d6b]">
                    {stat.description}
                  </p>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
