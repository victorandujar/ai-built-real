import { z } from 'zod';
const schema = z.object({
  CONTACT_EMAIL: z.email().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});
export function serverEnv() {
  return schema.parse(
    Object.fromEntries(
      Object.entries({ ...import.meta.env, ...process.env }).filter(
        ([, v]) => v !== '',
      ),
    ),
  );
}
