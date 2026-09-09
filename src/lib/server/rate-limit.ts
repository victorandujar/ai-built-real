import { createHash } from 'node:crypto';
import { serverEnv } from './env';

/** The shared limiter is unreachable or unconfigured: the request never ran. */
export class RateLimitUnavailable extends Error {}
const local = new Map<string, { count: number; until: number }>();
export async function allowRequest(ip: string): Promise<boolean> {
  const key = `reality:lead:${createHash('sha256').update(ip).digest('hex')}`;
  const env = serverEnv();
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
    const script =
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n";
    const response = await fetch(env.UPSTASH_REDIS_REST_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['EVAL', script, '1', key]),
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok)
      throw new RateLimitUnavailable(
        `Upstash replied ${response.status} ${response.statusText}`,
      );
    const data: { result?: number; error?: string } = await response.json();
    if (typeof data.result !== 'number')
      throw new RateLimitUnavailable(
        `Upstash returned no counter${data.error ? `: ${data.error}` : ''}`,
      );
    return data.result <= 5;
  }
  // Fail closed in production: serverless memory is not a shared limiter.
  if (import.meta.env.PROD)
    throw new RateLimitUnavailable(
      'UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are missing in this environment',
    );
  const now = Date.now();
  for (const [k, v] of local) if (v.until < now) local.delete(k);
  const bucket = local.get(key) || { count: 0, until: now + 600000 };
  bucket.count++;
  local.set(key, bucket);
  return bucket.count <= 5;
}
