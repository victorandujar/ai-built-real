import { Resend } from 'resend';
import type { Lead } from '@/lib/lead-schema';
import { serverEnv } from './env';
export interface LeadProvider {
  submit(lead: Lead, id: string): Promise<void>;
}
export class ProviderUnavailable extends Error {}
const labels: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  productUrl: 'Product URL',
  description: 'What they built',
  tool: 'Built with',
  users: 'Current users',
  payments: 'Payments',
  data: 'Customer or personal data',
  next: 'Next stage',
  repository: 'Repository (optional)',
  uncertainty: 'Main uncertainty',
  interest: 'Interested in',
};
export const leadProvider: LeadProvider = {
  async submit(lead, id) {
    const env = serverEnv();
    if (!env.RESEND_API_KEY || !env.RESEND_FROM || !env.CONTACT_EMAIL)
      throw new ProviderUnavailable('Delivery not configured');
    const resend = new Resend(env.RESEND_API_KEY);
    const text = [
      'REAL PRODUCT / NEW REQUEST',
      '',
      ...Object.entries(lead)
        .filter(([key]) => !['website', 'consent'].includes(key))
        .map(
          ([key, value]) =>
            `${labels[key] || key}\n${value || 'Not provided'}\n`,
        ),
      'The requester agreed to be contacted about this product review.',
    ].join('\n');
    const { data, error } = await resend.emails.send(
      {
        from: env.RESEND_FROM,
        to: [env.CONTACT_EMAIL],
        replyTo: lead.email,
        subject: `Reality ${lead.interest === 'sprint' ? 'Sprint' : 'Check'} — new product request`,
        text,
      },
      { idempotencyKey: id },
    );
    if (error || !data?.id)
      throw new Error('Email provider did not confirm acceptance');
  },
};
