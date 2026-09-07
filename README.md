# AI-built → Real product

A focused service brand for founders who already built with AI and are preparing for real users. V1 is marketing, useful content and a request for a human Reality Check. It is not an automated audit or a SaaS dashboard.

## Start locally

Requires Node 22.12+ and npm. The project was created with current stable registry releases; exact versions are in package-lock.json. Use `npm ci` for a reproducible installation.

```sh
cd ~/Documents/ai-built-real-product
npm ci
npm run dev -- --host 127.0.0.1 --port 4330 --background
```

Open the URL printed by Astro. If a port is occupied, Astro may choose the next one.

```sh
npx astro dev status
npx astro dev logs
npx astro dev stop
npm run check
npm run lint
npm run build
```

`npm run format` applies Prettier. `npm run qa` checks types, formatting and production output. ESLint is deliberately omitted: strict Astro/TypeScript checking plus formatting cover the useful V1 checks without duplicate tooling. There is no React dependency.

## Architecture

- `src/config/site.ts`: brand, founder, navigation, prices, feature flags, locale and SEO defaults.
- `src/styles/global.css`: design tokens, typography, layouts, states, responsive rules and reduced motion.
- `src/components`: navigation, SEO, layout, form, report and narrative sections.
- `src/layouts/Base.astro`: semantic document and shared shell.
- `src/content/learn`: Markdown guides with schema validation and draft filtering.
- `src/content/work`: unpublished editorial template for approved case studies.
- `src/pages`: static public pages; only `/api/leads` is rendered on demand.
- `src/lib/server`: validated server configuration, lead delivery provider and rate limiting.
- `src/lib/scan.ts`: future scanner contract; no network scanner is exposed.
- `scripts/assets.mjs`: repeatable brand favicon and social image generation.
- `tests`: browser regression checks and API input checks.

The Vercel adapter creates prerendered pages plus one function. Do not deploy only `dist/client`: the lead endpoint needs the function output.

## Pages

`/`, `/reality-check`, `/check`, `/about`, `/learn`, three `/learn/*` guides, `/privacy`, `/terms`, a custom 404, `/rss.xml`, `/robots.txt` and `/sitemap-index.xml`.

`/blog` redirects permanently to `/learn`. Trailing slashes redirect to the canonical path on Vercel. There are no empty tool landing pages and no published case studies.

## Environment and opening requests

Copy `.env.example` to `.env` locally. Set the same values in Vercel's environment settings for deployment. Do not commit `.env`. Restart local development after changing environment variables.

| Variable                   | Purpose                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_SITE_URL`          | Verified HTTPS production origin. Build-time canonical, schema, RSS and sitemap base. Default `https://example.com`. |
| `PUBLIC_LAUNCH_READY`      | Defaults false. Controls sitewide noindex and robots blocking. Set true only after the launch checklist below.       |
| `CONTACT_EMAIL`            | Inbox receiving requests. Server only.                                                                               |
| `RESEND_API_KEY`           | Resend email API key. Server only.                                                                                   |
| `RESEND_FROM`              | Sender address on a domain verified in Resend. Server only.                                                          |
| `UPSTASH_REDIS_REST_URL`   | Shared rate limiter REST endpoint. Required for production requests.                                                 |
| `UPSTASH_REDIS_REST_TOKEN` | Shared rate limiter credential. Server only.                                                                         |

Without delivery credentials, the endpoint returns 503 and the form says details have not been sent. It does not pretend to save a lead. In production, missing or unavailable shared rate limiting also fails closed. Local development uses an expiring in-memory limiter.

The Resend provider sends plain text, validates input, uses an idempotency key for identical submissions and requires confirmed provider acceptance before returning success. Provider acceptance is not a guarantee of inbox delivery; configure delivery monitoring in the provider before launch. No production email was sent during development.

The endpoint accepts same-origin JSON requests only, limits body size to 20KB, uses Zod, checks a honeypot and allows five valid attempts per IP per ten minutes. The IP is hashed for the limiter key; no form values are sent to analytics. Shared rate limiting uses an atomic Redis operation. Its counter expires after ten minutes. Keep Vercel's trusted client address handling; do not substitute an arbitrary forwarded header.

## Launch checklist

1. Choose and verify the domain. Set `PUBLIC_SITE_URL` consistently for the production build. Preview deployments should retain `PUBLIC_LAUNCH_READY=false`.
2. Complete the clearly marked legal drafts: identity, contact, jurisdiction, processing details, retention, contract and cancellation terms. Review the final service description and founder copy.
3. Configure verified Resend delivery and the shared rate limiter. Send an authorised test request and confirm the receiving inbox and reply-to address. Test provider failure and the 429 limit in preview.
4. Confirm the review scope, timing, deliverables and fee for the initial offer. Prices remain unpublished; edit `site.prices` when the commercial decision is made.
5. Set `PUBLIC_LAUNCH_READY=true`, rebuild and inspect canonical URLs, robots and sitemap. The build rejects launch mode with a placeholder or insecure origin. `/check` and legal drafts stay noindex; remove legal noindex deliberately when the final pages are approved.
6. Deploy using Vercel's Astro preset, Node 22+ and `npm run build`. Confirm the function and all static pages. Submit the sitemap to Search Console after verifying ownership. Verify production security headers and redirects on the deployed URL.

