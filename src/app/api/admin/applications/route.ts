import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { findApplications } from "@/lib/application-repository";

export const runtime = "nodejs";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const applications = await findApplications();
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Unable to load applications", error);
    return NextResponse.json({ error: "Unable to load applications." }, { status: 500 });
  }
}
