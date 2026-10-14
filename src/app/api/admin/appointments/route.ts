import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getPgPool } from "@/lib/postgres";

export const runtime = "nodejs";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const pool = getPgPool();
    const result = await pool.query(
      `
        select id, reference, name, email, phone, service, received_at
        from appointment
        order by received_at desc
      `,
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Unable to load appointments", error);
    return NextResponse.json({ error: "Unable to load appointments." }, { status: 500 });
  }
}
