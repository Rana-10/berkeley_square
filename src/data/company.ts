import {
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Crown,
  Globe2,
  Hammer,
  Handshake,
  HeartHandshake,
  Landmark,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Zap
} from "lucide-react";

export const company = {
  name: "Berkeley Square Capital",
  legalName: "BERKELEY SQUARE CAPITAL (LONDON) LTD",
  shortName: "BSQ",
  tagline: "Your Global Partner in Real Estate & Finance",
  brandPillars: "Fast. Trusted. Bespoke.",
  secondaryPillars: "Trusted. Professional. Results-Driven.",
  slogan:
    "Delivering seamless cross-border real estate and financial solutions to private clients, investors, developers, and institutions worldwide.",
  establishedYear: 2015,
  phone: "+447930472993",
  phoneDisplay: "+44 7930 472993",
  email: "Info@bsqcap.com",
  whatsapp: "https://wa.me/447930472993",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Berkeley+Square+House,+Berkeley+Square,+London+W1J+6BD,+United+Kingdom",
  tradingAddress: "Berkeley Square House, Berkeley Square, London W1J 6BD, United Kingdom",
  registeredAddress: "85 Great Portland Street, First Floor, London, W1W 7LT",
  address: "Berkeley Square House, Berkeley Square, London W1J 6BD, United Kingdom",
  mapEmbed:
    "https://www.google.com/maps?q=Berkeley%20Square%20House,%20Berkeley%20Square,%20London%20W1J%206BD,%20United%20Kingdom&output=embed",

  mission:
    "To provide fast, flexible, and tailored real estate and property finance solutions that empower clients to identify opportunities, achieve their investment objectives, and build long-term value through trusted advice and exceptional service.",

  philosophy:
    "At Berkeley Square Capital, we believe successful property investment is built on trust, expertise, and long-term partnerships. Our philosophy is to provide practical, tailored solutions that simplify complex transactions, enabling clients to seize opportunities with confidence. By combining market insight with a client-first approach, we aim to deliver sustainable value and support our clients throughout every stage of their property investment journey.",

  marketsServed: {
    uk: "Nationwide real estate and property finance solutions throughout England, Scotland, Wales, and Northern Ireland.",
    international: "Key global markets across Europe, the Middle East, the United States, and Asia."
  },

  globalHubs: [
    { country: "United Kingdom", city: "London (HQ)", flags: ["gb"] },
    { country: "United Arab Emirates", city: "Dubai", flags: ["ae"] },
    { country: "Saudi Arabia", city: "Riyadh", flags: ["sa"] },
    { country: "Oman", city: "Muscat", flags: ["om"] },
    { country: "Cyprus", city: "Limassol & Nicosia", flags: ["cy"] },
    { country: "Greece", city: "Athens", flags: ["gr"] },
    { country: "Spain", city: "Madrid & Marbella", flags: ["es"] },
    { country: "United States", city: "New York & Miami", flags: ["us"] },
    { country: "Far East Asia", city: "Singapore, Hong Kong & Tokyo", flags: ["sg", "hk", "jp"] },
    { country: "Pakistan", city: "Islamabad & Lahore", flags: ["pk"] }
  ],

  contactLinks: [
    { label: "Call Mayfair Office", href: "tel:+447930472993", icon: Phone },
    { label: "Email Mayfair Office", href: "mailto:Info@bsqcap.com", icon: Mail },
    {
      label: "Google Maps Location",
      href:
        "https://www.google.com/maps/search/?api=1&query=Berkeley+Square+House,+Berkeley+Square,+London+W1J+6BD,+United+Kingdom",
      icon: MapPin
    }
  ]
};

