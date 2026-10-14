import type {
  PropertyMediaType,
  PropertyStatus,
} from "@/schema";

export type PropertyLocationResponse = {
  id: number;
  property_id: number;
  address_line_1: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
};

export type PropertyMediaResponse = {
  id: number;
  property_id: number;
  file_url: string;
  type: PropertyMediaType;
  display_order: number;
};

export type PropertyResponse = {
  id: number;
  title: string;
  price: string;
  currency: "GBP" | "EUR" | "USD";
  status: PropertyStatus;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  full_description: string;
  amenities: string[];
  created_at: string;
  location: PropertyLocationResponse | null;
  media: PropertyMediaResponse[];
};

type PropertyApiError = {
  error?: string;
};

async function getApiError(response: Response, fallback: string) {
  const body = (await response.json().catch(() => null)) as PropertyApiError | null;
  return body?.error ?? fallback;
}

export const propertyService = {
  async getProperties(market = "All"): Promise<PropertyResponse[]> {
    const searchParams = new URLSearchParams();
    if (market !== "All") searchParams.set("market", market);
    const queryString = searchParams.toString();
    const response = await fetch(`/api/properties${queryString ? `?${queryString}` : ""}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(await getApiError(response, "Failed to load properties."));
    }

    return response.json();
  },

  async getProperty(id: number): Promise<PropertyResponse> {
    const response = await fetch(`/api/properties/${id}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(await getApiError(response, "Failed to load property."));
    }

    return response.json();
  },
};
