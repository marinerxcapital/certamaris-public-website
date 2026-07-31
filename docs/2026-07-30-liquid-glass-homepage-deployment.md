# Liquid Glass over Pixel Grid — homepage production ship

Date: 2026-07-30  
Source: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
Scope: Public marketing homepage + shared chrome only

## Baseline

| Item | Value |
|---|---|
| Baseline commit | `788b5d93c10ab2e7b8d37c25bea4184b38764f6b` |
| Branch | `main` |
| Final commit | **`c5dfb22`** (implementation `20ee269` + mobile tablist hotfix) |
| Worker version | **`c6b24e0e-d933-47f1-a3f9-9e168950a041`** |
| Production URL | https://certamaris.com/ |
| Production verification | 2026-07-30 8-agent suite PASS after hotfix redeploy |

## Liquid Glass primitive

| Item | Value |
|---|---|
| Component | `components/LiquidGlass.tsx` |
| CSS | `app/globals.css` (`.liquid-glass*` + tokens `--lg-*`) |
| Variants | `subtle`, `default`, `strong`, `interactive`, `accent`, `dark` |
| Fallback | `@supports not (backdrop-filter)` solid-enough glass |
| Reduced motion | Interactive transitions disabled; Pixel Grid already gated |

## Homepage sections migrated

- Nav pill + mega-menu + mobile drawer (strong glass, unclipped overflow)
- Hero product proof panel (strong)
- Operational problem cards (subtle)
- Product in action showcase stages + meta (strong/interactive/subtle)
- Outcome capability cards (default)
- Audience cards (subtle)
- Regulatory boundary (strong)
- Final CTA copy panel (dark) over translucent navy section

## Pixel Grid

- Single instance via `PixelGridBackground` (unchanged mount strategy)
- Opacity raised to **0.52** desktop / **0.38** mobile for visibility through glass
- Section shells `page`/`paper` transparent (no opaque white veils)
- No second page-wide animation; no per-card WebGL glass runtime

## Validation

- `npm run typecheck` PASS
- `npm run build:static` PASS
- QA subagent fixed: nav overflow clip, nested blur muddiness, subtle opacity, variant priority, `as` typing
- Live homepage HTTP 200 with `liquid-glass` class markers

## Files changed (intended only)

- `components/LiquidGlass.tsx` (new)
- `components/HomepageProductShowcase.tsx`
- `components/Nav.tsx`
- `app/page.tsx`
- `app/globals.css`
