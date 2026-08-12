# Before Inventory

## Active Registry

Before migration, `lib/product-screens.ts` defined eight product-proof concepts and every one pointed to `/product/updated/*.png`:

| Key | Legacy asset |
|---|---|
| `requirementMapping` | `/product/updated/requirement-mapping.png` |
| `evidenceCoverage` | `/product/updated/evidence-coverage.png` |
| `findingsRegister` | `/product/updated/findings-register.png` |
| `correctiveActions` | `/product/updated/corrective-actions.png` |
| `auditReadiness` | `/product/updated/audit-readiness.png` |
| `executiveReporting` | `/product/updated/executive-readiness.png` |
| `fleetInventory` | `/product/updated/fleet-inventory.png` |
| `cybersecurityPlans` | `/product/updated/cybersecurity-plans.png` |

`components/ProductScreens.tsx` transformed `/product/clean/` and `/product/updated/` paths into `/product/updated/optimized/`.

## Static Page Consumers

| Route | Source | Product-proof usage before migration |
|---|---|---|
| `/` | `app/page.tsx`, `components/HomepageProductShowcase.tsx` | `executiveReporting`, `requirementMapping`, `evidenceCoverage`, `correctiveActions`, `auditReadiness` |
| `/platform` | `app/platform/page.tsx` | `requirementMapping`, `evidenceCoverage`, `findingsRegister`, `correctiveActions`, `auditReadiness` |
| `/demo` | `app/demo/page.tsx` | `requirementMapping`, `executiveReporting`, `fleetInventory`, `evidenceCoverage`, `correctiveActions`, `findingsRegister`, `auditReadiness` |
| `/solutions` | `app/solutions/page.tsx` | `fleetInventory`, `evidenceCoverage`, `findingsRegister`, `auditReadiness` |
| `/compliance` | `app/compliance/page.tsx` | `requirementMapping`, `evidenceCoverage`, `findingsRegister`, `auditReadiness` |
| `/security` | `app/security/page.tsx` | `requirementMapping`, `evidenceCoverage`, `findingsRegister` |
| `/resources` | `app/resources/page.tsx` | `evidenceCoverage`, `requirementMapping`, `findingsRegister`, `correctiveActions`, `auditReadiness`, `executiveReporting` |

## Dynamic Platform Consumers

| Route | Before key |
|---|---|
| `/platform/corporate-control-plane` | `fleetInventory` |
| `/platform/client-company-portal` | `fleetInventory` |
| `/platform/fleet-management` | `fleetInventory` |
| `/platform/vessel-portal` | `evidenceCoverage` |
| `/platform/assessments` | `requirementMapping` |
| `/platform/evidence` | `evidenceCoverage` |
| `/platform/findings-corrective-actions` | `correctiveActions` |
| `/platform/cybersecurity-plans` | `auditReadiness` |
| `/platform/regulatory-intelligence` | `requirementMapping` |
| `/platform/continuous-assurance` | `evidenceCoverage` |
| `/platform/reports-readiness` | `auditReadiness` |
| `/platform/integrations` | `requirementMapping` |

## Dynamic Solution Consumers

| Route | Before key |
|---|---|
| `/solutions/fleet-cyber-compliance` | `fleetInventory` |
| `/solutions/audit-survey-readiness` | `auditReadiness` |
| `/solutions/imo-msc-428-98` | `requirementMapping` |
| `/solutions/iacs-ur-e26` | `requirementMapping` |
| `/solutions/iacs-ur-e27` | `evidenceCoverage` |
| `/solutions/vessel-cyber-risk-management` | `findingsRegister` |
| `/solutions/evidence-findings-management` | `findingsRegister` |
| `/solutions/corrective-action-verification` | `correctiveActions` |
| `/solutions/cybersecurity-plan-management` | `auditReadiness` |
| `/solutions/sbom-vulnerability-assurance` | `evidenceCoverage` |
| `/solutions/executive-board-reporting` | `executiveReporting` |
| `/solutions/regulatory-change-management` | `requirementMapping` |

## Legacy Assets Found

Tracked legacy product-proof files removed: 81.

Categories removed:

- Root legacy PNGs under `public/product/*.png`.
- `public/product/clean/*.png`.
- `public/product/optimized/*.webp`.
- `public/product/updated/*.png`.
- `public/product/updated/optimized/*.webp`.
