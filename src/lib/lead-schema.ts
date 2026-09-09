import { z } from 'zod';
const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine(
      (v) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v),
      'Remove control characters.',
    );
const url = z
  .string()
  .trim()
  .pipe(z.url())
  .pipe(z.string().max(2048))
  .refine((v) => {
    const u = new URL(v);
    return (
      ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password
    );
  }, 'Use a public http or https URL without credentials.');
export const leadSchema = z.object({
  productUrl: url,
  name: text(100).min(2),
  email: z.string().trim().pipe(z.email()).pipe(z.string().max(254)),
  description: text(3000).min(10),
  tool: z.enum([
    'Lovable',
    'Cursor',
    'Replit',
    'Bolt',
    'Claude Code',
    'Codex',
    'v0',
    'Windsurf',
    'Other',
  ]),
  users: z.enum(['No', 'Beta users', 'Yes']),
  payments: z.enum(['No', 'Soon', 'Yes']),
  data: z.enum(['Yes', 'No', 'Not sure']),
  next: z.enum([
    'Private testing',
    'Public beta',
    'Launch',
    'Start charging',
    'Scale existing users',
    'Other',
  ]),
  repository: z.union([url, z.literal('')]).optional(),
  uncertainty: text(3000).min(5),
  consent: z.literal(true),
  website: z.string().max(0),
  interest: z.enum(['check', 'sprint']).default('check'),
  locale: z.enum(['en', 'es']).default('en'),
});
export type Lead = z.infer<typeof leadSchema>;
