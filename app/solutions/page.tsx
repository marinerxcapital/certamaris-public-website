import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { CustodyStripBand } from "@/components/CustodyStripBand";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";
import { solutionsPages } from "@/lib/solutions-audience";

export const metadata = pageMetadata(
  "Solutions",
  "Fleet cyber compliance solutions for audit readiness, IMO and IACS work, evidence, findings, CAPA verification, plans, SBOM assurance, and reporting.",
  "/solutions"
);

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
        title="Concrete maritime workflows — from fleet scope to released readiness packages."
        intro="Twelve solutions describe how CertaMaris supports operators, DPAs, IT/OT teams, and leadership without claiming automatic compliance, class endorsement, or guaranteed survey outcomes."
      />

      <CustodyStripBand href="/demo#scrub-tour" label="Scrub the product tour" />

      <nav aria-label="Jump to solution" className="jump-nav border-b" style={{ borderColor: "var(--hairline)" }}>
        <div className="shell py-4 flex flex-wrap gap-x-5 gap-y-2">
          {solutionsPages.map((item) => (
            <Link
              key={item.slug}
              href={`/solutions/${item.slug}`}
              prefetch={false}
              className="text-[13.5px] font-medium text-navy hover:text-ocean transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <Section>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <Reveal>
            <Eyebrow>Operating proof</Eyebrow>
            <h2 className="section-h2 section-h2--lg mb-5">
              Start with fleet scope. Follow the trail into evidence and readiness.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-6">
              Sanitized product views — not decorative mockups. Solutions map to the same controlled record as the
              platform modules.
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

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>All solutions</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Choose a workflow to inspect.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutionsPages.map((item, index) => (
            <Link
              key={item.slug}
              href={`/solutions/${item.slug}`}
              prefetch={false}
              className="liquid-glass liquid-glass--subtle lg-pad-md block group h-full"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean mb-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[16px] font-semibold mb-2 group-hover:text-ocean">{item.title}</h3>
              <p className="text-[13.5px] text-structural leading-relaxed line-clamp-3">{item.intro}</p>
              <span className="inline-block mt-3 text-[13px] font-semibold text-ocean">View solution</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.06} className="flex flex-wrap gap-3">
          <Button href="/contact?intent=demo">Request a demo</Button>
          <Button href="/platform" variant="secondary">
            Explore the platform
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