## SEO

Every page has its own title and description, canonical URL, Open Graph and Twitter metadata. JSON-LD includes Organization, WebSite, relevant Service, Person, Article and BreadcrumbList. No reviews, endorsements or experience metrics are invented. FAQs are useful visible content; FAQ rich-result markup is intentionally omitted.

The sitemap excludes private-intent and draft legal routes. Check the generated files in `dist/client`. Search rankings are not guaranteed by technical SEO. The three guides answer distinct questions and include contextual internal links. Tool-specific landing pages must have original, reviewed evidence before publication.

`src/config/landing-pages.ts` defines the future content contract. Empty registry means no low-value generated routes. `/work` remains unlisted until a client-approved case exists.

Astro i18n is configured with English as the default. `src/lib/i18n.ts` defines translated URL handling. Add Spanish only when real translations exist; emit reciprocal hreflang links for those equivalents, never for an untranslated placeholder. Keep current English URLs stable.

## Content workflow

Create a Markdown file under `src/content/learn`. Its filename becomes the slug. Required frontmatter:

```yaml
title: 'A specific, useful question'
description: 'A concise summary under 170 characters.'
published: '2026-09-07'
category: 'Readiness'
order: 4
draft: true
```

Write original content with concrete checks, expected results, limits and primary references for technical claims. Preview it, set `draft: false`, and run QA. Add `updated` only when a material revision occurs. Article schema, listing, RSS and sitemap update during build. Do not publish future-dated or unreviewed copy.

Use Astro's `Image` component for future editorial raster imagery; require useful alt text, dimensions and appropriate loading. V1's decorative hero is CSS, not an image download. `public/og.png` is the actual 1200×630 social preview. `npm run assets` regenerates it and the icon set. Font license notices are shipped under `public/fonts`; Manrope and IBM Plex Mono are self-hosted, with swap and Latin subsets.

## Analytics

No analytics vendor, cookie or external tracking request is enabled. To integrate one, listen for `real-product:analytics` on `window` and forward only the approved event names and non-personal properties. Review privacy and consent requirements for the chosen setup.

Events: `hero_cta_clicked`, `reality_check_started`, `reality_check_step_completed`, `reality_check_submitted`, `reality_check_abandoned`, `pricing_viewed`, `reality_sprint_clicked`, `article_cta_clicked`, `tool_selected`.

Abandonment uses `pagehide` and is best effort. A future provider may require beacon support. Do not send product URLs, names, emails or free text as event properties.

## Verification

See `docs/QA.md` for executed checks and explicit limitations. `npm test` is the full Playwright suite; it expects a running local server. Configure `TEST_BASE_URL` and `PLAYWRIGHT_CHROME_PATH` for other machines. By default Playwright uses its installed Chromium; install it using `npx playwright install chromium` if needed. Tests intercept the success response only in the explicitly named mock-transport test. No mock result is exposed in the product.

Performance budgets: public-page initial JS under 10KB gzip, form scripts under 35KB gzip, public-page font payload under 60KB, no hero media, no CLS from intentionally unsized media. Target production Lighthouse 95–100 performance and 100 accessibility/best-practices/SEO; measure the deployed build rather than claiming unmeasured scores. Local noindex intentionally affects SEO audit scoring.

## Deliberately postponed

Automated scanning, accounts, dashboard, billing, database/CRM, repository integrations, ongoing monitoring, real case studies, tool landings, Spanish translations and a chosen analytics provider. The public scan feature flag is off, its UI states it is unavailable, and no results are simulated.

## Sources and maintenance

Official Astro docs informed [rendering](https://docs.astro.build/en/guides/on-demand-rendering/), [Tailwind](https://docs.astro.build/en/guides/styling/), [content](https://docs.astro.build/en/guides/content-collections/) and [Vercel deployment](https://docs.astro.build/en/guides/integrations-guide/vercel/). Font licenses are included locally. The launch checklist links to primary Supabase, Stripe and Google references.

The current Vercel routing dependency pins a vulnerable `path-to-regexp` version. A targeted override uses compatible 6.3.0; `npm audit` returns zero vulnerabilities. Review this override when updating the adapter, and test redirects with each update. Never run an automatic breaking-version downgrade just to clear an audit report.
