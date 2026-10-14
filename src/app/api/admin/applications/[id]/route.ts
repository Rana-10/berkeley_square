import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { updateApplicationStatus } from "@/lib/application-repository";
import { ApplicationStatus } from "@/schema";

export const runtime = "nodejs";

const statusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const applicationId = Number(id);
  if (!Number.isInteger(applicationId) || applicationId < 1) {
    return NextResponse.json({ error: "Invalid application id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid application status." }, { status: 400 });
  }

  try {
    return NextResponse.json(await updateApplicationStatus(applicationId, parsed.data.status));
  } catch (error) {
    return NextResponse.json({ error: "Unable to update application." }, { status: 500 });
  }
}
