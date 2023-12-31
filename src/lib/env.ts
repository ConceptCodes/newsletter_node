import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import "dotenv/config";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["local", "development", "production"]),
    JWT_SECRET: z.string().min(10),
    JWT_REFRESH_SECRET: z.string().min(10),
    JWT_EXPIRES_IN: z.string().refine((x) => {
      return x.endsWith("m") || x.endsWith("h") || x.endsWith("d");
    }),
    JWT_REFRESH_EXPIRES_IN: z.string().refine((x) => {
      return x.endsWith("m") || x.endsWith("h") || x.endsWith("d");
    }),
    RESEND_API_KEY: z.string().optional(),
    PORT: z.coerce.number().default(8000),
    OPEN_AI_API_KEY: z.string().min(1)
  },
  runtimeEnv: process.env,
});
