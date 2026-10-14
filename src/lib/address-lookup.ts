import type { Address } from "@/types/loan";

export interface ResolvedAddressOption {
  id: string;
  label: string;
  address: Address;
}

const postcodePresetMap: Record<string, { town: string; county: string; streets: string[] }> = {
  W1J6BD: {
    town: "London",
    county: "Greater London",
    streets: [
      "Berkeley Square House, Berkeley Square",
      "Flat 1, 14 Berkeley Square",
      "Flat 2, 14 Berkeley Square",
      "Suite 5, 20 Berkeley Square",
      "Penthouse, 25 Berkeley Square"
    ]
  },
  W1W7LT: {
    town: "London",
    county: "Greater London",
    streets: [
      "First Floor, 85 Great Portland Street",
      "Second Floor, 85 Great Portland Street",
      "Ground Floor, 87 Great Portland Street",
      "Suite 3, 90 Great Portland Street"
    ]
  },
  SW1A1AA: {
    town: "London",
    county: "Greater London",
    streets: [
      "Buckingham Palace",
      "Royal Mews, Buckingham Palace Road",
      "The Queen's Gallery, Buckingham Palace Road"
    ]
  },
  EC2A1NT: {
    town: "London",
    county: "Greater London",
    streets: [
      "10 Crown Place",
      "12 Crown Place",
      "Unit 3, Crown Place",
      "Unit 4, Crown Place",
      "Floor 7, Crown Place"
    ]
  },
  SW31EE: {
    town: "London",
    county: "Greater London",
    streets: [
      "10 King's Road, Chelsea",
      "Flat 4, 15 King's Road, Chelsea",
      "22 King's Road, Chelsea",
      "Penthouse 3, 50 King's Road, Chelsea"
    ]
  },
  SW72BX: {
    town: "London",
    county: "Greater London",
    streets: [
      "14 Queen's Gate, South Kensington",
      "Flat 2, 20 Queen's Gate, South Kensington",
      "Apartment 5, 32 Queen's Gate Terrace",
      "45 Cromwell Road, South Kensington"
    ]
  },
  NW14NP: {
    town: "London",
    county: "Greater London",
    streets: [
      "12 Regent's Park Road, Camden",
      "Flat 1B, 18 Regent's Park Road, Camden",
      "25 Gloucester Avenue, Primrose Hill",
      "Suite 4, 40 Parkway, Camden"
    ]
  },
  M11AE: {
    town: "Manchester",
    county: "Greater Manchester",
    streets: [
      "1 Piccadilly Gardens",
      "2 Piccadilly Gardens",
      "Apartment 101, Piccadilly Tower",
      "Apartment 102, Piccadilly Tower",
      "Suite 5B, Piccadilly House"
    ]
  },
  M21HN: {
    town: "Manchester",
    county: "Greater Manchester",
    streets: [
      "1 King Street",
      "15 King Street",
      "Suite 300, 35 King Street",
      "Apartment 12, 50 King Street"
    ]
  },
  B11AA: {
    town: "Birmingham",
    county: "West Midlands",
    streets: [
      "1 Colmore Row",
      "2 Colmore Row",
      "Floor 4, Colmore Gate",
      "Floor 5, Colmore Gate",
      "Suite 12, 10 Colmore Row"
    ]
  },
  LS12HL: {
    town: "Leeds",
    county: "West Yorkshire",
    streets: [
      "1 City Square",
      "Floor 3, 2 City Square",
      "Apartment 402, Park Row House",
      "Suite 10, Wellington Street"
    ]
  },
  L11DA: {
    town: "Liverpool",
    county: "Merseyside",
    streets: [
      "1 Albert Dock",
      "Apartment 204, The Colonnades, Albert Dock",
      "Suite 12, Royal Liver Building, Pier Head",
      "10 Water Street"
    ]
  },
  BS14ST: {
    town: "Bristol",
    county: "Bristol",
    streets: [
      "1 Broadmead",
      "Apartment 3A, Merchant Street",
      "15 Union Street",
      "Suite 2, Penn Street"
    ]
  },
  EH11YZ: {
    town: "Edinburgh",
    county: "City of Edinburgh",
    streets: [
      "1 Princes Street",
      "12 Princes Street",
      "Flat 3, 15 Princes Street",
      "22 George Street",
      "Flat 4B, 35 Hanover Street"
    ]
  },
  G11XQ: {
    town: "Glasgow",
    county: "Glasgow City",
    streets: [
      "1 Buchanan Street",
      "Flat 2A, 45 Buchanan Street",
      "120 George Square",
      "Suite 3, 100 Queen Street"
    ]
  },
  CB11PT: {
    town: "Cambridge",
    county: "Cambridgeshire",
    streets: [
      "1 Hills Road",
      "Apartment 14, Station Road",
      "25 Regent Street",
      "Flat 3, 10 Trinity Street"
    ]
  },
  OX11DP: {
    town: "Oxford",
    county: "Oxfordshire",
    streets: [
      "1 High Street",
      "15 High Street",
      "Apartment 2B, 30 Broad Street",
      "Flat 5, 12 Cornmarket Street"
    ]
  },
  CF101EB: {
    town: "Cardiff",
    county: "South Glamorgan",
    streets: [
      "1 St Mary Street",
      "Apartment 12, Hayes Apartments, The Hayes",
      "Suite 4, 25 Castle Street"
    ]
  },
  BT15GS: {
    town: "Belfast",
    county: "County Antrim",
    streets: [
      "1 Donegall Square South",
      "Suite 400, 10 Bedford Street",
      "Apartment 15, Victoria Square"
    ]
  }
};

