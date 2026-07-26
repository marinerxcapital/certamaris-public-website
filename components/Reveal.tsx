"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

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
  const Tag = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
