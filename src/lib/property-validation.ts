import { z } from "zod";
import { PropertyMediaType, PropertyStatus } from "@/schema";

export const propertyCurrencySchema = z.enum(["GBP", "EUR", "USD"]);

export const propertyWriteSchema = z.object({
  title: z.string().trim().min(1),
  price: z.coerce.number().positive().transform((value) => value.toFixed(2)),
  currency: propertyCurrencySchema.default("GBP"),
  status: z.nativeEnum(PropertyStatus),
  property_type: z.string().trim().min(1),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  area: z.coerce.number().min(0),
  full_description: z.string().trim().min(1),
  amenities: z.array(z.string().trim().min(1)).default([]),
  location: z.object({
    address_line_1: z.string().trim().min(1),
    city: z.string().trim().min(1),
    state_province: z.string().trim().min(1),
    postal_code: z.string().trim().min(1),
    country: z.string().trim().min(1),
    latitude: z.coerce.number().optional().nullable(),
    longitude: z.coerce.number().optional().nullable(),
  }),
  media: z.array(z.object({
    file_url: z.string().trim().url(),
    type: z.nativeEnum(PropertyMediaType),
    display_order: z.coerce.number().int().min(0),
  })).default([]),
});
