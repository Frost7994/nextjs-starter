// utils
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),

  NEON_DATABASE_URL: z.string().url(),
});

expand(config({ path: ".env.local" }));

try {
  envSchema.parse(process.env);
} catch (e) {
  if (e instanceof ZodError) {
    console.error("Environment validation error:", e.errors);
  }
}

export default envSchema.parse(process.env);
