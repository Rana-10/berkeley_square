import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Photo } from "@/components/editorial/Photo";
import { PageHero } from "@/components/editorial/PageHero";
import { Heading, Section } from "@/components/editorial/Section";
import { PropertyListingsHub } from "@/components/property/PropertyListingsHub";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Property Sourcing & Prime Listings",
  description: "Explore curated prime London real estate, commercial freeholds, and off-market acquisition opportunities through Berkeley Square Capital."
};

const brief = [
  { title: "Presentation that earns attention", text: "Curated marketing and bespoke prospectus materials tailored for qualified high-net-worth audiences." },
  { title: "Targeted, qualified conversations", text: "Discreet direct outreach to active acquisition funds, family offices, and private investors." },
  { title: "A managed route to completion", text: "Proactive deal coordination and legal structuring to safeguard timelines and asset valuation." }
];

export default function PropertyPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Property portfolio"
        title="Available properties."
        intro="Browse live property records, compare core specifications, and apply directly from each listing."
        actions={[{ href: "/property/listings", label: "All listings" }]}
      />
      <section className="container py-12 md:py-16">
        <PropertyListingsHub />
      </section>

      <Section index="01" label="The property brief" tone="stone">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-16">
          <div>
            <Heading intro="An editorial approach gives each asset an atmosphere before the first conversation begins, ensuring discerning buyers and capital partners appreciate its full intrinsic value.">
              The right story for the right buyer.
            </Heading>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-theme-muted">Residential · Commercial · Strategic advisory</p>

            <RevealGroup stagger={0.08} className="mt-10 border-t border-[#181818]/70">
              {brief.map((item, idx) => (
                <RevealItem key={item.title}>
                  <div className="grid gap-2 border-b border-theme-border py-6 md:grid-cols-[3rem_1fr_1.2fr] md:gap-8">
                    <span className="font-mono text-xs font-bold text-theme-muted">0{idx + 1}</span>
                    <h3 className="display text-xl font-semibold text-theme-primary">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-theme-secondary">{item.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1}>
            <Photo image={images.portlandStone} ratio="aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 320px" zoom={false} />
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
