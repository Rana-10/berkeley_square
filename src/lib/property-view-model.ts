import type { PropertyResponse } from "@/lib/property-service";
import type { PropertyMarketOption } from "./property-markets";
import { propertyMarketAliases } from "./property-markets";
import type { PropertyStatus } from "@/schema/property.enums";

export type PropertyViewModel = {
  id: number;
  title: string;
  price: number;
  priceDisplay: string;
  status: PropertyStatus;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  addressLabel: string;
  city: string;
  country: string;
  featuredImage: string | null;
  images: string[];
  amenities: string[];
  createdAt: string;
};

export type PropertyFilters = {
  market: PropertyMarketOption;
};

const currencyLocales: Record<string, string> = {
  GBP: "en-GB",
  EUR: "en-DE",
  USD: "en-US",
};

function formatPrice(value: number, currency: string | null | undefined) {
  const safeCurrency = (currency ?? "GBP").toUpperCase();
  const locale = currencyLocales[safeCurrency] ?? "en-GB";

  return new Intl.NumberFormat(locale, {
    currency: safeCurrency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export function mapPropertyToViewModel(property: PropertyResponse): PropertyViewModel {
  const imageMedia = property.media.filter((media) => media.type === "Image");
  const locationParts = [
    property.location?.address_line_1,
    property.location?.city,
    property.location?.state_province,
    property.location?.postal_code,
    property.location?.country,
  ].filter(Boolean);
  const price = Number(property.price);

  return {
    id: property.id,
    title: property.title,
    price: Number.isFinite(price) ? price : 0,
    priceDisplay: Number.isFinite(price) ? formatPrice(price, property.currency) : property.price,
    status: property.status,
    propertyType: property.property_type || "Residential",
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    description: property.full_description,
    addressLabel: locationParts.join(", "),
    city: property.location?.city ?? "",
    country: property.location?.country ?? "",
    featuredImage: imageMedia[0]?.file_url ?? null,
    images: imageMedia.map((media) => media.file_url),
    amenities: property.amenities ?? [],
    createdAt: property.created_at,
  };
}

export function filterPropertyViewModels(
  properties: PropertyViewModel[],
  filters: PropertyFilters,
) {
  const marketTerms =
    filters.market === "All"
      ? []
      : propertyMarketAliases[filters.market].map((term) => term.toLowerCase());

  return properties.filter((property) => {
    if (property.status === "Draft") return false;
    if (filters.market === "All") return true;

    const locationText = [
      property.city,
      property.country,
      property.addressLabel,
    ]
      .join(" ")
      .toLowerCase();

    return marketTerms.some((term) => locationText.includes(term));
  });
}
