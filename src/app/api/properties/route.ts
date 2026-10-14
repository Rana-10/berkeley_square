import { NextResponse } from "next/server";
import {
  findReadableProperties,
  serializeReadableProperty,
} from "@/lib/property-read-repository";
import { isPropertyMarketOption } from "@/lib/property-markets";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const requestedMarket = new URL(request.url).searchParams.get("market") ?? "All";
    const market = isPropertyMarketOption(requestedMarket) ? requestedMarket : "All";
    const properties = await findReadableProperties(market);
    return NextResponse.json(properties.map(serializeReadableProperty));
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      console.warn("Property database unavailable; returning empty listings.");
      return NextResponse.json([]);
    }

    console.error("Unable to load properties", error);
    return NextResponse.json(
      { error: "Unable to load properties." },
      { status: 500 },
    );
  }
}

function isDatabaseUnavailable(error: unknown) {
  return (
    error instanceof Error &&
    ("code" in error || "cause" in error) &&
    (
      (error as NodeJS.ErrnoException).code === "ECONNREFUSED" ||
      (error as NodeJS.ErrnoException).code === "ENOTFOUND" ||
      (error as NodeJS.ErrnoException).code === "ETIMEDOUT" ||
      ((error as Error).cause as NodeJS.ErrnoException | undefined)?.code === "ECONNREFUSED"
    )
  );
}
