"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Coins,
  Download,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { company } from "@/data/company";
import type { PropertyItem } from "@/data/properties";
import { cn } from "@/lib/utils";

interface PropertyInquirySidebarProps {
  property: PropertyItem;
}

export function PropertyInquirySidebar({ property }: PropertyInquirySidebarProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  function handleDownloadFactsheet() {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
    }, 400);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 5000);
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Berkeley Square Capital Mayfair Desk,\n\nI am enquiring about ${property.title} (Reference: ${property.referenceCode}) listed at ${property.priceDisplay}.\n\nPlease provide full acquisition terms and arrangement for a confidential viewing.`
  );

  return (
    <aside className="space-y-6 select-none">
      {/* Primary Deal Desk Advisory Card */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#121218] to-[#0a0a0f] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-legacy-red" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Mayfair Private Desk
            </span>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300 uppercase">
            Active Instruction
          </span>
        </div>

        {/* Price & Ref Summary */}
        <div className="mt-5">
          <span className="font-display text-3xl font-bold text-white block">
            {property.priceDisplay}
          </span>
          <div className="mt-1 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase">{property.priceType}</span>
            <span>Ref: <strong className="text-white">{property.referenceCode}</strong></span>
          </div>
        </div>

        {/* Fast Action Buttons */}
        <div className="mt-6 space-y-3">
          {/* Direct Apply for Property */}
          <Link
            href={`/property/apply?property=${property.slug}`}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-legacy-deepRed to-legacy-red px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(196,58,49,0.45)] transition-all hover:scale-[1.02]"
          >
            <ShieldCheck size={16} />
            <span>Apply for Property</span>
            <ArrowRight size={14} />
          </Link>

          {/* WhatsApp Deal Desk */}
          <a
            href={`https://wa.me/447930472993?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-500 hover:scale-[1.02]"
          >
            <MessageCircle size={16} />
            <span>WhatsApp Mayfair Desk</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Email Prospectus */}
          <a
            href={`mailto:Info@bsqcap.com?subject=Prospectus%20Request:%20${encodeURIComponent(
              property.title
            )}%20(${property.referenceCode})&body=${whatsappMessage}`}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-legacy-red hover:bg-white/10"
          >
            <Mail size={15} />
            <span>Request Full Prospectus</span>
          </a>
        </div>

        {/* Factsheet Download */}
        <div className="mt-5 pt-5 border-t border-white/10">
          <button
            type="button"
            onClick={handleDownloadFactsheet}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs font-mono text-slate-300 transition-all hover:border-white/25 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-legacy-red" />
              <span>Digital Spec Factsheet</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-legacy-red font-bold">
              {downloadSuccess ? (
                <>
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span className="text-emerald-400">Ready</span>
                </>
              ) : (
                <>
                  <span>Print / PDF</span>
                  <Download size={12} />
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Structured Acquisition Finance Overview */}
      <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3">
          <Coins size={15} className="text-legacy-red" />
          <span>Indicative Debt Structuring</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Through Berkeley Square Capital’s debt capital markets desk, qualified acquirers can arrange bespoke acquisition bridging or private bank mortgages.
        </p>

        <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Indicative LTV:</span>
            <span className="font-bold text-white">{property.indicativeFinance.maxLtv}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Indicative Rate:</span>
            <span className="font-bold text-legacy-red">{property.indicativeFinance.estimatedBridgingRate}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-[11px]">
            <span className="text-slate-400">Facility:</span>
            <span className="text-slate-200 text-right truncate max-w-[140px]">{property.indicativeFinance.facilityType}</span>
          </div>
        </div>

        <Link
          href="/loan-application"
          className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-legacy-red hover:text-red-400 transition-colors"
        >
          <span>Calculate Acquisition Debt</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Direct Contact Mayfair Line */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-center">
        <p className="text-[11px] font-mono uppercase text-slate-400">Direct Telephone Desk</p>
        <a
          href="tel:+447930472993"
          className="mt-1 block font-mono text-base font-bold text-white hover:text-legacy-red transition-colors"
        >
          +44 7930 472993
        </a>
        <p className="text-[10px] text-slate-500 mt-1">Mayfair HQ · Mon–Sat 8am–8pm GMT</p>
      </div>
    </aside>
  );
}
