import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { findApplicationById } from "@/lib/application-repository";
import { createPropertyApplicationPdf } from "@/lib/property-application-pdf";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const applicationId = Number(id);
  if (!Number.isInteger(applicationId) || applicationId < 1) {
    return NextResponse.json({ error: "Invalid application id." }, { status: 400 });
  }

  try {
    const application = await findApplicationById(applicationId);
    const pdf = await createPropertyApplicationPdf(application);

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Disposition": `attachment; filename="property-application-${application.id}.pdf"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Unable to create property application PDF", error);
    return NextResponse.json({ error: "Unable to create property application PDF." }, { status: 500 });
  }
}
