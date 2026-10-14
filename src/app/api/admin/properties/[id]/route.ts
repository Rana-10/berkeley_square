import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import {
  deleteProperty,
  findPropertyById,
  serializeProperty,
  updateProperty,
} from "@/lib/property-repository";
import { propertyWriteSchema } from "@/lib/property-validation";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

function parseId(id: string) {
  const propertyId = Number(id);
  return Number.isInteger(propertyId) && propertyId > 0 ? propertyId : null;
}

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const propertyId = parseId(id);
  if (!propertyId) return NextResponse.json({ error: "Invalid property id." }, { status: 400 });

  try {
    return NextResponse.json(serializeProperty(await findPropertyById(propertyId)));
  } catch (error) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const propertyId = parseId(id);
  if (!propertyId) return NextResponse.json({ error: "Invalid property id." }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = propertyWriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid property." }, { status: 400 });
  }

  try {
    return NextResponse.json(serializeProperty(await updateProperty(propertyId, parsed.data)));
  } catch (error) {
    console.error("Unable to update property", error);
    return NextResponse.json({ error: "Unable to update property." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const propertyId = parseId(id);
  if (!propertyId) return NextResponse.json({ error: "Invalid property id." }, { status: 400 });

  try {
    await deleteProperty(propertyId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to delete property", error);
    return NextResponse.json({ error: "Unable to delete property." }, { status: 500 });
  }
}
