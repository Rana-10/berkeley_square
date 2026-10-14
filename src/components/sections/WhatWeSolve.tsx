"use client";

import { Building2, Clock3, Hammer } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ShimmerCard } from "@/components/ui/ShimmerCard";

const scenarios = [
  {
    icon: Clock3,
    title: "A time-sensitive opportunity",
    text: "When timing is as critical as the deal itself, rapid bridging finance and property structuring maintain strategic momentum without costly delays.",
    label: "BSQ Finance"
  },
  {
    icon: Building2,
    title: "A property decision with consequences",
    text: "Whether acquiring, disposing of prime assets, or repositioning an extensive UK portfolio, align the next move with rigorous market intelligence.",
    label: "BSQ Property"
  },
  {
    icon: Hammer,
    title: "A complex project to deliver",
    text: "Bring uncompromising precision to luxury refurbishment or development programmes with an accountable route from initial brief to turnkey handover.",
    label: "BSQ Construction"
  }
];

export function WhatWeSolve() {
  return (
    <RevealGroup className="grid gap-6 lg:grid-cols-3">
      {scenarios.map((scenario) => {
        const Icon = scenario.icon;
        return (
          <RevealItem key={scenario.title}>
            <ShimmerCard className="h-full p-8">
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-legacy-red/35 bg-legacy-red/10 text-legacy-red transition-colors duration-300 group-hover:border-legacy-red group-hover:bg-legacy-red group-hover:text-white group-hover:shadow-[0_0_20px_rgba(225,18,45,0.4)]">
                  <Icon size={24} />
                </div>
                <span className="eyebrow">{scenario.label}</span>
              </div>
              <h3 className="display mt-6 text-3xl leading-snug text-white [html.light_&]:text-[#121316]">
                {scenario.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-legacy-muted [html.light_&]:text-[#555d6b]">
                {scenario.text}
              </p>
            </ShimmerCard>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
