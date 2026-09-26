# Assurance Helix hero — implementation record

**Pass:** Assurance Helix hero (landing page first viewport)
**Repo:** `C:\certamaris-startup-site-pnpm\certamaris-startup-site` (marketing live SoT)
**Commit:** `7c5a641` mockup-match corrective pass on top of `4be9ffb`
**Worker version:** `547c484b-45ab-4191-b118-ccfdf7914711`
**Full record:** [`../../2026-09-26-assurance-helix-hero-deployment.md`](../../2026-09-26-assurance-helix-hero-deployment.md)

## Files

| File | Role |
|---|---|
| `lib/assurance-helix.ts` | All helix geometry, trace object list, label offsets, aura traces, and signal points. Pure functions, no React, no randomness. |
| `components/AssuranceHelix.tsx` | The client component: SVG canvas, HTML node-label layer, two micro tags, legend, motion controller, and trace-sweep layer. |
| `components/HomeHero.tsx` | Hero layout. Right column renders `<AssuranceHelix />`; left column copy/CTA unchanged except the removed wordmark and the headline measure. |
| `app/globals.css` | `.hero-helix*` / `.helix-*` styles, keyframes, responsive and reduced-motion rules. |

## Layout contract

```
.hero-section.landing-hero
└── .shell
    └── .hero-product-grid            (0.78fr / 1.22fr at ≥1024px)
        ├── .hero-copy-block           eyebrow · h1 (max-w-26ch) · support · 2 CTAs · sample-record link
        └── .hero-product-plane
            └── figure.hero-helix      (mockup-aligned product-proof exhibit; data-state, data-live, tabIndex=0)
                ├── .hero-helix__head  eyebrow + exhibit line + Full resolution link
                ├── .hero-helix__plane (position:relative, aspect 760/455 desktop; compact mobile)
                │   ├── svg.hero-helix__svg       frame · wash · telemetry · aura · signals · strands/rungs · vessel
                │   ├── ol.helix-trace            10 × li.helix-node (dot + tag + sr-only text)
                │   ├── div.helix-chip--vessel    MV Certa Maris record
                │   └── div.helix-chip--record    "One controlled record…"
                └── ol.hero-helix__legend          the three product-proof callouts
```

## Geometry constants (`lib/assurance-helix.ts`)

| Constant | Value | Why |
|---|---|---|
| `HELIX_VIEW` | 760 × 455 | Mockup-shaped exhibit aspect; labels are positioned as percentages of it |
| `AXIS_START` / `AXIS_END` | (78, 326) → (704, 106) | Shallow rising axis matching the target diagonal |
| `AXIS_BOW` | 28 | Gentle arc so the axis is not a straight rule |
| `WEAVE_AMPLITUDE` | 58 | Wide translucent strand depth without sci-fi rotation |
| `WEAVE_FLOOR` | 0.66 | Keeps the ends from pinching shut |
| `HALF_TURNS` | 5 | Exactly ten standing waves for ten objects |
| `STRAND_SAMPLES` | 72 | Control points for the Catmull-Rom → cubic paths |
| `RUNG_COUNT` | 42 | Depth-faded assurance links |

Changing `HALF_TURNS` or the node parameterisation moves nodes off the standing
waves, which reintroduces label collisions. Re-check with a browser overlap
assertion at 1280 px and 1440 px before shipping such a change.

## Motion contract

| Layer | Effect | Gate |
|---|---|---|
| `.helix-ribbon`, `.helix-core`, `.helix-aura`, `.helix-rungs`, `.helix-vessel`, `.helix-node`, `.helix-chip` | one-shot reveal/path draw (`helixDraw` / `helixFade` / `helixSettle` / `helixNodeIn`), staggered by `--i` | `data-state="run"` |
| `.helix-current` | `helixTraceSweep`, 15 s travelling trace along the front strand | `data-state="run"`, paused when `data-live="false"` |
| `.hero-helix__plane` | `helixDrift`, 52 s, ±4 px and 0.35° | `data-state="run"`, paused when `data-live="false"` |
| `.helix-node__dot::after`, `.helix-node__tag::after` | `helixStep`, 15 s loop, one object emphasised at a time | `data-state="run"`, paused when `data-live="false"` |
| `:focus-visible` on the figure | `helixStepOnce`, same sweep, one pass | `data-state="run"` |
| `.hero-helix__svg` + `.helix-trace` | pointer depth, identical offsets so dots stay seated on the weave | fine pointer + `data-state="run"` |
| `.helix-frame`, `.helix-telemetry`, `.helix-vessel` | scroll parallax via `--sy` | `data-state="run"` |

Rules that must survive future edits:

- The strand **cores** are never animated — they guarantee a complete,
  flash-free first paint before hydration.
- Static centring uses `translate`, never `transform`, because the sitewide
  reduced-motion block sets `transform: none !important` on every element.
- All animation is nested inside `@media (prefers-reduced-motion:
  no-preference)` as well as the React gate.

## Content rules

- Object order is the product's order and must never be reordered.
- Displayed record ids follow the supplied mockup: `REQ-026`, `APP-014`,
  `CTL-041`, `ASM-023`, `EVD-238`, `FND-031`, `RSK-009`, `CAP-017`,
  `QA-066`, `PKG-004`. Keep the object order fixed.
- The vessel is "MV Certa Maris" — the same sample vessel the
  sample-record explorer already uses.
- The vessel chip's fields (FLEET 01 / Container Vessel / Cyber Readiness /
  Active) are demo attributes and are labelled "Demo data" twice.
- The three legend lines intentionally keep the previous product-proof
  wording so the exhibit's semantics survive the redesign.

## Not in this pass

- No dependency change. `package.json` changes only the static build command to
  `next build --webpack` because the current Turbopack static build failed in
  generated `next/font/google` resolution before application code.
- No change to `/demo`, `/platform`, other product exhibits, the nav, or any
  other section. `ProductScreenFrame` and `lib/product-screens.ts` are still
  used elsewhere.
- `app.certamaris.com` was not touched.

---

COMPLETED BY: DEEPSEEK-V4 VISION
DATE: 2026-09-26
TIME: 06:18 LOCAL
STATUS: PRODUCTION DEPLOYED AND VERIFIED
