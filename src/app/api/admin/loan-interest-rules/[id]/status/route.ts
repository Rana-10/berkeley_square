import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { loanErrorResponse, parsePositiveId } from "@/lib/loan-api-utils";
import { loanRuleStatusSchema } from "@/lib/loan-calculation-validation";
import { updateInterestRuleStatus } from "@/lib/loan-rule-repository";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const id = parsePositiveId((await context.params).id);
  if (!id) return NextResponse.json({ error: "Invalid loan interest rule id." }, { status: 400 });

  const parsed = loanRuleStatusSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid rule status." }, { status: 400 });
  }

  try {
    return NextResponse.json(await updateInterestRuleStatus(id, parsed.data.status));
  } catch (error) {
    return loanErrorResponse(error, "Unable to update loan interest rule status.");
  }
}
