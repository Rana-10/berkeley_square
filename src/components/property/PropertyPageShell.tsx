import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/editorial/PageHero";
import { PropertyListingsHub } from "@/components/property/PropertyListingsHub";
import { heroImages } from "@/data/images";

/** Property page: photographic hero, the search and listings, then a closing brief band. */
export function PropertyPageShell() {
  return (
    <main className="select-none bg-theme-page text-[#181818]">
      <PageHero
        eyebrow="Property transactions"
        title="Exceptional properties. Considered opportunities."
        image={heroImages.eatonPlace}
        position="50% 55%"
        lede="Explore residential and commercial opportunities across our selected markets."
        actions={[
          { href: "#listings", label: "View listings" },
          { href: "/contact", label: "Share your property brief" }
        ]}
      />

      <section id="listings" className="container scroll-mt-28 pb-16 pt-12 md:pb-20 md:pt-16">
        <PropertyListingsHub />
      </section>

      <section className="bg-[#154434] text-white">
        <div className="container grid items-center gap-6 py-10 md:grid-cols-[auto_1fr_auto] md:gap-12">
          <h2 className="display text-3xl font-normal leading-tight md:text-[2.2rem]">Looking for something specific?</h2>
          <p className="max-w-md text-[15px] leading-relaxed text-white/85 md:border-l md:border-white/25 md:pl-12">
            Tell us what you&rsquo;re looking for and we&rsquo;ll be in touch with relevant opportunities, on and off market.
          </p>
          <Link
            href="/contact"
            className="focus-ring inline-flex h-11 items-center justify-center gap-3 border border-white/70 px-6 text-sm font-medium transition-colors hover:bg-white hover:text-[#154434]"
          >
            Share your property brief <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
