import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";
import { complianceNavLinks, frameworks } from "@/lib/regulatory";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "Compliance",
  "Maritime cyber compliance authority: IMO MSC.428(98), IACS UR E26/E27, standards context, official sources, and honest mapping methodology.",
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
      <JsonLd
        data={[
          webPageSchema({
            title: "Compliance",
            description:
              "Maritime cyber compliance authority: IMO, IACS, standards, official sources, and mapping methodology.",
            path: "/compliance",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Compliance", path: "/compliance" },
          ]),
        ]}
      />
      <PageHero
        emphasis="elevated"
        eyebrow="Compliance"
        title="The regulatory landscape, explained plainly."
        intro="Authority pages, official sources, and honest product mapping status. Not legal or regulatory advice — official texts control."
      />

      <Section>
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Authority nest</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Explore by instrument family.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {complianceNavLinks.map((item) => (
            <Reveal key={item.href}>
              <Link href={item.href} className="premium-card block h-full p-5">
                <h3 className="text-[15px] font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-[13.5px] text-structural leading-relaxed mb-3">{item.description}</p>
                <span className="text-[13.5px] font-medium text-ocean">Open →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="paper">
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
            <Link href="/compliance/imo" className="inline-block text-[14.5px] font-medium text-ocean hover:underline">
              IMO authority pages →
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">
          <Reveal>
            <Eyebrow>02</Eyebrow>
            <h2 className="text-[24px] leading-[1.2]">IACS UR E26 &amp; E27</h2>
          </Reveal>
          <Reveal delay={0.06} className="max-w-2xl space-y-4">
            <p className="text-[15.5px] text-structural leading-relaxed">
              IACS Unified Requirements E26 and E27 target cyber resilience at design and construction for new
              construction contracts signed on or after 1 July 2024. Ship-level (E26) and systems/equipment-level
              (E27) evidence differ from operational SMS cyber risk management — mixed fleets need both stories kept
              distinct.
            </p>
            <Link href="/compliance/iacs" className="inline-block text-[14.5px] font-medium text-ocean hover:underline">
              IACS authority pages →
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-[280px_1fr] gap-14">
          <Reveal>
            <Eyebrow>03</Eyebrow>
            <h2 className="text-[24px] leading-[1.2]">Frameworks tracked here</h2>
          </Reveal>
          <Reveal delay={0.06} className="max-w-2xl">
            <ul className="grid sm:grid-cols-2 gap-2 text-[14px] text-structural">
              {frameworks.map((f) => (
                <li key={f.id} className="flex items-start gap-2">
                  <span className="text-ocean mt-1" aria-hidden>
                    ·
                  </span>
                  <span>
                    <span className="font-medium text-navy">{f.shortName}</span>
                    <span className="text-structural/80"> — {f.issuingAuthority.split("—")[0].trim()}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/compliance/official-sources"
              className="inline-block mt-5 text-[14.5px] font-medium text-ocean hover:underline"
            >
              Official sources directory →
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Further reading</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Source explainers and operational notes.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {resourceLinks.map((item) => (
            <Reveal key={item.href}>
              <Link href={item.href} className="premium-card block h-full p-5">
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
            <Link href="/compliance/mapping-methodology" className="inline-block text-[14.5px] font-medium text-ocean hover:underline">
              Mapping methodology →
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              {...productProofScreens.requirementMapping}
              label="Control detail and evidence mapping"
            />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-3">
          {supportingProof.map((screen) => (
            <ProductScreenTile
              key={screen.src}
              {...screen}
              title={screen.title}
              body={screen.body}
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
