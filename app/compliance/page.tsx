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

export default function CompliancePage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Compliance"
        title="The regulatory landscape, explained plainly."
        intro="This page gives an operational overview of the requirements CertaMaris helps structure work around. It is not legal or regulatory advice — read it alongside the official source text."
      />

      <Section spacing="compact">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>In the product</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              Compliance language becomes mapped work, not static guidance.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-4">
              CertaMaris connects source requirements to control objectives, implementation notes, evidence tabs,
              exceptions, validation history, and coverage status so teams can see exactly what a clause touches.
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
              priority
              galleryOrder={productProofScreens.requirementMapping.galleryOrder}
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">
          <Reveal>
            <Eyebrow>01</Eyebrow>
            <h2 className="text-[24px] leading-[1.2]">IMO cyber-risk management</h2>
          </Reveal>
          <Reveal delay={0.06} className="max-w-2xl space-y-4">
            <p className="text-[15.5px] text-structural leading-relaxed">
              IMO Resolution MSC.428(98) encourages administrations to ensure cyber risks are appropriately addressed
              in existing safety management systems, no later than the first annual verification of the company's
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
              CertaMaris keeps IT and OT control mappings distinct while linking both back to the same requirement
              layer, reflecting how shipboard and shoreside teams are typically organized and measured.
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
              When a mapped requirement version changes, CertaMaris can show which control mappings, evidence, and
              plan sections are linked to that requirement so the team can review impact without reconstructing
              scope from scattered files.
            </p>
            <p className="text-[15.5px] text-structural leading-relaxed">
              That turns a regulatory update into scoped follow-up work rather than an open-ended review — while
              leaving interpretation and applicability judgment to qualified reviewers.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Operational proof</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            The requirement story continues into evidence and reporting.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <ProductScreenTile
            {...productProofScreens.evidenceCoverage}
          />
          <ProductScreenTile
            {...productProofScreens.findingsRegister}
          />
          <ProductScreenTile
            {...productProofScreens.correctiveActions}
          />
          <ProductScreenTile
            {...productProofScreens.auditReadiness}
          />
          <ProductScreenTile
            {...productProofScreens.executiveReporting}
          />
        </div>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
