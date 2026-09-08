# Verification — 8 September 2026

## Executed

- Astro type checking: 50 files, zero errors, warnings or hints.
- Production build: successful, Vercel function and static output generated.
- Generated HTML: 11 pages checked for one H1, canonical, description, valid JSON-LD and unique IDs; 11 internal paths resolved. Preview robots blocks indexing as intended.
- Playwright API test passed: cross-origin rejected (403), malformed JSON (400), oversized body (413), invalid/honeypot input (422).
- In-app browser screenshots inspected at widths 375, 768, 1440 and 1920. Home had no horizontal overflow. Corrected the tablet sculpture/control overlap and inspected again.
- Actual WebGL rendering and assembly toggle verified. Controls reflect assembled and automatically paused states.
- Mobile form: empty-step validation, inline messages, first-invalid focus, valid progression, summary, sending/disabled state, unavailable-delivery alert and retry action verified. Name, email and consent remain after failure. Back navigation remains available.
- Removed an Anime.js warning caused by selecting nonexistent hero lines on secondary pages.

## Measured production assets

Gzip sizes before the final no-target guard (which changes the shared entry only slightly): shared Base entry 2.2KB; animation/analytics shared chunk 12.2KB; form entry 2.6KB; lazy form schema 21.4KB; sculpture entry 2.4KB; lazy Three.js chunks 128.4KB plus rounded geometry 0.8KB. Three self-hosted font files total 71.8KB. These are artifact sizes, not measured network timings or Lighthouse scores.

The 3D scene loads when visible, caps rendering resolution, suspends when hidden, and stops continuous rendering after its automatic pause. Reduced motion uses the static CSS fallback. The page content remains available without animation scripts.

## Explicit limitations

The full Playwright run had one passing API test and eight browser tests blocked before browser startup: macOS denied Chromium MachPortRendezvous registration. The compatible browser was installed but launch remained sandbox-blocked. Therefore automated axe checks, keyboard regression, mocked-success assertions and the complete route/browser matrix are not recorded as passing. The in-app browser checks above are the checks actually performed.

Lighthouse was not executed successfully; no numerical performance, accessibility or SEO score is claimed. Run the suite and Lighthouse outside this constrained environment, preferably against a production preview. Preview noindex deliberately lowers SEO audit scoring.

No Resend API key was configured and no live email was sent. Provider acceptance, recipient delivery, verified sender, production distributed rate limiting, deployed security headers and redirects need an authorised preview test with real configuration. Legal pages and domain remain launch prerequisites.

## Reproduce

Start the local server on 4330, install Playwright Chromium, then run npm test. If browsers are stored in work/browsers, use PLAYWRIGHT_BROWSERS_PATH=./work/browsers npm test. Run npm run qa for types, formatting and build. See RESEND.md for delivery activation and README.md for launch requirements.
