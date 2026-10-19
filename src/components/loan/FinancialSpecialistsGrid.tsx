import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Photo } from "@/components/editorial/Photo";
import { images, type SiteImage } from "@/data/images";

export const financialSpecialists: {
  id: string;
  title: string;
  tagline: string;
  facilityRange: string;
  maxLtv: string;
  speed: string;
  overview: string;
  highlights: string[];
  ctaText: string;
  loanTypeParam: string;
  image: SiteImage;
}[] = [
  {
    id: "bridging-loan-specialist",
    title: "Bridging Loan Specialist",
    tagline: "Ultra-fast liquidity and time-critical property acquisition",
    facilityRange: "£100k – £100M",
    maxLtv: "Up to 75% LTV",
    speed: "Indicative terms in 24–48 hrs · completion in 14 days",
    overview:
      "Market-leading bridging finance engineered for fast execution. Renowned for completing transactions when conventional lenders cannot meet critical deadlines.",
    highlights: [
      "2nd charge facility security structures",
      "Auction purchases with guaranteed completion pathways",
      "100% rolled-up interest options (no monthly servicing required)",
      "Cross-collateralisation & foreign national HNWI structures"
    ],
    ctaText: "Apply for bridging finance",
    loanTypeParam: "bridging",
    image: images.unionFlagPediment
  },
  {
    id: "commercial-finance-specialist",
    title: "Commercial Finance Specialist",
    tagline: "Prime offices, mixed-use freeholds, retail and industrial assets",
    facilityRange: "£100k – £100M",
    maxLtv: "Up to 70% LTV",
    speed: "Indicative terms in 24–48 hrs · completion in 2–3 weeks",
    overview:
      "Structured commercial property debt across owner-occupier, investment commercial, and semi-commercial assets across London and UK gateway hubs.",
    highlights: [
      "Prime office buildings, industrial parks & logistics facilities",
      "Mixed-use development portfolios & high street commercial",
      "Commercial portfolio refinancing & equity release lines",
      "Interest-only and capital-and-interest long-term debt"
    ],
    ctaText: "Structure commercial debt",
    loanTypeParam: "commercial",
    image: images.brickCorner
  },
  {
    id: "development-finance-specialist",
    title: "Development Finance Specialist",
    tagline: "Ground-up new builds, heavy refurbishments and conversions",
    facilityRange: "£250k – £100M",
    maxLtv: "Up to 70% LTGDV / 88% LTC",
    speed: "Staged QS drawdowns",
    overview:
      "Comprehensive development funding solutions supporting developers from planning through construction, fit-out, and exit refinancing.",
    highlights: [
      "Senior, stretched senior & mezzanine development tranches",
      "Permitted Development (Class MA) & airspace additions",
      "Staged tranche drawdowns aligned with QS monitoring reports",
      "Developer exit bridging to allow orderly unit sales"
    ],
    ctaText: "Finance a development project",
    loanTypeParam: "development",
    image: images.brickBay
  },
  {
    id: "buy-to-let-mortgage-specialist",
    title: "Buy-to-Let Mortgage Specialist",
    tagline: "Prime portfolios, HMOs, MUFBs and expat/offshore SPV facilities",
    facilityRange: "£150k – £20M+",
    maxLtv: "Up to 80% LTV",
    speed: "Fixed & tracker lines",
    overview:
      "Tailored mortgage solutions for residential landlords, professional property investors, and international buyers expanding UK rental portfolios.",
    highlights: [
      "HMOs (Houses in Multiple Occupation) & Multi-Unit Freehold Blocks (MUFBs)",
      "UK Limited Company (SPV), LLP, & offshore trust borrowing",
      "Expat & foreign national investor mortgage pathways",
      "Portfolio aggregation & large-scale capital refinancing"
    ],
    ctaText: "Explore buy-to-let mortgages",
    loanTypeParam: "mortgage",
    image: images.stuccoSash
  }
];

/**
 * Product schedule: one ruled entry per discipline, photograph left, key terms as a definition list.
 * Replaces the four boxed product panels.
 */
export function FinancialSpecialistsGrid() {
  return (
    <div className="border-t border-[#181818]/70" id="specialist-divisions">
      {financialSpecialists.map((spec) => (
        <Reveal key={spec.id}>
          <article className="grid gap-8 border-b border-theme-border py-12 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-12 lg:grid-cols-[minmax(0,19rem)_1fr_minmax(0,18rem)]">
            <Photo image={spec.image} ratio="aspect-[4/5]" sizes="(max-width: 768px) 100vw, 300px" zoom={false} />

            <div>
              <h3 className="display text-3xl font-semibold leading-tight text-theme-primary">{spec.title}</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-legacy-red">{spec.tagline}</p>
              <p className="mt-5 leading-relaxed text-theme-secondary">{spec.overview}</p>

              <ul className="mt-6 divide-y divide-theme-border border-y border-theme-border text-sm text-theme-secondary">
                {spec.highlights.map((item) => (
                  <li key={item} className="py-2.5 leading-snug">
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/loan-application?type=${spec.loanTypeParam}`}
                className="focus-ring mt-7 inline-block border-b border-theme-primary pb-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red"
              >
                {spec.ctaText} →
              </Link>
            </div>

            <dl className="divide-y divide-theme-border border-y border-[#181818]/70 text-sm md:col-span-2 lg:col-span-1 lg:self-start">
              {[
                ["Facility size", spec.facilityRange],
                ["Gearing", spec.maxLtv],
                ["Timeline", spec.speed]
              ].map(([term, value]) => (
                <div key={term} className="py-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-theme-muted">{term}</dt>
                  <dd className="display mt-1 text-xl font-semibold text-theme-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
