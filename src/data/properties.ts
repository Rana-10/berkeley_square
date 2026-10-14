export type PropertyStatus = "Available" | "Available for Sale" | "Available for Rent" | "Under Offer" | "Sold" | "Rented" | "Draft" | "Off-Market Exclusive" | "Recently Completed";
export type PropertyCategory = "Prime Residential" | "Commercial Freehold" | "Mixed-Use Development" | "Super-Prime Mayfair";

export interface AmenityCategory {
  category: string;
  items: string[];
}

export interface NearbyPoint {
  name: string;
  distance: string;
  type: "transport" | "airport" | "shopping" | "landmark";
}

export interface PropertyItem {
  id: string;
  referenceCode: string;
  title: string;
  slug: string;
  price: number;
  priceDisplay: string;
  priceType: "Guide Price" | "Offers in Region of" | "Price on Application" | "Acquisition Value";
  status: PropertyStatus;
  category: PropertyCategory;
  location: string;
  addressLine?: string;
  city: string;
  postcode: string;
  featuredImage: string;
  gallery: string[];
  specs: {
    bedrooms: number;
    bathrooms: number;
    areaSqFt: number;
    tenure: string;
    epcRating?: string;
  };
  highlights: string[];
  description: string;
  extendedOverview?: string | string[];
  amenities?: string[];
  indicativeFinance: {
    maxLtv: string;
    estimatedBridgingRate: string;
    facilityType: string;
  };
  featured?: boolean;
}

