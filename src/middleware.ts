import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth-constants";

async function verifyAdminCookie(token: string | undefined) {
  try {
    if (!token || !process.env.ADMIN_JWT_SECRET) return false;

    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(process.env.ADMIN_JWT_SECRET),
      { hash: "SHA-256", name: "HMAC" },
      false,
      ["sign"],
    );
    const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(`${header}.${body}`));
    const expected = btoa(String.fromCharCode(...new Uint8Array(signed)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

    if (signature !== expected) return false;

    const payload = JSON.parse(atob(body.replace(/-/g, "+").replace(/_/g, "/"))) as {
      exp?: number;
      role?: string;
    };
    return payload.role === "admin" && typeof payload.exp === "number" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname === "/api/admin" || pathname.startsWith("/api/admin/");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";
  const isAuthApi = pathname === "/api/admin/auth/login" || pathname === "/api/admin/auth/logout";
  if (isLoginPage || isAuthApi) return NextResponse.next();

  const verified = await verifyAdminCookie(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  if (!verified) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
