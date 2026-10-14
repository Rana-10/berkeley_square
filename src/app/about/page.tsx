import type { Metadata } from "next";
import { ArrowRight, Building2, CheckCircle2, Globe2, Hammer, HeartHandshake, Landmark, Lightbulb, MapPin, Scale, ShieldCheck, Sparkles, Target, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { TargetClientsSection } from "@/components/sections/TargetClientsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ButtonLink } from "@/components/ui/Button";
import { company, coreValues, divisions, keyDifferentiators, targetClients } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us | Mission, Values & Financial Engineering",
  description: "Established in 2015, Berkeley Square Capital delivers seamless cross-border real estate and financial engineering solutions across the UK, Middle East, Europe, USA, and Asia."
};

const divisionDetails = [
  {
    name: "Financial Services",
    href: "/loans",
    icon: Landmark,
    badge: "Debt & Equity Structuring",
    tagline: "Fast, flexible, and tailor-made debt structuring across the entire capital stack.",
    pillars: [
      { label: "Bridging Finance", text: "Tailor-made bridging structured exactly per requirements. Fast & flexible completion for auctions, distressed sales, and time-critical needs." },
      { label: "Development Finance", text: "Structured lending for new builds, conversions, refurbishments, and mixed-use schemes at every stage." },
      { label: "Mortgage Solutions", text: "Residential, buy-to-let, and international mortgage structures for UK and overseas buyers." }
    ],
    tags: ["Bridging", "Auction Protocol", "Development Lending", "International Mortgages"]
  },
  {
    name: "Property Transactions",
    href: "/property",
    icon: Building2,
    badge: "Prime Real Estate Advisory",
    tagline: "End-to-end acquisition sourcing and market-aligned sales execution across prime markets.",
    pillars: [
      { label: "Acquisition Advisory", text: "Strategic sourcing and end-to-end purchase support for prime residential, commercial, and investment assets." },
      { label: "Sales & Disposal", text: "Market-aligned valuation, targeted international marketing, and efficient transaction management to maximise speed and value." },
      { label: "Discreet Execution", text: "Confidential off-market positioning for private clients, family offices, and developers." }
    ],
    tags: ["Acquisitions", "Asset Disposal", "Prime Residential", "Commercial Advisory"]
  },
  {
    name: "Asset & Portfolio Management",
    href: "/construction",
    icon: ShieldCheck,
    badge: "Lifecycle Stewardship",
    tagline: "Complete property care, tenancy governance, and multi-market portfolio rebalancing.",
    pillars: [
      { label: "Rental Management", text: "Full tenant vetting, automated rent collection, maintenance coordination, and statutory regulatory compliance." },
      { label: "Portfolio Management", text: "Strategic planning, performance monitoring, asset rebalancing, and long-term capital value enhancement." },
      { label: "Cross-Border Support", text: "Seamless multi-jurisdiction reporting for international property investors." }
    ],
    tags: ["Rental Management", "Portfolio Strategy", "Asset Rebalancing", "Tenant Care"]
  }
];

const globalHubs = [
  { country: "United Kingdom", city: "London (Global HQ)", detail: "Mayfair Trading Office & Great Portland Street Registered Office", flags: ["gb"] },
  { country: "United Arab Emirates", city: "Dubai", detail: "Middle East Regional Capital & Acquisition Hub", flags: ["ae"] },
  { country: "Saudi Arabia", city: "Riyadh", detail: "Gulf Strategic Advisory & Sovereign Real Estate Lines", flags: ["sa"] },
  { country: "Oman", city: "Muscat", detail: "Private Wealth & Commercial Asset Management Desk", flags: ["om"] },
  { country: "Cyprus", city: "Limassol & Nicosia", detail: "Eastern Mediterranean Investment & Residency Advisory", flags: ["cy"] },
  { country: "Greece", city: "Athens", detail: "Southern European Gateway & Mediterranean Advisory", flags: ["gr"] },
  { country: "Spain", city: "Madrid & Marbella", detail: "Iberian Prime Property & Lifestyle Investment Desk", flags: ["es"] },
  { country: "United States", city: "New York & Miami", detail: "Transatlantic Capital, Family Office & Acquisition Desk", flags: ["us"] },
  { country: "Far East Asia", city: "Singapore, Hong Kong & Tokyo", detail: "Asia-Pacific Private Client & Cross-Border Capital Desk", flags: ["sg", "hk", "jp"] },
  { country: "Pakistan", city: "Islamabad & Lahore", detail: "South Asia Cross-Border Investment & Development Desk", flags: ["pk"] }
];

