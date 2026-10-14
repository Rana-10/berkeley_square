"use client";

import { TiltCard } from "@/components/animations/TiltCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { keyDifferentiators } from "@/data/company";

// The other differentiators (flexible financing, bespoke engineering, client-centric)
// restate the same "tailored" point, so the home page shows four distinct ones.
const homeDifferentiators = [
  "Fast, Responsive Decision-Making",
  "International Reach",
  "End-to-End Service Model",
  "Client-Centric Philosophy"
];

export function WhyChooseUs() {
  const differentiators = keyDifferentiators.filter((diff) => homeDifferentiators.includes(diff.title));

  return (
    <section className="py-20 select-none [html.light_&]:bg-[#ECE7DE]">
      <div className="container">
        <SectionHeading
          eyebrow="The Berkeley Square Difference"
          title="Why clients choose Berkeley Square."
          description="A full-service property partner, from sourcing and funding to day-to-day asset management."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <TiltCard key={diff.title} className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red transition-all duration-300 group-hover:bg-legacy-red group-hover:text-white group-hover:shadow-[0_0_20px_rgba(225,18,45,0.4)]">
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs text-white/40 font-bold [html.light_&]:text-black/40">0{index + 1}</span>
                  </div>

                  <h3 className="display mt-6 text-xl text-white font-bold leading-snug [html.light_&]:text-[#121316]">
                    {diff.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
                    {diff.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
