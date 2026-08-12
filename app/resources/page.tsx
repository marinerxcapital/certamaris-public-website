import Link from "next/link";
import { Suspense } from "react";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { ResourcesFilter } from "@/components/ResourcesFilter";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";
import { articles, productLinksForResources } from "@/lib/resources";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "Resources",
  "Plain-language explainers, guides, and checklists on IMO cyber-risk management, IACS UR E26/E27, evidence, and fleet cyber governance.",
  "/resources"
);

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Resources",
            description:
              "Maritime cyber compliance explainers, guides, and checklists from CertaMaris Editorial.",
            path: "/resources",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Resources"
        title="Plain-language explainers on maritime cyber compliance."
        intro="Operator-focused explainers, guides, and checklists authored by CertaMaris Editorial. Not legal advice."
      />

      <Section>
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>Read with the product in mind</Eyebrow>
            <h2 className="section-h2 section-h2--lg mb-5">
              Each explainer points back to an operating workflow.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed">
              The resource library is more useful when readers can see where the concept lives: requirement mapping,
              evidence sufficiency, findings, risk decisions, corrective actions, readiness packages, and governance
              reporting.
            </p>
            <ul className="mt-5 space-y-2">
              {productLinksForResources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14.5px] font-medium text-ocean hover:underline">
                    {link.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              {...productProofScreens.evidenceCoverage}
              label="Evidence sufficiency matrix"
              priority
            />
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Product reading paths</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Start with the workflow, then go deeper.</h2>
        </Reveal>
        <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" stagger={0.05}>
          <ProductScreenTile
            {...productProofScreens.requirementMapping}
            title="Regulatory intelligence"
            body="Use the IMO and IACS explainers to understand why mapping has to stay attached to controls, exceptions, and validation history."
          />
          <ProductScreenTile
            {...productProofScreens.findingsRegister}
            title="Evidence and findings"
            body="Use the evidence and corrective-action articles to see why sufficiency, owner response, and verification need a structured trail."
          />
          <ProductScreenTile
            {...productProofScreens.correctiveActions}
            title="Corrective-action verification"
            body="Use the verification article to see why closure should remain separate from the action owner's own update."
          />
          <ProductScreenTile
            {...productProofScreens.auditReadiness}
            title="Audit readiness"
            body="Use the readiness workflow to see why scope, evidence, findings, actions, exceptions, and reviewer notes need to stay inspectable."
          />
          <ProductScreenTile
            {...productProofScreens.executiveReporting}
            title="Risk and governance"
            body="Use the governance articles to connect risk registers and executive reporting back to the underlying assurance record."
          />
        </RevealGroup>
      </Section>

      <Section>
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Library</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Search, filter, and read.</h2>
          <p className="text-[15px] text-structural mt-3 leading-relaxed">
            Filter by topic, tag, or type. Also see the{" "}
            <Link href="/glossary" className="font-medium text-ocean hover:underline">
              glossary
            </Link>{" "}
            and{" "}
            <Link href="/topics" className="font-medium text-ocean hover:underline">
              topic landings
            </Link>
            .
          </p>
        </Reveal>
        <Suspense
          fallback={
            <p className="text-[14px] text-structural" role="status">
              Loading resource filters…
            </p>
          }
        >
          <ResourcesFilter articles={articles} />
        </Suspense>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
