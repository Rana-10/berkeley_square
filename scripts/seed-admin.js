const { randomBytes, scryptSync } = require("crypto");
const { readFileSync } = require("fs");
const { resolve } = require("path");
const { Pool } = require("pg");

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env.local");
  const contents = readFileSync(envPath, "utf8");

  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.trim().replace(/^"|"$/g, "");
  }
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, 64).toString("base64url");
  return `scrypt:${salt}:${hash}`;
}

async function main() {
  loadEnvFile();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const databaseUrl = process.env.DATABASE_URL;

  if (!email || !password || !databaseUrl) {
    throw new Error("ADMIN_EMAIL, ADMIN_PASSWORD, and DATABASE_URL are required.");
  }

  const pool = new Pool({ connectionString: databaseUrl, connectionTimeoutMillis: 10000 });
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
  await pool.query(
    `
      insert into admin_user (email, password_hash, role, updated_at)
      values ($1, $2, 'admin', now())
      on conflict (email)
      do update set password_hash = excluded.password_hash, role = 'admin', updated_at = now()
    `,
    [email.toLowerCase(), hashPassword(password)],
  );
  await pool.end();

  console.log(`Seeded admin user: ${email}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
