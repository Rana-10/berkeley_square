import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { PropertyListingsHub } from "@/components/property/PropertyListingsHub";

export const metadata: Metadata = {
  title: "Property Listings & Portfolio",
  description: "Browse curated prime residential, commercial, and mixed-use properties available through Berkeley Square Capital."
};

export default function PropertyListingsPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Property portfolio"
        title="Available properties."
        intro="Browse live property records, compare core specifications, and apply directly from each listing."
        actions={[{ href: "/property", label: "Property overview" }]}
      />
      <div className="container py-12 md:py-16">
        <PropertyListingsHub />
      </div>
    </main>
  );
}
