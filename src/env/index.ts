import { createEnv } from "@t3-oss/env-nextjs";
import "dotenv/config";

const env = createEnv({
  client: {},
  server: {},
  emptyStringAsUndefined: true,
  runtimeEnv: {},
});

export { env };
