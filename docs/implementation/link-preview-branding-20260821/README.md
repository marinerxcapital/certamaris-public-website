# Link Preview Branding 2026-08-21 - Implementation Package

**Status:** RESOLVED
**Owner:** Skyler Brown
**Repo:** `marinerxcapital/certamaris-public-website`
**Parent deployment record:** `docs/2026-08-21-link-preview-branding-deployment.md`

## Contents

This package records the root-domain link-preview remediation for `https://certamaris.com`.

| Concern | Record |
|---|---|
| Root cause | Old `public/og/certamaris-og.jpg` was still referenced by initial HTML metadata |
| New asset | `public/og/certamaris-link-preview-2026-08-v2.png` |
| Metadata source | `app/layout.tsx`, `lib/metadata.ts`, `lib/constants.ts` |
| Regression QA | `scripts/qa/check-link-preview.mjs`, `npm run qa:link-preview` |
| Deployment | PR #9, `main` commit `190533ab3688a7ca87adfb5d94131d1b19f37a5c`, workflow run `32539507125` |
| Production verification | Root HTML has one `og:image`, one `twitter:image`, zero `certamaris-og` references; preview PNG returns 200 with `1200x630` dimensions |

## Acceptance

Fresh production crawls now receive:

```text
https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png
```

for both Open Graph and Twitter image metadata.
