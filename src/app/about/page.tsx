import type { Metadata } from "next";
import { PhotoTile, TintTile } from "@/components/editorial/Tiles";
import { ParallaxPhoto } from "@/components/editorial/ParallaxPhoto";
import { OverlapPanel } from "@/components/editorial/OverlapPanel";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { HeroFacts, PageHero } from "@/components/editorial/PageHero";
import { Photo } from "@/components/editorial/Photo";
import { Section } from "@/components/editorial/Section";
import { images } from "@/data/images";
import { company, coreValues, keyDifferentiators, targetClients } from "@/data/company";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us | Mission, Values & Financial Engineering",
  description: "Established in 2015, Berkeley Square Capital delivers seamless cross-border real estate and financial engineering solutions across the UK, Middle East, Europe, USA, and Asia."
};

const divisionDetails = [
  {
    name: "Financial Services",
    href: "/loans",
    tagline: "Fast, flexible, and tailor-made debt structuring across the entire capital stack.",
    pillars: [
      { label: "Bridging Finance", text: "Tailor-made bridging structured exactly per requirements. Fast & flexible completion for auctions, distressed sales, and time-critical needs." },
      { label: "Development Finance", text: "Structured lending for new builds, conversions, refurbishments, and mixed-use schemes at every stage." },
      { label: "Mortgage Solutions", text: "Residential, buy-to-let, and international mortgage structures for UK and overseas buyers." }
    ]
  },
  {
    name: "Property Transactions",
    href: "/property",
    tagline: "End-to-end acquisition sourcing and market-aligned sales execution across prime markets.",
    pillars: [
      { label: "Acquisition Advisory", text: "Strategic sourcing and end-to-end purchase support for prime residential, commercial, and investment assets." },
      { label: "Sales & Disposal", text: "Market-aligned valuation, targeted international marketing, and efficient transaction management to maximise speed and value." },
      { label: "Discreet Execution", text: "Confidential off-market positioning for private clients, family offices, and developers." }
    ]
  },
  {
    name: "Asset & Portfolio Management",
    href: "/construction",
    tagline: "Complete property care, tenancy governance, and multi-market portfolio rebalancing.",
    pillars: [
      { label: "Rental Management", text: "Full tenant vetting, automated rent collection, maintenance coordination, and statutory regulatory compliance." },
      { label: "Portfolio Management", text: "Strategic planning, performance monitoring, asset rebalancing, and long-term capital value enhancement." },
      { label: "Cross-Border Support", text: "Seamless multi-jurisdiction reporting for international property investors." }
    ]
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

const differentiators = keyDifferentiators.filter((diff) =>
  ["Fast, Responsive Decision-Making", "International Reach", "End-to-End Service Model", "Client-Centric Philosophy"].includes(diff.title)
);

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      {/* Hero */}
      <PageHero
        eyebrow="About us"
        title="Your global partner in real estate & finance."
        intro="Headquartered in the heart of London, with established offices and operations across the United Kingdom, Dubai, Oman, Pakistan, Saudi Arabia, Greece, the USA, Spain, Cyprus, and Far East Asia, Berkeley Square Capital delivers seamless cross-border real estate and financial solutions to private clients, investors, developers, and institutions worldwide."
        actions={[{ href: "/contact", label: "Contact us" }]}
        side={
          <HeroFacts
            items={[
              ["Established", "2015"],
              ["Headquarters", "Mayfair, London W1J"],
              ["Registered office", "Great Portland Street"],
              ["Operating in", "10 jurisdictions"]
            ]}
          />
        }
        bleed={<ParallaxPhoto image={images.terracottaCorner} ratio="aspect-[4/3] md:aspect-[21/9]" position="object-[50%_30%]" />}
      />

      <OverlapPanel title="Speed, flexibility and trusted advice." action={{ href: "/services", label: "Our services" }}>
        <p>{company.mission}</p>
        <p>{company.philosophy}</p>
      </OverlapPanel>

      {/* Team */}
      <section className="bg-[#EBE5D9]">
        <div className="container border-t border-theme-border py-16 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end lg:gap-20">
            <Reveal>
              <p className="font-mono text-xs font-bold tracking-widest text-theme-muted">02</p>
              <h2 className="display mt-4 text-6xl font-semibold leading-[0.95] text-theme-primary sm:text-7xl md:text-8xl">
                Meet
                <br />
                our
                <br />
                Team<span className="text-legacy-red">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-theme-secondary md:text-lg">
                Property, lending and asset management specialists working from Mayfair and our international desks. Every client deals directly with a named individual, from first conversation through to completion.
              </p>
            </Reveal>
          </div>

          <RevealGroup stagger={0.1} className="mt-20 grid items-start gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24">
            {team.map((member, idx) => {
              const offset = idx % 3 === 1 ? "sm:mt-12 lg:mt-20" : idx % 2 === 1 ? "sm:mt-12 lg:mt-0" : "";
              return (
                <RevealItem key={member.image} className={offset}>
                  <figure className="group">
                    <div className="relative">
                      {/* offset arch outline, closes up on hover */}
                      <span
                        aria-hidden
                        className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border border-[#181818]/35 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
                      />
                      <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-theme-subtle">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.image}
                          alt={`${member.name}, ${member.role}`}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale-[0.55] transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                        />
                      </div>
                      <span className="absolute -left-1 top-[58%] -translate-x-full pr-3 font-mono text-[11px] font-bold tracking-widest text-theme-muted [writing-mode:vertical-rl] rotate-180 max-lg:hidden">
                        No. {pad(idx + 1)}
                      </span>
                    </div>

                    <figcaption className="mt-8 border-t border-[#181818]/70 pt-4">
                      <h3 className="display text-2xl font-semibold text-theme-primary">{member.name}</h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-legacy-red">{member.role}</p>
                      <p className="mt-4 text-sm leading-relaxed text-theme-secondary">{member.bio}</p>
                    </figcaption>
                  </figure>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-theme-page py-16 md:py-24">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our core values</p>
            <h2 className="display mt-4 max-w-2xl text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">The principles that govern every transaction.</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
            {coreValues.map((val, idx) => (
              <RevealItem key={val.title}>
                <TintTile number={"0" + (idx + 1)} title={val.title} tone={idx % 3 === 1 ? "green" : "sage"} className="h-full">
                  {val.description}
                </TintTile>
              </RevealItem>
            ))}
            <RevealItem>
              <PhotoTile image={images.crestDoorway} className="h-full" />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Divisions */}
      <Section index="04" label="Specialist divisions" tone="stone">
        <Reveal>
          <h2 className="display max-w-2xl text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">
            Covering every stage of the property &amp; funding lifecycle.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-theme-secondary">
            We operate as a fully integrated group with specialist divisions delivering agility, transparency, and personal service.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-[#181818]/70">
          {divisionDetails.map((division) => (
            <Reveal key={division.name}>
              <article className="grid gap-8 border-b border-theme-border py-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
                <div>
                  <h3 className="display mt-2 text-2xl font-semibold text-theme-primary md:text-3xl">{division.name}</h3>
                  <p className="mt-3 leading-relaxed text-theme-secondary">{division.tagline}</p>
                  <Link
                    href={division.href}
                    className="focus-ring group mt-6 inline-flex items-center gap-2 border-b border-theme-primary pb-0.5 text-sm font-semibold text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red"
                  >
                    Explore <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <dl className="space-y-5">
                  {division.pillars.map((pillar) => (
                    <div key={pillar.label} className="border-l border-legacy-red/60 pl-5">
                      <dt className="text-xs font-bold uppercase tracking-widest text-theme-primary">{pillar.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-theme-secondary">{pillar.text}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Offices */}
      <Section index="05" label="Geographical reach">
        <Reveal>
          <h2 className="display max-w-2xl text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">
            Nationwide UK coverage with an international outlook.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-theme-secondary">
            Berkeley Square Capital serves clients throughout the United Kingdom and internationally across Europe, the Middle East, the United States, and Asia.
          </p>
        </Reveal>
        <ul className="mt-12 border-t border-[#181818]/70">
          {globalHubs.map((hub) => (
            <li
              key={hub.country}
              className="grid items-center gap-1 border-b border-theme-border py-4 transition-colors hover:bg-[#EBE5D9]/70 md:grid-cols-[3.5rem_1.1fr_1fr_1.6fr] md:gap-6 md:px-2"
            >
              <FlagImages country={hub.country} flags={hub.flags} />
              <span className="display text-xl font-semibold text-theme-primary">{hub.country}</span>
              <span className="text-sm font-semibold text-legacy-red">{hub.city}</span>
              <span className="text-sm text-theme-secondary">{hub.detail}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Who we serve + why us */}
      <Section index="06" label="Who we serve" tone="stone">
        <Reveal>
          <h2 className="display max-w-2xl text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">
            Tailored solutions for every property investor.
          </h2>
        </Reveal>
        <RevealGroup stagger={0.06} className="mt-12 grid gap-x-14 gap-y-8 border-t border-[#181818]/70 pt-8 md:grid-cols-2">
          {targetClients.map((client) => (
            <RevealItem key={client.title}>
              <h3 className="display text-xl font-semibold text-theme-primary">{client.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-theme-secondary">{client.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-20">
          <p className="eyebrow">The Berkeley Square difference</p>
          <h2 className="display mt-3 max-w-2xl text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">
            Why clients choose Berkeley Square.
          </h2>
        </Reveal>
        <RevealGroup stagger={0.06} className="mt-10 border-t border-[#181818]/70">
          {differentiators.map((diff, idx) => (
            <RevealItem key={diff.title}>
              <div className="grid gap-2 border-b border-theme-border py-6 md:grid-cols-[4rem_1fr_1.3fr] md:gap-8">
                <span className="font-mono text-xs font-bold text-theme-muted">{pad(idx + 1)}</span>
                <h3 className="display text-xl font-semibold text-theme-primary">{diff.title}</h3>
                <p className="text-sm leading-relaxed text-theme-secondary">{diff.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* History */}
      <Section index="07" label="Company history">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="display text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">
              Established in 2015 in Mayfair, London.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-theme-secondary">
              Berkeley Square Capital is a London-based real estate and property finance company specialising in property acquisition, bridging finance, investment advisory, and property management.
            </p>
            <p className="mt-4 leading-relaxed text-theme-secondary">
              The company provides fast, flexible, and tailored funding solutions for investors, developers, and private clients, helping them secure opportunities in the UK and selected international markets. Its services cover the entire property investment journey, from sourcing and financing to acquisition and ongoing asset management.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="display border-l-2 border-legacy-red pl-6 text-xl font-medium leading-snug text-theme-primary">
              &ldquo;A trusted partner delivering efficient, client-focused solutions designed to support long-term property investment success.&rdquo;
            </blockquote>
            <dl className="mt-8 divide-y divide-theme-border border-y border-theme-border text-sm">
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-theme-muted">Corporate entity</dt>
                <dd className="text-right font-medium text-theme-primary">{company.legalName}</dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-theme-muted">Headquarters</dt>
                <dd className="font-medium text-theme-primary">Mayfair, London W1J</dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-theme-muted">Years operating</dt>
                <dd className="font-medium text-theme-primary">11+ (Est. 2015)</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

function FlagImages({ country, flags }: { country: string; flags: string[] }) {
  return (
    <div className="flex items-center -space-x-1.5">
      {flags.map((flag) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={flag}
          src={`https://flagcdn.com/w40/${flag}.png`}
          srcSet={`https://flagcdn.com/w80/${flag}.png 2x`}
          alt={`${country} flag`}
          className="h-4 w-6 rounded-[2px] object-cover"
          loading="lazy"
        />
      ))}
    </div>
  );
}
