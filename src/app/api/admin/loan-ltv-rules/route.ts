import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { loanErrorResponse } from "@/lib/loan-api-utils";
import { loanLtvRuleWriteSchema } from "@/lib/loan-calculation-validation";
import { createLtvRule, listLtvRules } from "@/lib/loan-rule-repository";
import { RuleStatus } from "@/lib/loan-types";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const status = new URL(request.url).searchParams.get("status") as RuleStatus | null;
  try {
    return NextResponse.json(await listLtvRules(status && Object.values(RuleStatus).includes(status) ? status : undefined));
  } catch (error) {
    return loanErrorResponse(error, "Unable to load loan LTV rules.");
  }
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const parsed = loanLtvRuleWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid loan LTV rule." }, { status: 400 });
  }

  try {
    return NextResponse.json(await createLtvRule(parsed.data), { status: 201 });
  } catch (error) {
    return loanErrorResponse(error, "Unable to create loan LTV rule.");
  }
}
