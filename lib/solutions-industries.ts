/**
 * Backward-compatible re-exports.
 * Canonical content lives in `solutions-audience.ts` and product modules.
 * Prefer importing from `@/lib/solutions-audience` for new pages.
 */

import { audiencePages, solutionsPages } from "@/lib/solutions-audience";

export type SolutionEntry = {
  id: string;
  title: string;
  eyebrow: string;
  headline: string;
  body: string[];
  capabilities: string[];
};

export type IndustryEntry = {
  id: string;
  title: string;
  eyebrow: string;
  headline: string;
  body: string[];
  jtbd: string;
  artifacts: [string, string, string];
  handoff: string;
  doesNotReplace: string;
};

/** Legacy solutions list derived from full solution pages (overview anchors). */
export const solutions: SolutionEntry[] = solutionsPages.map((s, index) => ({
  id: s.slug,
  title: s.title,
  eyebrow: s.eyebrow || `Solutions · ${String(index + 1).padStart(2, "0")}`,
  headline: s.headline,
  body: [s.intro, s.problem],
  capabilities: s.capabilities,
}));

/** Legacy industries list mapped from Who We Serve roles. */
export const industries: IndustryEntry[] = audiencePages.map((a, index) => ({
  id: a.slug,
  title: a.title,
  eyebrow: a.eyebrow || `Who we serve · ${String(index + 1).padStart(2, "0")}`,
  headline: a.headline,
  body: [a.intro, a.doesNotReplace],
  jtbd: a.howSupports[0] ?? a.headline,
  artifacts: [
    a.outputs[0] ?? "Role-scoped readiness views",
    a.outputs[1] ?? "Evidence and findings visibility",
    a.outputs[2] ?? "Controlled handoff into company process",
  ],
  handoff: a.implementationInvolvement,
  doesNotReplace: a.doesNotReplace,
}));

export { audiencePages, solutionsPages } from "@/lib/solutions-audience";
