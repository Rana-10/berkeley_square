import type { Metadata } from "next";
import Image from "next/image";
import { PropertyListingsHub } from "@/components/property/PropertyListingsHub";
import { ShimmerCard } from "@/components/ui/ShimmerCard";

export const metadata: Metadata = {
  title: "Property Sourcing & Prime Listings",
  description: "Explore curated prime London real estate, commercial freeholds, and off-market acquisition opportunities through Berkeley Square Capital."
};

export default function PropertyPage() {
  return (
    <main className="pt-28 min-h-screen [html.light_&]:bg-[#F7F5F2]">
      <section className="container pb-24">
        {/* Prime Listings Hub starting directly from Verified Property Portfolio */}
        <PropertyListingsHub />

        {/* Feature Brief with Shimmering Glass Panels */}
        <div className="mt-20 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ShimmerCard className="p-0">
            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              <div className="p-7 md:p-10">
                <p className="eyebrow">The property brief</p>
                <h2 className="display mt-4 text-2xl sm:text-3xl leading-tight text-white [html.light_&]:text-[#121316] font-bold">
                  The right story for the right buyer.
                </h2>
                <p className="mt-5 text-sm leading-7 text-legacy-muted">
                  An editorial approach gives each asset an atmosphere before the first conversation begins, ensuring discerning buyers and capital partners appreciate its full intrinsic value.
                </p>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[.18em] text-white/45 [html.light_&]:text-[#706D68]">
                  Residential · Commercial · Strategic Advisory
                </p>
              </div>
              <div className="relative min-h-72">
                <Image
                  src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
                  alt="Illustrative premium property interior"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-legacy-panel via-transparent to-transparent md:bg-gradient-to-r md:from-legacy-panel md:via-transparent md:to-transparent" />
              </div>
            </div>
          </ShimmerCard>

          <div className="grid gap-4">
            {[
              { title: "Presentation that earns attention", text: "Curated marketing and bespoke prospectus materials tailored for qualified high-net-worth audiences." },
              { title: "Targeted, qualified conversations", text: "Discreet direct outreach to active acquisition funds, family offices, and private investors." },
              { title: "A managed route to completion", text: "Proactive deal coordination and legal structuring to safeguard timelines and asset valuation." }
            ].map((item, index) => (
              <ShimmerCard key={item.title} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">0{index + 1}</span>
                  <span className="h-2 w-2 rounded-full bg-legacy-red shadow-[0_0_8px_#e1122d]" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white [html.light_&]:text-[#121316]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-legacy-muted">{item.text}</p>
              </ShimmerCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
