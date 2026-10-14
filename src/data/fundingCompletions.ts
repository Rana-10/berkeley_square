export interface CompletedDeal {
  id: string;
  amount: string;
  numericAmount: number;
  type: "Bridging" | "Development" | "Refinancing" | "Commercial" | "Acquisition";
  location: string;
  ltv: string;
  timeframe: string;
  summary: string;
  status: "Completed" | "Drawdown Complete" | "Facility Live";
  gdv?: string;
  date: string;
}

export const completedDeals: CompletedDeal[] = [
  {
    id: "deal-1",
    amount: "£6,400,000",
    numericAmount: 6400000,
    type: "Bridging",
    location: "Mayfair, London W1K",
    ltv: "72%",
    timeframe: "8 Days to Completion",
    summary: "Time-critical acquisition bridging facility securing a prime residential asset ahead of institutional auction.",
    status: "Completed",
    date: "August 2026"
  },
  {
    id: "deal-2",
    amount: "£12,750,000",
    numericAmount: 12750000,
    type: "Development",
    location: "Kensington & Chelsea, SW7",
    ltv: "65% LTGDV",
    timeframe: "Drawdown Tranche 1",
    summary: "Senior debt package funding a luxury 6-unit residential conversion with £24M gross development value.",
    status: "Facility Live",
    gdv: "£24,000,000",
    date: "July 2026"
  },
  {
    id: "deal-3",
    amount: "£3,850,000",
    numericAmount: 3850000,
    type: "Commercial",
    location: "City of London, EC2",
    ltv: "68%",
    timeframe: "14 Days Execution",
    summary: "Refinancing and working capital release for a boutique office repositioning into high-end ESG workspace.",
    status: "Completed",
    date: "June 2026"
  },
  {
    id: "deal-4",
    amount: "£8,200,000",
    numericAmount: 8200000,
    type: "Refinancing",
    location: "North West & Midlands Portfolio",
    ltv: "62%",
    timeframe: "Full Debt Restructure",
    summary: "Comprehensive facility restructuring across 14 commercial units, lowering weighted average cost of capital.",
    status: "Drawdown Complete",
    date: "May 2026"
  },
  {
    id: "deal-5",
    amount: "£2,100,000",
    numericAmount: 2100000,
    type: "Acquisition",
    location: "Belgravia, London SW1",
    ltv: "75%",
    timeframe: "5 Days from Term Sheet",
    summary: "Rapid completion facility preventing chain break on prime freehold townhome purchase.",
    status: "Completed",
    date: "April 2026"
  },
  {
    id: "deal-6",
    amount: "£15,500,000",
    numericAmount: 15500000,
    type: "Development",
    location: "Marylebone, London W1U",
    ltv: "68% LTGDV",
    timeframe: "Mezzanine & Senior",
    summary: "Structured co-funding facility for a landmark mixed-use scheme with ground floor retail and luxury penthouses.",
    status: "Facility Live",
    gdv: "£32,000,000",
    date: "March 2026"
  }
];

export const completionStats = [
  {
    label: "Total Funding Facilitated",
    value: 350,
    prefix: "£",
    suffix: "M+",
    caption: "Across prime residential, commercial & development schemes"
  },
  {
    label: "Term Sheet Delivery Rate",
    value: 100,
    prefix: "",
    suffix: "%",
    caption: "Honoured funding terms on approved security appraisals"
  },
  {
    label: "Average Decision Window",
    value: 48,
    prefix: "< ",
    suffix: " hrs",
    caption: "Senior-led indicative underwriting turnaround"
  },
  {
    label: "Gross Pipeline Appraised",
    value: 1.2,
    prefix: "£",
    suffix: "B+",
    caption: "UK property assets evaluated since group inception"
  }
];
