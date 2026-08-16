import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { EvidenceChain } from "@/components/EvidenceChain";
import { PageHero } from "@/components/PageHero";
import { PrintButton } from "@/components/PrintButton";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { REGULATORY_BOUNDARY } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { TRACEABILITY_CHAIN } from "@/lib/product-hierarchy";

export const metadata = pageMetadata(
  "Assurance Model One-Pager",
  "Printable CertaMaris assurance model leave-behind: requirement to readiness package chain plus regulatory boundary for procurement and legal review.",
  "/trust/assurance-model"
);

const CHAIN_CODES = ["REQ", "APP", "CTL", "ASM", "EVD", "FND", "RSK", "CAP", "QA", "PKG"];

/**
 * Procurement-grade leave-behind: one screen that prints cleanly to PDF.
 * No invented metrics, customers, certifications, or outcome guarantees.
 */
export default function AssuranceModelPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Trust · Procurement leave-behind"
        title="Assurance model — requirement to readiness package."
        intro="A one-page operating model buyers can forward to legal, class, or procurement. Print or save as PDF from the browser. Official texts control; CertaMaris does not certify compliance."
      />

      <Section spacing="compact" className="no-print">
        <Breadcrumbs
          className="mb-6"
          items={[
            { label: "Home", href: "/" },
            { label: "Trust Center", href: "/trust" },
            { label: "Procurement", href: "/trust/procurement" },
            { label: "Assurance model" },
          ]}
        />
        <div className="flex flex-wrap gap-3">
          <Button href="#leavebehind">Jump to one-pager</Button>
          <PrintButton />
          <Button href="/trust/procurement" variant="ghost">
            Back to procurement
          </Button>
        </div>
      </Section>

      <Section id="leavebehind" spacing="compact">
        <article className="assurance-leavebehind liquid-glass liquid-glass--strong lg-pad-lg">
          <header className="leavebehind-header">
            <p className="brand-hero-mark">CertaMaris</p>
            <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0e5a8a]">
              Maritime cyber assurance · Leave-behind
            </p>
            <h2 className="mt-4 text-[26px] font-semibold leading-tight text-navy sm:text-[32px]">
              One controlled record from requirement to released readiness package.
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-structural">
              CertaMaris structures maritime cyber compliance work for company, fleet, and vessel
              contexts: requirements, controls, evidence, findings, corrective actions, and review
              packages stay linked — so readiness is assembled from live work, not a last-week document
              scramble.
            </p>
          </header>

          <div className="mt-8">
            <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
              Operating chain · 01 REQ → 10 PKG
            </p>
            <div className="leavebehind-chain no-print">
              <EvidenceChain variant="strip" />
            </div>
            <ol className="leavebehind-steps mt-5 grid gap-3 sm:grid-cols-2">
              {TRACEABILITY_CHAIN.map((step, index) => (
                <li key={step.id} className="leavebehind-step">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-[#0e5a8a]">
                    {String(index + 1).padStart(2, "0")} {CHAIN_CODES[index]}
                  </span>
                  <p className="mt-1 text-[14.5px] font-semibold text-navy">{step.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-structural">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 grid gap-6 border-t border-navy/10 pt-6 sm:grid-cols-2">
            <div>
              <Eyebrow>What the product does</Eyebrow>
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-navy/85">
                <li>Keeps company / fleet / vessel hierarchy with individual auditable identities.</li>
                <li>Maps requirements to controls and evidence with review state and freshness.</li>
                <li>Owns findings and CAPA through verification — not unchecked status flips.</li>
                <li>Assembles readiness packages from approved live records.</li>
              </ul>
            </div>
            <div>
              <Eyebrow>What it does not do</Eyebrow>
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-navy/85">
                <li>Does not certify compliance or guarantee survey / audit outcomes.</li>
                <li>Does not replace class, flag, counsel, or the SMS / DOC process.</li>
                <li>Does not auto-decide applicability — qualified humans decide.</li>
                <li>Does not invent customer logos, metrics, or unpublished certifications.</li>
              </ul>
            </div>
          </div>

          <aside className="leavebehind-boundary mt-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
              Regulatory boundary
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-navy/80">{REGULATORY_BOUNDARY}</p>
          </aside>

          <footer className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-navy/10 pt-5">
            <div>
              <p className="text-[14px] font-semibold text-navy">certamaris.com</p>
              <p className="mt-1 text-[13px] text-structural">
                sales@certamaris.com · security@certamaris.com
              </p>
            </div>
            <div className="sm:text-right">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-structural">
                Document date · 2026-08-16
              </p>
              <p className="mt-1 text-[12.5px] text-structural">
                Illustrative operating model — not a contract or certificate.
              </p>
            </div>
          </footer>
        </article>

        <Reveal className="mt-8 no-print">
          <p className="text-[14px] text-structural">
            Need NDA materials or a security questionnaire?{" "}
            <Link href="/trust/procurement" className="font-semibold text-ocean hover:underline">
              Open procurement
            </Link>{" "}
            or{" "}
            <Link href="/contact?intent=procurement" className="font-semibold text-ocean hover:underline">
              request a package
            </Link>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
