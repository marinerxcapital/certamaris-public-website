# Contact intent inventory — closeout 2026-07-31

Public inventory of marketing-site contact intents and payload shape.  
**No secrets.** Forward endpoint configuration is server/Worker-only and is not listed here.

**Sources:** `lib/faq-pricing.ts`, `components/ContactForm.tsx`, `app/api/contact/route.ts`, `worker/index.ts`.

---

## Intents (11)

| Intent ID | Label | Subject tag | Sales-shaped fields |
|---|---|---|---|
| `demo` | Product demo | `[demo]` | Yes |
| `sales` | Sales | `[sales]` | Yes |
| `readiness` | Readiness call | `[readiness]` | Yes |
| `procurement` | Procurement | `[procurement]` | Yes |
| `security` | Security diligence | `[security]` | No |
| `privacy` | Privacy | `[privacy]` | No |
| `support` | Support | `[support]` | No |
| `partnership` | Partnership | `[partnership]` | No |
| `press` | Press | `[press]` | No |
| `careers` | Careers | `[careers]` | No |
| `disclosure` | Vulnerability disclosure | `[disclosure]` | No |

**Entry points**

- Page: `/contact` and `/contact?intent=<id>`
- Form intent selector (unless `lockIntent`)
- Deep links across site (e.g. `?intent=demo`, `?intent=procurement`)

**Friendly URL aliases** (normalize to a primary id):  
`request-demo` / `product-demo` → demo; `quote` / `pricing` → sales; `nda` / `security-package` → security; `vuln` / `vulnerability` → disclosure.  
Unknown → demo.

---

## Payload fields (browser → `/api/contact`)

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | |
| `email` | Yes | Work email format check |
| `company` | Sales-shaped yes | Preferred otherwise |
| `message` | Yes | Max 4,000 characters |
| `intent` | Yes | One of the 11 ids |
| `subjectTag` | Sent by form | e.g. `[demo]` for internal routing |
| `formStartedAt` | Sent by form | Client open time (ms); anti-bot min dwell |
| `fleetSize` | Sales-shaped | Select options from form |
| `vesselCount` | Sales-shaped (client) | Range select |
| `objective` / `primaryNeed` | Sales-shaped | Objective + legacy mirror |
| `timeline` / `timing` | Sales-shaped | Timeline + legacy mirror |
| `role` | Optional | |
| `currentProcess` | Optional | Sales-shaped free text |
| `documentRequestType` | Optional | Security / procurement materials interest |
| `securityPackageIntent` | Conditional | Boolean routing flag |

**Anti-abuse (not user-visible product features)**

- Honeypot field `company_website` (hidden; bots that fill it get a silent success)
- Minimum time-to-submit (client ~2.5s; server ~2s when timestamp present)

**Success:** request accepted for delivery when server forward is configured.  
**Failure:** form shows error and mailto fallback to sales contact — does not claim delivery if forward is missing or fails.

---

## Delivery model (no secrets)

1. Browser POSTs JSON to `/api/contact` (or optional public alternate endpoint env if set for pure static hosts).
2. Production site serves static assets via Cloudflare Worker; Worker handles `POST /api/contact`.
3. After validation, server/Worker forwards a **tagged JSON payload** to a configured server-only forward URL.
4. If forward is not configured, API returns an error (no false “sent” state).

Forward payload always includes at least: `name`, `email`, `company`, `message`, `intent`, `subjectTag`, `source: "certamaris-website"`, plus legacy `fleetSize` / `primaryNeed` / `timing` mirrors and optional sales/security fields when present.

---

## Select option sets (sales-shaped)

- **Fleet size:** 1-5 / 6-20 / 21-50 / 50+ vessels  
- **Vessel count:** 1-5 / 6-20 / 21-50 / 50+  
- **Role:** DPA, Technical manager, CISO / cyber lead, IT/OT, Procurement, Executive / owner, Other  
- **Objective:** Product demonstration, Readiness workflow, Evidence and findings, IACS UR E26/E27 mapping, Governance reporting, Pricing and scope, Security package / procurement  
- **Timeline:** Now / active review, Next 90 days, This year, Exploratory  
- **Document request:** None, Security overview, Questionnaire support, NDA path, Full diligence package  

---

## Related audit

Hub handoff: `02_HANDOFF/2026-07-31-CLOSEOUT-CONTACT-CODE-AUDIT.md` (control plane).

**Signed:** Frontend SUBAGENT 2 · 2026-07-31  
