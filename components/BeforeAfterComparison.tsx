import Link from "next/link";

import { LiquidGlass } from "@/components/LiquidGlass";

type ComparisonSide = {
  eyebrow: string;
  title: string;
  points: string[];
};

const beforeSide: ComparisonSide = {
  eyebrow: "Before CertaMaris",
  title: "Familiar tools, disconnected answers",
  points: [
    "Spreadsheets track status without durable provenance or multi-user history.",
    "Shared drives hold files that are not linked to requirements or sufficiency decisions.",
    "Email threads carry ownership and exceptions that never land in one inspectable record.",
    "Fleet readiness questions force reconstruction across vessel folders before survey week.",
  ],
};

const withSide: ComparisonSide = {
  eyebrow: "With CertaMaris",
  title: "Controlled records at fleet scale",
  points: [
    "Evidence, findings, and corrective actions remain owned objects with review history.",
    "Requirement → control → evidence → package lineage stays inspectable end to end.",
    "Accountable roles stay visible from company workspace to vessel work objects.",
    "Fleet posture and open decisions roll up without inventing a second source of truth.",
  ],
};

function ComparisonColumn({ side, emphasis }: { side: ComparisonSide; emphasis: "before" | "with" }) {
  return (
    <LiquidGlass
      as="article"
      variant={emphasis === "with" ? "strong" : "subtle"}
      padding="lg"
      className={emphasis === "with" ? "before-after-panel before-after-panel--with" : "before-after-panel"}
    >
      <p
        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${
          emphasis === "with" ? "text-ocean" : "text-structural"
        }`}
      >
        {side.eyebrow}
      </p>
      <h3 className="mt-3 text-[20px] font-semibold leading-snug text-navy sm:text-[22px]">{side.title}</h3>
      <ul className="mt-5 grid gap-3">
        {side.points.map((point) => (
          <li key={point} className="flex gap-3 text-[14.5px] leading-relaxed text-structural">
            <span
              aria-hidden="true"
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                emphasis === "with" ? "bg-ocean" : "bg-navy/35"
              }`}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </LiquidGlass>
  );
}

/**
 * Claim-safe Before / With comparison. Describes tooling patterns, not customer failure.
 */
export function BeforeAfterComparison() {
  return (
    <div className="before-after" data-qa="before-after-comparison">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <ComparisonColumn side={beforeSide} emphasis="before" />
        <ComparisonColumn side={withSide} emphasis="with" />
      </div>
      <p className="mt-5 max-w-3xl text-[13.5px] leading-relaxed text-structural">
        Operators already work hard inside familiar tools. The gap is connection: provenance, lineage,
        and fleet visibility that survive review.{" "}
        <Link href="/why-certamaris" className="font-semibold text-ocean hover:underline">
          Full comparison on Why CertaMaris
        </Link>
        .
      </p>
    </div>
  );
}
