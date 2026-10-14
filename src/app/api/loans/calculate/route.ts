import { NextResponse } from "next/server";
import { loanErrorResponse } from "@/lib/loan-api-utils";
import { calculateLoan } from "@/lib/loan-calculation-service";
import { loanCalculationRequestSchema } from "@/lib/loan-calculation-validation";
import { listInterestRules, listLtvRules } from "@/lib/loan-rule-repository";
import { RuleStatus } from "@/lib/loan-types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loanCalculationRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid loan calculation request." },
      { status: 400 },
    );
  }

  try {
    const [ltvRules, interestRules] = await Promise.all([
      listLtvRules(RuleStatus.ACTIVE),
      listInterestRules(RuleStatus.ACTIVE),
    ]);
    return NextResponse.json(calculateLoan(parsed.data, { ltvRules, interestRules }));
  } catch (error) {
    return loanErrorResponse(error, "Unable to calculate loan.");
  }
}
