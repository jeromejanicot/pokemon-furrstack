import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "pokemon_api",
});

export const db: ReturnType<typeof drizzle> = drizzle(pool);
