"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { SAMPLE_RECORD, type SampleRecordObject } from "@/lib/sample-record";

const STAGE_HELP: Record<string, string> = {
  REQ: "Requirement source for the sample thread.",
  APP: "Human applicability decision for the sample vessel scope.",
  CTL: "Mapped safeguard that answers the requirement.",
  ASM: "Assessment work performed against the mapped control.",
  EVD: "Evidence artifact and freshness state.",
  FND: "Finding raised from review evidence.",
  RSK: "Recorded risk treatment decision.",
  CAP: "Corrective action with owner and verification requirement.",
  QA: "Independent package completeness review.",
  PKG: "Controlled release package assembled from the chain.",
};

function resolveInitialRecord(): string {
  if (typeof window === "undefined") return SAMPLE_RECORD[0].id;
  const params = new URLSearchParams(window.location.search);
  const record = params.get("record")?.toUpperCase();
  if (record && SAMPLE_RECORD.some((item) => item.id === record)) return record;
  const stage = params.get("stage")?.toUpperCase();
  if (stage) return SAMPLE_RECORD.find((item) => item.code === stage)?.id ?? SAMPLE_RECORD[0].id;
  return SAMPLE_RECORD[0].id;
}

function linkedRecords(record: SampleRecordObject) {
  return record.links
    .map((id) => SAMPLE_RECORD.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is SampleRecordObject => Boolean(candidate));
}

export function ChainOfCustodyInspector() {
  const [activeId, setActiveId] = useState(SAMPLE_RECORD[0].id);
  const panelId = useId();

  useEffect(() => {
    setActiveId(resolveInitialRecord());
  }, []);

  const active = useMemo(
    () => SAMPLE_RECORD.find((record) => record.id === activeId) ?? SAMPLE_RECORD[0],
    [activeId]
  );
  const activeIndex = SAMPLE_RECORD.findIndex((record) => record.id === active.id);
  const upstream = activeIndex > 0 ? SAMPLE_RECORD[activeIndex - 1] : null;
  const downstream = activeIndex < SAMPLE_RECORD.length - 1 ? SAMPLE_RECORD[activeIndex + 1] : null;
  const linked = linkedRecords(active);

  return (
    <div className="liquid-glass liquid-glass--strong lg-pad-md" data-qa="chain-custody-inspector">
      <div className="border-b border-navy/10 pb-4">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
          Chain-of-custody inspector
        </p>
        <h2 className="mt-2 section-h2 section-h2--lg">Inspect one sample requirement through release.</h2>
        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-structural">
          Demonstration fixture only: MV Certa Maris sample records, not production customer data.
          CertaMaris does not certify compliance or guarantee review outcomes.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1fr)] lg:items-start">
        <ol className="custody-inspector-chain" aria-label="Sample assurance chain">
          {SAMPLE_RECORD.map((record, index) => {
            const selected = record.id === active.id;
            return (
              <li key={record.id} className="custody-inspector-step">
                <button
                  type="button"
                  aria-current={selected ? "step" : undefined}
                  aria-controls={panelId}
                  className={`custody-inspector-button${selected ? " is-active" : ""}`}
                  onClick={() => setActiveId(record.id)}
                >
                  <span className="font-mono text-[10.5px] font-semibold text-ocean-deep">
                    {String(index + 1).padStart(2, "0")} {record.code}
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-navy">{record.id}</span>
                  <span className="text-[12.5px] leading-snug text-structural">{record.step}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <article id={panelId} className="min-w-0 rounded-md border border-navy/12 bg-white p-5 shadow-card" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-ocean-deep">
              {active.id}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-structural">
              {active.step}
            </span>
            <StatusBadge status={active.status} label={active.statusLabel} />
          </div>
          <h3 className="mt-3 text-[21px] font-semibold leading-snug text-navy">{active.title}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-structural">{active.summary}</p>

          <dl className="mt-5 grid gap-4 border-t border-navy/10 pt-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Record type</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{active.step}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Owner / reviewer</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{active.owner}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Upstream</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{upstream ? `${upstream.id} · ${upstream.step}` : "Start of chain"}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Downstream</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{downstream ? `${downstream.id} · ${downstream.step}` : "Released package"}</dd>
            </div>
            {active.fields.slice(0, 4).map(([term, detail]) => (
              <div key={term}>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">{term}</dt>
                <dd className="mt-1 text-[13.5px] text-navy">{detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 border-t border-navy/10 pt-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ocean-deep">
              Linked records
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {linked.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => setActiveId(record.id)}
                  className="rounded-md border border-navy/15 bg-paper px-2.5 py-1.5 text-left text-[12.5px] font-semibold text-navy hover:border-ocean/40 hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean"
                >
                  <span className="font-mono text-ocean-deep">{record.id}</span>
                  <span className="ml-1 font-normal text-structural">{record.step}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 rounded-md border border-navy/10 bg-paper px-3 py-2 text-[12.5px] leading-relaxed text-structural">
            {STAGE_HELP[active.code]} Selecting another node preserves the same sample lineage so the relationship
            between records remains inspectable.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={`/platform/${active.code === "EVD" ? "evidence" : active.code === "FND" || active.code === "CAP" ? "findings-corrective-actions" : active.code === "PKG" ? "reports-readiness" : "assessments"}`} variant="secondary">
              Open related platform area
            </Button>
            <Button href="/contact?intent=demo" variant="ghost">
              Request live demo
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