export const clientJourney = [
  {
    step: 1,
    title: "Enquiry & Consultation",
    icon: Send,
    timeframe: "Within 3 Days",
    summary:
      "Tell us your goals, budget and timeline. A senior member of the team responds within 24 hours to understand what you need.",
    actions: ["Confidential discussion", "Goals & timeline scoping", "Preliminary suitability check"]
  },
  {
    step: 2,
    title: "Strategy & Proposal",
    icon: Layers,
    timeframe: "2–7 Business Days",
    summary:
      "We shape a tailored plan, sourcing suitable properties where needed, and send a clear proposal setting out structure, costs and timings.",
    actions: ["Off-market sourcing (if required)", "Transparent term sheet", "Full fee & cost breakdown"]
  },
  {
    step: 3,
    title: "Due Diligence & Funding",
    icon: Scale,
    timeframe: "1–3 Weeks",
    summary:
      "Legal, financial and property checks are completed while we coordinate lenders, solicitors and valuers to keep things moving.",
    actions: ["Valuation & surveyor instruction", "Title & legal search review", "Lender sign-off"]
  },
  {
    step: 4,
    title: "Completion",
    icon: Landmark,
    timeframe: "From 7 Days",
    summary:
      "Funds are released and the purchase or refinance completes. Bridging can complete in as little as 7 days; acquisitions typically take 2–8 weeks.",
    actions: ["Funds drawdown & transfer", "Legal completion & registry", "Asset handover & transition"]
  },
  {
    step: 5,
    title: "Ongoing Relationship",
    icon: Handshake,
    timeframe: "Continuous Support",
    summary:
      "After completion we continue to support you with rental management, refinancing and portfolio advice.",
    actions: ["Portfolio performance monitoring", "Refinancing & exit execution", "Long-term wealth enhancement"]
  }
];

export const typicalServiceTimeframes = [
  { service: "Initial Response", time: "Within 24 Hours", note: "Direct response from an advisory partner" },
  { service: "Initial Consultation", time: "1–3 Business Days", note: "Arranged via telephone, video, or in-person Mayfair" },
  { service: "Indicative Funding Proposal", time: "2–5 Business Days", note: "Subject to receipt of required transaction information" },
  { service: "Agreement in Principle (AIP)", time: "3–7 Business Days", note: "Where applicable following financial assessment" },
  { service: "Due Diligence & Documentation", time: "1–3 Weeks", note: "Depending on transaction and legal structure complexity" },
  { service: "Bridging Finance Completion", time: "7–21 Days", note: "Where documentation is in place (subject to due diligence)" },
  { service: "Property Acquisition Completion", time: "2–8 Weeks", note: "Depending on legal processes, funding, and asset nature" },
  { service: "Post-Completion Support", time: "Ongoing Lifecycle", note: "Property management, refinancing & portfolio advisory" }
];

export const coreValues = [
  {
    title: "Integrity",
    description: "We build lasting relationships through honesty, transparency, and accountability.",
    icon: Scale
  },
  {
    title: "Excellence",
    description: "We strive to deliver the highest standards of professionalism and service in every client engagement.",
    icon: Sparkles
  },
  {
    title: "Innovation",
    description: "We embrace forward-thinking solutions to meet the evolving needs of investors and property owners.",
    icon: Lightbulb
  },
  {
    title: "Client Focus",
    description: "Our clients are at the heart of everything we do, with solutions tailored to their individual goals.",
    icon: HeartHandshake
  },
  {
    title: "Efficiency",
    description: "We are committed to delivering responsive, streamlined processes that help clients act quickly and confidently.",
    icon: Zap
  }
];

export const targetClients = [
  {
    title: "Individual Investors",
    icon: TrendingUp,
    badge: "Portfolio Growth",
    description: "Private clients seeking to build or diversify their property portfolios through residential or commercial real estate investments.",
    capabilities: ["Residential & BTL acquisitions", "High-yield commercial assets", "Refinancing & equity release"]
  },
  {
    title: "Property Developers",
    icon: Hammer,
    badge: "Project Funding",
    description: "Developers requiring bridging finance, development funding, or strategic financial solutions for residential, commercial, or mixed-use schemes.",
    capabilities: ["Ground-up development finance", "Heavy refurbishment & conversions", "Auction & acquisition bridging"]
  },
  {
    title: "Business Owners & Entrepreneurs",
    icon: Briefcase,
    badge: "Commercial Growth",
    description: "Companies and entrepreneurs looking for flexible property finance, commercial real estate acquisitions, or investment opportunities to support business expansion.",
    capabilities: ["Owner-occupier commercial mortgages", "Business liquidity & bridging", "Asset-backed capital structuring"]
  },
  {
    title: "High-Net-Worth Individuals (HNWIs)",
    icon: Crown,
    badge: "Wealth Preservation",
    description: "Clients seeking bespoke property investment opportunities, wealth preservation, and long-term capital growth with absolute discretion.",
    capabilities: ["Prime Central London acquisitions", "Off-market trophy assets", "Cross-border wealth advisory"]
  },
  {
    title: "International Investors",
    icon: Globe2,
    badge: "Cross-Border Access",
    description: "Overseas investors looking to access prime property opportunities and competitive financing across the UK and selected global markets.",
    capabilities: ["Overseas buyer mortgage structures", "SPV & offshore structuring", "Turnkey rental & asset management"]
  }
];