export default function AboutPage() {
  return (
    <main className="pt-32 select-none [html.light_&]:bg-[#F7F5F2] min-h-screen">
      <section className="container pb-24">
        {/* Editorial Header */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/40 [html.light_&]:bg-white [html.light_&]:shadow-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 [html.light_&]:text-[#222222] backdrop-blur-md">
              <Sparkles size={14} className="text-legacy-red" /> Est. 2015 · London Mayfair HQ
            </div>
            <p className="eyebrow mb-3">Global Real Estate & Finance</p>
            <h1 className="display max-w-3xl text-3xl sm:text-4xl md:text-5xl leading-tight text-white [html.light_&]:text-[#121316] font-bold">
              Your Global Partner in Real Estate & Finance.
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
              Headquartered in the heart of London, with established offices and operations across the United Kingdom, Dubai, Oman, Pakistan, Saudi Arabia, Greece, the USA, Spain, Cyprus, and Far East Asia, Berkeley Square Capital delivers seamless cross-border real estate and financial solutions to private clients, investors, developers, and institutions worldwide.
            </p>
          </div>

          {/* High-Impact Glass Aside */}
          <TiltCard className="p-8">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Group Charter</span>
              <span className="h-2 w-2 rounded-full bg-legacy-red shadow-[0_0_8px_#e1122d]" />
            </div>
            <p className="display mt-4 text-2xl sm:text-3xl text-white [html.light_&]:text-[#121316] font-semibold leading-snug">
              “Delivering fast, flexible, and tailored solutions covering every stage of the property and funding lifecycle.”
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 [html.light_&]:border-[#E4DFD4] pt-4 text-xs font-semibold uppercase tracking-widest text-white/60 [html.light_&]:text-[#706D68]">
              <span className="text-legacy-red font-bold">BSQ Group</span>
              <span>•</span>
              <span>Mayfair London</span>
              <span>•</span>
              <span>Est. 2015</span>
            </div>
          </TiltCard>
        </div>

        {/* Mission & Business Philosophy Section */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* Mission */}
          <TiltCard className="p-8 md:p-10 border-legacy-red/30 bg-gradient-to-br from-[#18080a]/90 via-[#10080a]/90 to-[#080808]/90 [html.light_&]:bg-white [html.light_&]:bg-none [html.light_&]:border-legacy-red/40 [html.light_&]:shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-legacy-red mb-3">
              <Target size={16} />
              <span>Our Mission</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl text-white [html.light_&]:text-[#121316] font-bold leading-tight">
              Empowering investment through speed, flexibility & trusted advice.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
              {company.mission}
            </p>
          </TiltCard>

          {/* Philosophy */}
          <TiltCard className="p-8 md:p-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 [html.light_&]:text-[#706D68] mb-3">
              <HeartHandshake size={16} className="text-legacy-red" />
              <span>Our Business Philosophy</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl text-white [html.light_&]:text-[#121316] font-bold leading-tight">
              Sustainable value built on trust, expertise & long-term partnerships.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
              {company.philosophy}
            </p>
          </TiltCard>
        </div>

        {/* 5 Core Values Section */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Our Core Values"
            title="The principles that govern every transaction."
            description="Our values guide how we advise clients, underwrite capital, and manage real estate across global jurisdictions."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <TiltCard key={val.title} className="flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs text-white/40 [html.light_&]:text-[#706D68] font-bold">0{idx + 1}</span>
                    </div>
                    <h3 className="display mt-5 text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#121316]">{val.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">{val.description}</p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Global Reach, Local Expertise Map Strip */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Geographical Reach"
            title="Nationwide UK coverage with an international outlook."
            description="Berkeley Square Capital serves clients throughout the United Kingdom and internationally across Europe, the Middle East, the United States, and Asia."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {globalHubs.map((hub) => (
              <div
                key={hub.country}
                className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.03] [html.light_&]:bg-white p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-slate-300/35 hover:bg-white/[0.06] [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)]"
              >
                <div className="flex items-center justify-between">
                  <FlagImages country={hub.country} flags={hub.flags} />
                  <span className="font-mono text-[11px] uppercase font-bold tracking-wider text-slate-400 [html.light_&]:text-[#706D68]">
                    Active Desk
                  </span>
                </div>
                <h3 className="display mt-3 text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#121316]">{hub.country}</h3>
                <p className="font-mono text-xs sm:text-sm text-legacy-red font-bold mt-1">{hub.city}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 [html.light_&]:text-[#555d6b]">{hub.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Three Integrated Group Divisions */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Integrated Specialist Divisions"
            title="Covering every stage of the property & funding lifecycle."
            description="We operate as a fully integrated group with specialist divisions delivering agility, transparency, and personal service."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {divisionDetails.map((division) => {
              const Icon = division.icon;
              return (
                <TiltCard key={division.name} className="flex h-full flex-col justify-between p-8">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red">
                        <Icon size={24} />
                      </div>
                      <span className="rounded-full border border-white/15 [html.light_&]:border-[#E4DFD4] bg-white/5 [html.light_&]:bg-[#FAF8F5] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white/70 [html.light_&]:text-[#555d6b]">
                        {division.badge}
                      </span>
                    </div>

                    <h2 className="display mt-6 text-2xl sm:text-3xl text-white [html.light_&]:text-[#121316] font-bold">
                      {division.name}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
                      {division.tagline}
                    </p>

                    {/* Key Strategic Pillars */}
                    <div className="mt-6 space-y-4 border-t border-white/[0.08] [html.light_&]:border-[#E4DFD4] pt-5">
                      {division.pillars.map((pillar) => (
                        <div key={pillar.label} className="text-sm">
                          <span className="font-bold uppercase tracking-wider text-legacy-red block">
                            {pillar.label}
                          </span>
                          <span className="text-slate-300 [html.light_&]:text-[#555d6b] text-sm mt-1 block leading-relaxed font-normal">
                            {pillar.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Tags & Link */}
                  <div className="mt-8 border-t border-white/[0.08] [html.light_&]:border-[#E4DFD4] pt-5">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {division.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.04] [html.light_&]:bg-[#FAF8F5] px-3 py-1 text-xs font-medium text-white/75 [html.light_&]:text-[#444444]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={division.href}
                      className="focus-ring inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-legacy-red transition-all duration-300 hover:text-white [html.light_&]:hover:text-black"
                    >
                      Explore {division.name} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Primary Target Client Profiles */}
        <div className="mt-24">
          <TargetClientsSection />
        </div>

        {/* Why Choose Us & What Makes BSQ Different */}
        <div className="mt-8">
          <WhyChooseUs />
        </div>

        {/* Company History & Narrative */}
        <div className="mt-20">
          <TiltCard className="p-8 md:p-12 border-white/20">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">Company History & Proven Heritage</span>
                <h3 className="display mt-3 text-3xl sm:text-4xl text-white [html.light_&]:text-[#121316] font-bold">
                  Established in 2015 in Mayfair, London.
                </h3>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300 [html.light_&]:text-[#555d6b]">
                  Established in 2015, Berkeley Square Capital is a London-based real estate and property finance company specialising in property acquisition, bridging finance, investment advisory, and property management.
                </p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400 [html.light_&]:text-[#706D68]">
                  The company provides fast, flexible, and tailored funding solutions for investors, developers, and private clients, helping them secure opportunities in the UK and selected international markets. Its services cover the entire property investment journey, from sourcing and financing to acquisition and ongoing asset management.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/60 [html.light_&]:bg-[#FAF8F5] p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-slate-400 [html.light_&]:text-[#666460] font-bold">
                  Group Positioning
                </p>
                <p className="display mt-2 text-xl text-white [html.light_&]:text-[#181818] font-medium">
                  “A trusted partner delivering efficient, client-focused solutions designed to support long-term property investment success.”
                </p>
                <div className="mt-6 space-y-2 border-t border-white/10 [html.light_&]:border-[#E4DFD4] pt-4 text-xs text-slate-300 [html.light_&]:text-[#4A4844]">
                  <div className="flex justify-between">
                    <span>Corporate Entity</span>
                    <span className="font-mono text-white [html.light_&]:text-[#181818] font-bold">{company.legalName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Headquarters</span>
                    <span className="font-mono text-white [html.light_&]:text-[#181818]">Mayfair, London W1J</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Years Operating</span>
                    <span className="font-mono text-legacy-red font-bold">11+ Years (Est. 2015)</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 rounded-3xl border border-legacy-border bg-edge-red p-8 md:p-14 shadow-glow">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow mb-2">Speak with our Mayfair Team</p>
              <h2 className="display max-w-2xl text-xl sm:text-2xl md:text-3xl leading-tight text-white font-bold">
                Ready to structure your property acquisition or funding?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                Arrange a confidential consultation with our London Mayfair team or international desk.
              </p>
            </div>
            <ButtonLink href="/contact" className="min-w-44 px-8 py-4 text-base">
              Contact London Office <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function FlagImages({ country, flags }: { country: string; flags: string[] }) {
  return (
    <div className="flex items-center -space-x-1.5">
      {flags.map((flag) => (
        <img
          key={flag}
          src={`https://flagcdn.com/w40/${flag}.png`}
          srcSet={`https://flagcdn.com/w80/${flag}.png 2x`}
          alt={`${country} flag`}
          className="h-5 w-7 rounded-sm border border-white/20 object-cover shadow-sm"
          loading="lazy"
        />
      ))}
    </div>
  );
}
