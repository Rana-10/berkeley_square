import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { findLoanApplications } from "@/lib/loan-application-repository";

export const runtime = "nodejs";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    return NextResponse.json(await findLoanApplications());
  } catch (error) {
    console.error("Unable to load loan applications", error);
    return NextResponse.json({ error: "Unable to load loan applications." }, { status: 500 });
  }
}
