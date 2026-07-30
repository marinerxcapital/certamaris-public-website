# CertaMaris homepage redesign deployment log

Date: 2026-07-30
Source path: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
Scope: Redesign the public landing page around the requirement-to-readiness story while preserving the Pixel Grid background.

## Summary

- Rebuilt the homepage around one narrative: Requirement -> Control -> Evidence -> Finding -> Corrective Action -> Verified Readiness.
- Preserved the AI Designer Pixel Grid as the signature animated background.
- Removed homepage use of the product screenshot lightbox and all homepage `Expand` screenshot controls.
- Added an inline product showcase with desktop workflow selection and mobile stacked workflow screenshots.
- Consolidated repetitive homepage sections into a concise problem section, assurance trace, four platform capabilities, audience section, trust boundary, and final CTA.
- Preserved CTA wording: `Book a readiness call` and `Explore the platform`.
- Preserved public-safe regulatory language for IMO MSC.428(98), IACS UR E26, and IACS UR E27.

## Files changed

- `app/page.tsx`: homepage structure, content sequence, CTAs, trace, inline showcase, capability and audience sections.
- `components/HomepageProductShowcase.tsx`: new homepage-only inline screenshot workflow component.
- `components/ProductScreens.tsx`: added `interactive={false}` support for static screenshot frames without lightbox registration.
- `app/globals.css`: homepage-specific layout primitives for hero signal panel, assurance trace, inline showcase, capability strips, audience notes, and final CTA.

## Validation

- `npm.cmd run typecheck`: PASS.
- `npm.cmd run build:static`: PASS with existing static-export warnings about headers/rewrites not applying during export.
- Lint script: NOT APPLICABLE, no `lint` script exists.
- Test script: NOT APPLICABLE, no `test` script exists.
- Local Worker browser QA: PASS at 1440px, 1280px, 768px, 390px, 360px, and simulated 200% zoom width.
- Reduced motion: PASS, Pixel Grid layer computed to `display: none`.
- Homepage lightbox removal: PASS, zero homepage product lightbox triggers, zero `Expand` text, zero product lightbox DOM.
- Pixel Grid: PASS, one `data-aifx="blocky"` instance and `pointer-events: none`. **Params refreshed 2026-07-30** — speed `0.16`, block-size `72`, contrast `1.45`, six-stop colors including `#012B6D`; see `docs/2026-07-30-pixel-grid-params-visibility-deployment.md`.
- Homepage image/network smoke: PASS, no failed asset responses; visible product screenshots loaded after scrolling.
- Screenshots saved under `qa-screenshots/homepage-redesign-desktop.png`, `qa-screenshots/homepage-redesign-tablet.png`, and `qa-screenshots/homepage-redesign-mobile.png`.

## Deployment

- Deployment authorized by user after implementation.
- Final commit SHA and Worker version ID are recorded in the final session report and memory note.
