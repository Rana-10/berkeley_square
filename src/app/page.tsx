import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { HomeHero } from "@/components/home/HomeHero";
import { BSQLogo } from "@/components/ui/BSQLogo";
import { company, divisions } from "@/data/company";
import { financeOfferings, indicativeTermsNote } from "@/data/finance-offerings";

// Name, link and photograph come from one record per service (data/company.ts) so they can never drift apart.
const homeCopy: Record<string, { label: string; text: string; cta: string; position: string }> = {
  "/loans": { label: "Financial Services", text: "Tailored property finance for complex needs.", cta: "Explore financial services", position: "50% 60%" },
  "/property": { label: "Property Transactions", text: "Acquisitions, disposals and strategic advice.", cta: "Explore property", position: "50% 50%" },
  "/construction": { label: "Asset Management", text: "Active management for long-term value.", cta: "Explore asset management", position: "50% 55%" }
};

const expertise = divisions.map((division) => ({
  href: division.href,
  image: division.image,
  alt: homeCopy[division.href].label + ": architectural reference photograph",
  ...homeCopy[division.href]
}));

const steps = [
  { n: "01", title: "Understand", text: "We take the time to understand your objectives and constraints." },
  { n: "02", title: "Structure", text: "We develop a tailored solution, aligning finance, property and strategy." },
  { n: "03", title: "Deliver", text: "We execute with discipline, keeping you informed at every stage." }
];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#C43A31]">
      {children}
      <span aria-hidden className="h-px w-20 bg-[#C43A31]/70" />
    </p>
  );
}

