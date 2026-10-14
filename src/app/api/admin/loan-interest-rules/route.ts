import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { loanErrorResponse } from "@/lib/loan-api-utils";
import { loanInterestRuleWriteSchema } from "@/lib/loan-calculation-validation";
import { createInterestRule, listInterestRules } from "@/lib/loan-rule-repository";
import { RuleStatus } from "@/lib/loan-types";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const status = new URL(request.url).searchParams.get("status") as RuleStatus | null;
  try {
    return NextResponse.json(await listInterestRules(status && Object.values(RuleStatus).includes(status) ? status : undefined));
  } catch (error) {
    return loanErrorResponse(error, "Unable to load loan interest rules.");
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const parsed = loanInterestRuleWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid loan interest rule." }, { status: 400 });
  }

  try {
    return NextResponse.json(await createInterestRule(parsed.data), { status: 201 });
  } catch (error) {
    return loanErrorResponse(error, "Unable to create loan interest rule.");
  }
}
