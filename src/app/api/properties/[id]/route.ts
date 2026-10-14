import { NextResponse } from "next/server";
import {
  findReadablePropertyById,
  serializeReadableProperty,
} from "@/lib/property-read-repository";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const propertyId = Number(id);

  if (!Number.isInteger(propertyId) || propertyId < 1) {
    return NextResponse.json({ error: "Invalid property id." }, { status: 400 });
  }

  try {
    const property = await findReadablePropertyById(propertyId);
    return NextResponse.json(serializeReadableProperty(property));
  } catch (error) {
    if (error instanceof Error && error.name === "PropertyNotFoundError") {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    console.error("Unable to load property", error);
    return NextResponse.json(
      { error: "Unable to load property." },
      { status: 500 },
    );
  }
}
