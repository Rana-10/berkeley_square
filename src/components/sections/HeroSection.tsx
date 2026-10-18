import { HeroVideo } from "@/components/editorial/HeroVideo";
import { PageHero } from "@/components/editorial/PageHero";
import { company } from "@/data/company";

/**
 * Deep green headline, then property footage runs edge to edge beneath it. The poster frame paints at once;
 * the clip (Mixkit free licence, no attribution required) loads when the browser is idle.
 */
export function HeroSection() {
  return (
    <PageHero
      eyebrow="Mayfair, London · Established 2015"
      title="Your global partner in real estate & finance."
      intro={company.slogan}
      actions={[
        { href: "/loan-application", label: "Loan enquiry" },
        { href: "/property/listings", label: "View property" }
      ]}
      bleed={
        <HeroVideo
          poster="/video/hero-aerial-poster.webp"
          alt="Aerial view over a neighbourhood of houses and tree-lined streets"
          desktopSrc="/video/hero-aerial.mp4"
          mobileSrc="/video/hero-aerial-mobile.mp4"
        />
      }
    />
  );
}