export const keyDifferentiators = [
  {
    title: "Fast, Responsive Decision-Making",
    description: "Designed to help clients secure time-sensitive property opportunities in competitive auction and private treaty markets.",
    icon: Zap
  },
  {
    title: "Flexible, Structured Financing",
    description: "Tailored bridging finance and investment structures engineered specifically around each individual transaction.",
    icon: Landmark
  },
  {
    title: "International Reach",
    description: "Seamless access to property opportunities and financing across the UK, Europe, the Middle East, the USA, and Asia.",
    icon: Globe2
  },
  {
    title: "End-to-End Service Model",
    description: "Complete support across the entire property lifecycle, including sourcing, funding, acquisition, and ongoing asset management.",
    icon: ShieldCheck
  },
  {
    title: "Bespoke Transaction Engineering",
    description: "Each deal is structured as a custom financial solution, combining funding, investment strategy, and execution into a single coordinated process.",
    icon: Building2
  },
  {
    title: "Client-Centric Philosophy",
    description: "Solutions engineered around individual investors, developers, entrepreneurs, and high-net-worth families.",
    icon: Users
  }
];

export const divisions = [
  {
    name: "Financial Services",
    shortName: "BSQ Finance",
    href: "/loans",
    icon: Landmark,
    summary:
      "Tailor-made bridging finance, structured development lending, and international mortgage solutions for fast, flexible transaction execution.",
    image: "/images/uk/portland-stone-portico.webp",
    services: [
      "Bridging Loan Specialist (Auction, Distressed, Fast Liquidity)",
      "Commercial Finance Specialist (Offices, Retail, Mixed-Use & Portfolios)",
      "Development Finance Specialist (New Builds, Conversions, Refurbishments)",
      "Buy-to-Let Mortgage Specialist (HMOs, MUFBs, SPVs & Expat Portfolios)"
    ]
  },
  {
    name: "Property Transactions",
    shortName: "BSQ Property",
    href: "/property",
    icon: Building2,
    summary:
      "Strategic acquisition sourcing and market-aligned sales & disposal for prime residential, commercial, and investment assets.",
    image: "/images/uk/victorian-terracotta-corner.webp",
    services: [
      "Acquisition (Strategic Sourcing & End-to-End Support)",
      "Sales & Disposal (Valuation & Rapid Completion Management)",
      "Commercial & Prime Residential Advisory"
    ]
  },
  {
    name: "Asset & Portfolio Management",
    shortName: "BSQ Asset Management",
    href: "/construction",
    icon: ShieldCheck,
    summary:
      "Full rental management, tenant vetting, maintenance care, regulatory compliance, and strategic multi-market portfolio rebalancing.",
    image: "/images/uk/thames-townhouses.webp",
    services: [
      "Rental Management (Tenant Vetting, Rent Collection & Care)",
      "Portfolio Management (Performance Monitoring & Asset Rebalancing)",
      "Cross-Border Property Care & Long-Term Value Enhancement"
    ]
  }
];

export const stats = [
  { label: "Established Track Record", value: "2015" },
  { label: "Global Operational Hubs", value: "10" },
  { label: "Completed Facilities", value: "£350M+" },
  { label: "Cross-Border Markets", value: "UK · MENA · Europe · USA · Asia" }
];

export const values = [
  "Senior-Led Governance",
  "Tailored Capital Structuring",
  "Rapid & Flexible Execution",
  "Global Reach, Local Expertise",
  "Cross-Border Compliance",
  "End-to-End Property Lifecycle"
];
