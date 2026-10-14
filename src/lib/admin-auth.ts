import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth-constants";
import { getPgPool } from "@/lib/postgres";

type AdminUserRecord = {
  id: number;
  email: string;
  password_hash: string;
  role: string;
};

type JwtPayload = {
  email: string;
  role: string;
  exp: number;
};

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is not configured.");
  return secret;
}

export async function ensureAdminUserTable() {
  const pool = getPgPool();
  await pool.query(`
    create table if not exists admin_user (
      id serial primary key,
      email varchar unique not null,
      password_hash varchar not null,
      role varchar not null default 'admin',
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )
  `);
  return pool;
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, 64).toString("base64url");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, hash] = storedHash.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;

  const expected = Buffer.from(hash, "base64url");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function upsertAdminUser(email: string, password: string) {
  const pool = await ensureAdminUserTable();
  await pool.query(
    `
      insert into admin_user (email, password_hash, role, updated_at)
      values ($1, $2, 'admin', now())
      on conflict (email)
      do update set password_hash = excluded.password_hash, role = 'admin', updated_at = now()
    `,
    [email.toLowerCase(), hashPassword(password)],
  );
}

export async function findAdminByEmail(email: string) {
  const pool = await ensureAdminUserTable();
  const result = await pool.query<AdminUserRecord>(
    `
      select id, email, password_hash, role
      from admin_user
      where lower(email) = lower($1)
      limit 1
    `,
    [email],
  );
  return result.rows[0] ?? null;
}

export function signAdminToken(payload: Omit<JwtPayload, "exp">) {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64Url(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
  }));
  const signature = createHmac("sha256", getJwtSecret())
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyAdminToken(token: string | undefined) {
  try {
    if (!token) return null;

    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return null;

    const expected = createHmac("sha256", getJwtSecret())
      .update(`${header}.${body}`)
      .digest("base64url");
    const signatureBytes = Buffer.from(signature);
    const expectedBytes = Buffer.from(expected);
    if (signatureBytes.length !== expectedBytes.length) return null;
    if (!timingSafeEqual(signatureBytes, expectedBytes)) return null;

    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as JwtPayload;
    if (payload.role !== "admin") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (session) return null;
  return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
}
