import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Sparkles } from "lucide-react";
import { PropertyListingsHub } from "@/components/property/PropertyListingsHub";

export const metadata: Metadata = {
  title: "Property Listings & Portfolio",
  description: "Browse curated prime residential, commercial, and mixed-use properties available through Berkeley Square Capital."
};

export default function PropertyListingsPage() {
  return (
    <main className="pt-32 pb-24 select-none">
      <div className="container">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/property"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Property Overview
          </Link>
        </div>

        {/* Listings Hub */}
        <PropertyListingsHub />
      </div>
    </main>
  );
}
