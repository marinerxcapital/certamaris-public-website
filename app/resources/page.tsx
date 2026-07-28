import { ArticleCard } from "@/components/ArticleCard";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenGallery, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";
import { articles } from "@/lib/resources";

export const metadata = pageMetadata(
  "Resources",
  "Plain-language explainers on IMO cyber-risk management, IACS UR E26/E27, evidence sufficiency, and fleet-scale cyber governance.",
  "/resources"
);

export default function ResourcesPage() {
  return (
    <>
      <ProductScreenGallery />
      <PageHero
        eyebrow="Resources"
        title="Plain-language explainers on maritime cyber compliance."
        intro="Short, practical reads on the regulatory landscape and the operational discipline behind demonstrating compliance — not marketing copy dressed up as insight."
      />

      <Section>
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>Read with the product in mind</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              Each explainer points back to an operating workflow.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed">
              The resource library is more useful when readers can see where the concept lives: requirement mapping,
              evidence sufficiency, findings, risk decisions, corrective actions, and executive reporting.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              src={productProofScreens.evidenceCoverage.src}
              alt={productProofScreens.evidenceCoverage.alt}
              label="Evidence sufficiency matrix"
              lightboxTitle={productProofScreens.evidenceCoverage.title}
              lightboxBody={productProofScreens.evidenceCoverage.body}
              priority
              galleryOrder={productProofScreens.evidenceCoverage.galleryOrder}
            />
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Product reading paths</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            Start with the workflow, then go deeper.
          </h2>
        </Reveal>
        <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.05}>
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
            {...productProofScreens.executiveReporting}
            title="Risk and governance"
            body="Use the governance articles to connect risk registers and executive reporting back to the underlying assurance record."
          />
        </RevealGroup>
      </Section>

      <Section>
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Library</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Plain-language explainers.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.05}>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