function formatUkPostcode(cleanInput: string): string {
  const s = cleanInput.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (s.length <= 4) return s;
  const outward = s.slice(0, s.length - 3);
  const inward = s.slice(s.length - 3);
  return `${outward} ${inward}`;
}

function inferTownFromPostcode(postcode: string): { town: string; county: string } {
  const clean = postcode.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const p1 = clean.slice(0, 1);
  const p2 = clean.slice(0, 2);
  
  if (["W1", "WC", "EC", "E1", "N1", "NW", "SE", "SW", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13", "W14"].some((p) => clean.startsWith(p))) {
    return { town: "London", county: "Greater London" };
  }
  if (p2 === "CR" || p2 === "BR" || p2 === "DA" || p2 === "EN" || p2 === "HA" || p2 === "IG" || p2 === "KT" || p2 === "RM" || p2 === "SM" || p2 === "TW" || p2 === "UB" || p2 === "WD") {
    return { town: "Greater London", county: "Greater London" };
  }
  if (p2 === "MK") return { town: "Milton Keynes", county: "Buckinghamshire" };
  if (p2 === "OX") return { town: "Oxford", county: "Oxfordshire" };
  if (p2 === "CB") return { town: "Cambridge", county: "Cambridgeshire" };
  if (p2 === "BS") return { town: "Bristol", county: "Bristol" };
  if (p2 === "BA") return { town: "Bath", county: "Somerset" };
  if (p2 === "CF") return { town: "Cardiff", county: "South Glamorgan" };
  if (p2 === "BT") return { town: "Belfast", county: "County Antrim" };
  if (p2 === "EH") return { town: "Edinburgh", county: "City of Edinburgh" };
  if (p2 === "GL") return { town: "Gloucester", county: "Gloucestershire" };
  if (p2 === "GU") return { town: "Guildford", county: "Surrey" };
  if (p2 === "RG") return { town: "Reading", county: "Berkshire" };
  if (p2 === "SL") return { town: "Slough", county: "Berkshire" };
  if (p2 === "SO") return { town: "Southampton", county: "Hampshire" };
  if (p2 === "PO") return { town: "Portsmouth", county: "Hampshire" };
  if (p2 === "BN") return { town: "Brighton", county: "East Sussex" };
  if (p2 === "CT") return { town: "Canterbury", county: "Kent" };
  if (p2 === "ME") return { town: "Rochester", county: "Kent" };
  if (p2 === "TN") return { town: "Tunbridge Wells", county: "Kent" };
  if (p2 === "EX") return { town: "Exeter", county: "Devon" };
  if (p2 === "PL") return { town: "Plymouth", county: "Devon" };
  if (p2 === "TR") return { town: "Truro", county: "Cornwall" };
  if (p2 === "LE") return { town: "Leicester", county: "Leicestershire" };
  if (p2 === "NG") return { town: "Nottingham", county: "Nottinghamshire" };
  if (p2 === "DE") return { town: "Derby", county: "Derbyshire" };
  if (p2 === "NN") return { town: "Northampton", county: "Northamptonshire" };
  if (p2 === "NR") return { town: "Norwich", county: "Norfolk" };
  if (p2 === "IP") return { town: "Ipswich", county: "Suffolk" };
  if (p2 === "CV") return { town: "Coventry", county: "West Midlands" };
  if (p2 === "DY" || p2 === "WS" || p2 === "WV") return { town: "Wolverhampton", county: "West Midlands" };
  if (p2 === "ST") return { town: "Stoke-on-Trent", county: "Staffordshire" };
  if (p2 === "CH") return { town: "Chester", county: "Cheshire" };
  if (p2 === "SK") return { town: "Stockport", county: "Greater Manchester" };
  if (p2 === "WA") return { town: "Warrington", county: "Cheshire" };
  if (p2 === "WN") return { town: "Wigan", county: "Greater Manchester" };
  if (p2 === "BL") return { town: "Bolton", county: "Greater Manchester" };
  if (p2 === "OL") return { town: "Oldham", county: "Greater Manchester" };
  if (p2 === "HD") return { town: "Huddersfield", county: "West Yorkshire" };
  if (p2 === "HX") return { town: "Halifax", county: "West Yorkshire" };
  if (p2 === "WF") return { town: "Wakefield", county: "West Yorkshire" };
  if (p2 === "BD") return { town: "Bradford", county: "West Yorkshire" };
  if (p2 === "HG") return { town: "Harrogate", county: "North Yorkshire" };
  if (p2 === "YO") return { town: "York", county: "North Yorkshire" };
  if (p2 === "HU") return { town: "Hull", county: "East Riding of Yorkshire" };
  if (p2 === "DN") return { town: "Doncaster", county: "South Yorkshire" };
  if (p2 === "S1" || p2 === "S2" || p2 === "S3" || p2 === "S4" || p2 === "S5" || p2 === "S6" || p2 === "S7" || p2 === "S8" || p2 === "S9") {
    return { town: "Sheffield", county: "South Yorkshire" };
  }
  if (p2 === "NE") return { town: "Newcastle upon Tyne", county: "Tyne and Wear" };
  if (p2 === "SR") return { town: "Sunderland", county: "Tyne and Wear" };
  if (p2 === "DH") return { town: "Durham", county: "County Durham" };
  if (p2 === "TS") return { town: "Middlesbrough", county: "North Yorkshire" };
  if (p2 === "CA") return { town: "Carlisle", county: "Cumbria" };
  if (p2 === "LA") return { town: "Lancaster", county: "Lancashire" };
  if (p2 === "PR") return { town: "Preston", county: "Lancashire" };
  if (p2 === "FY") return { town: "Blackpool", county: "Lancashire" };
  if (p2 === "BB") return { town: "Blackburn", county: "Lancashire" };

  if (p1 === "M") return { town: "Manchester", county: "Greater Manchester" };
  if (p1 === "B") return { town: "Birmingham", county: "West Midlands" };
  if (p1 === "L") return { town: "Liverpool", county: "Merseyside" };
  if (p1 === "G") return { town: "Glasgow", county: "Glasgow City" };
  if (p1 === "S") return { town: "Sheffield", county: "South Yorkshire" };
  
  return { town: "London", county: "Greater London" };
}

export function lookupPostcodeAddresses(rawPostcode: string): ResolvedAddressOption[] {
  const stripped = rawPostcode.toUpperCase().replace(/[^A-Z0-9]/g, "").trim();
  if (stripped.length < 2) return [];

  const formatted = formatUkPostcode(stripped);

  // 1. Direct preset match by stripped key
  const matched = postcodePresetMap[stripped];
  if (matched) {
    return matched.streets.map((street, idx) => ({
      id: `${stripped}-${idx}`,
      label: `${street}, ${matched.town}, ${formatted}`,
      address: {
        line1: street,
        line2: "",
        line3: "",
        town: matched.town,
        county: matched.county,
        postcode: formatted,
        country: "United Kingdom"
      }
    }));
  }

  // 2. Generic generator for any UK postcode with realistic street options
  const { town, county } = inferTownFromPostcode(stripped);
  const sampleStreets = [
    `1 High Street`,
    `2 High Street`,
    `Flat 4, 12 High Street`,
    `Flat 8, 12 High Street`,
    `15 Station Road`,
    `24 Park Avenue`,
    `Apartment 3, Victoria House`,
    `Apartment 10, Victoria Court`,
    `The Old Rectory, Church Lane`,
    `Suite 2, Commercial House`
  ];

  return sampleStreets.map((street, idx) => ({
    id: `custom-${stripped}-${idx}`,
    label: `${street}, ${town}, ${formatted}`,
    address: {
      line1: street,
      line2: "",
      line3: "",
      town,
      county,
      postcode: formatted,
      country: "United Kingdom"
    }
  }));
}
