"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Node = { id: string; x: number; y: number; r?: number; accent?: boolean };
type Edge = { from: string; to: string };

const nodes: Node[] = [
  { id: "a", x: 40, y: 90 },
  { id: "b", x: 130, y: 40 },
  { id: "c", x: 230, y: 70 },
  { id: "d", x: 300, y: 150 },
  { id: "e", x: 210, y: 190, accent: true },
  { id: "f", x: 110, y: 175 },
  { id: "g", x: 60, y: 230 },
  { id: "h", x: 260, y: 30, accent: true },
];

const edges: Edge[] = [
  { from: "a", to: "b" },
  { from: "b", to: "c" },
  { from: "c", to: "d" },
  { from: "d", to: "e" },
  { from: "e", to: "f" },
  { from: "f", to: "a" },
  { from: "f", to: "g" },
  { from: "b", to: "f" },
  { from: "c", to: "h" },
  { from: "h", to: "d" },
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

/**
 * The CertaMaris "Assurance Graph" — the site's recurring signature visual.
 * Renders a small set of nodes and connecting edges representing vessels,
 * systems, controls, and evidence linking into one assurance state.
 * Fully static and legible with prefers-reduced-motion.
 */
export function AssuranceGraph({ className = "", size = 340 }: { className?: string; size?: number }) {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 340 260"
      width={size}
      className={className}
      role="img"
      aria-label="Abstract diagram of connected nodes representing vessels, systems, and controls linking into one assurance record"
    >
      {edges.map((edge, index) => {
        const from = nodeMap[edge.from];
        const to = nodeMap[edge.to];
        const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
        if (reduced) {
          return <path key={index} d={path} stroke="#0B2A4A" strokeWidth={1} strokeOpacity={0.35} fill="none" />;
        }
        return (
          <motion.path
            key={index}
            d={path}
            stroke="#0B2A4A"
            strokeWidth={1}
            strokeOpacity={0.35}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.35 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.04, ease: "easeOut" }}
          />
        );
      })}
      {nodes.map((node, index) => {
        const fill = node.accent ? "#1C8FD1" : "#0B2A4A";
        if (reduced) {
          return <circle key={node.id} cx={node.x} cy={node.y} r={node.accent ? 6 : 5} fill={fill} />;
        }
        return (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.accent ? 6 : 5}
            fill={fill}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: "backOut" }}
          />
        );
      })}
    </svg>
  );
}
