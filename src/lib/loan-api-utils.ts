import { NextResponse } from "next/server";
import { LoanBusinessError } from "./loan-types";

export function parsePositiveId(id: string) {
  const numericId = Number(id);
  return Number.isInteger(numericId) && numericId > 0 ? numericId : null;
}

export function loanErrorResponse(error: unknown, fallbackMessage: string) {
  if (error instanceof LoanBusinessError) {
    const status = error.code.startsWith("INVALID") || error.code.startsWith("OVERLAPPING") ? 400 : 422;
    return NextResponse.json({ error: error.code, code: error.code }, { status });
  }

  console.error(fallbackMessage, error);
  return NextResponse.json({ error: fallbackMessage }, { status: 500 });
}
