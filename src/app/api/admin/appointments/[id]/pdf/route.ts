import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAppointmentPdf } from "@/lib/appointment-pdf";
import { getPgPool } from "@/lib/postgres";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const appointmentId = Number(id);
  if (!Number.isInteger(appointmentId) || appointmentId < 1) {
    return NextResponse.json({ error: "Invalid appointment id." }, { status: 400 });
  }

  try {
    const pool = getPgPool();
    const result = await pool.query<{
      id: number;
      reference: string;
      name: string;
      email: string;
      phone: string;
      service: string;
      received_at: string;
    }>(
      `
        select id, reference, name, email, phone, service, received_at
        from appointment
        where id = $1
        limit 1
      `,
      [appointmentId],
    );
    const appointment = result.rows[0];
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }

    const pdf = await createAppointmentPdf({
      reference: appointment.reference,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      service: appointment.service,
      receivedAt: appointment.received_at,
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Disposition": `attachment; filename="appointment-${appointment.reference}.pdf"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Unable to create appointment PDF", error);
    return NextResponse.json({ error: "Unable to create appointment PDF." }, { status: 500 });
  }
}
