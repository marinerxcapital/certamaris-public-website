"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type KeyboardEvent, useEffect, useId, useState } from "react";
import { Button } from "@/components/Button";
import { ProductScreenImage } from "@/components/ProductScreens";
import { Eyebrow } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import {
  productProofScreens,
  type ProductProofScreen,
  type ProductScreenAnnotation,
} from "@/lib/product-screens";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Status = "ok" | "caution" | "critical" | "pending";

type DemoTab = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  status?: Status;
  statusLabel?: string;
  screen: ProductProofScreen;
};

const tabs: DemoTab[] = [
  {
    id: "owner-corporate",
    label: "Owner / Governance",
    eyebrow: "Owner / governance",
    title: "Fleet governance view",
    body: "Multi-entity structure, governance posture, and decisions that need attention, without treating a product screenshot as a live customer metric.",
    status: "ok",
    statusLabel: "Governance view",
    screen: productProofScreens.executiveReporting,
  },
  {
    id: "client-admin",
    label: "Client Admin",
    eyebrow: "Client admin",
    title: "Organization and access administration",
    body: "Configure customer organizations, roles, and the boundary between company oversight and day-to-day fleet work, with role-based access and no claim of specific SSO configurations.",
    status: "caution",
    statusLabel: "Admin workflow",
    screen: productProofScreens.fleetInventory,
  },
  {
    id: "fleet",
    label: "Fleet",
    eyebrow: "Fleet",
    title: "Fleet readiness and findings",
    body: "Vessel scope, evidence coverage, open findings, and corrective actions that still need verification.",
    status: "pending",
    statusLabel: "Fleet operations",
    screen: productProofScreens.evidenceCoverage,
  },
  {
    id: "vessel",
    label: "Vessel",
    eyebrow: "Vessel",
    title: "Vessel-level evidence and actions",
    body: "Submit and refresh evidence, respond to findings, and keep corrective actions moving in the same controlled record shoreside teams review.",
    status: "critical",
    statusLabel: "Vessel contribution",
    screen: productProofScreens.correctiveActions,
  },
  {
    id: "requirement-mapping",
    label: "Requirement Mapping",
    eyebrow: "Requirement mapping",
    title: "Requirement mapping with product context",
    body: "Map findings and evidence to program targets while keeping the demo-data boundary and mapping service status visible.",
    screen: productProofScreens.requirementMapping,
  },
  {
    id: "findings",
    label: "Findings",
    eyebrow: "Findings register",
    title: "Findings with risk and control context",
    body: "Connect condition, severity, ownership, risk context, and follow-up workflow in one reviewable register.",
    screen: productProofScreens.findingsRegister,
  },
  {
    id: "readiness-packages",
    label: "Readiness Packages",
    eyebrow: "Readiness packages",
    title: "Readiness package preparation",
    body: "Prepare controlled deliverables with package status, source context, and review visibility without claiming audit outcomes.",
    screen: productProofScreens.auditReadiness,
  },
];

const panelMotion = {
  initial: { opacity: 0.5, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0.5, y: -8 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
};

function DemoTabPanel({ tab }: { tab: DemoTab }) {
  const annotations = tab.screen.annotations?.slice(0, 3) ?? [];

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Eyebrow>{tab.eyebrow}</Eyebrow>
          {tab.status && tab.statusLabel ? (
            <StatusBadge status={tab.status} label={tab.statusLabel} />
          ) : null}
        </div>
        <h2 className="mb-4 text-[26px] leading-[1.12] sm:text-[32px]">{tab.title}</h2>
        <p className="mb-6 text-[15px] leading-relaxed text-structural">{tab.body}</p>
        <Button href="/contact?intent=demo">{PRIMARY_CTA_LABEL}</Button>
      </div>

      <figure className="product-exhibit m-0">
        <div className="overflow-hidden rounded-lg border border-navy/15 bg-white shadow-card">
          <div className="flex min-h-10 items-center justify-between gap-2 border-b border-navy/10 bg-paper px-3">
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-structural">
              Exhibit · {tab.screen.label}
            </span>
            <a
              href={tab.screen.fullSrc ?? tab.screen.src}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded border border-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#0b6597] underline-offset-2 hover:border-ocean/20 hover:bg-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
            >
              Full resolution<span aria-hidden="true"> ↗</span>
              <span className="sr-only"> — opens {tab.screen.label} screenshot in a new tab</span>
            </a>
          </div>
          <div className="relative h-[360px] bg-paper sm:h-[440px] lg:h-[520px] [&>picture]:block [&>picture]:h-full [&>picture]:w-full">
            <ProductScreenImage
              src={tab.screen.src}
              alt={tab.screen.alt}
              width={tab.screen.width}
              height={tab.screen.height}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-full w-full object-contain object-top"
            />
            {annotations.length > 0 ? (
              <span
                className="pointer-events-none absolute inset-0 hidden md:block"
                aria-hidden="true"
              >
                {annotations.map((annotation: ProductScreenAnnotation, index: number) => (
                  <span
                    key={annotation.id}
                    className="absolute max-w-[11rem] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
                  >
                    <span className="exhibit-pin inline-flex max-w-full items-center gap-1.5 rounded border border-navy/20 bg-white/95 px-1.5 py-0.5 shadow-sm">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/45 bg-white font-mono text-[9px] font-semibold leading-none text-ocean">
                        {index + 1}
                      </span>
                      <span className="truncate text-[10px] font-medium leading-tight text-navy">
                        {annotation.label}
                      </span>
                    </span>
                  </span>
                ))}
              </span>
            ) : null}
          </div>
        </div>
        {annotations.length > 0 ? (
          <figcaption className="mt-3 md:hidden">
            <ol className="grid gap-1.5" aria-label="Exhibit callouts">
              {annotations.map((annotation: ProductScreenAnnotation, index: number) => (
                <li
                  key={annotation.id}
                  className="flex items-start gap-2 text-[12.5px] leading-snug text-structural"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/40 font-mono text-[9px] font-semibold text-ocean">
                    {index + 1}
                  </span>
                  <span>{annotation.label}</span>
                </li>
              ))}
            </ol>
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}

export function DemoTourGallery() {
  const [activeId, setActiveId] = useState<string>(tabs[0].id);
  const reduced = usePrefersReducedMotion();
  const baseId = useId();

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeId)
  );
  const active = tabs[activeIndex] ?? tabs[0];

  const select = (id: string) => {
    setActiveId(id);
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      // Ignore environments that block history mutation (e.g. sandboxed iframes).
    }
  };

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (tabs.some((tab) => tab.id === raw)) {
        setActiveId(raw);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const onTablistKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (activeIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const next = tabs[nextIndex];
    select(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Demo product views"
        onKeyDown={onTablistKeyDown}
        className="flex gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active.id;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(tab.id)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean ${
                isActive
                  ? "border-ocean bg-ocean text-white"
                  : "border-navy/15 bg-white text-navy hover:border-ocean/40 hover:text-ocean"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="mt-6"
      >
        {reduced ? (
          <DemoTabPanel tab={active} />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active.id} {...panelMotion}>
              <DemoTabPanel tab={active} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
