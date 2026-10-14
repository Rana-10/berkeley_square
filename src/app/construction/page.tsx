import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  KeyRound,
  Percent,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wrench
} from "lucide-react";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { TiltCard } from "@/components/animations/TiltCard";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Asset & Portfolio Management",
  description: "End-to-end property stewardship, tenancy administration, regulatory compliance, and strategic portfolio yield enhancement by Berkeley Square Capital."
};

const assetMetrics = [
  {
    icon: Percent,
    label: "Rent Collection Rate",
    value: "99.4%",
    caption: "Automated institutional accounting"
  },
  {
    icon: Clock,
    label: "Tenant Turnaround",
    value: "< 14 Days",
    caption: "Minimised vacancy & void periods"
  },
  {
    icon: ShieldCheck,
    label: "Statutory Compliance",
    value: "100%",
    caption: "Gas, fire, EPC & safety sign-off"
  },
  {
    icon: Building2,
    label: "Client Advisory Desk",
    value: "24 / 7",
    caption: "Dedicated London property managers"
  }
];

const coreServices = [
  {
    number: "01",
    icon: KeyRound,
    title: "Rental & Tenancy Management",
    description:
      "Comprehensive day-to-day stewardship designed to safeguard rental cash flow, protect prime asset condition, and ensure flawless statutory compliance.",
    capabilities: [
      "Vigorous corporate & private tenant vetting",
      "Automated rent collection & monthly client accounting",
      "24/7 reactive maintenance & approved contractor governance",
      "Full UK & international regulatory compliance certification"
    ]
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Portfolio Strategy & Yield Enhancement",
    description:
      "Strategic advisory, yield benchmarking, asset repositioning, and capital enhancement for single and multi-market prime real estate holdings.",
    capabilities: [
      "Cross-border multi-asset performance reviews",
      "Yield optimization & void period reduction",
      "Value-add refurbishment & repositioning strategies",
      "Long-term capital creation & structured exit planning"
    ]
  }
];

const managementPhases = [
  {
    phase: "Phase 01",
    title: "Diagnostic & Asset Audit",
    text: "Comprehensive physical condition assessment, tenancy health check, lease review, and baseline yield benchmarking."
  },
  {
    phase: "Phase 02",
    title: "Active Stewardship",
    text: "Dedicated London property manager assigned to handle tenant onboarding, proactive maintenance, and transparent financial reporting."
  },
  {
    phase: "Phase 03",
    title: "Capital Growth & Optimization",
    text: "Targeted capital expenditure, periodic refurbishment, rent reviews, and long-term asset value enhancement."
  }
];

