"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, Cookie, Globe2, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { BSQLogo } from "@/components/ui/BSQLogo";
import { company, divisions } from "@/data/company";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Financial Services", href: "/loans" },
  { label: "Property Transactions", href: "/property" },
  { label: "Property Listings", href: "/property/listings" },
  { label: "Asset & Portfolio Management", href: "/construction" },
  { label: "About Berkeley Square Capital", href: "/about" },
  { label: "Loan Application", href: "/loan-application" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Contact London Office", href: "/contact" }
];

const legalLinks = [
  { label: "Privacy Notice", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" }
];

export function Footer() {
  function handleOpenCookieSettings(e: React.MouseEvent) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bsc_open_cookie_preferences"));
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 [html.light_&]:border-[#D8D3C8] bg-gradient-to-b from-[#18181D] via-[#121216] to-[#0D0D11] [html.light_&]:from-[#1F2024] [html.light_&]:via-[#16171A] [html.light_&]:to-[#111114] pt-20 pb-12 select-none text-slate-300" suppressHydrationWarning>
      {/* Top Hairline Metallic Silver Laser Stream */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 w-1/3 bg-gradient-to-r from-transparent via-legacy-red to-transparent shadow-[0_0_12px_#e1122d] animate-[laser-stream_5s_linear_infinite]"
      />

      {/* Subtle architectural ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-64 w-96 rounded-full bg-legacy-red/10 blur-[120px]"
      />

      <div className="container grid gap-12 lg:grid-cols-[1.3fr_0.85fr_0.85fr] relative z-10">
        {/* Brand, Tagline & London Addresses */}
        <div>
          <Link href="/" className="inline-flex items-center">
            <BSQLogo variant="horizontal" size="lg" />
          </Link>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-300">
            {company.slogan}
          </p>

          {/* Established Date & Legal Name */}
          <div className="mt-5 text-xs text-white/50 font-mono">
            <span className="text-legacy-red font-bold">Est. 2015</span> · {company.legalName}
          </div>

          {/* Trading & Registered Addresses & Direct Contact */}
          <div className="mt-6 space-y-3 text-xs text-slate-400 font-mono">
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin size={15} className="text-legacy-red shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">Trading Office (HQ):</span>
                <a
                  href={company.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors block text-slate-300"
                >
                  {company.tradingAddress}
                </a>
                <a
                  href={company.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-legacy-red hover:underline block"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-400">
              <Building2 size={15} className="text-legacy-red/70 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-300 font-semibold block">Registered Office:</span>
                <span>{company.registeredAddress}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-legacy-red shrink-0" />
                <a href={`tel:${company.phone}`} className="hover:text-white transition-colors text-slate-300 font-bold">
                  {company.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-legacy-red shrink-0" />
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-slate-300 font-bold"
                >
                  WhatsApp: {company.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={14} className="text-legacy-red shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition-colors text-slate-300 font-bold">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divisions */}
        <div>
          <p className="eyebrow mb-4">Divisions</p>
          <div className="space-y-3.5">
            {divisions.map((division) => (
              <Link
                key={division.name}
                href={division.href}
                className="group flex items-center justify-between text-sm text-slate-300 transition-colors hover:text-white"
              >
                <span>{division.name}</span>
                <ArrowUpRight size={14} className="text-legacy-red opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>

          {/* Global Footprint Hubs Badge */}
          <div className="mt-8 rounded-2xl border border-white/10 [html.light_&]:border-white/15 bg-white/[0.04] p-4 text-xs text-slate-300 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider mb-2">
              <Globe2 size={14} className="text-legacy-red" />
              <span>Global Footprint</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400 font-mono">
              {company.globalHubs.map((hub) => (
                <span key={hub.country} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-slate-200">
                  <FlagImages country={hub.country} flags={hub.flags} />
                  <span>{hub.country}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Navigation & Legal Links */}
        <div>
          <p className="eyebrow mb-4">Navigation</p>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-400 transition-colors hover:text-white text-xs font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="eyebrow mt-6 mb-3">Governance & Compliance</p>
          <div className="flex flex-col gap-2 text-xs">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-slate-400 transition-colors hover:text-white text-xs font-medium flex items-center gap-1.5"
              >
                <ShieldCheck size={12} className="text-legacy-red shrink-0" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="text-left text-slate-400 transition-colors hover:text-white text-xs font-medium flex items-center gap-1.5"
            >
              <Cookie size={12} className="text-legacy-red shrink-0" />
              <span>Cookie Settings & Preferences</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Legal & Regulatory Footnote */}
      <div className="container mt-16 border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p>© 2026 {company.legalName}. All rights reserved.</p>
          <span className="hidden sm:inline text-white/20">|</span>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Notice</Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            <span>·</span>
            <button type="button" onClick={handleOpenCookieSettings} className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>

        <p className="max-w-xl text-[11px] leading-relaxed text-slate-400 text-center md:text-right">
          Berkeley Square Capital delivers integrated real estate acquisition, bridging finance, investment advisory, and property management solutions across the UK, Middle East, Europe, and South Asia.
        </p>
      </div>
    </footer>
  );
}

function FlagImages({ country, flags }: { country: string; flags: string[] }) {
  return (
    <span className="inline-flex items-center -space-x-1">
      {flags.map((flag) => (
        <img
          key={flag}
          src={`https://flagcdn.com/w20/${flag}.png`}
          srcSet={`https://flagcdn.com/w40/${flag}.png 2x`}
          alt={`${country} flag`}
          className="h-3 w-4 rounded-[1px] border border-white/20 object-cover"
          loading="lazy"
        />
      ))}
    </span>
  );
}
