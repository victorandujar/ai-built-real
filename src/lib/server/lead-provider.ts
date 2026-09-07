import type { Lead } from '@/lib/lead-schema';
import { serverEnv } from './env';
export interface LeadProvider {
  submit(lead: Lead, id: string): Promise<void>;
}
export class ProviderUnavailable extends Error {}
export const leadProvider: LeadProvider = {
  async submit(lead, id) {
    const env = serverEnv();
    if (!env.RESEND_API_KEY || !env.RESEND_FROM || !env.CONTACT_EMAIL)
      throw new ProviderUnavailable('Delivery is not configured');
    const text = Object.entries(lead)
      .filter(([key]) => !['website', 'consent'].includes(key))
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n\n');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': id,
      },
      body: JSON.stringify({
        from: env.RESEND_FROM,
        to: [env.CONTACT_EMAIL],
        reply_to: lead.email,
        subject: 'New Reality Check request',
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Delivery failed');
  },
};
