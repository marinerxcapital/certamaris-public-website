import Link from "next/link";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { getStage, type AssuranceStageCode } from "@/lib/assurance-lifecycle";

type RecordPath = {
  slug: string;
  label: string;
  stages: AssuranceStageCode[];
  summary: string;
  ctaHref: string;
};

const PATHS: Record<string, RecordPath> = {
  "technical-managers-dpas": {
    slug: "technical-managers-dpas",
    label: "DPA / technical manager path",
    stages: ["EVD", "FND", "CAP", "QA", "PKG"],
    summary: "Follow evidence into findings, corrective action verification, QA review, and the readiness package.",
    ctaHref: "/demo?persona=technical-managers-dpas&stage=EVD#chain-inspector",
  },
  "ship-owners": {
    slug: "ship-owners",
    label: "Owner / fleet leadership path",
    stages: ["APP", "RSK", "CAP", "QA", "PKG"],
    summary: "See how scope, unresolved exposure, corrective actions, and release state reach leadership review.",
    ctaHref: "/demo?persona=ship-owners&stage=PKG#chain-inspector",
  },
  operators: {
    slug: "operators",
    label: "Operator path",
    stages: ["APP", "ASM", "EVD", "FND", "PKG"],
    summary: "Track company and vessel work from scope through assessment, evidence, findings, and released deliverables.",
    ctaHref: "/demo?persona=ship-owners&stage=APP#chain-inspector",
  },
  "maritime-it-ot": {
    slug: "maritime-it-ot",
    label: "IT / OT path",
    stages: ["CTL", "ASM", "EVD", "FND"],
    summary: "Inspect technical controls, assessment context, evidence freshness, and findings without flattening IT and OT.",
    ctaHref: "/demo?persona=maritime-it-ot&stage=CTL#chain-inspector",
  },
  "vessel-masters-officers": {
    slug: "vessel-masters-officers",
    label: "Vessel contributor path",
    stages: ["EVD", "FND", "CAP"],
    summary: "Show what evidence to submit, which findings are in vessel scope, and how assigned actions update the record.",
    ctaHref: "/demo?stage=EVD#chain-inspector",
  },
  "classification-survey": {
    slug: "classification-survey",
    label: "Authorized reviewer path",
    stages: ["REQ", "CTL", "EVD", "QA", "PKG"],
    summary: "Review requirement-mapped evidence and package state without implying class, flag, or survey endorsement.",
    ctaHref: "/demo?persona=classification-survey&stage=PKG#chain-inspector",
  },
  "insurers-pi": {
    slug: "insurers-pi",
    label: "Insurer / P&I path",
    stages: ["RSK", "CAP", "QA", "PKG"],
    summary: "Inspect member-authorized risk decisions, unresolved actions, QA review, and shared package state.",
    ctaHref: "/demo?stage=RSK#chain-inspector",
  },
  "maritime-service-providers": {
    slug: "maritime-service-providers",
    label: "Service provider path",
    stages: ["ASM", "EVD", "FND", "CAP"],
    summary: "Contribute assessment work, evidence, findings, and action updates while the operator remains system of record.",
    ctaHref: "/demo?stage=ASM#chain-inspector",
  },
};

const DEFAULT_PATH: RecordPath = {
  slug: "default",
  label: "Record path",
  stages: ["REQ", "CTL", "EVD", "FND", "CAP", "PKG"],
  summary: "Follow one assurance thread from requirement to controlled release.",
  ctaHref: "/demo#chain-inspector",
};

export function RoleRecordPath({ slug }: { slug: string }) {
  const path = PATHS[slug] ?? DEFAULT_PATH;

  return (
    <div className="liquid-glass liquid-glass--strong lg-pad-md" data-qa="role-record-path">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
            Your path through the record
          </p>
          <h2 className="mt-2 section-h2">{path.label}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-structural">{path.summary}</p>
        </div>
        <StatusBadge status="pending" label="Sample path" />
      </div>

      <ol className="mt-5 flex flex-wrap items-center gap-2" aria-label={`${path.label} stages`}>
        {path.stages.map((stageCode, index) => {
          const stage = getStage(stageCode);
          return (
            <li key={`${stage.code}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span className="text-[12px] text-ocean" aria-hidden="true">-&gt;</span> : null}
              <span
                className="rounded-md border border-ocean/20 bg-white px-2.5 py-1.5 font-mono text-[12px] font-semibold text-ocean-deep"
                title={stage.label}
              >
                {stage.code}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button href={path.ctaHref}>Open this demo path</Button>
        <Link href="/trust/assurance-model" className="self-center text-[14px] font-semibold text-ocean hover:underline">
          Assurance model
        </Link>
      </div>
    </div>
  );
}
