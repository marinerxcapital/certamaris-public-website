# CertaMaris Marketing Site — Measurement Spec

**Product surface:** https://certamaris.com (public marketing)  
**Not in scope:** https://app.certamaris.com (authenticated product — separate telemetry)  
**Date:** 2026-07-31  
**Owner lane:** SUBAGENT 7 (QA / analytics) · implement instrumentation carefully without leaking PII  

---

## 1. Current stack (as implemented in repo)

| Layer | Present? | Notes |
|---|---|---|
| **First-party event bus** | **No** | No `gtag`, Plausible, Segment, PostHog, or custom `dataLayer` in `app/` / `components/`. |
| **Cloudflare Web Analytics / beacon** | **Likely at edge** | Worker CSP report-only allows `https://static.cloudflareinsights.com` (`worker/index.ts`). CF may inject insights beacon when enabled on the zone — not committed as a script tag in Next layout. Treat as **aggregate, privacy-oriented** traffic metrics only. |
| **AidesignerRuntime** | **Yes (visual only)** | `components/AidesignerRuntime.tsx` loads `https://cdn.aidesigner.ai/effects/runtime/v1.js` via `next/script` (`afterInteractive`). Used for pixel-grid / liquid visual effects. Gated by parent on `prefers-reduced-motion` (`PixelGridBackground`). **Not a product analytics pipeline** — do not send conversion events there. |
| **Contact conversion path** | **Yes** | `ContactForm` → `POST /api/contact` (Worker) or `NEXT_PUBLIC_CONTACT_ENDPOINT`. Success/error UI state only; **no client analytics calls today**. |
| **Integration point markers** | **Partial** | Nav CTAs use `data-integration-point="sign-in"` / `"get-started"` — good hooks for future event binding without scraping copy. |

**Privacy baseline (privacy page):** cookies/analytics described as optional and privacy-conscious; do not invent a named vendor in public copy until enabled and disclosed. Prefer **no form field values** in any event payload.

---

## 2. Principles

1. **No PII in events** — never send name, email, company, free-text message, phone, vessel IDs, or IP-derived identity in custom events. Aggregate only.
2. **Consent / necessity** — if a non-essential vendor is added, gate behind documented consent (or use CF-style privacy analytics that do not require invasive cookies). Update Privacy §4 with the provider name when enabled.
3. **Marketing vs product** — marketing site measures *interest and funnel*; product app measures *usage*. Do not conflate.
4. **Static export safe** — instrumentation must work without a Node server (client-side or edge). Prefer one small first-party helper or CF analytics.
5. **Fail open for UX** — analytics errors must never block navigation or form submit.

---

## 3. Recommended destination (when implemented)

| Priority | Destination | Use |
|---|---|---|
| **P0** | Cloudflare Web Analytics (zone-level) | Page views, referrers, core web vitals-ish aggregates — already CSP-aligned |
| **P1** | First-party `window.cmTrack?.(event, props)` no-op stub | Stable API for CTAs/forms; sink later to CF custom events, Workers Analytics Engine, or privacy SaaS |
| **P2** | Optional privacy SaaS (e.g. Plausible/Fathom) | Only after legal/privacy review + Privacy page update |

Until a sink exists, **document events below** and bind with a stub that no-ops in production.

---

## 4. Event catalog

All events are **enum-like names** (snake_case). Properties are **low-cardinality** strings/booleans only.

### 4.1 `demo_request`

| Field | Value |
|---|---|
| **Trigger** | Primary marketing CTA click that routes to demo/readiness intake (`/contact`, `/demo`, or labeled “Request a readiness call” / “Request demo”) |
| **Page** | Any (capture `page_path`) |
| **Purpose** | Top-of-funnel demand |
| **Consent** | Essential interaction metric if first-party; else same as analytics cookie category |
| **Destination** | First-party stub → CF / privacy SaaS |
| **Props** | `page_path`, `cta_id` (`nav_primary` \| `hero` \| `footer` \| `pricing_band` \| `mobile_sheet`), `destination_path` |
| **Do not send** | Form field values |

### 4.2 `sign_in_click`

| Field | Value |
|---|---|
| **Trigger** | Click on Sign in (`data-integration-point="sign-in"` or equivalent) |
| **Page** | Any |
| **Purpose** | Existing-user / product intent |
| **Consent** | Interaction |
| **Destination** | First-party stub |
| **Props** | `page_path`, `target_host` (`app.certamaris.com` only — not full URL with tokens) |

### 4.3 `product_cta`

| Field | Value |
|---|---|
| **Trigger** | Click “Explore the platform” / secondary product deep-links into `/platform` or product tour anchors |
| **Page** | Home, solutions, industries, etc. |
| **Purpose** | Product interest without sales form |
| **Consent** | Interaction |
| **Destination** | First-party stub |
| **Props** | `page_path`, `cta_id`, `target_path` |

### 4.4 `pricing_cta`

| Field | Value |
|---|---|
| **Trigger** | CTA on `/pricing` (package card or “Scope a proposal”) |
| **Page** | `/pricing` |
| **Purpose** | Commercial intent |
| **Consent** | Interaction |
| **Destination** | First-party stub |
| **Props** | `page_path`, `package_id` (slug only, e.g. `fleet` — not custom quote text) |

### 4.5 `procurement_request`

