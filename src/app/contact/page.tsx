import type { Metadata } from "next";
import { OverlapPanel } from "@/components/editorial/OverlapPanel";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { MapFacade } from "@/components/editorial/MapFacade";
import { PageHero } from "@/components/editorial/PageHero";
import { Photo } from "@/components/editorial/Photo";
import { Heading, Section } from "@/components/editorial/Section";
import { company } from "@/data/company";
import { heroImages, images } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact London Office & Global Desks",
  description: "Connect with Berkeley Square Capital's Mayfair trading office or international real estate and finance desks."
};

const linkClass =
  "focus-ring border-b border-theme-primary pb-1 text-sm font-semibold uppercase tracking-widest text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red";

export default function ContactPage() {
  const details: { term: string; lines: React.ReactNode }[] = [
    {
      term: "Telephone",
      lines: (
        <>
          <a href={`tel:${company.phone}`} className="display text-2xl font-semibold text-theme-primary transition-colors hover:text-legacy-red">
            {company.phoneDisplay}
          </a>
          <span className="mt-1 block text-sm text-theme-secondary">Mon – Fri: 09:30 – 18:30 GMT · Direct partner access</span>
        </>
      )
    },
    {
      term: "Email",
      lines: (
        <>
          <a href={`mailto:${company.email}`} className="display text-2xl font-semibold text-theme-primary transition-colors hover:text-legacy-red">
            {company.email}
          </a>
          <span className="mt-1 block text-sm text-theme-secondary">Submit transaction briefs, IMs, and loan packs</span>
        </>
      )
    },
    {
      term: "Trading office",
      lines: (
        <>
          <span className="display text-xl font-semibold text-theme-primary">Berkeley Square House</span>
          <a href={company.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm leading-relaxed text-theme-secondary transition-colors hover:text-theme-primary">
            {company.tradingAddress}
          </a>
        </>
      )
    },
    {
      term: "Registered office",
      lines: (
        <>
          <span className="display text-xl font-semibold text-theme-primary">{company.legalName}</span>
          <span className="mt-1 block text-sm leading-relaxed text-theme-secondary">{company.registeredAddress}</span>
        </>
      )
    }
  ];

  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Connect with our Mayfair desk"
        title="Speak with Berkeley Square Capital."
        intro="Whether you are securing fast-track bridging finance, acquiring prime property, or structuring cross-border portfolios, our senior partners are ready to assist."
        image={heroImages.berkeleySquare}
        position="50% 55%"
        lede="Berkeley Square, Mayfair. Every enquiry answered by a named member of the team."
        actions={[
          { href: `mailto:${company.email}`, label: "Email the desk" },
          { href: "/loan-application", label: "Loan enquiry" }
        ]}
      />

      <OverlapPanel overlap={false} title="Berkeley Square, Mayfair.">
        <p>Our trading office sits on Berkeley Square in the heart of London. Call or email the team directly to arrange a time to meet us in person.</p>
        <p>We respond to every enquiry from a named member of the team, usually within the working day.</p>
      </OverlapPanel>

      <section className="container py-16 md:py-24">
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <dl className="divide-y divide-theme-border border-y border-[#181818]/70">
              {details.map((item) => (
                <div key={item.term} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <dt className="pt-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-legacy-red">{item.term}</dt>
                  <dd>{item.lines}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="m-0">
              <MapFacade embedUrl={company.mapEmbed} title="Berkeley Square House Location Map" address="Berkeley Square House, Mayfair, London W1J 6BD" />
              <figcaption className="mt-2.5 flex items-baseline justify-between gap-3 border-t border-[#181818]/20 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-muted">
                <span>Berkeley Square, London W1J 6BD</span>
                <a href={company.mapsLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-legacy-red">
                  View on Maps ↗
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Section index="01" label="International desks" tone="stone">
        <Heading intro="Established offices and operations across the Middle East, Europe, the USA and Asia.">
          One firm, ten jurisdictions.
        </Heading>
        <ul className="mt-12 grid gap-x-12 border-t border-[#181818]/70 sm:grid-cols-2">
          {company.globalHubs.map((hub) => (
            <li key={hub.country} className="flex items-baseline justify-between gap-6 border-b border-theme-border py-4">
              <span className="display text-xl font-semibold text-theme-primary">{hub.country}</span>
              <span className="text-sm text-theme-secondary">{hub.city}</span>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-theme-page">
        <div className="container grid items-center gap-10 border-t border-theme-border py-16 md:grid-cols-[1fr_minmax(0,22rem)] md:py-24">
          <Reveal>
            <p className="eyebrow">Mayfair</p>
            <h2 className="display mt-4 max-w-xl text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">
              Arrange a confidential conversation with our London team.
            </h2>
            <a href={`mailto:${company.email}`} className={`${linkClass} mt-8 inline-block`}>
              Email the London team →
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <Photo image={images.stuccoSash} ratio="aspect-[4/5]" sizes="(max-width: 768px) 100vw, 352px" zoom={false} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
