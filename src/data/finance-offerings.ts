/** Approved finance offerings. Each product carries its own funding range; do not apply one range across them. */
export type FinanceOffering = {
  id: string;
  title: string;
  badge: string;
  facilitySize: string;
  ltv: string;
  speed: string;
  idealFor: string;
  structure: string;
  propertyType: string;
};

export const financeOfferings: FinanceOffering[] = [
  {
    id: "bridging",
    title: "Bespoke Bridging & Auction Debt",
    badge: "Speed & Agility",
    facilitySize: "£100k – £100M",
    ltv: "Up to 75% LTV",
    speed: "Indicative terms in 24–48 hrs · completion in 14 days",
    idealFor: "Broken chains, auction purchases, time-sensitive acquisitions, short lease extensions.",
    structure: "First or second charge, rolled-up interest, no early repayment penalties on selected lines.",
    propertyType: "Prime Residential & Commercial W1/SW1"
  },
  {
    id: "dev-stretch",
    title: "Development Stretch Senior",
    badge: "Maximum LTV",
    facilitySize: "£250k – £100M",
    ltv: "Up to 70% LTGDV / 88% LTC",
    speed: "Phased tranche drawdowns",
    idealFor: "Ground-up residential schemes, luxury conversions, heavy airspace extensions.",
    structure: "Senior debt with blended mezzanine tranche, fully rolled interest during build.",
    propertyType: "Multi-Unit Schemes & High-End Townhomes"
  },
  {
    id: "mezzanine",
    title: "Mezzanine & Equity Stretcher",
    badge: "Capital Optimization",
    facilitySize: "£500k – £10M",
    ltv: "Up to 90% Loan-to-Cost",
    speed: "Co-terminus with senior lenders",
    idealFor: "Developers seeking to minimize cash equity exposure across multiple live schemes.",
    structure: "Second-charge subordinated debt behind clearing banks or institutional senior lenders.",
    propertyType: "Mixed-Use & Prime Residential"
  },
  {
    id: "spv-offshore",
    title: "Offshore Trusts & Complex SPVs",
    badge: "High Net Worth",
    facilitySize: "£1M – £40M",
    ltv: "Up to 75% LTV",
    speed: "Discreet bespoke underwriting",
    idealFor: "International UHNW buyers, Jersey/Guernsey/BVI structures, non-UK resident borrowers.",
    structure: "Multi-jurisdictional security, non-recourse & limited guarantee facilities.",
    propertyType: "Mayfair, Belgravia & Prime London Freeholds"
  },
  {
    id: "commercial-refi",
    title: "Unregulated Residential and Commercial Refinance",
    badge: "Cashflow Release",
    facilitySize: "£100k – £100M",
    ltv: "Up to 70% LTV",
    speed: "Indicative terms in 24–48 hrs · completion in 2–3 weeks",
    idealFor: "Equity release, repositioning secondary offices into ESG workspace, mixed-use blocks.",
    structure: "Term facilities with interest-only options and flexible ICR hurdles.",
    propertyType: "City Office, Semi-Commercial & Retail"
  },
  {
    id: "planning-gain",
    title: "Planning Gain & Conversion Bridging",
    badge: "Value Creation",
    facilitySize: "£1M – £18M",
    ltv: "Up to 70% of Current Use Value",
    speed: "Seamless conversion into senior debt",
    idealFor: "Sites pending planning determination or Class MA permitted development conversions.",
    structure: "Short-term bridge that rolls into full development facility upon planning grant.",
    propertyType: "Unconsented Land & Commercial-to-Resi"
  }
];

/**
 * Two different things, always labelled differently:
 *  - indicative terms: a non-binding proposal, issued quickly
 *  - completion: funds actually released, which depends on valuation, legal work and credit approval
 */
export const financeTimelines = {
  indicativeTerms: "24–48 hrs",
  bridgingCompletion: "14 days",
  refinanceCompletion: "2–3 weeks"
} as const;

export const indicativeTermsNote =
  "Indicative terms are non-binding and issued within 24–48 hours. Completion is when funds are released: bridging can complete in 14 days from instruction, subject to valuation, legal work and credit approval.";
