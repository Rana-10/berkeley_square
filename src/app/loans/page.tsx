import type { Metadata } from "next";
import { ParallaxPhoto } from "@/components/editorial/ParallaxPhoto";
import { OverlapPanel } from "@/components/editorial/OverlapPanel";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/editorial/PageHero";
import { Photo } from "@/components/editorial/Photo";
import { Heading, Section } from "@/components/editorial/Section";
import { StatsLedger } from "@/components/editorial/StatsLedger";
import { FinanceCalculator } from "@/components/loan/FinanceCalculator";
import { FinancialSpecialistsGrid } from "@/components/loan/FinancialSpecialistsGrid";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "BSQ Finance",
  description: "Bridging, commercial debt, property development finance, and buy-to-let mortgages."
};

const loanMetrics = [
  { value: "£100k–£100M+", label: "Facility size", note: "Senior, mezzanine & structured equity" },
  { value: "Up to 80%", label: "Maximum LTV", note: "Across prime residential & commercial assets" },
  { value: "24–48 hrs", label: "Indicative term sheet", note: "Rapid preliminary terms issued directly" },
  { value: "From 7 days", label: "Speed to completion", note: "Fast-track execution when timing is critical" }
];

const consultation = [
  "Define target loan size, security asset, and timing requirements",
  "Comprehensive security appraisal and capital structuring review",
  "Clear indicative terms and a guided pathway to drawdown"
];

export default function LoansPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Financial Services · Est. 2015"
        title="Finance structured exactly to your requirements."
        intro="Tailor-made bridging finance, structured development lending, and mortgage solutions. Renowned for completing transactions fast and flexibly – the ideal solution for auction purchases, distressed sales, and time-critical funding needs."
        bleed={<ParallaxPhoto image={images.victorianStoneCorner} ratio="aspect-[4/3] md:aspect-[21/9]" position="object-[50%_35%]" />}
      />

      <OverlapPanel title="Your first consultation." action={{ href: "/loan-application", label: "Begin loan application" }}>
        <ol className="divide-y divide-white/20 border-y border-white/25">
          {consultation.map((step, idx) => (
            <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 text-base leading-relaxed">
              <span className="font-mono text-xs font-bold text-white/60">0{idx + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </OverlapPanel>

      <section className="bg-theme-page py-12 md:py-16">
        <div className="container">
          <StatsLedger items={loanMetrics} />
        </div>
      </section>

      <Section index="01" label="Core lending disciplines" noRule={false}>
        <Heading intro="Berkeley Square Capital delivers targeted lending across four distinct property finance disciplines. Each facility is custom-structured by dedicated sector specialists.">
          Specialist financial solutions.
        </Heading>
      </Section>
      <div className="container pb-16 md:pb-24">
        <FinancialSpecialistsGrid />
      </div>

      <Section index="02" label="Indicative calculator" tone="stone">
        <Heading intro="Explore a simple loan-to-value illustration before speaking with the team. This is not a quote, an offer, or credit advice.">
          Start with the numbers.
        </Heading>
        <div className="mt-12 border-t border-[#181818]/70 pt-10">
          <FinanceCalculator />
        </div>
      </Section>
    </main>
  );
}
