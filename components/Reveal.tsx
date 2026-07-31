"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** Never drop below this opacity — content must stay legible on first paint. */
const REVEAL_FROM_OPACITY = 0.98;
const REVEAL_Y = 6;

/**
 * Progressive-enhancement reveal.
 *
 * Hard guarantees:
 * - First paint / SSR / no-JS: plain element, full opacity, no transform.
 * - prefers-reduced-motion: same static path (no Framer motion).
 * - Motion path never uses opacity 0 — only a subtle fade from near-opaque.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Static until hydrated AND motion is allowed — avoids FOUC / hidden content.
  const Static = as;
  if (!mounted || reduced) {
    return <Static className={className}>{children}</Static>;
  }

  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: REVEAL_FROM_OPACITY, y: REVEAL_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
      transition={{ duration: 0.28, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.05,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: REVEAL_FROM_OPACITY, y: REVEAL_Y },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
