import { NextResponse } from "next/server";
import { createApplication } from "@/lib/application-repository";
import { applicationInputSchema } from "@/lib/application-validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = applicationInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid application." },
      { status: 400 },
    );
  }

  try {
    const application = await createApplication(parsed.data);
    return NextResponse.json(
      {
        id: application.id,
        status: application.status,
        submitted_at: application.submitted_at,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to submit application", error);
    return NextResponse.json(
      { error: "Unable to submit application." },
      { status: 500 },
    );
  }
}
