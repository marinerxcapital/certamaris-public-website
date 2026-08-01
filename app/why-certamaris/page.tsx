import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { differentiationModels } from "@/lib/solutions-audience";
import { TRACEABILITY_CHAIN } from "@/lib/product-hierarchy";

export const metadata = pageMetadata(
  "Why CertaMaris",
  "Why CertaMaris differs from spreadsheets, shared drives, generic GRC, and disconnected maritime compliance tools — without inventing proof.",
  "/why-certamaris"
);

const comparisonAxes = [
  "Maritime-native company / fleet / vessel hierarchy",
  "Requirement → control → evidence → finding → action → package traceability",
  "Vessel evidence with individual auditable identities",
  "Finding-to-action verification chain",
  "Survey readiness packages from live work",
  "Evidence freshness and action aging",
  "Regulatory mapping with human applicability",
  "Controlled release and audit history",
  "Implementation path from discovery to continuous assurance",
];

export default function WhyCertaMarisPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Why CertaMaris"
        title="Maritime-native assurance — not another spreadsheet or generic GRC shell."
        intro="CertaMaris is built for company, fleet, and vessel cyber compliance work: evidence-first, role-scoped, and explicit about what software can and cannot decide."
      />

      <Section>
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Operating model comparison</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            Where common approaches break — and what CertaMaris structures instead.
          </h2>
        </Reveal>
        <div className="grid gap-4">
          {differentiationModels.map((model, index) => (
            <Reveal key={model.id} delay={index * 0.03}>
              <article className="liquid-glass liquid-glass--default lg-pad-md grid md:grid-cols-[0.9fr_1.1fr] gap-4 md:gap-8">
                <div>
                  <h3 className="text-[17px] font-semibold mb-2">{model.title}</h3>
                  <p className="text-[14px] text-structural leading-relaxed">{model.weakness}</p>
                </div>
                <div className="border-l border-ocean/25 pl-4 md:pl-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean mb-1.5">
                    With CertaMaris
                  </p>
                  <p className="text-[14.5px] text-navy/90 leading-relaxed">{model.certamaris}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Comparison axes</Eyebrow>
          <h2 className="text-[26px] sm:text-[32px] leading-[1.14]">What to evaluate in any alternative.</h2>
        </Reveal>
        <ul className="grid sm:grid-cols-2 gap-3">
          {comparisonAxes.map((axis) => (
            <li key={axis} className="liquid-glass liquid-glass--subtle lg-pad-sm text-[14.5px] text-navy/85">
              {axis}
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-3xl">
          <Eyebrow>Traceability that survives review</Eyebrow>
          <p className="hero-trace-line mb-4">
            {TRACEABILITY_CHAIN.map((s) => s.title).join(" → ")}
          </p>
          <p className="text-[15px] text-structural leading-relaxed mb-6">
            That chain is the product — not a slide claim. Reviewers follow requirement, applicability, control,
            assessment, evidence, finding, risk, corrective action, QA, and released readiness package in one record.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/platform" className="text-[14px] font-semibold text-ocean hover:underline">
              Platform hierarchy
            </Link>
            <Link href="/implementation" className="text-[14px] font-semibold text-ocean hover:underline">
              Implementation
            </Link>
            <Link href="/security" className="text-[14px] font-semibold text-ocean hover:underline">
              Security & Trust
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.05} className="flex flex-wrap gap-3">
          <Button href="/contact?intent=demo">Request a demo</Button>
          <Button href="/platform" variant="secondary">
            View platform
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
