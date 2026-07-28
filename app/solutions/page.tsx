import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenGallery, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";
import { solutions } from "@/lib/solutions-industries";

export const metadata = pageMetadata(
  "Solutions",
  "Fleet compliance management, audit readiness, evidence and findings, regulatory intelligence, and executive reporting for maritime cyber compliance.",
  "/solutions"
);

const solutionScreens: Record<string, typeof productProofScreens[keyof typeof productProofScreens]> = {
  "fleet-compliance": productProofScreens.fleetInventory,
  "audit-readiness": productProofScreens.auditReadiness,
  "evidence-findings": productProofScreens.findingsRegister,
  "regulatory-intelligence": productProofScreens.requirementMapping,
  "executive-reporting": productProofScreens.executiveReporting,
};

const featuredScreens = [
  productProofScreens.requirementMapping,
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.auditReadiness,
];

const solutionScreenOrder: Record<string, number> = {
  "regulatory-intelligence": productProofScreens.requirementMapping.galleryOrder,
  "audit-readiness": productProofScreens.auditReadiness.galleryOrder,
  "evidence-findings": productProofScreens.findingsRegister.galleryOrder,
  "executive-reporting": productProofScreens.executiveReporting.galleryOrder,
  "fleet-compliance": productProofScreens.fleetInventory.galleryOrder,
};

export default function SolutionsPage() {
  return (
    <>
      <ProductScreenGallery />
      <PageHero
        emphasis="elevated"
        eyebrow="Solutions"
        title="Five ways CertaMaris removes friction from fleet compliance."
        intro="Each solution addresses a distinct part of the compliance lifecycle. Together they keep a fleet's cyber-risk posture traceable from requirement to recurring review."
      />

      <nav aria-label="Jump to solution" className="bg-white border-b" style={{ borderColor: "var(--hairline)" }}>
        <div className="shell py-4 flex flex-wrap gap-x-6 gap-y-2">
          {solutions.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-[14px] font-medium text-navy hover:text-ocean transition-colors">
              {item.title}
            </a>
          ))}
        </div>
      </nav>

      <Section>
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>Product-backed solutions</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              Each solution maps to an actual operating screen.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed">
              These are sanitized product views, not decorative mockups. They show where fleet scope, evidence
              sufficiency, findings, corrective action ownership, audit readiness, and governance reporting live inside
              CertaMaris.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {featuredScreens.map((screen, index) => (
              <ProductScreenTile
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                label={screen.label}
                title={screen.title}
                body={screen.body}
                galleryOrder={screen.galleryOrder}
                tileClassName={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
                sizes={
                  index < 2
                    ? "(min-width: 1280px) 32vw, (min-width: 768px) 50vw, 100vw"
                    : "(min-width: 1280px) 22vw, (min-width: 768px) 50vw, 100vw"
                }
              />
            ))}
          </Reveal>
        </div>
      </Section>

      {solutions.map((item, index) => (
        <Section key={item.id} id={item.id} surface={index % 2 ? "paper" : "page"} spacing="compact">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
            <Reveal>
              <Eyebrow>{item.eyebrow}</Eyebrow>
              <h2 className="text-[27px] sm:text-[32px] leading-[1.15] mb-4">{item.headline}</h2>
              <Button href="/contact" variant="secondary" className="mt-2">
                {PRIMARY_CTA_LABEL}
              </Button>
            </Reveal>
            <Reveal delay={0.06}>
              {item.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[15.5px] text-structural leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              <ul className="mt-5 space-y-2.5">
                {item.capabilities.map((capability) => (
                  <li key={capability} className="flex gap-2.5 text-[14.5px] text-navy/85">
                    <span aria-hidden="true" className="text-ocean">
                      —
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <ProductScreenFrame
                src={solutionScreens[item.id].src}
                alt={solutionScreens[item.id].alt}
                label={solutionScreens[item.id].label}
                lightboxTitle={solutionScreens[item.id].title}
                lightboxBody={solutionScreens[item.id].body}
                galleryOrder={solutionScreenOrder[item.id]}
              />
              <p className="mt-4 text-[13.5px] text-structural leading-relaxed">
                {solutionScreens[item.id].body}
              </p>
            </Reveal>
          </div>
        </Section>
      ))}
    </>
  );
}
