// utils
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

const envSchema = z.object({});

expand(config({ path: ".env.local" }));

try {
  envSchema.parse(process.env);
} catch (e) {
  if (e instanceof ZodError) {
    console.error("Environment validation error:", e.errors);
  }
}

export default envSchema.parse(process.env);
