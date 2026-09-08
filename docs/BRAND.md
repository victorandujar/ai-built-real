# Brand direction

**AI-built → Real product** is a specialist product readiness brand. Reality Check is the entry offer; Reality Sprint is optional implementation. The founder is visible without turning the site into a personal portfolio.

Voice: clear, respectful, optimistic. Celebrate the builder. Explain the next reality in ordinary language. Human judgement is the service; AI is part of the working process.

Visual direction: a restrained terracotta accent on warm paper, charcoal ink, editorial typography. Density 3/10, motion 5/10, asymmetry 7/10. Archivo Variable gives the voice its directness; Instrument Serif italic brings an individual, human inflection; IBM Plex Mono labels process and evidence. Large, close-set headlines and open editorial sections replace generic feature-card layouts. Pill buttons pair a clear action with a circular arrow, with visible hover, keyboard focus, pressed and disabled states.

The hero is a bespoke Three.js sculpture of six architectural frames. Separate parts assemble into one coherent object: a physical expression of the product-readiness offer. It responds to pointer movement and an explicit assembly control. A pause control, automatic pause after 18 seconds, visibility suspension, reduced-motion support and a CSS fallback keep the experience considerate. Anime.js handles staggered type, scroll reveals, disclosures and form transitions. There is no scroll-jacking. Native page transitions progressively enhance supporting browsers.

The report is explicitly illustrative. Tool names identify starting points, not endorsements. Brand assets repeat the doorway silhouette and terracotta color.

Tokens live in `src/styles/global.css`: colors, spacing, containers, radii, shadow, font scale, easing and duration. Responsive breakpoints are 640, 900 and 1600px; CSS custom properties cannot be directly used as native media-query thresholds, so breakpoints remain explicitly declared.

## Naming exploration

| Candidate         | Strength                                      | Tradeoff                                  |
| ----------------- | --------------------------------------------- | ----------------------------------------- |
| Afterbuild        | Owns the stage after making the first version | Needs a descriptor to explain the service |
| Grounded          | Calm, physical-reality association            | Broad and potentially crowded             |
| Ready for Reality | Clear fit with the offer                      | Longer as a name                          |
| Real Product      | Direct and expandable                         | Descriptive, less ownable                 |

Keep the chosen descriptive brand for V1. No domain availability or trademark clearance is claimed. Validate the name separately before buying a domain or filing a mark.

## Commercial next steps

1. Validate the offer with five founders who have a working product and a launch date. Listen for which uncertainty would make them pay for a review.
2. Sell a small initial cohort of scoped Reality Checks, with a written deliverable and explicit timeline. Quote an optional sprint only after findings exist.
3. With explicit client permission, turn a completed check and sprint into an evidence-based case study. Use the result to write the first genuinely tool-specific landing page.

## Editorial homepage refinement

The hero and shared identity remain intact. The home now uses an editorial sequence: a typographic note to the builder, four selectable real-world scenarios, seven review lenses, an illustrative report on a paper desk, a human response, a staggered release path and three dimensional field-note volumes. Each composition supports a different reading task. The scenarios are illustrations, never product scan results. The library covers are decorative; article names remain visible outside the artwork.

The home-specific styles live in src/styles/editorial.css. RealityScenes.astro provides keyboard-operated tabs (arrows, Home and End); ReviewBench.astro uses native exclusive disclosures. editorial.ts adds selective entrance motion and scene transitions, reusing Anime.js. CSS perspective adds depth without another renderer, model download or dependency. Reduced-motion users retain readable states with new entrance motion disabled. Mobile converts the release path to a vertical sequence and the library to compact reading rows.

## Spatial edition — September 8

The home now moves away from physical stationery. Keep the established hero,
terracotta accent and editorial typography. Replace report-sheet tilt, book covers
and the form's dossier with open compositions and orbital forms. Reality scenarios
use one lazy Three.js sculpture: relationships, separate accounts, payment handoffs
and operational signals become different arrangements of the same geometry.
Controls trigger a finite transition rather than an endless decorative loop.
Field notes become full-width editorial links with responsive orbital linework.
The report remains clearly illustrative, with expandable reasoning and priorities.
