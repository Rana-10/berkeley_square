import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { PropertyApplicationForm } from "@/components/property/PropertyApplicationForm";

export const metadata: Metadata = {
  title: "Online Property Application | Prime Acquisitions & Tenancy",
  description: "Submit a direct acquisition, lease, or tenancy application for prime UK and international real estate with Berkeley Square Capital."
};

export default async function PropertyApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string }>;
}) {
  const propertyId = Number((await searchParams).property) || 0;

  return (
    <main className="pt-28 pb-24 select-none">
      <div className="container max-w-4xl">
        {/* Navigation Breadcrumb */}
        <Link
          href="/property"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Property Portfolio
        </Link>

        {/* Page Header */}
        <div className="mb-10 border-b border-white/10 [html.light_&]:border-[#E4DFD4] pb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/40 [html.light_&]:bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 [html.light_&]:text-[#222222] backdrop-blur-md">
            <Sparkles size={14} className="text-legacy-red" /> Direct Deal Desk Application
          </div>
          <p className="eyebrow mb-2">Prime Real Estate Acquisition &amp; Tenancy</p>
          <h1 className="display text-2xl sm:text-3xl md:text-4xl text-white [html.light_&]:text-[#181818] font-bold leading-tight">
            Direct Property Application.
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 [html.light_&]:text-[#4A4844]">
            Submit your proposed acquisition offer or tenancy terms with verified identity and proof of funds to secure immediate vendor engagement.
          </p>
        </div>

        {/* Application Form with Suspense Wrapper */}
        <Suspense
          fallback={
            <div className="rounded-3xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/40 [html.light_&]:bg-white p-12 text-center text-slate-400 [html.light_&]:text-[#666460] font-mono text-xs">
              Loading Application Desk...
            </div>
          }
        >
          <PropertyApplicationForm propertyId={propertyId} />
        </Suspense>
      </div>
    </main>
  );
}
