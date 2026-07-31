import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";

export const metadata = pageMetadata(
  "Compliance",
  "A plain-language overview of IMO cyber-risk management (MSC.428(98)) and IACS UR E26/E27, and how CertaMaris structures the resulting workflows.",
  "/compliance"
);

const resourceLinks = [
  {
    href: "/resources/imo-msc-428-98-explained",
    title: "IMO Resolution MSC.428(98) explained",
    body: "What the resolution actually requires inside an SMS — and what it does not create.",
  },
  {
    href: "/resources/iacs-ur-e26-e27-overview",
    title: "IACS UR E26 & E27 overview",
    body: "Ship-level versus equipment-level cyber resilience, and who typically owns which evidence.",
  },
  {
    href: "/resources/evidence-sufficiency-cyber-compliance",
    title: "Evidence sufficiency",
    body: "Why a submitted file is not automatically evidence of compliance.",
  },
] as const;

const supportingProof = [
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.auditReadiness,
];

export default function CompliancePage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Compliance"
        title="The regulatory landscape, explained plainly."
        intro="This page gives an operational overview of the requirements CertaMaris helps structure work around. It is not legal or regulatory advice — read it alongside the official source text."
      />

      <Section>
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">
          <Reveal>
            <Eyebrow>01</Eyebrow>
            <h2 className="text-[24px] leading-[1.2]">IMO cyber-risk management</h2>
          </Reveal>
          <Reveal delay={0.06} className="max-w-2xl space-y-4">
            <p className="text-[15.5px] text-structural leading-relaxed">
              IMO Resolution MSC.428(98) encourages administrations to ensure cyber risks are appropriately addressed
              in existing safety management systems, no later than the first annual verification of the company&apos;s
              Document of Compliance after 1 January 2021. It does not create a standalone certification scheme —
              it treats cyber risk as a category of risk an SMS is already required to manage under the ISM Code.
            </p>
            <p className="text-[15.5px] text-structural leading-relaxed">
              In practice, this means cyber-risk identification, assessment, and mitigation need to be evidenced
              within the same SMS structure that already governs safety and environmental risk — hazard
              identification, procedures, training, and internal audit.
            </p>
            <Link href="/resources/imo-msc-428-98-explained" className="inline-block text-[14.5px] font-medium text-ocean hover:underline">
              Read the full explainer →
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">
          <Reveal>
            <Eyebrow>02</Eyebrow>
            <h2 className="text-[24px] leading-[1.2]">IACS UR E26 &amp; E27</h2>
          </Reveal>
          <Reveal delay={0.06} className="max-w-2xl space-y-4">
            <p className="text-[15.5px] text-structural leading-relaxed">
              IACS Unified Requirement E26 (Cyber Resilience of Ships) sets ship-level requirements — computer-based
              system identification, network segmentation, access control, and overall cyber resilience — applying
              from new construction contracts signed on or after 1 July 2024.
            </p>
            <p className="text-[15.5px] text-structural leading-relaxed">
              IACS Unified Requirement E27 (Cyber Resilience of On-board Systems and Equipment) sets equipment-level
              requirements for the individual computer-based systems integrated into that ship-level architecture.
              The two requirements work together: E27 defines resilient equipment; E26 defines a resilient vessel
              built from it.
            </p>
            <Link href="/resources/iacs-ur-e26-e27-overview" className="inline-block text-[14.5px] font-medium text-ocean hover:underline">
              Read the full explainer →
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">
          <Reveal>
            <Eyebrow>03</Eyebrow>
            <h2 className="text-[24px] leading-[1.2]">Control mapping</h2>
          </Reveal>
          <Reveal delay={0.06} className="max-w-2xl space-y-4">
            <p className="text-[15.5px] text-structural leading-relaxed">
              Control mapping connects a regulatory requirement to the specific systems, procedures, and evidence
              that demonstrate it. Done well, a single requirement change shows exactly which controls, vessels,
              and evidence are affected — rather than requiring a manual review of every document on file.
            </p>
            <p className="text-[15.5px] text-structural leading-relaxed">
              In practice, shipboard OT and shoreside IT are often organized and measured differently. Keeping those
              mappings distinct while linking both back to the same requirement layer reflects how those teams
              actually work — without collapsing two system boundaries into one false framework.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">
          <Reveal>
            <Eyebrow>04</Eyebrow>
            <h2 className="text-[24px] leading-[1.2]">Regulatory intelligence</h2>
          </Reveal>
          <Reveal delay={0.06} className="max-w-2xl space-y-4">
            <p className="text-[15.5px] text-structural leading-relaxed">
              IMO guidance, IACS unified requirements, and flag-state circulars change on independent schedules.
              When a mapped requirement version changes, operators need to know which control mappings, evidence, and
              plan sections are linked to that requirement so the team can review impact without reconstructing
              scope from scattered files.
            </p>
            <p className="text-[15.5px] text-structural leading-relaxed">
              That turns a regulatory update into scoped follow-up work rather than an open-ended review — while
              leaving interpretation and applicability judgment to qualified reviewers. Official source texts always
              control.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Further reading</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            Source explainers and operational notes.
          </h2>
          <p className="text-[15.5px] text-structural leading-relaxed mt-4">
            Deeper articles live under Resources. They are operational overviews, not legal advice.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {resourceLinks.map((item) => (
            <Reveal key={item.href}>
              <Link
                href={item.href}
                className="premium-card block h-full p-5 transition-colors hover:border-ocean/30"
              >
                <h3 className="text-[15px] font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-[13.5px] text-structural leading-relaxed mb-3">{item.body}</p>
                <span className="text-[13.5px] font-medium text-ocean">Read →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center mb-10">
          <Reveal>
            <Eyebrow>How the product supports the work</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              Mapped requirements become structured work — not a product claim of compliance.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-4">
              Where teams use CertaMaris, source requirements connect to control objectives, implementation notes,
              evidence, exceptions, validation history, and coverage status so reviewers can see what a clause
              touches. The platform organizes that trail; it does not determine applicability or outcomes.
            </p>
            <Link href="/platform#trace-chain" className="inline-block text-[14.5px] font-medium text-ocean hover:underline">
              See the trace chain on Platform →
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              src={productProofScreens.requirementMapping.src}
              alt={productProofScreens.requirementMapping.alt}
              label="Control detail and evidence mapping"
              lightboxTitle={productProofScreens.requirementMapping.title}
              lightboxBody={productProofScreens.requirementMapping.body}
              galleryOrder={productProofScreens.requirementMapping.galleryOrder}
            />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-3">
          {supportingProof.map((screen) => (
            <ProductScreenTile
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              label={screen.label}
              title={screen.title}
              body={screen.body}
              galleryOrder={screen.galleryOrder}
              sizes="(min-width: 768px) 28vw, 100vw"
            />
          ))}
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
