"use client";

import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";

type FreshnessState = "current" | "review_due" | "stale";
type ReviewDecision = "not_reviewed" | "accepted" | "finding_created" | "resolved";

type EvidenceItem = {
  id: string;
  file: string;
  control: string;
  custodian: string;
  version: string;
  halfLifeDays: number;
  reviewer: string;
  findingId: string;
  actionId: string;
};

const evidenceItems: EvidenceItem[] = [
  {
    id: "EVD-0847",
    file: "switch-config-export-v7.zip",
    control: "Onboard network segmentation",
    custodian: "Vessel custodian",
    version: "v7",
    halfLifeDays: 120,
    reviewer: "Independent reviewer",
    findingId: "FND-0130",
    actionId: "CAP-0455",
  },
  {
    id: "EVD-0912",
    file: "remote-access-review.pdf",
    control: "Remote access control review",
    custodian: "Fleet IT/OT",
    version: "v3",
    halfLifeDays: 90,
    reviewer: "Technical manager",
    findingId: "FND-0188",
    actionId: "CAP-0520",
  },
  {
    id: "EVD-0994",
    file: "backup-restore-test-log.xlsx",
    control: "Backup and recovery test evidence",
    custodian: "Vessel officer",
    version: "v2",
    halfLifeDays: 60,
    reviewer: "DPA",
    findingId: "FND-0204",
    actionId: "CAP-0561",
  },
];

const stateStyle: Record<FreshnessState, { badge: "ok" | "caution" | "critical"; label: string; text: string; fill: string }> = {
  current: { badge: "ok", label: "Current", text: "text-status-ok", fill: "bg-status-ok" },
  review_due: { badge: "caution", label: "Review due", text: "text-status-caution", fill: "bg-status-caution" },
  stale: { badge: "critical", label: "Stale", text: "text-status-critical", fill: "bg-status-critical" },
};

const decisionLabel: Record<ReviewDecision, string> = {
  not_reviewed: "Not reviewed in this demo run",
  accepted: "Reviewer accepted evidence",
  finding_created: "Reviewer created finding",
  resolved: "Resolved / reset state",
};

function confidence(daysSinceEvidence: number, halfLifeDays: number): number {
  return Math.pow(0.5, daysSinceEvidence / halfLifeDays);
}

function freshnessFor(pct: number): FreshnessState {
  if (pct >= 0.66) return "current";
  if (pct >= 0.33) return "review_due";
  return "stale";
}

