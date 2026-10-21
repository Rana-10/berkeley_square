import type { Metadata } from "next";
import { TintTile } from "@/components/editorial/Tiles";
import { OverlapPanel } from "@/components/editorial/OverlapPanel";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { PageHero } from "@/components/editorial/PageHero";
import { Photo } from "@/components/editorial/Photo";
import { Heading, Section } from "@/components/editorial/Section";
import { StatsLedger } from "@/components/editorial/StatsLedger";
import { heroImages, images } from "@/data/images";

export const metadata: Metadata = {
  title: "Asset & Portfolio Management",
  description: "End-to-end property stewardship, tenancy administration, regulatory compliance, and strategic portfolio yield enhancement by Berkeley Square Capital."
};

const assetMetrics = [
  { value: "99.4%", label: "Rent collection rate", note: "Automated institutional accounting" },
  { value: "< 14 days", label: "Tenant turnaround", note: "Minimised vacancy & void periods" },
  { value: "100%", label: "Statutory compliance", note: "Gas, fire, EPC & safety sign-off" },
  { value: "24 / 7", label: "Client advisory desk", note: "Dedicated London property managers" }
];

const coreServices = [
  {
    title: "Rental & Tenancy Management",
    description:
      "Comprehensive day-to-day stewardship designed to safeguard rental cash flow, protect prime asset condition, and ensure flawless statutory compliance.",
    capabilities: [
      "Vigorous corporate & private tenant vetting",
      "Automated rent collection & monthly client accounting",
      "24/7 reactive maintenance & approved contractor governance",
      "Full UK & international regulatory compliance certification"
    ],
    image: images.brickMullions
  },
  {
    title: "Portfolio Strategy & Yield Enhancement",
    description:
      "Strategic advisory, yield benchmarking, asset repositioning, and capital enhancement for single and multi-market prime real estate holdings.",
    capabilities: [
      "Cross-border multi-asset performance reviews",
      "Yield optimization & void period reduction",
      "Value-add refurbishment & repositioning strategies",
      "Long-term capital creation & structured exit planning"
    ],
    image: images.etonGatehouse
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

const linkClass =
  "focus-ring border-b border-theme-primary pb-1 text-sm font-semibold uppercase tracking-widest text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red";

export default function ConstructionPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Asset & Portfolio Management"
        title="Active stewardship. Sustained capital growth."
        intro="End-to-end tenancy operations, regulatory governance, and strategic portfolio rebalancing for private clients and institutional property owners across prime UK and international markets."
        image={heroImages.carltonHouseTerrace}
        position="60% 40%"
        lede="Tenancy, compliance and portfolio strategy, handled from our Mayfair desk."
        actions={[{ href: "/contact", label: "Consult the advisory desk" }]}
      />

      <OverlapPanel overlap={false} title="Complete operational accountability." action={{ href: "/contact", label: "Consult the advisory desk" }}>
        <p>From day-to-day tenant care to long-term cross-border portfolio expansion, our Mayfair desk looks after the asset so you do not have to.</p>
        <p>Tenants vetted, rent collected, repairs handled, compliance certified and the numbers reported back to you every month.</p>
      </OverlapPanel>

      <section className="bg-theme-page py-12 md:py-16">
        <div className="container">
          <StatsLedger items={assetMetrics} />
        </div>
      </section>

      <Section index="01" label="Core disciplines">
        <Heading intro="From day-to-day tenant care to long-term cross-border portfolio expansion, our Mayfair desk provides complete operational accountability.">
          Integrated property solutions.
        </Heading>

        <div className="mt-12 border-t border-[#181818]/70">
          {coreServices.map((service) => (
            <Reveal key={service.title}>
              <article className="grid gap-8 border-b border-theme-border py-12 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-12">
                <Photo image={service.image} ratio="aspect-[4/5]" sizes="(max-width: 768px) 100vw, 256px" zoom={false} />
                <div>
                  <h3 className="display text-3xl font-semibold leading-tight text-theme-primary">{service.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-theme-secondary">{service.description}</p>
                  <ul className="mt-6 divide-y divide-theme-border border-y border-theme-border text-sm text-theme-secondary">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="py-2.5 leading-snug">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section index="02" label="Execution methodology" tone="stone">
        <Heading intro="A visible route from asset onboarding through to yield maximisation and long-term value preservation.">
          Three-stage governance framework.
        </Heading>
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {managementPhases.map((phase, idx) => (
            <RevealItem key={phase.title}>
              <TintTile number={phase.phase} title={phase.title} tone={idx === 1 ? "green" : "sage"} className="h-full">
                {phase.text}
              </TintTile>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section index="03" label="Portfolio appraisal">
        <Heading intro="Connect with our Mayfair asset management team for a complimentary portfolio health check, compliance review, and yield analysis.">
          Seeking active management for your property portfolio?
        </Heading>
        <Reveal className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          <Link href="/contact" className={linkClass}>
            Contact asset desk →
          </Link>
        </Reveal>
      </Section>
    </main>
  );
}
