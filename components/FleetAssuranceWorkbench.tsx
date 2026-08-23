"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/Button";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type WorkbenchVessel = {
  id: string;
  name: string;
  type: string;
  scope: string;
  packageState: string;
  readiness: number;
  evidence: { current: number; due: number; stale: number };
  openFinding: string;
  nextAction: string;
  systems: string[];
  chain: { code: string; label: string; state: "done" | "watch" | "open" }[];
};

const vessels: WorkbenchVessel[] = [
  {
    id: "cm-01",
    name: "MV Certa Maris",
    type: "Container vessel",
    scope: "Bridge, engine monitoring, planned maintenance, shore crossover",
    packageState: "Q2 package released with one disclosed action",
    readiness: 82,
    evidence: { current: 18, due: 4, stale: 1 },
    openFinding: "Crossover firewall rule review overdue",
    nextAction: "Attach updated review log to CAP-0455",
    systems: ["Bridge network", "Engine-monitoring VLAN", "Crew LAN boundary", "Shore access procedure"],
    chain: [
      { code: "REQ", label: "UR E26 requirement versioned", state: "done" },
      { code: "APP", label: "Bridge and engine networks in scope", state: "done" },
      { code: "CTL", label: "Segmentation control mapped", state: "done" },
      { code: "EVD", label: "Freshness watch on support files", state: "watch" },
      { code: "CAP", label: "Corrective action in progress", state: "open" },
      { code: "PKG", label: "Released with disclosure", state: "done" },
    ],
  },
  {
    id: "cm-02",
    name: "MV Pelagos",
    type: "Product tanker",
    scope: "Cargo control boundary, ECDIS update evidence, remote-support procedure",
    packageState: "Readiness package under QA review",
    readiness: 74,
    evidence: { current: 14, due: 5, stale: 2 },
    openFinding: "ECDIS patch evidence needs reviewer disposition",
    nextAction: "Reviewer decision on EVD-0994",
    systems: ["Cargo-control workstation", "ECDIS", "Remote-support jump host", "USB media procedure"],
    chain: [
      { code: "REQ", label: "SMS cyber procedure mapped", state: "done" },
      { code: "CTL", label: "Patch-management control assessed", state: "done" },
      { code: "EVD", label: "Evidence review due", state: "watch" },
      { code: "FND", label: "Finding awaiting disposition", state: "open" },
      { code: "CAP", label: "Action not yet opened", state: "watch" },
      { code: "QA", label: "Package review paused", state: "watch" },
    ],
  },
  {
    id: "cm-03",
    name: "MV Meridian",
    type: "Ro-ro vessel",
    scope: "Passenger Wi-Fi separation, vendor access, backup test evidence",
    packageState: "Pre-review package being assembled",
    readiness: 68,
    evidence: { current: 12, due: 3, stale: 3 },
    openFinding: "Backup restoration test file is stale",
    nextAction: "Refresh test evidence before QA package assembly",
    systems: ["Passenger network", "Vendor remote access", "Backup repository", "Bridge procedure binder"],
    chain: [
      { code: "APP", label: "Passenger network excluded from OT", state: "done" },
      { code: "ASM", label: "Backup control assessed", state: "done" },
      { code: "EVD", label: "Restoration evidence stale", state: "open" },
      { code: "FND", label: "Finding raised from stale support", state: "open" },
      { code: "CAP", label: "Refresh action assigned", state: "watch" },
      { code: "PKG", label: "Release blocked until QA", state: "watch" },
    ],
  },
];

const vesselMotion = {
  initial: { opacity: 0.62, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0.62, y: -8 },
  transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const },
};

