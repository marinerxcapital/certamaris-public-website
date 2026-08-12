# Dashboard V2 Proof Mapping

## Canonical Mapping

| Marketing proof | Legacy asset | Dashboard V2 route | New asset | Capture source |
|---|---|---|---|---|
| Executive readiness | `/product/updated/executive-readiness.png` | `/client/executive` | `/product/dashboard-v2/executive-readiness.png` | `screenshots/1440/bespoke-dashboard-client-executive.png` |
| Requirement mapping | `/product/updated/requirement-mapping.png` | `/app/regulatory/mappings` | `/product/dashboard-v2/requirement-mapping.png` | `screenshots/1440/bespoke-dashboard-app-regulatory-mappings.png` |
| Evidence coverage | `/product/updated/evidence-coverage.png` | `/app/evidence/coverage` | `/product/dashboard-v2/evidence-coverage.png` | `screenshots/1440/bespoke-dashboard-app-evidence-coverage.png` |
| Findings register | `/product/updated/findings-register.png` | `/app/risks/findings` | `/product/dashboard-v2/findings-register.png` | `screenshots/1440/bespoke-dashboard-app-risks-findings.png` |
| Corrective actions | `/product/updated/corrective-actions.png` | `/app/corrective-actions/` | `/product/dashboard-v2/corrective-actions.png` | `screenshots/1440/bespoke-dashboard-app-corrective-actions.png` |
| Audit readiness | `/product/updated/audit-readiness.png` | `/app/reports-deliverables/` | `/product/dashboard-v2/audit-readiness.png` | `screenshots/1440/bespoke-dashboard-app-reports-deliverables.png` |
| Controlled release | n/a | `/app/releases/` | `/product/dashboard-v2/controlled-release.png` | `screenshots/1440/bespoke-dashboard-app-releases.png` |
| Fleet inventory | `/product/updated/fleet-inventory.png` | `/app/engagements/EG-2026-014/inventory/fleet-facilities` | `/product/dashboard-v2/fleet-inventory.png` | `screenshots/1440/bespoke-dashboard-app-engagements-eg-2026-014-inventory-fleet-facilities.png` |
| Cybersecurity plans | `/product/updated/cybersecurity-plans.png` | `/app/cybersecurity-plans/CSP-2026-014/` | `/product/dashboard-v2/cybersecurity-plans.png` | `screenshots/1440/bespoke-dashboard-app-cybersecurity-plans-csp-2026-014.png` |
| Corporate control plane | n/a | `/internal/corporate` | `/product/dashboard-v2/corporate-control-plane.png` | `screenshots/1440/bespoke-dashboard-internal-corporate.png` |
| Client company portal | n/a | `/app/organizations` | `/product/dashboard-v2/client-company-portal.png` | `screenshots/1440/bespoke-dashboard-app-organizations.png` |
| Client fleet | n/a | `/client/fleet` | `/product/dashboard-v2/client-fleet.png` | `screenshots/1440/bespoke-dashboard-client-fleet.png` |
| Vessel portal | n/a | `/client/vessels/:vesselId` | `/product/dashboard-v2/vessel-portal.png` | `screenshots/1440/bespoke-dashboard-client-vessels-param-vesselid.png` |
| Assessments | n/a | `/app/assessments` | `/product/dashboard-v2/assessments.png` | `screenshots/1440/bespoke-dashboard-app-assessments.png` |
| Integrations | n/a | `/app/integrations` | `/product/dashboard-v2/integrations.png` | `screenshots/1440/bespoke-dashboard-app-integrations.png` |
| Continuous assurance | n/a | `/app/assurance/evidence-freshness-control-drift` | `/product/dashboard-v2/continuous-assurance.png` | `screenshots/1440/live-authority-app-assurance-evidence-freshness-control-drift.png` |
| SBOM vulnerability assurance | n/a | `/app/suppliers/sbom` | `/product/dashboard-v2/sbom-vulnerability-assurance.png` | `screenshots/1440/live-authority-app-suppliers-sbom.png` |

## Route-Specific Mapping Changes

| Route | New key |
|---|---|
| `/platform/corporate-control-plane` | `corporateControlPlane` |
| `/platform/client-company-portal` | `clientCompanyPortal` |
| `/platform/fleet-management` | `clientFleet` |
| `/platform/vessel-portal` | `vesselPortal` |
| `/platform/assessments` | `assessments` |
| `/platform/evidence` | `evidenceCoverage` |
| `/platform/findings-corrective-actions` | `correctiveActions` |
| `/platform/cybersecurity-plans` | `cybersecurityPlans` |
| `/platform/regulatory-intelligence` | `requirementMapping` |
| `/platform/continuous-assurance` | `continuousAssurance` |
| `/platform/reports-readiness` | `controlledRelease` |
| `/platform/integrations` | `integrations` |
| `/solutions/fleet-cyber-compliance` | `clientFleet` |
| `/solutions/audit-survey-readiness` | `controlledRelease` |
| `/solutions/vessel-cyber-risk-management` | `vesselPortal` |
| `/solutions/cybersecurity-plan-management` | `cybersecurityPlans` |
| `/solutions/sbom-vulnerability-assurance` | `sbomVulnerabilityAssurance` |

Other solution routes continue to use shared Dashboard V2 captures where the claim is the same as the canonical concept.
