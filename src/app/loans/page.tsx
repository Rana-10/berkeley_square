import type { Metadata } from "next";
import { ArrowRight, Clock, Landmark, Percent, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { TiltCard } from "@/components/animations/TiltCard";
import { ServiceGroupSection } from "@/components/cards/ServiceCard";
import { FinanceCalculator } from "@/components/loan/FinanceCalculator";
import { FinancialSpecialistsGrid } from "@/components/loan/FinancialSpecialistsGrid";
import { ButtonLink } from "@/components/ui/Button";
import { serviceGroups } from "@/data/services";

export const metadata: Metadata = {
  title: "BSQ Finance",
  description: "Bridging, commercial debt, property development finance, and buy-to-let mortgages."
};

const loanMetrics = [
  {
    icon: Landmark,
    label: "Facility Size Range",
    value: 100,
    prefix: "£",
    suffix: "k – £100M+",
    caption: "Senior, mezzanine & structured equity"
  },
  {
    icon: Percent,
    label: "Maximum LTV",
    value: 80,
    prefix: "Up to ",
    suffix: "%",
    caption: "Across prime residential & commercial assets"
  },
  {
    icon: Clock,
    label: "Indicative Term Sheet",
    value: 24,
    prefix: "",
    suffix: "–48 hrs",
    caption: "Rapid preliminary terms issued directly"
  },
  {
    icon: Zap,
    label: "Speed to Completion",
    value: 7,
    prefix: "From ",
    suffix: " days",
    caption: "Fast-track execution when timing is critical"
  }
];

export default function LoansPage() {
  const group = serviceGroups[0];
  return (
    <main className="pt-32 [html.light_&]:bg-[#F7F5F2]">
      <section className="container pb-24">
        {/* Header Grid */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="eyebrow mb-3">Financial Services · Est. 2015</p>
            <h1 className="display max-w-3xl text-2xl sm:text-3xl md:text-4xl leading-tight text-white font-bold [html.light_&]:text-[#121316]">
              Finance structured exactly to your requirements.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
              Tailor-made bridging finance, structured development lending, and mortgage solutions. Renowned for completing transactions fast and flexibly – the ideal solution for auction purchases, distressed sales, and time-critical funding needs.
            </p>
          </div>

          <aside className="surface p-7 [html.light_&]:bg-white [html.light_&]:border-[#E4DFD4] [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)]">
            <p className="eyebrow">Your First Consultation</p>
            <ul className="mt-5 grid gap-4 text-sm text-white/80 [html.light_&]:text-[#2A2927]">
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-legacy-red">01</span>
                <span>Define target loan size, security asset, and timing requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-legacy-red">02</span>
                <span>Comprehensive security appraisal and capital structuring review</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-legacy-red">03</span>
                <span>Clear indicative terms and a guided pathway to drawdown</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* 3D Tilting Finance Metrics Bar */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loanMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <TiltCard key={metric.label} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red [html.light_&]:bg-legacy-red/[0.08] [html.light_&]:border-legacy-red/30">
                    <Icon size={20} />
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-legacy-red shadow-[0_0_6px_#e1122d]" />
                </div>
                <div className="mt-5">
                  <p className="display text-3xl text-white [html.light_&]:text-[#121316]">
                    <AnimatedCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                    />
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-white/90 [html.light_&]:text-[#181818]">{metric.label}</p>
                  <p className="mt-2 text-xs text-legacy-muted [html.light_&]:text-[#555d6b]">{metric.caption}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Four Specialist Lending Disciplines Grid: Bridging, Commercial, Development, Buy-to-Let */}
        <div className="mt-16">
          <FinancialSpecialistsGrid />
        </div>

        {/* Indicative Calculator */}
        <div className="mt-10">
          <FinanceCalculator />
        </div>

        {/* CTA Footer */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-legacy-border [html.light_&]:border-[#E4DFD4] bg-black/40 [html.light_&]:bg-white [html.light_&]:shadow-lg p-8">
          <div>
            <h3 className="display text-3xl text-white [html.light_&]:text-[#181818]">Ready to structure your facility?</h3>
            <p className="mt-2 text-sm text-legacy-muted [html.light_&]:text-[#4A4844]">
              Submit your project details via our streamlined 3-step loan application process.
            </p>
          </div>
          <ButtonLink href="/loan-application">
            Begin Loan Application <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