export function FleetAssuranceWorkbench() {
  const [activeId, setActiveId] = useState(vessels[0].id);
  const reduced = usePrefersReducedMotion();
  const baseId = useId();
  const activeIndex = Math.max(
    0,
    vessels.findIndex((vessel) => vessel.id === activeId)
  );
  const active = vessels[activeIndex] ?? vessels[0];

  const select = (id: string) => setActiveId(id);

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (activeIndex + 1) % vessels.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (activeIndex - 1 + vessels.length) % vessels.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = vessels.length - 1;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    const next = vessels[nextIndex];
    select(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  };

  const panel = <WorkbenchPanel vessel={active} reduced={reduced} />;

  return (
    <div className="fleet-workbench liquid-glass liquid-glass--strong lg-pad-lg" data-qa="fleet-assurance-workbench">
      <div className="fleet-workbench-head">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
            Sample fleet workbench
          </p>
          <h3 className="mt-2 text-[24px] font-semibold leading-tight text-navy sm:text-[30px]">
            Maritime assurance records, shown as operating software.
          </h3>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-structural">
            Select a sample vessel to see system scope, evidence freshness, findings, corrective action,
            and package state stay connected. Demonstration data only; no customer records or vessel telemetry.
          </p>
        </div>
        <div className="fleet-workbench-actions">
          <Button href="/demo#chain-inspector" variant="secondary">
            Inspect lineage
          </Button>
          <Button href="/platform/evidence" variant="ghost">
            Evidence simulator
          </Button>
        </div>
      </div>

      <div
        className="fleet-vessel-tabs"
        role="tablist"
        aria-label="Sample vessels"
        onKeyDown={onTabKeyDown}
      >
        {vessels.map((vessel, index) => {
          const isActive = vessel.id === active.id;
          return (
            <button
              key={vessel.id}
              id={`${baseId}-tab-${vessel.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(vessel.id)}
              className={`fleet-vessel-tab${isActive ? " is-active" : ""}`}
            >
              <span className="fleet-vessel-index">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="fleet-vessel-name">{vessel.name}</span>
                <span className="fleet-vessel-type">{vessel.type}</span>
              </span>
              <span className="fleet-vessel-score">{vessel.readiness}%</span>
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active.id}`}>
        {reduced ? (
          panel
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active.id} {...vesselMotion}>
              {panel}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function WorkbenchPanel({ vessel, reduced }: { vessel: WorkbenchVessel; reduced: boolean }) {
  const evidenceTotal = vessel.evidence.current + vessel.evidence.due + vessel.evidence.stale;
  const freshness = [
    { label: "Current", value: vessel.evidence.current, className: "is-current" },
    { label: "Review due", value: vessel.evidence.due, className: "is-due" },
    { label: "Stale", value: vessel.evidence.stale, className: "is-stale" },
  ];

  return (
    <div className="fleet-workbench-panel">
      <div className="fleet-map" aria-hidden="true">
        <svg viewBox="0 0 620 360" role="img">
          <defs>
            <linearGradient id="fleet-route" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent-ocean)" stopOpacity="0.82" />
              <stop offset="100%" stopColor="var(--accent-sounding)" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path className="fleet-chart-line" d="M52 280 C 126 216, 168 236, 238 172 S 392 112, 538 72" />
          <path className="fleet-chart-grid" d="M42 78 H572 M42 144 H572 M42 210 H572 M42 276 H572 M110 44 V318 M212 44 V318 M314 44 V318 M416 44 V318 M518 44 V318" />
          <g className="fleet-route">
            <path d="M70 266 C 132 210, 174 226, 238 174 S 386 126, 526 86" />
            {!reduced ? <circle r="6" className="fleet-route-pulse"><animateMotion dur="5.8s" repeatCount="indefinite" path="M70 266 C 132 210, 174 226, 238 174 S 386 126, 526 86" /></circle> : null}
          </g>
          {[
            [70, 266, "Scope"],
            [238, 174, "Evidence"],
            [526, 86, "Package"],
          ].map(([x, y, label]) => (
            <g key={String(label)} className="fleet-map-node" transform={`translate(${x} ${y})`}>
              <circle r="18" />
              <text y="38">{label}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="fleet-workbench-summary">
        <div className="fleet-readiness">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ocean">Package readiness</p>
          <div className="fleet-readiness-row">
            <strong>{vessel.readiness}%</strong>
            <span>{vessel.packageState}</span>
          </div>
          <div className="fleet-readiness-track" aria-hidden="true">
            <span style={{ width: `${vessel.readiness}%` }} />
          </div>
        </div>

        <div className="fleet-freshness" aria-label={`${evidenceTotal} sample evidence records`}>
          {freshness.map((item) => (
            <div key={item.label} className={`fleet-freshness-item ${item.className}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <dl className="fleet-workbench-meta">
          <div>
            <dt>System scope</dt>
            <dd>{vessel.scope}</dd>
          </div>
          <div>
            <dt>Open finding</dt>
            <dd>{vessel.openFinding}</dd>
          </div>
          <div>
            <dt>Next action</dt>
            <dd>{vessel.nextAction}</dd>
          </div>
        </dl>
      </div>

      <div className="fleet-workbench-systems">
        <p className="fleet-workbench-label">Maritime systems in record scope</p>
        <ul>
          {vessel.systems.map((system) => (
            <li key={system}>{system}</li>
          ))}
        </ul>
      </div>

      <ol className="fleet-workbench-chain" aria-label={`${vessel.name} assurance chain state`}>
        {vessel.chain.map((step) => (
          <li key={`${vessel.id}-${step.code}`} className={`fleet-chain-step is-${step.state}`}>
            <span className="fleet-chain-code">{step.code}</span>
            <span className="fleet-chain-label">{step.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
