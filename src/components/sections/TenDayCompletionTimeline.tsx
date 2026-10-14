"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FileSearch,
  Handshake,
  Landmark,
  Layers,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import { TiltCard } from "@/components/animations/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { clientJourney } from "@/data/company";

export function TenDayCompletionTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStage = clientJourney[activeStep];
  const Icon = currentStage.icon;

  return (
    <section className="relative py-24 select-none overflow-hidden border-y border-white/10 [html.light_&]:border-[#E4DFD4] bg-[#07070a] [html.light_&]:bg-[#F7F5F2]">
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-radial-red opacity-30 [html.light_&]:opacity-15 blur-3xl"
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <p className="eyebrow mb-2">How it works</p>
          <h2 className="display text-2xl sm:text-3xl md:text-4xl text-white [html.light_&]:text-[#181818] font-bold leading-tight">
            From first enquiry to ongoing partnership.
          </h2>
          <p className="mt-4 text-base text-slate-300 [html.light_&]:text-[#4A4844] max-w-2xl mx-auto">
            Five clear steps, from first conversation to long-term support.
          </p>
        </div>

        {/* Interactive Track Bar */}
        <div className="mb-12">
          {/* Timeline Node Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {clientJourney.map((stage, idx) => {
              const isSelected = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <button
                  key={stage.title}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 last:col-span-2 sm:last:col-span-1 ${
                    isSelected
                      ? "border-legacy-red bg-legacy-red/15 [html.light_&]:bg-legacy-red/10 shadow-[0_0_25px_rgba(225,18,45,0.3)]"
                      : isPassed
                      ? "border-white/20 [html.light_&]:border-[#D8D3C8] bg-white/[0.04] [html.light_&]:bg-white hover:border-white/40"
                      : "border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.02] [html.light_&]:bg-[#FAF8F5] hover:border-white/20"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-mono text-xs font-bold text-legacy-red">
                      0{stage.step}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-all ${
                        isSelected
                          ? "bg-legacy-red shadow-[0_0_8px_#e1122d]"
                          : isPassed
                          ? "bg-white/40 [html.light_&]:bg-black/30"
                          : "bg-white/15 [html.light_&]:bg-black/10"
                      }`}
                    />
                  </div>

                  <p className="mt-2.5 font-bold text-xs text-white [html.light_&]:text-[#181818] leading-tight">
                    {stage.title}
                  </p>

                  <span className="mt-1 font-mono text-[10px] text-slate-400 [html.light_&]:text-[#666460] block truncate w-full">
                    {stage.timeframe}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Showcase Stage */}
        <div className="grid gap-8 items-stretch">
          {/* Main Selected Step Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              <TiltCard className="flex h-full flex-col justify-between p-8 md:p-10 border-legacy-red/40 bg-gradient-to-br from-[#18080a]/90 via-[#10080a]/90 to-[#080808]/90 [html.light_&]:from-white [html.light_&]:via-white [html.light_&]:to-[#FAF8F5] [html.light_&]:border-[#E4DFD4] [html.light_&]:shadow-lg">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 [html.light_&]:border-[#E4DFD4] pb-6">
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-legacy-red bg-legacy-red/20 text-legacy-red shadow-[0_0_20px_rgba(225,18,45,0.4)]">
                        <Icon size={28} />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-legacy-red font-bold uppercase tracking-wider">
                          Stage 0{currentStage.step} of 0{clientJourney.length}
                        </span>
                        <h3 className="display text-3xl md:text-4xl text-white [html.light_&]:text-[#181818] font-bold mt-0.5">
                          {currentStage.title}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full border border-white/20 [html.light_&]:border-[#D8D3C8] bg-white/10 [html.light_&]:bg-[#FAF8F5] px-4 py-2 font-mono text-xs font-bold text-white [html.light_&]:text-[#181818] backdrop-blur-md">
                      {currentStage.timeframe}
                    </span>
                  </div>

                  <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-200 [html.light_&]:text-[#33312E]">
                    {currentStage.summary}
                  </p>

                  {/* Key Actions & Deliverables */}
                  <div className="mt-8">
                    <p className="eyebrow mb-3">Core Stage Actions</p>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {currentStage.actions.map((act) => (
                        <div
                          key={act}
                          className="flex items-start gap-2.5 rounded-xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/40 [html.light_&]:bg-[#FAF8F5] p-3 text-xs text-slate-300 [html.light_&]:text-[#4A4844]"
                        >
                          <CheckCircle2 size={14} className="text-legacy-red shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step Controls */}
                <div className="mt-10 flex items-center justify-between border-t border-white/10 [html.light_&]:border-[#E4DFD4] pt-6">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#666460] hover:text-white [html.light_&]:hover:text-black disabled:opacity-30 transition-colors"
                  >
                    ← Previous Stage
                  </button>

                  <div className="flex items-center gap-1.5">
                    {clientJourney.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          activeStep === i ? "w-6 bg-legacy-red" : "w-1.5 bg-white/20 [html.light_&]:bg-black/20"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={activeStep === clientJourney.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(clientJourney.length - 1, prev + 1))}
                    className="text-xs font-bold uppercase tracking-wider text-legacy-red hover:text-white [html.light_&]:hover:text-black disabled:opacity-30 transition-colors"
                  >
                    Next Stage →
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/loan-application" className="px-8 text-xs uppercase font-bold">
            Start Your Journey <ArrowRight size={14} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
