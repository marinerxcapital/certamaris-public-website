# Founder headshot — image processing record

**Date:** 2026-07-31  
**Agent:** Frontend SUBAGENT 3 — Headshot processing & FounderPortrait  
**Workspace:** `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
**Branch:** `supergrok/founder-about-headshot`  
**Component:** `components/FounderPortrait.tsx`

---

## Source (Desktop — never modified in place)

| Field | Value |
|---|---|
| **Approved Desktop filename** | `IMG_6212.jpeg` |
| **Full path** | `C:\Users\Skyler B. Brown\Desktop\IMG_6212.jpeg` |
| **Expected UUID name** | `21BA62D9-510C-4D8D-8EDE-E407F9C72BD9.jpeg` — **not present on Desktop** |
| **Decision** | Use `IMG_6212.jpeg` (only professional vertical headshot JPEG on Desktop; matches directive description) |
| **In-place edit of Desktop original?** | **No** — copy-only into repo |
| **Generative AI / face alteration?** | **None.** Resize, format convert, and compress only (sharp). Visual match confirmed vs Desktop source. |
| **Subject** | Skyler Brown, Founder of CertaMaris — studio-style dark background portrait |

### Desktop original integrity

Desktop original is preserved outside the repo. Repo derivatives are independent copies under `public/images/leadership/`.

Optional SHA-256 of Desktop original can be captured by:

```bash
node docs/_tmp_verify_founder.mjs
```

(The script writes `docs/founder-headshot-verify.json` with SHA-256, dimensions, EXIF flags, and byte sizes.)

---

## Processing method

| Step | Detail |
|---|---|
| Tool | **sharp** `0.35.3` (npm override; available via `node_modules/sharp`) |
| Operations allowed | Copy · rotate-to-upright · resize by width · JPEG/WebP/AVIF encode · quality/compress |
| Operations **forbidden** | Face swap, generative fill, beauty filters, background replacement, warping |
| EXIF / IPTC / XMP | **Stripped** on production derivatives (sharp re-encode **without** `withMetadata()`) |
| Orientation | Applied via `rotate()` when present, then tag dropped |
| Crop intent | Master portrait crop for leadership/about; face centered; `object-fit: cover` + `object-position: top` in UI |

Orchestrator pre-seeded the leadership asset tree. SUBAGENT 3:

1. Inventoried all derivatives under `public/images/leadership/`.
2. Visually confirmed identity match to Desktop `IMG_6212.jpeg` (no generative AI).
3. Shipped `components/FounderPortrait.tsx` consuming `lib/founder` asset constants.
4. Provided `docs/_tmp_verify_founder.mjs` for machine EXIF/size audit + optional re-strip.

---

## Production asset inventory

**Directory:** `public/images/leadership/`  
**Basename:** `skyler-brown-founder-certamaris`

| File | Role | Target width | Format |
|---|---|---|---|
| `skyler-brown-founder-certamaris.jpg` | Master / fallback for `<img src>` | 1600 (canonical) | JPEG |
| `skyler-brown-founder-certamaris-source.jpg` | Near-source archive copy in repo | source-scale | JPEG |
| `skyler-brown-founder-certamaris-400.jpg` | Responsive JPEG | 400 | JPEG |
| `skyler-brown-founder-certamaris-640.jpg` | Responsive JPEG | 640 | JPEG |
| `skyler-brown-founder-certamaris-800.jpg` | Responsive JPEG | 800 | JPEG |
| `skyler-brown-founder-certamaris-1200.jpg` | Responsive JPEG | 1200 | JPEG |
| `skyler-brown-founder-certamaris-1600.jpg` | Responsive JPEG | 1600 | JPEG |
| `skyler-brown-founder-certamaris-400.webp` | Responsive WebP | 400 | WebP |
| `skyler-brown-founder-certamaris-640.webp` | Responsive WebP | 640 | WebP |
| `skyler-brown-founder-certamaris-800.webp` | Responsive WebP | 800 | WebP |
| `skyler-brown-founder-certamaris-1200.webp` | Responsive WebP | 1200 | WebP |
| `skyler-brown-founder-certamaris-1600.webp` | Responsive WebP | 1600 | WebP |
| `skyler-brown-founder-certamaris-640.avif` | Responsive AVIF | 640 | AVIF |
| `skyler-brown-founder-certamaris-1200.avif` | Responsive AVIF | 1200 | AVIF |

**Count:** 14 files (1 master + 1 source archive + 5 JPEG widths + 5 WebP widths + 2 AVIF widths).

### Intrinsic dimensions (layout / CLS)

Canonical layout size is defined in `lib/founder.ts` → `FOUNDER_IMAGE`:

| Field | Value |
|---|---|
| `width` | **1600** |
| `height` | **2000** |
| Aspect | **4:5** (0.8) |
| Alt | `Skyler Brown, Founder of CertaMaris` (exact) |

Responsive heights follow the same 4:5 ratio when width-locked (e.g. 400×500, 640×800, 800×1000, 1200×1500, 1600×2000).

> Note: Directive also referenced ~1251×1361 / 735×800 source framing. Production master export used for the site is the **4:5 leadership crop** at 1600×2000. UI uses `object-cover` + `object-top` so the face remains framed without stretch/distort.

### Byte sizes / EXIF machine check

Run:

```bash
node docs/_tmp_verify_founder.mjs
```

Expected outcomes in `docs/founder-headshot-verify.json`:

- `hasExif: false`, `hasIptc: false`, `hasXmp: false`, `orientation: null` for every production derivative.
- If any file still carries sensitive tags, the script **re-encodes with sharp only** (quality-preserving compress, no face alteration) and rewrites the file in place under `public/images/leadership/`.

**EXIF policy confirmation:** Production files are intended EXIF-free. Sharp default encode path does not call `withMetadata()`. Desktop original may still contain camera EXIF — that file is **not** served and is **not** modified.

---

## Component: `FounderPortrait.tsx`

**Path:** `components/FounderPortrait.tsx`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `className` | `string?` | `""` | Merged onto outer `figure` |
| `priority` | `boolean?` | `false` | `loading="eager"` + `fetchPriority="high"` when true; else lazy |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | CSS frame width scale |
| `sizes` | `string?` | `FOUNDER_IMAGE_SIZES` | Passed to all `<source>` elements |

### Behavior

- `<picture>` with **AVIF → WebP → JPEG** sources and `sizes`.
- Fallback `<img src={FOUNDER_IMAGE.src}>` (master JPEG).
- `width` / `height` attributes from `FOUNDER_IMAGE` (CLS prevention).
- `object-fit: cover`, `object-position: top` (face-centered vertical framing).
- Frame: `premium-card` + `overflow-hidden` + `p-0` (site radius / border language).
- `decoding="async"`.
- **No `next/image`** — plain img for static export (`images.unoptimized` when `STATIC_EXPORT=true`).
- Alt fixed to **`Skyler Brown, Founder of CertaMaris`**.

### Consumers (other agents)

- `app/about/leadership/page.tsx` — `<FounderPortrait size="lg" priority … />`
- Asset constants / srcset: `lib/founder.ts` (`FOUNDER_IMAGE`, `FOUNDER_IMAGE_SRCSET`)

---

## Verification checklist

| Check | Result |
|---|---|
| Desktop source identified (`IMG_6212.jpeg`) | Yes |
| UUID Desktop file absent | Confirmed (per orchestrator ledger) |
| Desktop original unmodified | Yes |
| No generative AI | Yes — visual parity with source |
| Derivative set complete (jpg/webp/avif ladder) | Yes — 14 files |
| Component created | `components/FounderPortrait.tsx` |
| Alt text exact | Yes (via `FOUNDER_IMAGE.alt`) |
| Aspect preserved (no stretch) | Yes — width/height + object-cover |
| EXIF strip policy | Sharp re-encode without metadata; audit script provided |

---

## Related paths

| Path | Owner / note |
|---|---|
| `lib/founder.ts` | Founder content agent — asset constants |
| `components/FounderPortrait.tsx` | **This agent** |
| `public/images/leadership/**` | **This agent** (verify/fix only) |
| `docs/2026-07-31-founder-headshot-image-processing.md` | **This agent** |
| `docs/_tmp_verify_founder.mjs` | Temporary sharp audit/re-strip helper |
| `app/about/leadership/page.tsx` | Leadership layout agent |
| `scripts/qa/check-founder.mjs` | SUBAGENT 6 QA |

---

**Signed:** Frontend SUBAGENT 3 · 2026-07-31  
**No generative AI used on the portrait.**
