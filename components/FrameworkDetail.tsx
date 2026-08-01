import Link from "next/link";
import type { RegulatoryFramework } from "@/lib/regulatory";
import { mappingStatusLabel } from "@/lib/regulatory";
import { ReferenceLabel } from "@/components/Section";

export function FrameworkDetail({ framework }: { framework: RegulatoryFramework }) {
  return (
    <article className="premium-card p-6 sm:p-8 space-y-6">
      <header className="space-y-2">
        <ReferenceLabel className="text-[11px] tracking-[0.08em]">{framework.issuingAuthority}</ReferenceLabel>
        <h2 className="text-[20px] sm:text-[22px] font-semibold leading-snug text-navy">{framework.shortName}</h2>
        <p className="text-[14.5px] text-structural leading-relaxed">{framework.officialTitle}</p>
      </header>

      <dl className="grid sm:grid-cols-2 gap-4 text-[13.5px]">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ocean mb-1">Version</dt>
          <dd className="text-navy/85">{framework.version}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ocean mb-1">Publication</dt>
          <dd className="text-navy/85">{framework.publicationDate ?? "See official source / current edition"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ocean mb-1">Effective / applicability</dt>
          <dd className="text-navy/85 leading-relaxed">{framework.effectiveApplicability}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ocean mb-1">Scope</dt>
          <dd className="text-navy/85 leading-relaxed">{framework.scope}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ocean mb-1">CertaMaris mapping</dt>
          <dd className="text-navy/85">{mappingStatusLabel(framework.mappingStatus)}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ocean mb-1">Last reviewed</dt>
          <dd className="text-navy/85">{framework.lastReviewed}</dd>
        </div>
      </dl>

      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold text-navy">Summary</h3>
        <p className="text-[14.5px] text-structural leading-relaxed">{framework.summary}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold text-navy">Operational implications</h3>
        <ul className="list-disc pl-5 space-y-2 text-[14.5px] text-structural leading-relaxed">
          {framework.operationalImplications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold text-navy">Mapping status (honest)</h3>
        <p className="text-[14.5px] text-structural leading-relaxed">{framework.mappingStatusNote}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold text-navy">Related product workflows</h3>
        <ul className="flex flex-wrap gap-2">
          {framework.relatedProductWorkflows.map((w) => (
            <li
              key={w}
              className="rounded-full border border-ocean/25 bg-ocean/5 px-3 py-1 text-[12.5px] font-medium text-navy"
            >
              {w}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-navy/10">
        <a
          href={framework.officialSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-medium text-ocean hover:underline"
        >
          Official source →
        </a>
        <Link href="/platform" className="text-[14px] font-medium text-ocean hover:underline">
          Platform workflows →
        </Link>
      </div>

      <p className="text-[12.5px] text-structural/90 leading-relaxed border-t border-navy/10 pt-4">
        {framework.disclaimer}
      </p>
    </article>
  );
}