export const propertyListings: PropertyItem[] = [
  {
    id: "bsc-prop-01",
    referenceCode: "BSQ-MAY-0101",
    title: "The Grosvenor Penthouse & Sky Garden",
    slug: "grosvenor-penthouse-sky-garden",
    price: 18500000,
    priceDisplay: "£18,500,000",
    priceType: "Guide Price",
    status: "Available",
    category: "Super-Prime Mayfair",
    location: "Grosvenor Square, Mayfair",
    city: "London",
    postcode: "W1K 2HP",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 4850,
      tenure: "Share of Freehold (999 yr lease)",
      epcRating: "B"
    },
    highlights: [
      "Panoramic 360° views across Mayfair and Hyde Park",
      "Direct keyed biometric lift access into private reception",
      "24/7 Uniformed concierge, valet parking, and lifestyle team",
      "Private wrap-around heated terrace & outdoor kitchen",
      "Custom Italian marble surfaces & Gaggenau culinary suite"
    ],
    description:
      "Commanding an unrivaled position directly overlooking Grosvenor Square, this lateral penthouse represents the pinnacle of contemporary Mayfair living. Engineered with double-height volume, bespoke bronze fenestration, and state-of-the-art climate acoustic filtration, this residence offers an exceptional family sanctuary or prime international pied-à-terre.",
    indicativeFinance: {
      maxLtv: "Up to 75% LTV",
      estimatedBridgingRate: "from 0.52% pm",
      facilityType: "Super-Prime Residential Bridge / Private Bank Term"
    },
    featured: true
  },
  {
    id: "bsc-prop-02",
    referenceCode: "BSQ-KBG-0204",
    title: "Knightsbridge Private Villa & Mews",
    slug: "knightsbridge-private-villa-mews",
    price: 24750000,
    priceDisplay: "£24,750,000",
    priceType: "Guide Price",
    status: "Off-Market Exclusive",
    category: "Prime Residential",
    location: "Ennismore Gardens, Knightsbridge",
    city: "London",
    postcode: "SW7 1AA",
    featuredImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      areaSqFt: 7200,
      tenure: "Freehold",
      epcRating: "C"
    },
    highlights: [
      "Substantial Grade II listed stucco-fronted family mansion",
      "Interconnected rear mews house with private garage for 3 cars",
      "Subterranean wellness suite: 12m ozone swimming pool & steam room",
      "Direct access into private communal ornamental gardens",
      "Full bespoke smart-home automation & integrated security"
    ],
    description:
      "A rare opportunity to acquire a substantial freehold trophy residence in prime Knightsbridge. Discreetly offered on an off-market basis through Berkeley Square Capital's private acquisition desk, featuring extensive entertaining proportions, high ceilings, and seamless connection to a private rear mews.",
    indicativeFinance: {
      maxLtv: "Up to 70% LTV",
      estimatedBridgingRate: "from 0.49% pm",
      facilityType: "Acquisition Debt / Lombard Facility"
    },
    featured: true
  },
  {
    id: "bsc-prop-03",
    referenceCode: "BSQ-BEL-0312",
    title: "Belgravia Regency Mansion House",
    slug: "belgravia-regency-mansion-house",
    price: 14200000,
    priceDisplay: "£14,200,000",
    priceType: "Offers in Region of",
    status: "Under Offer",
    category: "Prime Residential",
    location: "Chester Square, Belgravia",
    city: "London",
    postcode: "SW1W 9HR",
    featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 5,
      bathrooms: 5,
      areaSqFt: 5120,
      tenure: "Freehold",
      epcRating: "B"
    },
    highlights: [
      "Historic white stucco Regency architecture",
      "First-floor grand drawing room with floor-to-ceiling French doors",
      "Passenger lift serving all 5 floors",
      "Private south-facing walled courtyard garden",
      "Master bedroom suite occupying the entire second floor"
    ],
    description:
      "Exemplifying the understated grandeur of Chester Square, this fully renovated townhouse combines timeless period proportions with contemporary engineering. Fully furnished by an award-winning British interior house.",
    indicativeFinance: {
      maxLtv: "Up to 75% LTV",
      estimatedBridgingRate: "from 0.55% pm",
      facilityType: "Auction & Fast Acquisition Bridge"
    },
    featured: false
  },
  {
    id: "bsc-prop-04",
    referenceCode: "BSQ-MRY-0418",
    title: "Marylebone Mixed-Use Portfolio & Freehold",
    slug: "marylebone-mixed-use-freehold",
    price: 32000000,
    priceDisplay: "£32,000,000",
    priceType: "Guide Price",
    status: "Available",
    category: "Mixed-Use Development",
    location: "Marylebone High Street, Marylebone",
    city: "London",
    postcode: "W1U 5JU",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 12,
      bathrooms: 14,
      areaSqFt: 18450,
      tenure: "Freehold",
      epcRating: "A"
    },
    highlights: [
      "Fully leased prime high-street commercial retail anchor",
      "12 luxury residential apartments on upper floors with strong rental yields",
      "Total current passing roll: £1,840,000 per annum (5.75% Net Yield)",
      "Unimplemented planning consent for rooftop penthouse extension",
      "Institutional covenant strength across all retail leases"
    ],
    description:
      "A flagship prime Central London mixed-use asset situated in one of the capital's most resilient village locations. Providing immediate diversified income combined with tangible asset management upside through permitted development additions.",
    indicativeFinance: {
      maxLtv: "Up to 68% LTV",
      estimatedBridgingRate: "from 0.50% pm",
      facilityType: "Commercial Senior Debt & Mezzanine Facility"
    },
    featured: true
  },
  {
    id: "bsc-prop-05",
    referenceCode: "BSQ-CIT-0522",
    title: "City of London Commercial Office Freehold",
    slug: "city-of-london-commercial-freehold",
    price: 45000000,
    priceDisplay: "£45,000,000",
    priceType: "Guide Price",
    status: "Available",
    category: "Commercial Freehold",
    location: "Finsbury Square / Moorgate",
    city: "London",
    postcode: "EC2A 1HD",
    featuredImage: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 6,
      bathrooms: 8,
      areaSqFt: 34500,
      tenure: "Freehold",
      epcRating: "A"
    },
    highlights: [
      "Grade-A modern office specification with BREEAM Excellent rating",
      "Prime proximity to Elizabeth Line & Moorgate Interchange",
      "Multi-let to international fintech and corporate legal tenants",
      "Weighted Average Unexpired Lease Term (WAULT) of 7.8 years",
      "Communal landscaped roof terrace with City skyline vistas"
    ],
    description:
      "A premium commercial asset in the heart of London's financial district. Ideal for international institutions, sovereign capital funds, and family offices seeking capital preservation and steady inflation-hedged yields.",
    indicativeFinance: {
      maxLtv: "Up to 65% LTV",
      estimatedBridgingRate: "from 0.48% pm",
      facilityType: "Syndicated Commercial Debt Package"
    },
    featured: false
  },
  {
    id: "bsc-prop-06",
    referenceCode: "BSQ-DXB-0608",
    title: "Palm Jumeirah Water-Front Sky Mansion",
    slug: "palm-jumeirah-waterfront-sky-mansion",
    price: 21500000,
    priceDisplay: "£21,500,000",
    priceType: "Price on Application",
    status: "Available",
    category: "Prime Residential",
    location: "Palm Jumeirah Crescent",
    city: "Dubai",
    postcode: "UAE",
    featuredImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      areaSqFt: 8650,
      tenure: "Freehold",
      epcRating: "A"
    },
    highlights: [
      "Private infinity pool suspended over the Arabian Gulf",
      "Direct private beach access and superyacht mooring rights",
      "High-spec automation with Japanese-engineered zero-glare glazing",
      "Zero UAE income or capital gains tax environment",
      "Cross-border structuring via Berkeley Square Capital Dubai & Mayfair"
    ],
    description:
      "Exclusive waterfront mansion offering unrestricted skyline vistas of Dubai Marina. Facilitated through our London Mayfair & Dubai regional desks with bespoke cross-border mortgage and escrow structuring.",
    indicativeFinance: {
      maxLtv: "Up to 70% LTV",
      estimatedBridgingRate: "from 0.58% pm",
      facilityType: "International HNWI Mortgage / Cross-Border Line"
    },
    featured: true
  },
  {
    id: "bsc-prop-07",
    referenceCode: "BSQ-KEN-0715",
    title: "Kensington Palace Green Garden Villa",
    slug: "kensington-palace-green-garden-villa",
    price: 16800000,
    priceDisplay: "£16,800,000",
    priceType: "Guide Price",
    status: "Recently Completed",
    category: "Super-Prime Mayfair",
    location: "Kensington Palace Gardens Vicinity",
    city: "London",
    postcode: "W8 4PX",
    featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 5,
      bathrooms: 5,
      areaSqFt: 5800,
      tenure: "Freehold",
      epcRating: "B"
    },
    highlights: [
      "Discreet location adjacent to Royal Parks",
      "Secluded 90ft landscaped private rear garden with pavilion",
      "Underground secure garage with automotive turntable",
      "Private spa, gym, and temperature-controlled wine cellar",
      "Successfully funded and completed via Berkeley Square Capital bridging facility"
    ],
    description:
      "A completed prime residence structured and transacted through Berkeley Square Capital. Illustrating our end-to-end capability from fast-track acquisition funding to final asset realization.",
    indicativeFinance: {
      maxLtv: "Completed Transaction",
      estimatedBridgingRate: "Fully Deployed",
      facilityType: "7-Day Bridging Facility into Term Refinance"
    },
    featured: false
  },
  {
    id: "bsc-prop-08",
    referenceCode: "BSQ-MAY-0820",
    title: "Berkeley Square Boutique Office & Gallery",
    slug: "berkeley-square-boutique-office",
    price: 19500000,
    priceDisplay: "£19,500,000",
    priceType: "Guide Price",
    status: "Available",
    category: "Commercial Freehold",
    location: "Berkeley Square, Mayfair",
    city: "London",
    postcode: "W1J 6BD",
    featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 6200,
      tenure: "Freehold",
      epcRating: "A"
    },
    highlights: [
      "Self-contained Mayfair commercial headquarters",
      "Ground floor art gallery / flagship client showcase",
      "Terrace overlooking private Mayfair gardens",
      "High-speed fiber connectivity & CAT-6A structured cabling",
      "Rare Mayfair freehold opportunity with full vacant possession"
    ],
    description:
      "A boutique commercial asset positioned on London's most prestigious square. Suitable for private wealth managers, family offices, luxury brands, and institutional headquarters seeking an unrepeatable Central London address.",
    indicativeFinance: {
      maxLtv: "Up to 72% LTV",
      estimatedBridgingRate: "from 0.53% pm",
      facilityType: "Commercial Acquisition & Refurbishment Debt"
    },
    featured: true
  },
  {
    id: "bsc-prop-09",
    referenceCode: "BSQ-CHE-0925",
    title: "Chelsea Embankment Riverside Penthouse",
    slug: "chelsea-embankment-riverside-penthouse",
    price: 13500000,
    priceDisplay: "£13,500,000",
    priceType: "Guide Price",
    status: "Available",
    category: "Prime Residential",
    location: "Cheyne Walk, Chelsea",
    city: "London",
    postcode: "SW3 5LN",
    featuredImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3950,
      tenure: "Long Leasehold (999 yrs)",
      epcRating: "B"
    },
    highlights: [
      "Direct south-facing river frontage and Albert Bridge views",
      "Expansive reception with floor-to-ceiling frameless glazing",
      "2 Secure underground parking spaces with EV charging",
      "Private residents' riverfront health club and concierge",
      "Offered with complete bespoke Minotti interior furniture package"
    ],
    description:
      "A lateral riverfront residence situated on historical Cheyne Walk. Combining iconic views across the Thames with refined contemporary interiors and 24-hour porterage.",
    indicativeFinance: {
      maxLtv: "Up to 75% LTV",
      estimatedBridgingRate: "from 0.54% pm",
      facilityType: "Prime Residential Bridge"
    },
    featured: false
  },
  {
    id: "bsc-prop-10",
    referenceCode: "BSQ-REG-1030",
    title: "Regent's Park Nash Crescent Villa",
    slug: "regents-park-nash-crescent-villa",
    price: 29500000,
    priceDisplay: "£29,500,000",
    priceType: "Guide Price",
    status: "Off-Market Exclusive",
    category: "Super-Prime Mayfair",
    location: "Cumberland Terrace, Regent's Park",
    city: "London",
    postcode: "NW1 4HS",
    featuredImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 7,
      bathrooms: 8,
      areaSqFt: 9800,
      tenure: "Crown Estate Leasehold (125 yrs)",
      epcRating: "C"
    },
    highlights: [
      "Monumental John Nash neoclassical architecture",
      "Private frontage looking directly into Regent's Park royal lawns",
      "Separate staff mews apartment and double garage",
      "Private cinema screening room and temperature wine tasting room",
      "Discreet security access with high perimeter fencing"
    ],
    description:
      "One of Regent's Park's grandest private crescent houses. Restored to sovereign diplomatic standards, offering monumental neoclassical entertaining salons and parkland views.",
    indicativeFinance: {
      maxLtv: "Up to 70% LTV",
      estimatedBridgingRate: "from 0.50% pm",
      facilityType: "HNWI Crown Leasehold Facility"
    },
    featured: true
  },
  {
    id: "bsc-prop-11",
    referenceCode: "BSQ-STJ-1135",
    title: "St. James's Heritage Freehold Mansion",
    slug: "st-jamess-heritage-freehold-mansion",
    price: 22000000,
    priceDisplay: "£22,000,000",
    priceType: "Guide Price",
    status: "Under Offer",
    category: "Mixed-Use Development",
    location: "King Street, St. James's",
    city: "London",
    postcode: "SW1Y 6QU",
    featuredImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 8,
      bathrooms: 9,
      areaSqFt: 8400,
      tenure: "Freehold",
      epcRating: "B"
    },
    highlights: [
      "Unrepeatable St. James's core location near Christie's",
      "Planning consent for conversion into 4 ultra-prime lateral residences",
      "Current commercial holding income with vacant possession option",
      "Original Adam-style fireplaces and ornate plasterwork",
      "Structured through Berkeley Square Capital bridging facility"
    ],
    description:
      "A distinguished freehold building in historical St. James's. Providing tremendous value-add potential through consented residential luxury conversion.",
    indicativeFinance: {
      maxLtv: "Up to 72% LTV",
      estimatedBridgingRate: "from 0.53% pm",
      facilityType: "Value-Add Conversion Facility"
    },
    featured: false
  },
  {
    id: "bsc-prop-12",
    referenceCode: "BSQ-DXB-1240",
    title: "Dubai Hills Royal Fairway Villa",
    slug: "dubai-hills-royal-fairway-villa",
    price: 15400000,
    priceDisplay: "£15,400,000",
    priceType: "Guide Price",
    status: "Available",
    category: "Prime Residential",
    location: "Dubai Hills Golf Club, Dubai Hills",
    city: "Dubai",
    postcode: "UAE",
    featuredImage: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85"
    ],
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      areaSqFt: 11200,
      tenure: "Freehold",
      epcRating: "A"
    },
    highlights: [
      "Direct frontline golf course views overlooking Championship course",
      "Private swimming pool, Jacuzzi, and sunken fire pit lounge",
      "Full basement entertainment floor with bowling alley and gym",
      "Smart-home automation with private solar energy generation",
      "Full cross-border tax and escrow structuring by Berkeley Square Capital"
    ],
    description:
      "A modern architectural masterpiece situated in prestigious Dubai Hills. Backing directly onto the championship golf course with uninterrupted views of the Downtown skyline.",
    indicativeFinance: {
      maxLtv: "Up to 70% LTV",
      estimatedBridgingRate: "from 0.56% pm",
      facilityType: "International HNWI Mortgage Line"
    },
    featured: false
  }
];

export const propertyCategories: PropertyCategory[] = [
  "Super-Prime Mayfair",
  "Prime Residential",
  "Commercial Freehold",
  "Mixed-Use Development"
];

export const propertyStatuses: PropertyStatus[] = [
  "Available",
  "Available for Sale",
  "Available for Rent",
  "Under Offer",
  "Sold",
  "Rented",
  "Off-Market Exclusive",
  "Recently Completed"
];
