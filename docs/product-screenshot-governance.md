# Product Screenshot Governance

This standard controls public CertaMaris product screenshots used on the marketing website.

## Asset Standard

- Product UI authority: current Dashboard V2 renders from the canonical CertaMaris platform implementation.
- Canonical public directory: `public/product/dashboard-v2/`.
- Optimized variants: `public/product/dashboard-v2/optimized/`.
- Required optimized widths: `384`, `640`, `960`, and `1440` WebP.
- Naming: lowercase kebab-case based on the represented Dashboard V2 surface, for example `requirement-mapping.png` and `controlled-release.png`.
- Do not create generational folders such as `clean`, `updated`, `new`, `final`, or `updated2`.
- Source dimensions may vary by Dashboard V2 route because the QA harness captures the actual settled page height. Metadata in `lib/product-screens.ts` must match the PNG dimensions exactly.
- Crop: use actual Dashboard V2 screenshots. Do not recreate or approximate Dashboard V2 in a mockup tool.

## Frame and Presentation

- Screens render as static inline proof frames with dossier chrome: label bar plus screenshot.
- Use `object-contain` so the full product UI remains visible without crop distortion.
- Featured and showcase frames may use a stronger surface treatment than tile frames; that difference is intentional.
- `ProductScreenImage` may serve WebP derivatives only for the canonical Dashboard V2 path. It must not rewrite legacy asset generations.
- The full-resolution link must point to the same canonical Dashboard V2 PNG.

## Annotations

- Defined on `ProductProofScreen.annotations?: { id, label, x, y }[]` in `lib/product-screens.ts`.
- `x` and `y` are percentages (`0`-`100`) of the screenshot image area, excluding the exhibit label bar.
- `ProductScreenFrame` renders at most 3 annotations.
- Labels must stay claim-safe: describe visible workflow structure, not certification, audit pass, regulator acceptance, dollar exposure, or guaranteed outcomes.
- If a screenshot is replaced, annotation positions must be recalculated against the new image.
- Remove annotations that no longer point at a visible Dashboard V2 object.

## Data Rules

- Use sanitized product-like data only.
- Preserve visible Dashboard V2 demo/preview data boundaries when present.
- Do not include customer data, real customer names, personal information, credentials, secrets, private URLs, raw vulnerability details, or live security findings.
- Do not invent fake compliance results to improve screenshot appearance.

## Metric Policy

Public screenshots must not show unsupported business metrics or outcomes, including:

- Dollar exposure, avoided loss, revenue impact, ARR/MRR, or financial forecasts.
- NPS, logo retention, board score, regulator grade, or similar commercial KPIs.
- Audit pass rate, certification status, class approval, regulator acceptance, or guaranteed survey outcomes.
- Customer results, benchmark claims, or time savings unless approved and substantiated.

Allowed operational labels include:

- Assurance posture.
- Open findings.
- Evidence freshness.
- Corrective actions awaiting verification.
- Exceptions requiring review.
- Upcoming review package.
- Governance decisions.
- Readiness package status.

## Current Dashboard V2 Proof Set

| Registry key | Asset | Dashboard V2 source route |
|---|---|---|
| `executiveReporting` | `executive-readiness.png` | `/client/executive` |
| `requirementMapping` | `requirement-mapping.png` | `/app/regulatory/mappings` |
| `evidenceCoverage` | `evidence-coverage.png` | `/app/evidence/coverage` |
| `findingsRegister` | `findings-register.png` | `/app/risks/findings` |
| `correctiveActions` | `corrective-actions.png` | `/app/corrective-actions/` |
| `auditReadiness` | `audit-readiness.png` | `/app/reports-deliverables/` |
| `controlledRelease` | `controlled-release.png` | `/app/releases/` |
| `fleetInventory` | `fleet-inventory.png` | `/app/engagements/EG-2026-014/inventory/fleet-facilities` |
| `cybersecurityPlans` | `cybersecurity-plans.png` | `/app/cybersecurity-plans/CSP-2026-014/` |
| `corporateControlPlane` | `corporate-control-plane.png` | `/internal/corporate` |
| `clientCompanyPortal` | `client-company-portal.png` | `/app/organizations` |
| `clientFleet` | `client-fleet.png` | `/client/fleet` |
| `vesselPortal` | `vessel-portal.png` | `/client/vessels/:vesselId` |
| `assessments` | `assessments.png` | `/app/assessments` |
| `integrations` | `integrations.png` | `/app/integrations` |
| `continuousAssurance` | `continuous-assurance.png` | `/app/assurance/evidence-freshness-control-drift` |
| `sbomVulnerabilityAssurance` | `sbom-vulnerability-assurance.png` | `/app/suppliers/sbom` |

## Claim Mapping

Each screenshot may support only the claims below:

| Screenshot | Allowed marketing claim |
|---|---|
| `executive-readiness.png` | Leadership can view qualified demo-data readiness, evidence, findings, actions, reports, and traceability signals from the controlled record. |
| `requirement-mapping.png` | Findings, evidence, engagements, and program targets can be organized for requirement mapping with product boundaries visible. |
| `evidence-coverage.png` | Evidence sufficiency, freshness, and requests can be reviewed before work becomes a document chase. |
| `findings-register.png` | Findings remain owned, risk-rated, aged, and linked to risk/action context. |
| `corrective-actions.png` | Corrective actions remain owned, dated, prioritized, and verification-oriented before closure. |
| `audit-readiness.png` | Readiness deliverables can organize package status and source context for controlled review. |
| `controlled-release.png` | Release state, approvals, exceptions, and package controls can be managed before sharing. |
| `fleet-inventory.png` | Fleet and facility scope, region, status, criticality, and review cadence remain visible where scope matters. |
| `cybersecurity-plans.png` | Plan sections, review state, linked authorities, and controlled workflow can stay visible. |
| `corporate-control-plane.png` | Internal corporate operations can see portfolio and support context without implying unrestricted tenant access. |
| `client-company-portal.png` | Company-level tenant workspace and administration can be represented with demo data. |
| `client-fleet.png` | Fleet posture, vessel roll-up, and open work can be summarized for company users. |
| `vessel-portal.png` | Vessel-scoped evidence, findings, systems, plans, and actions can remain tied to vessel membership. |
| `assessments.png` | Assessment planning, controls, questionnaire work, and review status can remain connected. |
| `integrations.png` | Integration categories and availability boundaries can be shown without claiming unsupported connectors. |
| `continuous-assurance.png` | Evidence freshness, control drift, exceptions, and review queues can be monitored between cycles. |
| `sbom-vulnerability-assurance.png` | Configurable supplier, SBOM, and vulnerability workflows can be represented without claiming universal live telemetry. |

## Validation

Before deployment, verify:

- `npm run qa:product-proof` passes.
- Every registry `src` and `fullSrc` exists.
- Every PNG dimension matches `lib/product-screens.ts`.
- Every optimized derivative exists for `384`, `640`, `960`, and `1440`.
- Active source contains zero `/product/clean/`, `/product/updated/`, or `/product/optimized/` references.
- No stale legacy screenshot filename is referenced by active source.
- Product-proof pages render without broken images at desktop, tablet, and mobile widths.
- No screenshot exposes customer data, secrets, private URLs, unsupported compliance claims, or unqualified production metrics.
