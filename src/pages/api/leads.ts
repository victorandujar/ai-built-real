import type { APIRoute } from 'astro';
import { leadSchema } from '@/lib/lead-schema';
import { apiMessage, localeFromRequest } from '@/i18n/server';
import type { ApiMessage } from '@/i18n/server';
import type { Locale } from '@/i18n';
import {
  leadProvider,
  ProviderUnavailable,
  SenderDomainUnverified,
} from '@/lib/server/lead-provider';
import { allowRequest, RateLimitUnavailable } from '@/lib/server/rate-limit';
export const prerender = false;
const reply = (
  status: number,
  locale: Locale,
  key: ApiMessage,
  extra: Record<string, string> = {},
) =>
  new Response(JSON.stringify({ message: apiMessage(locale, key) }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Content-Language': locale,
      ...extra,
    },
  });
export const POST: APIRoute = async ({ request, clientAddress }) => {
  let locale = localeFromRequest(request);
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return reply(403, locale, 'wrongOrigin');
  if (!request.headers.get('content-type')?.includes('application/json'))
    return reply(415, locale, 'useForm');
  if (Number(request.headers.get('content-length') || 0) > 20000)
    return reply(413, locale, 'tooLong');
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, locale, 'incomplete');
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20000) {
        await reader.cancel();
        return reply(413, locale, 'tooLong');
      }
      chunks.push(value);
    }
    const raw = Buffer.concat(chunks).toString('utf8');
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return reply(400, locale, 'checkForm');
    }
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) return reply(422, locale, 'invalid');
    locale = parsed.data.locale;
    if (!(await allowRequest(clientAddress)))
      return reply(429, locale, 'rateLimited', { 'Retry-After': '600' });
    const { createHash } = await import('node:crypto');
    const id = createHash('sha256')
      .update(JSON.stringify(parsed.data))
      .digest('hex');
    await leadProvider.submit(parsed.data, id);
    return reply(200, locale, 'received');
  } catch (error) {
    if (error instanceof SenderDomainUnverified) {
      console.error(
        '[leads] Resend sender domain is not verified. Check RESEND_FROM and the Resend Domains dashboard.',
      );
      return reply(
        503,
        locale,
        import.meta.env.DEV ? 'unverifiedDev' : 'unverified',
        { 'X-Lead-Failure': 'sender-unverified' },
      );
    }
    if (error instanceof ProviderUnavailable) {
      console.error('[leads] Delivery is not configured:', error.message);
      return reply(503, locale, 'notOpen', {
        'X-Lead-Failure': 'not-configured',
      });
    }
    if (error instanceof RateLimitUnavailable) {
      console.error('[leads] Shared rate limit unusable:', error.message);
      return reply(503, locale, 'unconfirmed', {
        'X-Lead-Failure': 'rate-limit',
      });
    }
    // Anything else is unexpected: log it, or the 503 is undebuggable.
    console.error('[leads] Submission failed', error);
    return reply(503, locale, 'unconfirmed', { 'X-Lead-Failure': 'unknown' });
  }
};
