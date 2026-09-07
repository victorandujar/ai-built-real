import type { APIRoute } from 'astro';
import { leadSchema } from '@/lib/lead-schema';
import { leadProvider, ProviderUnavailable } from '@/lib/server/lead-provider';
import { allowRequest } from '@/lib/server/rate-limit';
export const prerender = false;
const reply = (
  status: number,
  message: string,
  extra: Record<string, string> = {},
) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...extra,
    },
  });
export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return reply(403, 'Please submit from this website.');
  if (!request.headers.get('content-type')?.includes('application/json'))
    return reply(415, 'Use the product form.');
  if (Number(request.headers.get('content-length') || 0) > 20000)
    return reply(413, 'Your request is too long.');
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, 'Please complete the form.');
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20000) {
        await reader.cancel();
        return reply(413, 'Your request is too long.');
      }
      chunks.push(value);
    }
    const raw = Buffer.concat(chunks).toString('utf8');
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return reply(400, 'Please check your form and try again.');
    }
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success)
      return reply(
        422,
        'Please complete every required field with valid details.',
      );
    if (!(await allowRequest(clientAddress)))
      return reply(429, 'Too many attempts. Please try again in ten minutes.', {
        'Retry-After': '600',
      });
    // Key derived from validated payload keeps network retries idempotent.
    const { createHash } = await import('node:crypto');
    const id = createHash('sha256')
      .update(JSON.stringify(parsed.data))
      .digest('hex');
    await leadProvider.submit(parsed.data, id);
    return reply(
      200,
      'Request received. We’ll review the fit and contact you by email.',
    );
  } catch (error) {
    if (error instanceof ProviderUnavailable)
      return reply(
        503,
        'Requests are not open yet. Your details have not been sent. Please try again later.',
      );
    return reply(
      503,
      'We could not confirm delivery. Please try again later. Your entries are still here.',
    );
  }
};
