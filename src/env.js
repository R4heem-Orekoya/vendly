import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
   server: {
      NODE_ENV: z.enum(["development", "test", "production"]),
      CONVEX_DEPLOYMENT: z.string().min(1),
      CLERK_SECRET_KEY: z.string().min(1),
      UPLOADTHING_TOKEN: z.string().min(1),
      UPSTASH_REDIS_REST_URL: z.string().url().min(1),
      UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
   },
   client: {
      NEXT_PUBLIC_CONVEX_URL: z.string().min(1),
      NEXT_PUBLIC_APP_URL: z.string().min(1),
      NEXT_PUBLIC_CLERK_FRONTEND_API_URL: z.string().min(1),
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
   },
   runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
      UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

      NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_CLERK_FRONTEND_API_URL:
         process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
         process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
   },
   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
   emptyStringAsUndefined: true,
});
