"use client";

import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/animations/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { company } from "@/data/company";

export function DirectContactSection() {
  const contactCards = [
    {
      title: "Mayfair Desk",
      value: company.phoneDisplay,
      href: `tel:${company.phone}`,
      icon: Phone,
      subtext: "Mon – Fri: 09:30 – 18:30 GMT · Direct Partner Access",
      badge: "Direct Call"
    },
    {
      title: "Direct WhatsApp",
      value: company.phoneDisplay,
      href: company.whatsapp,
      icon: MessageCircle,
      subtext: "Instant deal appraisal & confidential triage",
      badge: "Instant Chat",
      external: true
    },
    {
      title: "Direct Email",
      value: company.email,
      href: `mailto:${company.email}`,
      icon: Mail,
      subtext: "Submit term sheets, IMs & portfolio packs",
      badge: "Written Brief"
    },
    {
      title: "Trading HQ Location",
      value: "Berkeley Square House",
      href: company.mapsLink,
      icon: MapPin,
      subtext: "Berkeley Square, London W1J 6BD, UK · Client Parking & Valet",
      badge: "Google Maps",
      external: true
    }
  ];

  return (
    <section className="py-24 select-none relative overflow-hidden bg-[#060609] border-t border-white/10" suppressHydrationWarning>
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-radial-red opacity-25 blur-3xl"
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-md">
              <Sparkles size={14} className="text-legacy-red" /> Direct Partner Access · Mayfair HQ
            </div>
            <p className="eyebrow mb-2">Connect with Berkeley Square Capital</p>
            <h2 className="display text-2xl sm:text-3xl md:text-4xl text-white font-bold leading-tight">
              Speak directly with our senior client team.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-300">
              For fast-track bridging facilities, prime acquisitions, or strategic portfolio management, connect directly with our Mayfair desk.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/loan-application" className="min-w-40 justify-center text-xs font-bold uppercase">
              Get Funded <ArrowRight size={14} />
            </ButtonLink>
          </div>
        </div>

        {/* 4-Card Contact Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group focus-ring block h-full"
                suppressHydrationWarning
              >
                <TiltCard className="flex h-full flex-col justify-between p-6 md:p-8 hover:border-slate-300/40">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red transition-all duration-300 group-hover:bg-legacy-red group-hover:text-white group-hover:shadow-[0_0_20px_rgba(225,18,45,0.4)]">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mt-6">
                      {card.title}
                    </h3>

                    <p className="font-mono text-base md:text-lg font-bold text-white mt-1 group-hover:text-legacy-red transition-colors flex items-center gap-1.5">
                      <span>{card.value}</span>
                      <ArrowUpRight size={14} className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </p>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {card.subtext}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.08] pt-3 text-[11px] font-bold text-legacy-red flex items-center justify-between">
                    <span>Connect Now</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </TiltCard>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
