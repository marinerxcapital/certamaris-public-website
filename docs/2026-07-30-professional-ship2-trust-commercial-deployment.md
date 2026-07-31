# Marketing professional Ship 2 — Trust & commercial surfaces

Date: 2026-07-30  
Source: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
Scope: Public marketing only (Security, Pricing, About, Contact).

## Ship identity

| Item | Value |
|---|---|
| Commit | `046bc5c` |
| Prior | Ship 1 `d6fd039` / Worker `220cf9d5…` |
| Worker version | `7c3477d5-0ab6-4867-a45c-480ad71582ad` |
| Agents | 4 parallel: Security · Pricing · About · Contact |
| Orchestrator | SuperGrok |

## Delivered

### Security (`lib/security-trust.ts`, `app/security/page.tsx`)
- Structured controls with Current / Configurable / Not claimed
- Last reviewed date; vendor commitments before product UI
- Subprocessors on request; honest hosting language; security@ path
- Product screens labeled as product workflows, not certifications

### Pricing (`app/pricing/page.tsx`)
- Fleet Core / Fleet Assurance / Enterprise shapes — no dollar amounts
- Software vs services split; sales-assisted honesty
- Links to `/security` and `/contact`

### About (`app/about/page.tsx`)
- Company definition, operating model, audiences, product status
- No invented team/entity; proof discipline retained

### Contact (`ContactForm`, `contact/page`, API + Worker)
- Optional role + security-package intent
- Calendar button only if `APP_SCHEDULING_URL` set
- Success honesty (not a booking); optional fields not required server-side

## Validation
- typecheck PASS
- build:static PASS
- push `origin/main` PASS
- wrangler deploy PASS

## Next program phase
Plan **Phase 5** (product proof depth: annotations, demo universe, platform restructure).  
Plan Phase 3 (homepage) was already delivered in Ship 1.
