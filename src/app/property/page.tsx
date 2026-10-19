import type { Metadata } from "next";
import { PropertyPageShell } from "@/components/property/PropertyPageShell";

export const metadata: Metadata = {
  title: "Property Sourcing & Prime Listings",
  description: "Explore curated prime London real estate, commercial freeholds, and off-market acquisition opportunities through Berkeley Square Capital."
};

export default function PropertyPage() {
  return <PropertyPageShell />;
}
