const { Pool } = require("pg");

type PgPool = {
  query: <Row extends Record<string, unknown> = Record<string, unknown>>(
    text: string,
    values?: unknown[],
  ) => Promise<{ rows: Row[] }>;
};

const globalForPg = globalThis as typeof globalThis & {
  appPgPool?: PgPool;
};

export function getPgPool(): PgPool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalForPg.appPgPool) {
    globalForPg.appPgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000,
    });
  }

  const pool = globalForPg.appPgPool;
  if (!pool) {
    throw new Error("Unable to initialize Postgres pool.");
  }

  return pool;
}
