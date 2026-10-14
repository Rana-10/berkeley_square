import { initializePropertyDataSource } from "@/lib/typeorm";
import { getPgPool } from "@/lib/postgres";
import { Property, PropertyMediaType, PropertyStatus } from "@/schema";
import { PropertyLocation } from "@/schema/property-location.entity";
import { PropertyMedia } from "@/schema/property-media.entity";

class PropertyNotFoundError extends Error {
  constructor() {
    super("Property not found");
    this.name = "PropertyNotFoundError";
  }
}

async function ensurePropertyStatusValues() {
  const pool = getPgPool();
  await pool.query(`
    do $$
    begin
      if exists (select 1 from pg_type where typname = 'property_status_enum') then
        alter type property_status_enum add value if not exists 'Available for Sale';
        alter type property_status_enum add value if not exists 'Available for Rent';
      end if;
    end $$;
  `);
}

export async function findProperties() {
  const pool = getPgPool();
  const properties = await pool.query<PropertyRow>(
    "select * from property order by created_at desc",
  );
  return hydratePropertyRows(properties.rows);
}

export async function findPropertyById(id: number) {
  const pool = getPgPool();
  const property = await pool.query<PropertyRow>(
    "select * from property where id = $1",
    [id],
  );

  if (!property.rows[0]) {
    throw new PropertyNotFoundError();
  }

  const [hydrated] = await hydratePropertyRows(property.rows);
  return hydrated;
}

async function findPropertyEntityById(id: number) {
  const dataSource = await initializePropertyDataSource();
  const property = await dataSource.getRepository(Property).findOne({
    where: { id },
    relations: { location: true, media: true },
  });

  if (!property) {
    throw new PropertyNotFoundError();
  }

  return property;
}

type PropertyRow = {
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
};

type PropertyLocationRow = {
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

type PropertyMediaRow = {
  id: number;
  property_id: number;
  file_url: string;
  type: PropertyMediaType;
  display_order: number;
};

type HydratedProperty = PropertyRow & {
  location: PropertyLocationRow | null;
  media: PropertyMediaRow[];
};

async function hydratePropertyRows(rows: PropertyRow[]): Promise<HydratedProperty[]> {
  if (rows.length === 0) return [];

  const pool = getPgPool();
  const ids = rows.map((property) => property.id);
  const locations = await pool.query<PropertyLocationRow>(
    "select * from property_location where property_id = any($1::int[])",
    [ids],
  );
  const media = await pool.query<PropertyMediaRow>(
    "select * from property_media where property_id = any($1::int[]) order by display_order asc",
    [ids],
  );

  return rows.map((property) => ({
    ...property,
    location: locations.rows.find((location) => location.property_id === property.id) ?? null,
    media: media.rows.filter((item) => item.property_id === property.id),
  }));
}

export type PropertyMediaInput = {
  file_url: string;
  type: PropertyMediaType;
  display_order: number;
};

export type PropertyLocationInput = {
  address_line_1: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
};

export type PropertyWriteInput = {
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
  location: PropertyLocationInput;
  media: PropertyMediaInput[];
};

export async function createProperty(input: PropertyWriteInput) {
  await ensurePropertyStatusValues();
  const dataSource = await initializePropertyDataSource();
  const repository = dataSource.getRepository(Property);
  const property = repository.create({
    ...input,
    location: input.location,
    media: input.media,
  });

  return repository.save(property);
}

export async function updateProperty(id: number, input: PropertyWriteInput) {
  await ensurePropertyStatusValues();
  const dataSource = await initializePropertyDataSource();
  const propertyRepository = dataSource.getRepository(Property);
  const locationRepository = dataSource.getRepository(PropertyLocation);
  const mediaRepository = dataSource.getRepository(PropertyMedia);
  const property = await findPropertyEntityById(id);

  property.title = input.title;
  property.price = input.price;
  property.currency = input.currency;
  property.status = input.status;
  property.property_type = input.property_type;
  property.bedrooms = input.bedrooms;
  property.bathrooms = input.bathrooms;
  property.area = input.area;
  property.full_description = input.full_description;
  property.amenities = input.amenities;

  const savedProperty = await propertyRepository.save(property);

  if (property.location) {
    await locationRepository.update(property.location.id, {
      ...input.location,
      property_id: id,
    });
  } else {
    const newLocation = locationRepository.create({
      ...input.location,
      property_id: id,
      property: savedProperty,
    });
    await locationRepository.save(newLocation);
  }

  await mediaRepository.delete({ property_id: id });
  if (input.media.length > 0) {
    const mediaRecords = input.media.map((media, index) => mediaRepository.create({
      ...media,
      property_id: id,
      display_order: media.display_order ?? index,
      property: savedProperty,
    }));
    await mediaRepository.save(mediaRecords);
  }

  return findPropertyById(id);
}

export async function deleteProperty(id: number) {
  const dataSource = await initializePropertyDataSource();
  const property = await findPropertyEntityById(id);
  await dataSource.getRepository(Property).remove(property);
}

export function serializeProperty(property: Property | HydratedProperty) {
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
    location: property.location
      ? {
          id: property.location.id,
          property_id: property.location.property_id,
          address_line_1: property.location.address_line_1,
          city: property.location.city,
          state_province: property.location.state_province,
          postal_code: property.location.postal_code,
          country: property.location.country,
          latitude: property.location.latitude,
          longitude: property.location.longitude,
        }
      : null,
    media: (property.media ?? [])
      .slice()
      .sort((left, right) => left.display_order - right.display_order)
      .map((media) => ({
        id: media.id,
        property_id: media.property_id,
        file_url: media.file_url,
        type: media.type,
        display_order: media.display_order,
      })),
  };
}
