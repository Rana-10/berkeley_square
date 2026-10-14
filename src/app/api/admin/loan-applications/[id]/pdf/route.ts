import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { findLoanApplicationById } from "@/lib/loan-application-repository";
import { createLoanApplicationPdf } from "@/lib/loan-application-pdf";
import type { LoanApplication } from "@/types/loan";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const loanApplicationId = Number(id);
  if (!Number.isInteger(loanApplicationId) || loanApplicationId < 1) {
    return NextResponse.json({ error: "Invalid loan application id." }, { status: 400 });
  }

  try {
    const record = await findLoanApplicationById(loanApplicationId);
    const pdf = await createLoanApplicationPdf({
      reference: record.reference,
      receivedAt: record.received_at,
      application: record.application_data as LoanApplication,
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Disposition": `attachment; filename="loan-application-${record.reference}.pdf"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Unable to create loan application PDF", error);
    return NextResponse.json({ error: "Unable to create loan application PDF." }, { status: 500 });
  }
}
