import * as schema from "@/config/drizzle/schema";
import env from "@/data/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.NEON_DATABASE_URL);
export const db = drizzle(sql, { schema });

export type DB = typeof db;
