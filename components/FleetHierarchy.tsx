import Link from "next/link";

import { LiquidGlass } from "@/components/LiquidGlass";
import { SAMPLE_RECORD_VESSEL } from "@/lib/sample-record";

const hierarchyLevels = [
  {
    id: "company",
    code: "01",
    title: "Company",
    detail: "Demo operator workspace — roles, engagements, and released deliverables in one tenant.",
    href: "/platform/client-company-portal",
    sample: "Sample client company",
  },
  {
    id: "fleet",
    code: "02",
    title: "Fleet",
    detail: "Fleet membership and readiness roll-up across vessels that share operating profiles.",
    href: "/platform/fleet-management",
    sample: "Sample Atlantic fleet",
  },
  {
    id: "vessel",
    code: "03",
    title: "Vessel",
    detail: "Vessel-scoped systems, evidence, findings, and actions with individual auditable users.",
    href: "/platform/vessel-portal",
    sample: `${SAMPLE_RECORD_VESSEL} · MV Pelagos · MV Meridian`,
  },
  {
    id: "objects",
    code: "04",
    title: "Controlled objects",
    detail: "REQ → APP → CTL → EVD → FND → CAP → PKG stay linked so reviewers can walk the chain.",
    href: "/platform/assessments",
    sample: "REQ-0104 · EVD-0847 · PKG-0067",
  },
] as const;

/**
 * Company → fleet → vessel → controlled-objects spine using labeled demo entities.
 */
export function FleetHierarchy() {
  return (
    <div className="fleet-hierarchy" data-qa="fleet-hierarchy">
      <LiquidGlass as="section" variant="subtle" padding="lg">
        <div className="mb-6 max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
            Fleet scale
          </p>
          <h3 className="mt-2 text-[22px] font-semibold leading-snug text-navy sm:text-[26px]">
            Company, fleet, vessel, and the objects reviewers actually open.
          </h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-structural">
            Demonstration hierarchy only — the same shape operators use when readiness must answer across
            more than one vessel.
          </p>
        </div>

        <ol className="fleet-hierarchy-spine" aria-label="Sample company to vessel hierarchy">
          {hierarchyLevels.map((level, index) => (
            <li key={level.id} className="fleet-hierarchy-step">
              <span className="fleet-hierarchy-index" aria-hidden="true">
                {level.code}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h4 className="text-[16px] font-semibold text-navy">
                    <Link href={level.href} className="hover:text-ocean">
                      {level.title}
                    </Link>
                  </h4>
                  {index < hierarchyLevels.length - 1 ? (
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ocean-deep">
                      scopes next level
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-structural">{level.detail}</p>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-structural">{level.sample}</p>
              </div>
            </li>
          ))}
        </ol>
      </LiquidGlass>
    </div>
  );
}
