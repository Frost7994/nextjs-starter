import env from "@/data/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/config/drizzle/schema/index.ts",
  out: "./src/config/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.NEON_DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
