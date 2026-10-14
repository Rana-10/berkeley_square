export const propertyMarkets = [
  "UK",
  "Dubai",
  "Saudi",
  "Oman",
  "Cyprus",
  "Greece",
  "Spain",
  "USA",
  "Far East Asia",
  "Pakistan",
] as const;

export type PropertyMarket = (typeof propertyMarkets)[number];

export type PropertyMarketOption = "All" | PropertyMarket;

export const propertyMarketOptions: PropertyMarketOption[] = ["All", ...propertyMarkets];

export const propertyMarketAliases: Record<PropertyMarket, string[]> = {
  UK: ["United Kingdom", "UK", "England", "Scotland", "Wales", "Northern Ireland"],
  Dubai: ["Dubai", "United Arab Emirates", "UAE"],
  Saudi: ["Saudi", "Saudi Arabia", "KSA", "Riyadh", "Jeddah"],
  Oman: ["Oman", "Muscat"],
  Cyprus: ["Cyprus"],
  Greece: ["Greece", "Athens"],
  Spain: ["Spain"],
  USA: ["USA", "United States", "United States of America", "US"],
  "Far East Asia": [
    "China",
    "Hong Kong",
    "Japan",
    "Singapore",
    "South Korea",
    "Malaysia",
    "Thailand",
    "Vietnam",
    "Indonesia",
    "Philippines",
    "Taiwan",
  ],
  Pakistan: ["Pakistan"],
};

export function isPropertyMarketOption(value: string): value is PropertyMarketOption {
  return value === "All" || propertyMarkets.includes(value as PropertyMarket);
}