| Field | Value |
|---|---|
| **Trigger** | Click/request path for procurement package (trust/security/procurement pages or contact with procurement intent) |
| **Page** | `/security`, `/trust`, `/procurement`, `/contact` |
| **Purpose** | Enterprise buying process |
| **Consent** | Interaction |
| **Destination** | First-party stub |
| **Props** | `page_path`, `source` (`security_page` \| `procurement_page` \| `contact_intent`) |
| **Do not send** | NDA content, company legal names from forms |

### 4.6 `security_package_request`

| Field | Value |
|---|---|
| **Trigger** | Contact form submitted with `securityPackageIntent` true, **or** dedicated security-package CTA |
| **Page** | `/contact`, `/security` |
| **Purpose** | Security review funnel |
| **Consent** | Interaction + form success only after submit succeeds |
| **Destination** | First-party stub (fire on **success**, not on keystroke) |
| **Props** | `page_path`, `intent: "security_package"` |
| **Do not send** | Email, name, message body |

### 4.7 `resource_view`

| Field | Value |
|---|---|
| **Trigger** | View of `/resources/[slug]` (page load or ≥25% scroll — pick one and stick to it) |
| **Page** | Resource article |
| **Purpose** | Content engagement / SEO value |
| **Consent** | Page analytics category |
| **Destination** | CF page view and/or first-party |
| **Props** | `page_path`, `resource_slug`, `topic` (from front matter / `lib/resources` topic string) |

### 4.8 `form_success` / `form_failure`

| Field | Value |
|---|---|
| **Trigger** | Contact (or demo) form network result |
| **Page** | `/contact`, `/demo` |
| **Purpose** | Conversion reliability |
| **Consent** | Essential operational metric (first-party preferred) |
| **Destination** | First-party stub; optionally Workers log **counts only** |
| **Props** | `form_id` (`contact_readiness`), `status` (`success` \| `error`), `error_class` (`network` \| `validation` \| `server` — **not** server message text), `primary_need` **only if** taken from a **fixed enum** (already in form options — OK), `fleet_size_bucket` (enum only) |
| **Do not send** | `name`, `email`, `company`, `message`, raw validation strings that include user input |

### 4.9 `product_tour`

| Field | Value |
|---|---|
| **Trigger** | Interaction with homepage/platform product showcase (tab change, screen select, “tour” control) |
| **Page** | `/`, `/platform`, `/sample-platform` |
| **Purpose** | Depth of product interest |
| **Consent** | Interaction |
| **Destination** | First-party stub |
| **Props** | `page_path`, `screen_id` (from `lib/product-screens` ids), `action` (`view` \| `next` \| `prev` \| `select`) |

### 4.10 `official_source_outbound`

| Field | Value |
|---|---|
| **Trigger** | Click on outbound link to IMO / IACS / flag / class official texts (when marked `rel` + data attribute) |
| **Page** | Compliance, resources, glossary |
| **Purpose** | Measure trust/regulatory depth usage (not “we are endorsed”) |
| **Consent** | Interaction |
| **Destination** | First-party stub |
| **Props** | `page_path`, `destination_host`, `source_label` (short enum: `imo` \| `iacs` \| `other_official`) |
| **Do not send** | Full query strings if they could contain session tokens (official sites usually fine) |

---

## 5. Suggested implementation sketch (non-binding)

```ts
// lib/track.ts — optional future stub (not required for this QA pass)
type CmEvent =
  | "demo_request"
  | "sign_in_click"
  | "product_cta"
  | "pricing_cta"
  | "procurement_request"
  | "security_package_request"
  | "resource_view"
  | "form_success"
  | "form_failure"
  | "product_tour"
  | "official_source_outbound";

export function cmTrack(event: CmEvent, props: Record<string, string | boolean | number | undefined> = {}) {
  try {
    // Strip accidental PII keys
    const banned = new Set(["email", "name", "company", "message", "phone"]);
    const safe = Object.fromEntries(
      Object.entries(props).filter(([k, v]) => !banned.has(k) && v !== undefined)
    );
    if (typeof window !== "undefined") {
      (window as unknown as { cmTrack?: typeof cmTrack }).cmTrack?.(event, safe);
      // Optional: sendBeacon to first-party collector
    }
  } catch {
    /* never break UX */
  }
}
```

Wire examples:

- `Nav` Sign in → `cmTrack("sign_in_click", { page_path, target_host: "app.certamaris.com" })`
- `ContactForm` success → `cmTrack("form_success", { form_id: "contact_readiness", primary_need, fleet_size_bucket })`
- Resource page `useEffect` once → `cmTrack("resource_view", { resource_slug, topic })`

---

## 6. What we explicitly do **not** measure on marketing

- Keystrokes, heatmaps of form fields, session replay of contact forms  
- Cross-site user graphs joining marketing cookie to app session without legal review  
- Invented conversion rates or “certified” compliance outcomes  
- Any customer names or logos as “social proof” events  

---

## 7. Verification checklist

- [ ] No event payload contains email/name/message (spot-check Network tab)  
- [ ] Privacy page names any non-CF vendor before it ships  
- [ ] CSP still allows only approved script hosts  
- [ ] `prefers-reduced-motion` still skips Aidesigner load  
- [ ] QA `content-qa` clean after removing placeholder analytics copy  

**Signed:** SUBAGENT 7 · Tester · 2026-07-31
