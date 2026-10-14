import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createProperty, findProperties, serializeProperty } from "@/lib/property-repository";
import { propertyWriteSchema } from "@/lib/property-validation";

export const runtime = "nodejs";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const properties = await findProperties();
    return NextResponse.json(properties.map(serializeProperty));
  } catch (error) {
    console.error("Unable to load admin properties", error);
    return NextResponse.json({ error: "Unable to load properties." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json().catch(() => null);
  const parsed = propertyWriteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid property." }, { status: 400 });
  }

  try {
    const property = await createProperty(parsed.data);
    return NextResponse.json(serializeProperty(property), { status: 201 });
  } catch (error) {
    console.error("Unable to create property", error);
    return NextResponse.json({ error: "Unable to create property." }, { status: 500 });
  }
}
