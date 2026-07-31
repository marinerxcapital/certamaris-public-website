import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
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

const solutionScreens: Record<string, (typeof productProofScreens)[keyof typeof productProofScreens]> = {
  "fleet-compliance": productProofScreens.fleetInventory,
  "audit-readiness": productProofScreens.auditReadiness,
  "evidence-findings": productProofScreens.findingsRegister,
  "regulatory-intelligence": productProofScreens.requirementMapping,
  "executive-reporting": productProofScreens.executiveReporting,
};

/** One featured proof screen + a short supporting set (hierarchy, not a tile wall). */
const featuredScreen = productProofScreens.fleetInventory;
const supportingScreens = [
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.auditReadiness,
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Solutions"
        title="Keep the compliance work connected — from fleet scope to the package a reviewer opens."
        intro="Operators already run scope, evidence, findings, and readiness across vessels and teams. These solutions describe how that work stays in one controlled record instead of scattering into drives, binders, and last-week reconstruction."
      />

      <nav aria-label="Jump to solution" className="jump-nav border-b" style={{ borderColor: "var(--hairline)" }}>
        <div className="shell py-4 flex flex-wrap gap-x-6 gap-y-2">
          {solutions.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-[14px] font-medium text-navy hover:text-ocean transition-colors">
              {item.title}
            </a>
          ))}
        </div>
      </nav>

      <Section>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <Reveal>
            <Eyebrow>Operating proof</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              Start with fleet scope. Follow the trail into evidence and readiness.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-6">
              Sanitized product views — not decorative mockups. The featured screen shows fleet and facilities scope;
              the supporting views are the day-to-day places evidence sufficiency, findings, and readiness packages live.
            </p>
            <ul className="space-y-2.5">
              {supportingScreens.map((screen) => (
                <li key={screen.src} className="flex gap-2.5 text-[14.5px] text-navy/85">
                  <span aria-hidden="true" className="text-ocean">
                    —
                  </span>
                  {screen.label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              src={featuredScreen.src}
              alt={featuredScreen.alt}
              label={featuredScreen.label}
              lightboxTitle={featuredScreen.title}
              lightboxBody={featuredScreen.body}
              priority
              galleryOrder={featuredScreen.galleryOrder}
            />
            <p className="mt-4 text-[13.5px] text-structural leading-relaxed">{featuredScreen.body}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-10 grid gap-5 sm:grid-cols-3">
          {supportingScreens.map((screen) => (
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

      {solutions.map((item, index) => {
        const screen = solutionScreens[item.id];
        return (
          <Section key={item.id} id={item.id} surface={index % 2 ? "paper" : "page"} spacing="compact">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 items-start">
              <Reveal>
                <Eyebrow>{item.eyebrow}</Eyebrow>
                <h2 className="text-[27px] sm:text-[32px] leading-[1.15] mb-4">{item.headline}</h2>
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
              <Reveal delay={0.08}>
                <ProductScreenFrame
                  src={screen.src}
                  alt={screen.alt}
                  label={screen.label}
                  lightboxTitle={screen.title}
                  lightboxBody={screen.body}
                  galleryOrder={screen.galleryOrder}
                />
                <p className="mt-4 text-[13.5px] text-structural leading-relaxed">{screen.body}</p>
              </Reveal>
            </div>
          </Section>
        );
      })}

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.06}>
          <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
        </Reveal>
      </Section>
    </>
  );
}
