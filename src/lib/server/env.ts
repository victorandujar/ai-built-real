import { z } from 'zod';
const schema = z.object({
  CONTACT_EMAIL: z.email().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});
export function serverEnv() {
  const parsed = schema.safeParse(
    Object.fromEntries(
      Object.entries({ ...import.meta.env, ...process.env }).filter(
        ([, v]) => v !== '',
      ),
    ),
  );
  // A malformed value (stray quotes, a trailing newline from a paste) must name
  // itself, or the endpoint reports an anonymous 503.
  if (!parsed.success)
    throw new Error(
      `Server environment is invalid: ${parsed.error.issues
        .map((issue) => `${issue.path.join('.')} (${issue.message})`)
        .join(', ')}`,
    );
  return parsed.data;
}
