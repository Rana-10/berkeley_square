import { NextResponse } from "next/server";
import { createLoanApplication } from "@/lib/loan-application-repository";
import { loanApplicationSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loanApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid application." },
        { status: 400 },
      );
    }

    return NextResponse.json(await createLoanApplication(parsed.data));
  } catch (error) {
    console.error("Unable to save loan application", error);
    return NextResponse.json(
      { error: "Unable to save loan application." },
      { status: 500 },
    );
  }
}
