import { propertiesStore } from "@/data/properties-store";
import type { PropertyItem } from "@/data/properties";
import { getPgPool } from "@/lib/postgres";
import { propertyMarketAliases, type PropertyMarketOption } from "@/lib/property-markets";
import { PropertyMediaType, PropertyStatus } from "@/schema/property.enums";

export type PropertyReadModel = {
  id: number;
  title: string;
  price: string;
  currency: string;
  status: PropertyStatus;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  full_description: string;
  amenities: string[] | null;
  created_at: Date;
  location: PropertyLocationReadModel | null;
  media: PropertyMediaReadModel[];
};

type PropertyRow = Omit<PropertyReadModel, "location" | "media">;

type PropertyLocationReadModel = {
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

type PropertyMediaReadModel = {
  id: number;
  property_id: number;
  file_url: string;
  type: PropertyMediaType;
  display_order: number;
};

class PropertyNotFoundError extends Error {
  constructor() {
    super("Property not found");
    this.name = "PropertyNotFoundError";
  }
}

function convertPropertyItemToReadModel(item: PropertyItem, index: number): PropertyReadModel {
  const numericId = parseInt(item.id.replace(/\D/g, ""), 10) || index + 1;
  const statusMap: Record<string, PropertyStatus> = {
    Available: PropertyStatus.AVAILABLE,
    "Available for Sale": PropertyStatus.AVAILABLE_FOR_SALE,
    "Available for Rent": PropertyStatus.AVAILABLE_FOR_RENT,
    Sold: PropertyStatus.SOLD,
    Rented: PropertyStatus.RENTED,
    Draft: PropertyStatus.DRAFT,
  };
  const status = statusMap[item.status] ?? PropertyStatus.AVAILABLE;

  const images =
    item.gallery && item.gallery.length > 0
      ? item.gallery
      : item.featuredImage
      ? [item.featuredImage]
      : [];

  const media: PropertyMediaReadModel[] = images.map((url, i) => ({
    id: numericId * 100 + i,
    property_id: numericId,
    file_url: url,
    type: PropertyMediaType.IMAGE,
    display_order: i,
  }));

  return {
    id: numericId,
    title: item.title,
    price: String(item.price),
    currency: "GBP",
    status,
    property_type: item.category || "Prime Residential",
    bedrooms: item.specs?.bedrooms ?? 0,
    bathrooms: item.specs?.bathrooms ?? 0,
    area: item.specs?.areaSqFt ?? 0,
    full_description:
      item.description ||
      (Array.isArray(item.extendedOverview)
        ? item.extendedOverview.join("\n")
        : item.extendedOverview) ||
      "",
    amenities: item.amenities || [],
    created_at: new Date(),
    location: {
      id: numericId,
      property_id: numericId,
      address_line_1: item.addressLine || item.location || "",
      city: item.city || "London",
      state_province: "",
      postal_code: item.postcode || "",
      country: "United Kingdom",
      latitude: null,
      longitude: null,
    },
    media,
  };
}

function getFallbackProperties(market: PropertyMarketOption = "All"): PropertyReadModel[] {
  const items = propertiesStore.getAll();
  const models = items.map(convertPropertyItemToReadModel);
  if (market === "All") return models;

  const marketTerms = propertyMarketAliases[market].map((t) => t.toLowerCase());
  return models.filter((p) => {
    const loc = [
      p.location?.address_line_1,
      p.location?.city,
      p.location?.postal_code,
      p.location?.country,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return marketTerms.some((term) => loc.includes(term));
  });
}

export async function findReadableProperties(market: PropertyMarketOption = "All") {
  try {
    const pool = getPgPool();
    const marketTerms = market === "All" ? [] : propertyMarketAliases[market];

    if (marketTerms.length > 0) {
      const properties = await pool.query<PropertyRow>(
        `
          select property.*
          from property
          left join property_location on property_location.property_id = property.id
          where exists (
            select 1
            from unnest($1::text[]) as market_term(term)
            where lower(coalesce(property_location.country, '')) like '%' || lower(market_term.term) || '%'
               or lower(coalesce(property_location.city, '')) like '%' || lower(market_term.term) || '%'
               or lower(coalesce(property_location.state_province, '')) like '%' || lower(market_term.term) || '%'
               or lower(coalesce(property_location.address_line_1, '')) like '%' || lower(market_term.term) || '%'
          )
          order by property.created_at desc
        `,
        [marketTerms],
      );

      if (properties.rows.length > 0) {
        return await hydratePropertyRows(properties.rows);
      }
    } else {
      const properties = await pool.query<PropertyRow>(
        "select * from property order by created_at desc",
      );

      if (properties.rows.length > 0) {
        return await hydratePropertyRows(properties.rows);
      }
    }
  } catch (error) {
    console.warn("Database unavailable for property read; falling back to approved store.", error);
  }

  return getFallbackProperties(market);
}

export async function findReadablePropertyById(id: number) {
  try {
    const pool = getPgPool();
    const property = await pool.query<PropertyRow>(
      "select * from property where id = $1",
      [id],
    );

    if (property.rows[0]) {
      const [hydrated] = await hydratePropertyRows(property.rows);
      if (hydrated) return hydrated;
    }
  } catch (error) {
    console.warn("Database unavailable for property read by ID; falling back to approved store.", error);
  }

  const fallback = getFallbackProperties("All").find((p) => p.id === id);
  if (fallback) {
    return fallback;
  }

  throw new PropertyNotFoundError();
}

export function serializeReadableProperty(property: PropertyReadModel) {
  return {
    id: property.id,
    title: property.title,
    price: property.price,
    currency: property.currency ?? "GBP",
    status: property.status,
    property_type: property.property_type,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    full_description: property.full_description,
    amenities: property.amenities ?? [],
    created_at: property.created_at,
    location: property.location,
    media: property.media,
  };
}

async function hydratePropertyRows(rows: PropertyRow[]): Promise<PropertyReadModel[]> {
  if (rows.length === 0) return [];

  const pool = getPgPool();
  const ids = rows.map((property) => property.id);
  const locations = await pool.query<PropertyLocationReadModel>(
    "select * from property_location where property_id = any($1::int[])",
    [ids],
  );
  const media = await pool.query<PropertyMediaReadModel>(
    "select * from property_media where property_id = any($1::int[]) order by display_order asc",
    [ids],
  );

  return rows.map((property) => ({
    ...property,
    location: locations.rows.find((location) => location.property_id === property.id) ?? null,
    media: media.rows.filter((item) => item.property_id === property.id),
  }));
}
