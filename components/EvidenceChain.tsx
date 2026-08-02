"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TRACEABILITY_CHAIN } from "@/lib/product-hierarchy";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

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
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.72", "end 0.62"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const threadScale = useTransform(drawn, [0, 1], [0.02, 1]);

  return (
    <div ref={containerRef} className="chain-spine">
      <div className="chain-thread-track" aria-hidden="true">
        {reduced ? (
          <div className="chain-thread" />
        ) : (
          <motion.div className="chain-thread" style={{ scaleY: threadScale }} />
        )}
      </div>
      <ol className="chain-steps">
        {TRACEABILITY_CHAIN.map((step, index) => (
          <ChainStep key={step.id} index={index} title={step.title} detail={step.detail} reduced={reduced} />
        ))}
      </ol>
    </div>
  );
}

/* Per README §8: never animate from opacity 0 — content must stay legible
   if the whileInView trigger misfires. Matches Reveal's near-opaque floor. */
const stepVariants = {
  hidden: { opacity: 0.98, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

/* Ledger stamp: the mono index presses onto the card as the step docks. */
const codeVariants = {
  hidden: { scale: 1.18, opacity: 0.55 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut" as const, delay: 0.12 },
  },
};

/* Release stamp: the terminal node's ocean ring is pressed on when reached. */
const releaseNodeVariants = {
  hidden: { scale: 0.75, boxShadow: "0 0 0 0px rgba(18, 111, 170, 0.22)" },
  show: {
    scale: 1,
    boxShadow: "0 0 0 4px rgba(18, 111, 170, 0.22)",
    transition: { duration: 0.32, ease: "easeOut" as const, delay: 0.28 },
  },
};

function ChainStep({
  index,
  title,
  detail,
  reduced,
}: {
  index: number;
  title: string;
  detail: string;
  reduced: boolean;
}) {
  const code = `${String(index + 1).padStart(2, "0")} ${CHAIN_CODES[index]}`;
  const isRelease = index === TRACEABILITY_CHAIN.length - 1;

  if (reduced) {
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

  return (
    <motion.li
      className="chain-step"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px -20% 0px" }}
      variants={stepVariants}
    >
      {isRelease ? (
        <motion.span className="chain-node chain-node--release" aria-hidden="true" variants={releaseNodeVariants} />
      ) : (
        <span className="chain-node" aria-hidden="true" />
      )}
      <div className={`chain-card liquid-glass ${isRelease ? "liquid-glass--strong" : "liquid-glass--subtle"} lg-pad-md`}>
        <motion.span className="chain-code" style={{ display: "inline-block", transformOrigin: "left bottom" }} variants={codeVariants}>
          {code}
        </motion.span>
        <h3 className="chain-title">{title}</h3>
        <p className="chain-detail">{detail}</p>
      </div>
    </motion.li>
  );
}
