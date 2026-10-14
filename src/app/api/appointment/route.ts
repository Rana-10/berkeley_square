import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validation";
import { getPgPool } from "@/lib/postgres";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide valid appointment details." },
        { status: 400 },
      );
    }

    const receivedAt = new Date();
    const reference = `BSQ-APT-${randomUUID().slice(0, 8).toUpperCase()}`;
    const pool = getPgPool();

    await pool.query(
      `
        insert into appointment (reference, name, email, phone, service, received_at)
        values ($1, $2, $3, $4, $5, $6)
      `,
      [
        reference,
        parsed.data.name,
        parsed.data.email,
        parsed.data.phone,
        parsed.data.service,
        receivedAt,
      ],
    );

    return NextResponse.json({
      reference,
      receivedAt: receivedAt.toISOString(),
    });
  } catch (error) {
    console.error("Unable to save appointment", error);
    return NextResponse.json(
      { error: "Unable to save appointment request." },
      { status: 500 },
    );
  }
}
