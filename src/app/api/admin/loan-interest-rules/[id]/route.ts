import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { loanErrorResponse, parsePositiveId } from "@/lib/loan-api-utils";
import { loanInterestRuleWriteSchema } from "@/lib/loan-calculation-validation";
import { findInterestRuleById, updateInterestRule, updateInterestRuleStatus } from "@/lib/loan-rule-repository";
import { RuleStatus } from "@/lib/loan-types";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parsePositiveId((await context.params).id);
  if (!id) return NextResponse.json({ error: "Invalid loan interest rule id." }, { status: 400 });

  try {
    return NextResponse.json(await findInterestRuleById(id));
  } catch {
    return NextResponse.json({ error: "Loan interest rule not found." }, { status: 404 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parsePositiveId((await context.params).id);
  if (!id) return NextResponse.json({ error: "Invalid loan interest rule id." }, { status: 400 });

  const parsed = loanInterestRuleWriteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid loan interest rule." }, { status: 400 });
  }

  try {
    return NextResponse.json(await updateInterestRule(id, parsed.data));
  } catch (error) {
    return loanErrorResponse(error, "Unable to update loan interest rule.");
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parsePositiveId((await context.params).id);
  if (!id) return NextResponse.json({ error: "Invalid loan interest rule id." }, { status: 400 });

  try {
    return NextResponse.json(await updateInterestRuleStatus(id, RuleStatus.ARCHIVED));
  } catch (error) {
    return loanErrorResponse(error, "Unable to archive loan interest rule.");
  }
}
