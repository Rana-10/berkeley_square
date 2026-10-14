import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Building2, CalendarCheck, Globe2, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/animations/TiltCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact London Office & Global Desks",
  description: "Connect with Berkeley Square Capital's Mayfair trading office or international real estate and finance desks."
};

export default function ContactPage() {
  const primaryChannels = [
    {
      title: "Contact Number",
      label: company.phoneDisplay,
      href: `tel:${company.phone}`,
      icon: Phone,
      note: "Mon – Fri: 09:30 – 18:30 GMT · Direct Partner Access"
    },
    {
      title: "Corporate Email",
      label: company.email,
      href: `mailto:${company.email}`,
      icon: Mail,
      note: "Submit transaction briefs, IMs, and loan packs"
    }
  ];

  return (
    <main className="pt-32 select-none [html.light_&]:bg-[#F7F5F2] min-h-screen">
      <section className="container pb-24">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 [html.light_&]:border-[#E4DFD4] pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/40 [html.light_&]:bg-white [html.light_&]:shadow-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 [html.light_&]:text-[#222222] backdrop-blur-md">
              <Sparkles size={14} className="text-legacy-red" /> Est. 2015 · London HQ
            </div>
            <p className="eyebrow mb-2">Connect with our Mayfair Desk</p>
            <h1 className="display text-3xl sm:text-4xl md:text-5xl text-white [html.light_&]:text-[#121316] font-bold leading-tight">
              Speak with Berkeley Square Capital.
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-slate-300 [html.light_&]:text-[#555d6b] leading-relaxed">
              Whether you are securing fast-track bridging finance, acquiring prime property, or structuring cross-border portfolios, our senior partners are ready to assist.
            </p>
          </div>

          <ButtonLink href="/appointment" className="min-w-44 justify-center py-4 text-base">
            Book Appointment <CalendarCheck size={18} />
          </ButtonLink>
        </div>

        {/* Contact Channels & Location Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Direct Communication Channels & Addresses */}
          <div className="space-y-6">
            {/* Primary Channels */}
            <div className="grid gap-4">
              {primaryChannels.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.title}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="focus-ring group relative flex items-start gap-4 rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.03] [html.light_&]:bg-white p-5 shadow-lg [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-slate-300/40 hover:bg-white/[0.06] [html.light_&]:hover:bg-white [html.light_&]:hover:border-slate-400 hover:scale-[1.01]"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red transition-colors group-hover:bg-legacy-red group-hover:text-white">
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#706D68]">
                          {action.title}
                        </span>
                        <ArrowRight size={14} className="text-legacy-red opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                      </div>
                      <span className="font-mono text-base sm:text-lg font-bold text-white [html.light_&]:text-[#121316] block mt-0.5">
                        {action.label}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-[#555d6b] block mt-1">
                        {action.note}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Trading & Registered Address Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/60 [html.light_&]:bg-white p-6 backdrop-blur-xl [html.light_&]:shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-legacy-red mb-2">
                  <MapPin size={14} />
                  <span>Trading Office (HQ)</span>
                </div>
                <h3 className="font-bold text-sm text-white [html.light_&]:text-[#181818]">Berkeley Square House</h3>
                <a
                  href={company.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs leading-relaxed text-slate-300 [html.light_&]:text-[#4A4844] block hover:text-white [html.light_&]:hover:text-black hover:underline transition-colors"
                >
                  {company.tradingAddress}
                </a>
                <a
                  href={company.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-legacy-red hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/60 [html.light_&]:bg-white p-6 backdrop-blur-xl [html.light_&]:shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#666460] mb-2">
                  <Building2 size={14} />
                  <span>Registered Office</span>
                </div>
                <h3 className="font-bold text-sm text-white [html.light_&]:text-[#181818]">{company.legalName}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-300 [html.light_&]:text-[#4A4844]">
                  {company.registeredAddress}
                </p>
                <span className="mt-3 inline-block font-mono text-[10px] uppercase text-white/50 [html.light_&]:text-[#888580]">
                  Company No. & Statutory Filing
                </span>
              </div>
            </div>

            {/* Global Hubs */}
            <div className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.02] [html.light_&]:bg-white p-6 backdrop-blur-xl [html.light_&]:shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white [html.light_&]:text-[#181818] mb-4">
                <Globe2 size={15} className="text-legacy-red" />
                <span>International Desks</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                {company.globalHubs.map((hub) => (
                  <div key={hub.country} className="rounded-xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/40 [html.light_&]:bg-[#FAF8F5] p-3">
                    <FlagImages country={hub.country} flags={hub.flags} />
                    <span className="font-bold text-white [html.light_&]:text-[#181818] block">{hub.country}</span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-[#666460] block">{hub.city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Map & Consultation */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 [html.light_&]:border-[#E4DFD4] bg-black/60 [html.light_&]:bg-white shadow-2xl backdrop-blur-xl aspect-square md:aspect-auto md:h-full min-h-[420px]">
              <iframe
                id="map"
                title="Berkeley Square House Location Map"
                src={company.mapEmbed}
                className="h-full w-full border-0 grayscale contrast-125 opacity-80"
                loading="lazy"
              />
              
              {/* Floating Google Maps Action Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/20 [html.light_&]:border-[#D8D3C8] bg-black/80 [html.light_&]:bg-white/95 p-3 backdrop-blur-xl shadow-2xl [html.light_&]:shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-legacy-red/20 text-legacy-red">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white [html.light_&]:text-[#181818] block">Berkeley Square House</span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-[#666460] font-mono block">Berkeley Square, London W1J 6BD, UK</span>
                  </div>
                </div>

                <a
                  href={company.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-legacy-red px-3.5 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(225,18,45,0.4)] transition-transform hover:scale-105"
                >
                  <span>View on Maps</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FlagImages({ country, flags }: { country: string; flags: string[] }) {
  return (
    <div className="mb-2 flex items-center -space-x-1.5">
      {flags.map((flag) => (
        <img
          key={flag}
          src={`https://flagcdn.com/w40/${flag}.png`}
          srcSet={`https://flagcdn.com/w80/${flag}.png 2x`}
          alt={`${country} flag`}
          className="h-4 w-6 rounded-sm border border-white/20 object-cover shadow-sm"
          loading="lazy"
        />
      ))}
    </div>
  );
}