export function EvidenceFreshnessSimulator() {
  const [globalDay, setGlobalDay] = useState(0);
  const [activeId, setActiveId] = useState(evidenceItems[0].id);
  const [resetAtById, setResetAtById] = useState<Record<string, number>>({});
  const [decisionById, setDecisionById] = useState<Record<string, ReviewDecision>>({});

  const rows = useMemo(
    () =>
      evidenceItems.map((item) => {
        const resetAt = resetAtById[item.id] ?? 0;
        const daysSince = Math.max(0, globalDay - resetAt);
        const pct = confidence(daysSince, item.halfLifeDays);
        const freshness = freshnessFor(pct);
        const decision = decisionById[item.id] ?? "not_reviewed";
        return { ...item, daysSince, pct, freshness, decision };
      }),
    [globalDay, resetAtById, decisionById]
  );

  const active = rows.find((row) => row.id === activeId) ?? rows[0];
  const activeStyle = stateStyle[active.freshness];
  const percent = Math.round(active.pct * 100);
  const findingVisible = active.decision === "finding_created" || active.decision === "resolved";

  function applyReviewerDecision() {
    setDecisionById((current) => ({
      ...current,
      [active.id]: active.freshness === "current" ? "accepted" : "finding_created",
    }));
  }

  function refreshActiveEvidence() {
    setResetAtById((current) => ({ ...current, [active.id]: globalDay }));
    setDecisionById((current) => ({ ...current, [active.id]: "resolved" }));
  }

  function resetDemo() {
    setGlobalDay(0);
    setResetAtById({});
    setDecisionById({});
    setActiveId(evidenceItems[0].id);
  }

  return (
    <div className="liquid-glass liquid-glass--subtle lg-pad-lg" data-qa="evidence-simulator-v2">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ocean-deep">
            Evidence lifecycle simulator
          </p>
          <h2 id="freshness-sim-heading" className="section-h2 section-h2--lg mb-4">
            Freshness, reviewer decision, finding, and corrective action.
          </h2>
          <p className="text-[15px] leading-relaxed text-structural">
            Illustrative demo data only. The state changes below do not modify any production customer environment
            and do not claim regulatory freshness thresholds.
          </p>

          <div className="mt-6 grid gap-3" aria-labelledby="freshness-sim-heading">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="drift-time" className="text-[13.5px] font-semibold text-navy">
                Days elapsed
              </label>
              <output htmlFor="drift-time" className="font-mono text-[13px] text-structural">
                Day {globalDay}
              </output>
            </div>
            <input
              id="drift-time"
              type="range"
              min={0}
              max={365}
              value={globalDay}
              className="w-full accent-[#1478B8]"
              onChange={(event) => setGlobalDay(Number(event.target.value))}
            />
          </div>

          <ul className="mt-6 grid gap-2" aria-label="Sample evidence items">
            {rows.map((row) => {
              const styles = stateStyle[row.freshness];
              const selected = row.id === active.id;
              return (
                <li key={row.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    className={`w-full rounded-md border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean ${
                      selected ? "border-ocean/60 bg-white shadow-card" : "border-navy/10 bg-white/70 hover:border-ocean/35"
                    }`}
                    onClick={() => setActiveId(row.id)}
                  >
                    <span className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[12px] font-semibold text-ocean-deep">{row.id}</span>
                      <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${styles.text}`}>
                        {styles.label}
                      </span>
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-navy">{row.control}</span>
                    <span className="mt-1 block text-[12.5px] text-structural">
                      {row.daysSince} day{row.daysSince === 1 ? "" : "s"} since accepted evidence
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <article className="rounded-md border border-navy/12 bg-white p-5 shadow-card" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-ocean-deep">
              {active.id}
            </span>
            <StatusBadge status={activeStyle.badge} label={activeStyle.label} />
          </div>
          <h3 className="mt-3 text-[21px] font-semibold leading-snug text-navy">{active.file}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-structural">
            This sample evidence supports {active.control.toLowerCase()} and carries custodian, version, review,
            and downstream action context.
          </p>

          <div className="mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-navy/10" aria-hidden="true">
              <div className={`h-full rounded-full transition-[width] duration-200 ${activeStyle.fill}`} style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-1 font-mono text-[11px] text-structural">{percent}% illustrative freshness signal</p>
          </div>

          <dl className="mt-5 grid gap-4 border-t border-navy/10 pt-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Evidence file</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{active.file}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Custodian</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{active.custodian}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Version</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{active.version}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Reviewer</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{active.reviewer}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Reviewer decision</dt>
              <dd className="mt-1 text-[13.5px] text-navy">{decisionLabel[active.decision]}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Resulting state</dt>
              <dd className="mt-1 text-[13.5px] text-navy">
                {active.decision === "accepted"
                  ? "Evidence remains accepted."
                  : active.decision === "resolved"
                    ? "Corrective action resolved in this demo."
                    : active.decision === "finding_created"
                      ? "Finding and corrective action are linked."
                      : "Awaiting reviewer disposition."}
              </dd>
            </div>
          </dl>

          {findingVisible ? (
            <div className="mt-5 grid gap-3 border-t border-navy/10 pt-4 sm:grid-cols-2">
              <div className="rounded-md border border-status-caution/30 bg-status-cautionBg p-3">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-status-caution">
                  {active.findingId}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-navy">
                  Finding records that the evidence needs review or refresh before package release.
                </p>
              </div>
              <div className="rounded-md border border-ocean/20 bg-paper p-3">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ocean-deep">
                  {active.actionId}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-navy">
                  Corrective action requests refreshed support and reviewer verification.
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-4 py-2 text-[14px] font-semibold text-white hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              onClick={applyReviewerDecision}
            >
              Apply reviewer decision
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-navy/15 bg-white px-4 py-2 text-[14px] font-semibold text-navy hover:border-ocean/40 hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              onClick={refreshActiveEvidence}
            >
              Submit refreshed evidence
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-navy/15 bg-white/70 px-4 py-2 text-[14px] font-semibold text-navy hover:border-ocean/40 hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              onClick={resetDemo}
            >
              Reset demo
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
