import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyListingsHub } from "@/components/property/PropertyListingsHub";

/** Property page: headline and search on the page itself, the listings, then a closing brief band. */
export function PropertyPageShell() {
  return (
    <main className="select-none bg-theme-page text-[#181818]">
      <section className="container pb-16 pt-32 md:pb-20 md:pt-36">
        <h1 className="display max-w-3xl text-[2.7rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-6xl md:text-[4.1rem]">
          Exceptional properties. Considered opportunities.
        </h1>
        <span aria-hidden className="mt-8 block h-[2px] w-12 bg-[#C43A31]" />
        <p className="mt-7 max-w-3xl text-lg text-[#2A2927] md:text-xl">Explore residential and commercial opportunities across our selected markets.</p>

        <div className="mt-10">
          <PropertyListingsHub />
        </div>
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
