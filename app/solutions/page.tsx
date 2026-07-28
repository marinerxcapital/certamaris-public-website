import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenGallery, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { solutions } from "@/lib/solutions-industries";

export const metadata = pageMetadata(
  "Solutions",
  "Fleet compliance management, audit readiness, evidence and findings, regulatory intelligence, and executive reporting for maritime cyber compliance.",
  "/solutions"
);

const solutionScreens: Record<string, { src: string; alt: string; label: string; caption: string }> = {
  "fleet-compliance": {
    src: "/product/clean/fleet-inventory.png",
    alt: "CertaMaris fleet and facilities screen showing vessel counts, regions, in-scope assets, criticality, status, and last review dates.",
    label: "Fleet and facilities",
    caption: "Fleet scope, vessel status, locations, criticality, and review cadence stay visible before any audit package is assembled.",
  },
  "audit-readiness": {
    src: "/product/clean/executive-dashboard.png",
    alt: "CertaMaris executive assurance dashboard showing program health, regulator ratings, critical findings, board attestation, and attention items.",
    label: "Readiness dashboard",
    caption: "Readiness is shown as current operating state: program health, regulator standing, critical findings, attestation, and attention items.",
  },
  "evidence-findings": {
    src: "/product/clean/findings-register.png",
    alt: "CertaMaris findings and risks register showing open findings, rating, status, engagement, owner, due date, and age.",
    label: "Findings register",
    caption: "Evidence gaps turn into governed findings with rating, owner, status, due date, age, and related action context.",
  },
  "regulatory-intelligence": {
    src: "/product/clean/requirement-control-mapping.png",
    alt: "CertaMaris control detail screen showing requirement mappings, implementation context, status, criticality, and validation dates.",
    label: "Requirement mapping",
    caption: "Requirement changes have somewhere concrete to land: mapped controls, affected objectives, coverage, validation, and exceptions.",
  },
  "executive-reporting": {
    src: "/product/clean/executive-reporting.png",
    alt: "CertaMaris board pack showing portfolio health, strategic risk exposure, regulator standing, board attestations, KPIs, and risk heatmap.",
    label: "Board pack",
    caption: "Executive reporting rolls up the same live record into governance-ready portfolio health, strategic risk, attestation, and KPI views.",
  },
};

const featuredScreens = [
  solutionScreens["fleet-compliance"],
  solutionScreens["evidence-findings"],
  solutionScreens["executive-reporting"],
];

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
              sufficiency, findings, corrective action ownership, and board reporting live inside CertaMaris.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="grid sm:grid-cols-2 gap-5">
            {featuredScreens.map((screen) => (
              <ProductScreenTile
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                label={screen.label}
                title={screen.label}
                body={screen.caption}
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
              />
              <p className="mt-4 text-[13.5px] text-structural leading-relaxed">
                {solutionScreens[item.id].caption}
              </p>
            </Reveal>
          </div>
        </Section>
      ))}
    </>
  );
}
