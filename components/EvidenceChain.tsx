"use client";

import { TRACEABILITY_CHAIN } from "@/lib/product-hierarchy";

/**
 * The site's signature element: the assurance chain drawn as a continuous
 * chain-of-custody thread. As the reader scrolls, the brass thread draws
 * itself downward and the ten real chain steps (Requirement → Released
 * readiness package, from lib/product-hierarchy.ts) dock onto it.
 *
 * variant="spine"  — full scroll-driven vertical visualizer (homepage).
 * variant="strip"  — compact static horizontal chain for interior pages.
 *
 * Reduced motion: everything renders fully drawn and static.
 */
const CHAIN_CODES = ["REQ", "APP", "CTL", "ASM", "EVD", "FND", "RSK", "CAP", "QA", "PKG"];

export function EvidenceChain({ variant = "spine" }: { variant?: "spine" | "strip" }) {
  if (variant === "strip") return <ChainStrip />;
  return <ChainSpine />;
}

function ChainStrip() {
  return (
    <ol className="chain-strip" aria-label="Assurance traceability chain">
      {TRACEABILITY_CHAIN.map((step, index) => (
        <li key={step.id} className="chain-strip-step">
          <span className="chain-strip-code">
            {String(index + 1).padStart(2, "0")} {CHAIN_CODES[index]}
          </span>
          <span className="chain-strip-title">{step.title}</span>
        </li>
      ))}
    </ol>
  );
}

function ChainSpine() {
  return (
    <div className="chain-spine">
      <div className="chain-thread-track" aria-hidden="true">
        <div className="chain-thread" />
      </div>
      <ol className="chain-steps">
        {TRACEABILITY_CHAIN.map((step, index) => (
          <ChainStep key={step.id} index={index} title={step.title} detail={step.detail} />
        ))}
      </ol>
    </div>
  );
}

function ChainStep({
  index,
  title,
  detail,
}: {
  index: number;
  title: string;
  detail: string;
}) {
  const code = `${String(index + 1).padStart(2, "0")} ${CHAIN_CODES[index]}`;
  const isRelease = index === TRACEABILITY_CHAIN.length - 1;

  return (
    <li className="chain-step">
      <span className={`chain-node ${isRelease ? "chain-node--release" : ""}`} aria-hidden="true" />
      <div className={`chain-card liquid-glass ${isRelease ? "liquid-glass--strong" : "liquid-glass--subtle"} lg-pad-md`}>
        <span className="chain-code">{code}</span>
        <h3 className="chain-title">{title}</h3>
        <p className="chain-detail">{detail}</p>
      </div>
    </li>
  );
}
