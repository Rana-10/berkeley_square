import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { OverlapPanel } from "@/components/editorial/OverlapPanel";
import { StatsLedger } from "@/components/editorial/StatsLedger";
import { PhotoTile, TintTile } from "@/components/editorial/Tiles";
import { HeroSection } from "@/components/sections/HeroSection";
import { TenDayCompletionTimeline } from "@/components/sections/TenDayCompletionTimeline";
import { divisions } from "@/data/company";
import type { SiteImage } from "@/data/images";

const ledger = [
  { value: "To £100m+", label: "Facility size", note: "Senior, mezzanine and structured equity" },
  { value: "Up to 80%", label: "Loan to value", note: "Across prime residential and commercial security" },
  { value: "24–48 hrs", label: "Indicative terms", note: "Preliminary terms issued directly" },
  { value: "From 7 days", label: "To completion", note: "Fast-track execution when timing is critical" }
];

const tileImage = (division: (typeof divisions)[number]): SiteImage => ({
  src: division.image,
  alt: `${division.name}: architectural reference photograph`,
  caption: division.shortName,
  orientation: "landscape"
});

export default function HomePage() {
  const [finance, property, assets] = divisions;

  return (
    <main className="select-none">
      <HeroSection />

      <OverlapPanel title="Built around your deal." action={{ href: "/about", label: "About Berkeley Square" }}>
        <p>
          Every transaction has its own pressures: a deadline at auction, a refurbishment that has overrun, a portfolio that needs rebalancing before the year end.
        </p>
        <p>
          We take the time to understand the circumstances behind each one, then structure the funding, the acquisition and the day-to-day management to fit. One team, one conversation, from first call to completion.
        </p>
      </OverlapPanel>

      {/* Three divisions: each pairs a photograph with a tinted tile, arranged so the pairs interlock */}
      <section className="bg-theme-page pb-6 pt-8 md:pt-10">
        <div className="container">
          <RevealGroup className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
            <RevealItem className="md:col-start-1 md:row-start-1">
              <PhotoTile image={tileImage(finance)} href={finance.href} className="h-full" />
            </RevealItem>
            <RevealItem className="md:col-start-2 md:row-start-1">
              <TintTile number="01" title={finance.name} href={finance.href} className="h-full">
                {finance.summary}
              </TintTile>
            </RevealItem>
            <RevealItem className="md:col-start-3 md:row-start-1">
              <PhotoTile image={tileImage(assets)} href={assets.href} className="h-full" />
            </RevealItem>

            <RevealItem className="md:col-start-1 md:row-start-2">
              <TintTile number="02" title={property.name} href={property.href} className="h-full">
                {property.summary}
              </TintTile>
            </RevealItem>
            <RevealItem className="md:col-start-2 md:row-start-2">
              <PhotoTile image={tileImage(property)} href={property.href} className="h-full" />
            </RevealItem>
            <RevealItem className="md:col-start-3 md:row-start-2">
              <TintTile number="03" title={assets.name} href={assets.href} tone="green" className="h-full">
                {assets.summary}
              </TintTile>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <section className="bg-theme-page py-12 md:py-16">
        <div className="container">
          <StatsLedger items={ledger} />
        </div>
      </section>

      <TenDayCompletionTimeline />
    </main>
  );
}
