"use client";

import { ClipboardCheck, HardHat, KeyRound, Ruler, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

const stages = [
  {
    title: "Scope & Feasibility",
    text: "Define the brief, planning constraints, budget thresholds, and prime project specifications.",
    icon: ClipboardCheck
  },
  {
    title: "Programme & Procurement",
    text: "Comprehensive engineering coordinate, cost control planning, and supply chain procurement.",
    icon: Ruler
  },
  {
    title: "Precision Execution",
    text: "Accountable on-site site delivery managed through disciplined project governance and weekly reporting.",
    icon: HardHat
  },
  {
    title: "Handover & Signoff",
    text: "Turnkey handover, building control compliance signoff, and post-completion client care.",
    icon: KeyRound
  }
];

export function ConstructionTimeline() {
  return (
    <Reveal className="surface p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 border-b border-legacy-border pb-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-legacy-red shadow-[0_0_8px_#C43A31]" />
            <span className="eyebrow">Project Journey</span>
          </div>
          <h2 className="display mt-2 text-2xl md:text-3xl font-bold text-white [html.light_&]:text-[#121316]">A visible route to delivery.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-legacy-muted [html.light_&]:text-[#555d6b]">
            Structured 4-stage governance ensuring absolute budget transparency and programme adherence.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 [html.light_&]:text-[#706D68]">
          <Sparkles size={14} className="text-legacy-red" /> Turnkey Delivery
        </div>
      </div>

      <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Animated Flowing Laser Line connecting stages (Desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-8 right-8 top-12 hidden h-0.5 overflow-hidden bg-white/10 lg:block pointer-events-none"
        >
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-legacy-red to-transparent shadow-[0_0_12px_#C43A31] animate-[laser-stream_3s_linear_infinite]" />
        </div>

        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <TiltCard key={stage.title} className="relative flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red shadow-[0_0_15px_rgba(196,58,49,0.2)] transition-colors group-hover:bg-legacy-red group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-xs font-bold text-white/40 [html.light_&]:text-[#8E8B85]">
                    STAGE 0{index + 1}
                  </span>
                </div>

                <h3 className="display mt-6 text-xl text-white [html.light_&]:text-[#121316] font-bold transition-colors">
                  {stage.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-legacy-muted [html.light_&]:text-[#555d6b]">
                  {stage.text}
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.08] [html.light_&]:border-black/[0.08] pt-3 text-[11px] font-semibold uppercase tracking-widest text-white/40 [html.light_&]:text-[#8E8B85]">
                Milestone 0{index + 1}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </Reveal>
  );
}
