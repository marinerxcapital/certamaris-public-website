# Product Screenshot Governance

This standard controls public CertaMaris product screenshots used on the marketing website.

## Asset Standard

- Source resolution: `1440x1040` PNG.
- Aspect ratio: `18:13`.
- Source location: `public/product/clean/`.
- Optimized variants: `public/product/optimized/`.
- Required optimized widths: `384`, `640`, and `960` WebP.
- Naming: lowercase kebab-case, matching the source PNG base name, for example `audit-readiness.png` and `audit-readiness-640.webp`.
- Crop: show product chrome, sidebar context, title, and the primary working area. Do not crop away the workflow context that explains the screen.
- Safe margins: keep critical text and controls at least `24px` from the screenshot edge.

## Data Rules

- Use sanitized product-like data only.
- Prefer role and function labels over person names.
- Generic roles are acceptable: `Assurance owner`, `Compliance lead`, `Security lead`, `Technical manager`, and `DPA review`.
- Avoid accidental placeholder names such as `John Doe`, `Jane Smith`, `Test User`, `Acme`, or `Demo Customer`.
- Do not include real customer names, customer logos, vessel names, IMO numbers, addresses, emails, phone numbers, or personal data unless specifically approved for public use.

## Metric Policy

Public screenshots must not show unsupported business metrics or outcomes, including:

- Dollar exposure, avoided loss, aggregate loss estimates, or revenue impact.
- NPS, logo retention, win rate, board score, regulator grade, or similar commercial KPIs.
- Audit pass rate, certification status, class approval, regulator acceptance, or guaranteed survey outcomes.
- Customer results, benchmark claims, or time savings unless approved and substantiated.

Allowed operational labels include:

- Assurance posture.
- Open critical findings.
- Evidence freshness.
- Corrective actions awaiting verification.
- Exceptions requiring review.
- Upcoming review package.
- Governance decisions.
- Readiness package status.

## Claim Mapping

Each screenshot may support only the claims below:

| Screenshot | Allowed marketing claim |
|---|---|
| `requirement-control-mapping.png` | Requirements, controls, evidence, exceptions, and validation history stay connected. |
| `evidence-coverage.png` | Evidence sufficiency and freshness can be reviewed before a document chase begins. |
| `findings-register.png` | Findings remain owned, risk-rated, aged, and tied to action context. |
| `corrective-actions.png` | Corrective actions remain time-bound and independently verifiable before closure. |
| `audit-readiness.png` | Readiness packages can organize scope, evidence, findings, actions, exceptions, and reviewer notes for inspection. |
| `governance-reporting.png` | Governance reporting can summarize assurance posture, freshness, actions, and review decisions from the same record. |
| `fleet-inventory.png` | Fleet scope and review cadence can remain visible where vessel or facility scope matters. |

## Placement and Sequencing

- The primary marketing sequence is requirement mapping -> evidence sufficiency -> findings ownership -> corrective-action verification -> audit readiness -> governance reporting.
- Homepage and solution overview sections should make the first one or two proof screens visually dominant. Later governance and fleet-scope views should support the story rather than compete with the operational proof screens.
- Use audit-readiness screens where the page discusses review packages, survey preparation, or readiness workflow.
- Use governance reporting only where leadership, board, owner review, or recurring reporting is the point.
- Fleet inventory is route-contextual and should not replace the core proof sequence unless fleet scope is the section's primary claim.

## Legal and Regulatory Boundaries

- Do not imply CertaMaris provides legal or regulatory advice.
- Do not imply a certification, class approval, regulator approval, audit pass, or guaranteed survey outcome.
- Do not show badges or seals that resemble certifications unless the certificate exists and its public scope is approved.
- Keep disclaimer-sensitive language in page copy and screenshot captions aligned with the public website's compliance boundary.

## Accessibility Expectations

- Every public screenshot reference must include alt text that describes the screen and the relevant workflow.
- Lightbox titles and captions must state what the screenshot proves without overstating claims.
- Text inside screenshots should remain legible in the lightbox at desktop, tablet, and mobile viewport widths.
- Thumbnail crops must not obscure the main workflow signal.

## Review Checklist

Before deployment, verify:

- Source PNG is `1440x1040`.
- `384`, `640`, and `960` WebP variants exist.
- File names match the registry in `lib/product-screens.ts`.
- No customer claims, customer logos, personal data, fake certifications, unsupported financial metrics, or pass/fail claims appear.
- No empty states, loading states, preview toggles, debug UI, local environment labels, or obvious mock/demo controls appear.
- The screenshot is clickable in every route where it renders.
- Lightbox order follows the approved proof sequence.
- The screenshot supports the exact claim assigned in this document.
- `npm.cmd run typecheck` and `npm.cmd run build:static` pass before deployment.
