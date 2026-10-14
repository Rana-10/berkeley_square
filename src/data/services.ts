export type ServiceGroup = {
  division: string;
  href: string;
  intro: string;
  services: {
    title: string;
    description: string;
    highlights: string[];
  }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    division: "Financial Services",
    href: "/loans",
    intro:
      "Fast, flexible, and tailor-made debt structuring for investors, developers, and private clients across the UK and selected international markets.",
    services: [
      {
        title: "Bridging Loan Specialist",
        description:
          "Market-leading bridging finance engineered for rapid execution. Renowned for completing transactions when timing is critical, providing the ideal solution for auction purchases, distressed sales, and fast liquidity.",
        highlights: [
          "1st and 2nd charge facility security structures (£100k – £100M)",
          "14-day completion pathways & auction execution",
          "100% rolled-up interest options (no monthly servicing)",
          "Cross-collateralisation & multi-asset security"
        ]
      },
      {
        title: "Commercial Finance Specialist",
        description:
          "Structured commercial property debt for prime offices, mixed-use buildings, retail parades, industrial units, and semi-commercial assets across London and UK gateways.",
        highlights: [
          "Prime office buildings & industrial logistics parks",
          "Mixed-use development & high street commercial",
          "Commercial portfolio refinancing & equity extraction",
          "Interest-only and capital repayment facilities"
        ]
      },
      {
        title: "Development Finance Specialist",
        description:
          "Structured lending for ground-up new builds, conversions, heavy refurbishments, and mixed-use schemes at every phase of construction.",
        highlights: [
          "Staged drawdowns tied to QS sign-off",
          "Up to 70% LTGDV / 88% LTC gearing",
          "Permitted Development (Class MA) schemes",
          "Mezzanine & stretch senior tranches"
        ]
      },
      {
        title: "Buy-to-Let Mortgage Specialist",
        description:
          "Tailored buy-to-let mortgage solutions for portfolio landlords, HMOs, MUFBs, and international buyers expanding UK property investments.",
        highlights: [
          "HMOs & Multi-Unit Freehold Blocks (MUFBs)",
          "UK SPV Limited Company & offshore trust borrowing",
          "Expat & foreign national investor access",
          "Competitive long-term fixed & tracker rates"
        ]
      }
    ]
  },
  {
    division: "Property Transactions",
    href: "/property",
    intro:
      "Strategic acquisition sourcing and disciplined sales execution for prime residential, commercial, and investment assets across our core global markets.",
    services: [
      {
        title: "Acquisition Advisory",
        description:
          "Strategic sourcing and end-to-end purchase support for prime residential, commercial, and high-yielding investment assets across all core markets.",
        highlights: [
          "Off-market opportunity access",
          "Commercial & residential due diligence",
          "Comprehensive deal structuring & negotiation",
          "Cross-border investor advisory"
        ]
      },
      {
        title: "Sales & Disposal",
        description:
          "Market-aligned valuation, targeted international marketing, and efficient transaction management to maximise asset value and speed of completion.",
        highlights: [
          "Discreet private-client marketing",
          "Targeted global buyer network",
          "Valuation alignment & pricing strategy",
          "Expedited legal & closing management"
        ]
      }
    ]
  },
  {
    division: "Asset & Portfolio Management",
    href: "/construction",
    intro:
      "End-to-end property care, tenancy administration, regulatory compliance, and strategic multi-market portfolio enhancement.",
    services: [
      {
        title: "Rental Management",
        description:
          "Full tenant vetting, rent collection, proactive maintenance coordination, statutory regulatory compliance, and day-to-day property care.",
        highlights: [
          "Rigorous corporate & private tenant vetting",
          "Automated rent collection & accounting",
          "24/7 maintenance & contractor governance",
          "Full UK & international statutory compliance"
        ]
      },
      {
        title: "Portfolio Management",
        description:
          "Strategic planning, performance monitoring, asset rebalancing, and long-term capital value enhancement for single and multi-market real estate holdings.",
        highlights: [
          "Cross-border multi-asset performance reviews",
          "Capital rebalancing & yield optimisation",
          "Refurbishment & repositioning strategies",
          "Long-term value creation & exit planning"
        ]
      }
    ]
  }
];
