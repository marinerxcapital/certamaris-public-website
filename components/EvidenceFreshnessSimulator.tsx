"use client";

import { useMemo, useState } from "react";

type ControlRow = {
  id: string;
  name: string;
  halfLifeDays: number;
};

const controls: ControlRow[] = [
  { id: "seg", name: "Onboard network segmentation (IACS UR E26)", halfLifeDays: 120 },
  { id: "patch", name: "Patch management evidence", halfLifeDays: 45 },
  { id: "access", name: "Remote access control review", halfLifeDays: 90 },
  { id: "backup", name: "Backup / recovery test log", halfLifeDays: 60 },
];

type FreshnessState = "ok" | "caution" | "critical";

function confidence(daysSinceEvidence: number, halfLifeDays: number): number {
  return Math.pow(0.5, daysSinceEvidence / halfLifeDays);
}

function stateFor(pct: number): FreshnessState {
  if (pct >= 0.66) return "ok";
  if (pct >= 0.33) return "caution";
  return "critical";
}

const stateStyles: Record<FreshnessState, { fill: string; text: string; label: string }> = {
  ok: { fill: "bg-status-ok", text: "text-status-ok", label: "Current" },
  caution: { fill: "bg-status-caution", text: "text-status-caution", label: "Review" },
  critical: { fill: "bg-status-critical", text: "text-status-critical", label: "Expired" },
};

export function EvidenceFreshnessSimulator() {
  const [globalDay, setGlobalDay] = useState(0);
  const [resetAtById, setResetAtById] = useState<Record<string, number>>({});

  const rows = useMemo(
    () =>
      controls.map((control) => {
        const resetAt = resetAtById[control.id] ?? 0;
        const daysSince = Math.max(0, globalDay - resetAt);
        const pct = confidence(daysSince, control.halfLifeDays);
        const state = stateFor(pct);
        return { ...control, daysSince, pct, state };
      }),
    [globalDay, resetAtById]
  );

  return (
    <div className="liquid-glass liquid-glass--subtle lg-pad-lg">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ocean-deep">
            Freshness simulator
          </p>
          <h2 id="freshness-sim-heading" className="section-h2 section-h2--lg mb-4">
            How linked evidence ages.
          </h2>
          <p className="text-[15px] leading-relaxed text-structural">
            Illustrative demo data only. Move time forward to see support age from current to review-needed to expired,
            then submit new evidence to reset a row.
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
        </div>

        <ul className="grid gap-3" aria-live="polite">
          {rows.map((row) => {
            const styles = stateStyles[row.state];
            const pct = Math.round(row.pct * 100);
            return (
              <li key={row.id} className="rounded-md border border-navy/10 bg-white/78 p-4">
                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(9rem,0.5fr)_auto] md:items-center">
                  <div>
                    <p className="text-[14px] font-semibold leading-snug text-navy">{row.name}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-structural">
                      {row.daysSince} day{row.daysSince === 1 ? "" : "s"} since accepted evidence
                    </p>
                  </div>
                  <div>
                    <div className="h-2 overflow-hidden rounded-full bg-navy/10" aria-hidden="true">
                      <div
                        className={`h-full rounded-full transition-[width] duration-200 ${styles.fill}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-structural">{pct}% confidence</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:justify-end">
                    <span className={`font-mono text-[12px] font-semibold uppercase tracking-[0.08em] ${styles.text}`}>
                      {styles.label}
                    </span>
                    <button
                      type="button"
                      className="min-h-9 rounded-md border border-navy/20 bg-white/70 px-3 py-1.5 text-[12.5px] font-semibold text-navy hover:border-ocean/40 hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
                      onClick={() => setResetAtById((current) => ({ ...current, [row.id]: globalDay }))}
                    >
                      Submit new evidence
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
