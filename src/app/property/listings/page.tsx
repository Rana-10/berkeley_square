import type { Metadata } from "next";
import { PropertyPageShell } from "@/components/property/PropertyPageShell";

export const metadata: Metadata = {
  title: "Property Listings & Portfolio",
  description: "Browse curated prime residential, commercial, and mixed-use properties available through Berkeley Square Capital."
};

export default function PropertyListingsPage() {
  return <PropertyPageShell />;
}
