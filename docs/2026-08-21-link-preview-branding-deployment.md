# Link Preview Branding Deployment - 2026-08-21

**Status:** RESOLVED
**Completed:** 2026-08-21 17:16:12 -07:00
**Repo:** `marinerxcapital/certamaris-public-website`
**Worker:** Cloudflare `certamaris-site` (`wrangler.jsonc`)
**Root domain:** `https://certamaris.com`

## Problem

Apple Messages / iMessage / SMS and other Open Graph-aware clients were still showing obsolete CertaMaris artwork for `https://certamaris.com`. The title and description were broadly current, but the preview image source was stale.

## Root Cause

The true production source for `certamaris.com` is this public marketing repository, deployed through the Cloudflare Worker `certamaris-site`. It is not the SPA, API, monorepo marketing snapshot, or legacy backend repository.

Live source before the fix returned static initial HTML with:

- `og:image=https://certamaris.com/og/certamaris-og.jpg`
- `twitter:image=https://certamaris.com/og/certamaris-og.jpg`

That live JPEG matched `public/og/certamaris-og.jpg` exactly:

- SHA-256: `38B5D42383A1A7902034AAE8FC8340D9B1C584A8FFC4A24284C65B18632CE645`
- Dimensions: `1200x630`
- Content-Type: `image/jpeg`
- Visual source: obsolete shield / vessel CertaMaris artwork

Cloudflare was serving both root HTML and the old image from cache (`CF-Cache-Status: HIT`), but the underlying source reference was the primary defect. The production-side correction was to replace the metadata reference with a new versioned image URL, not to overwrite the old URL.

## Implementation

Files changed in PR #9:

- `app/layout.tsx`
- `lib/constants.ts`
- `lib/metadata.ts`
- `package.json`
- `public/og/certamaris-link-preview-2026-08-v2.png`
- `scripts/qa/check-link-preview.mjs`
- `scripts/qa/expected-routes.mjs`
- `scripts/qa/run-all.mjs`

New production social preview asset:

- Path: `/og/certamaris-link-preview-2026-08-v2.png`
- URL: `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`
- Type: PNG
- Dimensions: `1200x630`
- SHA-256: `78598BF7B1464C5BC048A7D67CFE8A4EA9CDB1C1059E4F5072FB26848BB9943B`
- Source branding: current CertaMaris wave mark and wordmark from `public/brand/certamaris-full.png` / optimized current brand assets

Metadata now emits in initial HTML:

- `canonical=https://certamaris.com` (Next normalizes the root slash)
- `og:type=website`
- `og:site_name=CertaMaris`
- `og:title=CertaMaris - Maritime Cyber Compliance & Assurance`
- `og:description=Maritime cyber compliance software for fleet operators - requirements, evidence, findings, and readiness packages in one controlled record.`
- `og:url=https://certamaris.com`
- `og:image=https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`
- `og:image:secure_url=https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`
- `og:image:type=image/png`
- `og:image:width=1200`
- `og:image:height=630`
- `og:image:alt=CertaMaris`
- `twitter:card=summary_large_image`
- `twitter:image=https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`
- `twitter:image:alt=CertaMaris`

Favicon / icon audit:

- `/favicon.ico`
- `/favicon-16.png`
- `/favicon-32.png`
- `/favicon-48.png`
- `/apple-icon.png`
- `/icon.png`
- `/brand/icon-192.png`
- `/brand/icon-512.png`
- `/brand/optimized/certamaris-mark-64.webp`
- `/brand/optimized/certamaris-wordmark-284.webp`

These active icon paths already used the current wave-style CertaMaris brand. No favicon/PWA replacement was required. Active production metadata no longer references the obsolete OG JPEG.

## Cache / CDN

No project-specific cache purge script or Cloudflare purge workflow was found in `README.md`, `docs/`, `scripts/`, `worker/`, `.github/`, `wrangler.jsonc`, or `package.json`.

Cache correction actions:

- Introduced a new versioned image URL so Apple and other third-party preview caches are not asked to reuse `/og/certamaris-og.jpg`.
- Deployed through the normal Cloudflare Worker pipeline on `main`.
- Verified Cloudflare now serves the corrected root HTML with new ETag `"6b12713604c097027c3a6fcb7f433a38"`.
- Verified Cloudflare now serves the new image URL with `Content-Type: image/png` and ETag `"9559a90840a76c84816f63f278e4405c"`.

## Testing

Local validation before merge:

- `npm audit --omit=dev --audit-level=high` - PASS
- `npm run typecheck` - PASS
- `npm run build:static` - PASS
- `npm run qa:link-preview` - PASS, 14 checks
- `npm run build` - PASS
- `npm run qa` - PASS, 0 failed
- `git diff --check` - PASS

Regression coverage added:

- Exactly one `og:image`
- Exactly one `twitter:image`
- Expected new versioned image URL
- Absolute HTTPS social image URLs
- `og:image:secure_url`
- `og:image:type=image/png`
- `og:image:width=1200`
- `og:image:height=630`
- Current `og:site_name`
- No active HTML reference to `certamaris-og.jpg` or `certamaris-og.png`
- Referenced PNG exists in static output
- PNG dimensions are `1200x630`

## Deployment

- Branch: `codex/link-preview-branding-20260821`
- PR: https://github.com/marinerxcapital/certamaris-public-website/pull/9
- Squash merge commit on `main`: `190533ab3688a7ca87adfb5d94131d1b19f37a5c`
- Main workflow run: `32539507125`
- Validate job: `96946575509` - PASS
- Deploy production Worker job: `96946679795` - PASS

## Production Verification

Root response after deploy:

- `https://certamaris.com/` returns `HTTP/1.1 200 OK`
- `Content-Type: text/html`
- `CF-Cache-Status: HIT`
- `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=86400`
- ETag: `"6b12713604c097027c3a6fcb7f433a38"`

Domain variants:

- `https://certamaris.com` resolves consistently to apex root content.
- `https://certamaris.com/` returns the corrected root content.
- `https://www.certamaris.com/` returns `301 Location: https://certamaris.com/`, then the corrected root content.

Literal production HTML after deploy:

- `og:image=https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`
- `twitter:image=https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`
- `og:image` count: `1`
- `twitter:image` count: `1`
- New preview path count: `6`
- Old `certamaris-og` reference count: `0`

Preview asset after deploy:

- URL: `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`
- `HTTP/1.1 200 OK`
- `Content-Type: image/png`
- `CF-Cache-Status: HIT`
- `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`
- Dimensions: `1200x630`
- Bytes: `121623`
- SHA-256: `78598BF7B1464C5BC048A7D67CFE8A4EA9CDB1C1059E4F5072FB26848BB9943B`

Crawler-style requests with `facebookexternalhit/1.1`, `Twitterbot/1.0`, and `Applebot` receive the same corrected metadata.

## iMessage / Third-Party Cache Note

Apple Messages and other preview services can retain a card for an already-seen URL independently of CertaMaris production. That cache cannot be directly purged from this repository. Production source is corrected: fresh crawls now receive a new, versioned, current-brand image URL and no active reference to the obsolete image.

## Final Status

RESOLVED.