function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="focus-ring group inline-flex items-center gap-2 border-b border-[#112A22] pb-1 text-sm text-[#112A22]">
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="select-none bg-[#F3EEE4] text-[#112A22]">
      <HomeHero />

      <section className="py-16 md:py-20">
        <div className="container">
          <Reveal>
            <Eyebrow>Our expertise</Eyebrow>
            <h2 className="display mt-5 text-[2.1rem] font-normal leading-tight sm:text-4xl md:text-[2.7rem]">Property insight. Financial perspective.</h2>
          </Reveal>

          <div className="mt-9 grid gap-x-7 gap-y-12 md:grid-cols-3">
            {expertise.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.08}>
                <Link href={item.href} className="focus-ring group block" aria-label={item.label} tabIndex={-1}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE5D9]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      quality={90}
                      style={{ objectPosition: item.position }}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>
                <h3 className="display mt-6 text-2xl font-normal">
                  <Link href={item.href} className="focus-ring">
                    {item.label}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] text-[#4A4844]">{item.text}</p>
                <div className="mt-5">
                  <TextLink href={item.href}>{item.cta}</TextLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#112A22] text-white md:min-h-[26rem] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
        <div className="flex items-center px-5 py-14 md:justify-end md:py-16 md:pl-[max(1.25rem,calc((100vw-1180px)/2))] md:pr-14">
          <Reveal className="max-w-sm">
            <span aria-hidden className="block h-px w-12 bg-white/60" />
            <h2 className="display mt-8 text-4xl font-normal leading-[1.08] md:text-5xl">Built around your deal.</h2>
            <p className="mt-7 text-[15px] leading-relaxed text-white/85">
              We take the time to understand your circumstances, objectives and challenges, providing considered advice and practical solutions across the property lifecycle.
            </p>
            <span aria-hidden className="mt-8 block h-px w-12 bg-white/60" />
          </Reveal>
        </div>
        <div className="relative min-h-[18rem]">
          <Image
            src="/images/uk/eton-high-street.webp"
            alt="A quiet Berkshire high street of red-brick Victorian buildings"
            fill
            sizes="(max-width: 768px) 100vw, 62vw"
            quality={90}
            className="object-cover"
          />
        </div>
      </section>

      <section className="pb-4 pt-16 md:pt-20">
        <div className="container">
          <Reveal>
            <Eyebrow>Funding</Eyebrow>
            <h2 className="display mt-5 max-w-2xl text-[2.1rem] font-normal leading-tight sm:text-4xl md:text-[2.7rem]">Finance structured to the deal.</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4A4844]">Each product has its own funding range and loan to value. Second-charge finance is available across bridging and mezzanine.</p>
          </Reveal>

          <div className="mt-9 border-t border-[#112A22]/70">
            <div className="hidden grid-cols-[minmax(0,1.7fr)_1fr_1fr_1.2fr] gap-8 border-b border-[#112A22]/15 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A4844] md:grid">
              <span>Product</span>
              <span>Funding range</span>
              <span>LTV</span>
              <span>Terms &amp; completion</span>
            </div>
            {financeOfferings.map((offering) => (
              <div key={offering.id} className="grid gap-x-8 gap-y-3 border-b border-[#112A22]/15 py-6 md:grid-cols-[minmax(0,1.7fr)_1fr_1fr_1.2fr]">
                <div>
                  <h3 className="display text-xl font-normal leading-snug">{offering.title}</h3>
                  <p className="mt-1.5 text-sm text-[#4A4844]">{offering.badge === "Speed & Agility" ? "Speed & Agility. " : ""}{offering.structure}</p>
                </div>
                <p className="text-[15px]"><span className="mr-2 text-[11px] uppercase tracking-[0.16em] text-[#4A4844] md:hidden">Range</span>{offering.facilitySize}</p>
                <p className="text-[15px]"><span className="mr-2 text-[11px] uppercase tracking-[0.16em] text-[#4A4844] md:hidden">LTV</span>{offering.ltv}</p>
                <p className="text-[15px]"><span className="mr-2 text-[11px] uppercase tracking-[0.16em] text-[#4A4844] md:hidden">Speed</span>{offering.speed}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-[#4A4844]">{indicativeTermsNote}</p>
          <div className="mt-6">
            <TextLink href="/loan-application">Start a loan enquiry</TextLink>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <Reveal>
            <Eyebrow>Our process</Eyebrow>
            <h2 className="display mt-5 text-[2.1rem] font-normal leading-tight sm:text-4xl md:text-[2.7rem]">A clear path forward.</h2>
          </Reveal>
          <ol className="mt-9 grid md:grid-cols-3">
            {steps.map((step, i) => (
              <li
                key={step.n}
                className={"flex gap-5 py-6 md:py-0 " + (i > 0 ? "border-t border-[#112A22]/15 md:border-l md:border-t-0 md:pl-8 " : "") + (i < 2 ? "md:pr-8" : "")}
              >
                <span className="display text-4xl font-normal leading-none text-[#C43A31]">{step.n}</span>
                <div>
                  <h3 className="display text-xl font-normal">{step.title}</h3>
                  <p className="mt-2 max-w-[17rem] text-sm leading-relaxed text-[#4A4844]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#112A22] text-white">
        <div className="container grid items-center gap-8 py-12 lg:grid-cols-[1.35fr_auto_1fr] lg:gap-12">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            <h2 className="display text-3xl font-normal leading-tight md:text-[2.2rem] xl:whitespace-nowrap">Let&rsquo;s discuss your next move.</h2>
            <Link
              href="/contact"
              className="focus-ring inline-flex items-center gap-3 bg-[#F3EEE4] px-6 py-3.5 text-sm font-medium text-[#112A22] transition-colors hover:bg-[#FAF7F1]"
            >
              Contact us <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="hidden border-l border-white/20 pl-12 lg:block">
            <BSQLogo variant="horizontal" theme="dark" size="sm" />
          </div>
          <address className="border-white/20 text-sm not-italic leading-relaxed text-white/85 lg:border-l lg:pl-10">
            <span className="block text-white">{company.name}</span>
            Mayfair, London W1J
            <br />
            <a href={`tel:${company.phone}`} className="transition-colors hover:text-white">
              {company.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-white">
              {company.email}
            </a>
          </address>
        </div>
      </section>
    </main>
  );
}
