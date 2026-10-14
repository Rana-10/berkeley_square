"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import type { ServiceGroup } from "@/data/services";

export function ServiceGroupSection({ group }: { group: ServiceGroup }) {
  return (
    <Reveal className="surface p-6 md:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-legacy-border pb-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-legacy-red shadow-[0_0_8px_#e1122d]" />
            <span className="eyebrow">{group.division} Solutions</span>
          </div>
          <h2 className="display mt-2 text-3xl md:text-4xl text-white [html.light_&]:text-[#121316] font-bold">{group.division}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-legacy-muted [html.light_&]:text-[#555d6b]">{group.intro}</p>
        </div>
        <Link
          href={group.href}
          className="focus-ring group inline-flex items-center gap-2 text-sm font-semibold text-legacy-red transition-all duration-300 hover:text-white [html.light_&]:hover:text-black"
        >
          View division overview <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {group.services.map((service, idx) => (
          <TiltCard key={service.title} className="flex h-full flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 [html.light_&]:text-[#8E8B85]">
                  0{idx + 1}
                </span>
                <Sparkles size={14} className="text-legacy-red/80" />
              </div>

              <h3 className="display mt-4 text-2xl text-white [html.light_&]:text-[#121316] font-bold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-legacy-muted [html.light_&]:text-[#555d6b]">{service.description}</p>
            </div>

            <div className="mt-6 border-t border-white/[0.08] [html.light_&]:border-black/[0.08] pt-4">
              <div className="flex flex-wrap gap-2">
                {service.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/10 [html.light_&]:border-[#D8D3C8] bg-white/[0.04] [html.light_&]:bg-[#FAF8F5] px-3 py-1 text-xs font-medium text-white/80 [html.light_&]:text-[#222222] transition-colors group-hover:border-legacy-red/30 group-hover:bg-legacy-red/10"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </Reveal>
  );
}