export default function ConstructionPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen [html.light_&]:bg-[#F7F5F2] text-slate-200 [html.light_&]:text-[#222222]">
      <div className="container px-4 sm:px-6">
        {/* Header Section */}
        <div className="border-b border-white/10 [html.light_&]:border-[#E4DFD4] pb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/40 [html.light_&]:bg-white [html.light_&]:shadow-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 [html.light_&]:text-[#222222] backdrop-blur-md">
            <Building2 size={14} className="text-legacy-red" /> Asset &amp; Portfolio Management
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <h1 className="display text-3xl sm:text-4xl md:text-5xl text-white [html.light_&]:text-[#121316] font-bold leading-tight tracking-tight">
                Active stewardship. Sustained capital growth.
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 [html.light_&]:text-[#555d6b] leading-relaxed">
                End-to-end tenancy operations, regulatory governance, and strategic portfolio rebalancing for private clients and institutional property owners across prime UK and international markets.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/contact" className="px-6 py-3 text-xs uppercase tracking-wider font-bold">
                Consult Advisory Desk <ArrowRight size={14} />
              </ButtonLink>
              <ButtonLink href="/appointment" variant="secondary" className="px-6 py-3 text-xs uppercase tracking-wider font-bold [html.light_&]:border-[#D8D3C8] [html.light_&]:bg-[#ECE7DE] [html.light_&]:text-[#181818] [html.light_&]:shadow-sm [html.light_&]:hover:bg-[#E4DFD4] [html.light_&]:hover:text-[#181818]">
                Book Strategy Call
              </ButtonLink>
            </div>
          </div>

          {/* Performance Metrics Strip */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {assetMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.03] [html.light_&]:bg-white [html.light_&]:shadow-sm p-5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-slate-400 [html.light_&]:text-[#706D68]">
                      {metric.label}
                    </span>
                    <Icon size={16} className="text-legacy-red" />
                  </div>
                  <p className="mt-3 text-2xl sm:text-3xl font-bold font-mono text-white [html.light_&]:text-[#121316]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 [html.light_&]:text-[#8E8B85]">
                    {metric.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Disciplines (Rental vs Portfolio) */}
        <div className="mt-16">
          <div className="mb-8">
            <span className="eyebrow">Core Disciplines</span>
            <h2 className="display mt-2 text-2xl sm:text-3xl text-white [html.light_&]:text-[#121316] font-bold">
              Integrated Property Solutions
            </h2>
            <p className="mt-2 text-sm text-slate-300 [html.light_&]:text-[#555d6b] max-w-2xl">
              From day-to-day tenant care to long-term cross-border portfolio expansion, our Mayfair desk provides complete operational accountability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.03] [html.light_&]:bg-white [html.light_&]:shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-white/20 [html.light_&]:hover:border-[#CFC9BC]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red shadow-[0_0_12px_rgba(225,18,45,0.25)]">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 [html.light_&]:text-[#8E8B85]">
                        SERVICE {service.number}
                      </span>
                    </div>

                    <h3 className="display mt-5 text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#121316]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.08] [html.light_&]:border-black/[0.08] pt-5">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#706D68] mb-3">
                      Key Capabilities:
                    </p>
                    <ul className="space-y-2">
                      {service.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-2.5 text-xs text-slate-300 [html.light_&]:text-[#3D3A36]"
                        >
                          <CheckCircle2 size={14} className="text-legacy-red shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Refurbishment & Visual Transformation Showcase */}
        <div className="mt-16">
          <BeforeAfterSlider />
        </div>

        {/* 3-Stage Lifecycle Stewardship Framework */}
        <div className="mt-16">
          <div className="mb-8">
            <span className="eyebrow">Execution Methodology</span>
            <h2 className="display mt-2 text-2xl sm:text-3xl text-white [html.light_&]:text-[#121316] font-bold">
              3-Stage Governance Framework
            </h2>
            <p className="mt-2 text-sm text-slate-300 [html.light_&]:text-[#555d6b] max-w-2xl">
              A visible route from asset onboarding through to yield maximisation and long-term value preservation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {managementPhases.map((phase, idx) => (
              <TiltCard key={phase.title} className="p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400 [html.light_&]:text-[#8E8B85]">
                      {phase.phase}
                    </span>
                    <Sparkles size={14} className="text-legacy-red" />
                  </div>
                  <h3 className="display mt-4 text-xl font-bold text-white [html.light_&]:text-[#121316]">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
                    {phase.text}
                  </p>
                </div>
                <div className="mt-6 border-t border-white/[0.08] [html.light_&]:border-black/[0.08] pt-3 text-[11px] font-mono uppercase tracking-widest text-slate-400 [html.light_&]:text-[#8E8B85]">
                  Step 0{idx + 1}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Consultation Callout Banner */}
        <div className="mt-16 rounded-3xl border border-white/15 [html.light_&]:border-[#E4DFD4] bg-black/60 [html.light_&]:bg-white [html.light_&]:shadow-lg p-8 sm:p-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <span className="eyebrow">Portfolio Appraisal</span>
              <h2 className="display mt-2 text-2xl sm:text-3xl text-white [html.light_&]:text-[#121316] font-bold">
                Seeking active management for your property portfolio?
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-300 [html.light_&]:text-[#555d6b] leading-relaxed">
                Connect with our Mayfair asset management team for a complimentary portfolio health check, compliance review, and yield analysis.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <ButtonLink href="/contact" className="px-6 py-3 text-xs uppercase tracking-wider font-bold">
                Contact Asset Desk
              </ButtonLink>
              <ButtonLink href="/appointment" variant="secondary" className="px-6 py-3 text-xs uppercase tracking-wider font-bold [html.light_&]:border-[#D8D3C8] [html.light_&]:bg-[#ECE7DE] [html.light_&]:text-[#181818] [html.light_&]:shadow-sm [html.light_&]:hover:bg-[#E4DFD4] [html.light_&]:hover:text-[#181818]">
                Book Consultation
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
