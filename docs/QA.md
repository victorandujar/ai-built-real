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

## Form interaction refinement — 8 September, afternoon

Added progressively enhanced select-only comboboxes with native form values, selected marks, keyboard arrows/Home/End, type-to-select, Escape, outside-click dismissal and upward opening near the viewport edge. Added a CSS 3D brief whose three layers follow the form stages, plus dimensional paper treatment for illustrative reports. These additions do not load another WebGL engine.

In-app browser verification: missing selection focuses the combobox; keyboard selection works; all three steps preserve selections; Edit details returns to step one with values intact. Open menus and the staged brief were inspected on mobile and desktop; form screenshots were inspected at 375, 768, 1440 and 1920. The report was inspected on the home page. Reduced-motion rules disable the new transitions.

Astro check: 52 files, no errors/warnings/hints. Formatting and production build passed. API-only Playwright test passed independently. Full browser execution remains blocked by the same macOS Chromium startup restriction; no claim of automated accessibility or success-state verification is made. Browser regression tests now mock both delivery failure and success to avoid sending real email with local credentials. The success test includes pending state and displayed reply address assertions.

Form changes include explicit editing/sending/error/success state, completed-step marks, editable summary, delayed-send guidance, preserved values after errors and rejection of unexpected success response bodies. No real email was sent for these UI checks.

## Editorial homepage refinement — 8 September, evening

- Preserved Hero.astro and the shared design tokens; replaced the repeated home section compositions.
- Astro check: 55 files, zero errors, warnings or hints. Formatting and production build passed.
- Generated homepage: one H1, unique IDs, valid JSON-LD and 11 working internal destinations. New homepage interaction entry is 616 bytes gzip; it reuses the existing animation dependency.
- In-app browser: inspected new sections at 375, 768, 1440 and 1920 widths. No horizontal overflow in measured viewports. Corrected a duplicate disclosure indicator inherited from global styles and verified the correction.
- Verified scene selection by click and arrow key; selected state and content update. Verified opening Engineering leaves exactly one review lens expanded. No console errors or warnings returned during the final inspection.
- Browser regression coverage added for the scenes, exclusive lenses and three guide links. Automated browser execution remains unverified because of the previously documented macOS launch restriction. VoiceOver speech, device Safari and a deployed Lighthouse run remain unverified; DOM accessibility semantics and keyboard behavior were inspected through the integrated browser.
- No email submissions, new credentials, dependencies or external tracking were introduced.

## Interactive depth and report exploration

The home now has controlled exploded views, pointer-responsive perspective, a finite Anime.js replay and animated transitions when choosing scenarios. Native range inputs offer keyboard control; reduced motion avoids automatic replay and pointer motion. The report allows prioritisation filtering and expansion of illustrative findings into rationale and next action. Field-note covers hinge from their spine on hover/focus without hiding article links.

Verified in the integrated browser: blocker filter shows the two blockers; the first finding opens its explanation; End sets the layer control to fully separated; replay returns it to the assembled state. Mobile maximum separation was inspected and reduced in scale to remove clipping. No horizontal overflow at 375px. No real email sent. Automated browser suite remains subject to the previously documented launcher restriction.

## Spatial edition — September 8

- Replaced CSS specimen rectangles with a shared Three.js scene; observed a real
  canvas rendering and transitions between the first and second scenario.
- Verified the perspective slider with keyboard End; accessible value changes to
  Side perspective. Report findings still open and expose next actions.
- Reviewed actual browser screenshots at 375, 768, 1440 and 1920 px through the
  in-app browser. No horizontal overflow measured on the 375 px home.
- Checked the new request orbit at 375 px. Fixed inherited mobile dossier grid
  causing caption overlap; verified the corrected layout in a second screenshot.
- Reduced-motion uses immediate rendering; WebGL failure preserves a CSS fallback.
  These branches were inspected in code, not separately simulated in this pass.
- Check and production build passed. Full browser automation remains unverified
  because the local Chromium launch is blocked by the host sandbox.
- No live email was sent, and Resend delivery was not changed in this visual pass.
