import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { audiencePages } from "@/lib/solutions-audience";

export const metadata = pageMetadata(
  "Who We Serve",
  "How ship owners, operators, technical managers and DPAs, maritime IT/OT teams, vessel masters and officers, classification and survey stakeholders, insurers and P&I, and maritime service providers use CertaMaris.",
  "/who-we-serve"
);

export default function WhoWeServePage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Who we serve"
        title="Different roles, one controlled maritime assurance record."
        intro="Owners, operators, DPAs, IT/OT teams, vessel officers, survey stakeholders, insurers, and service providers each need a different cut of the same work. CertaMaris does not claim endorsement by class, flag, government, or insurers."
      />

      <nav aria-label="Jump to role" className="jump-nav border-b" style={{ borderColor: "var(--hairline)" }}>
        <div className="shell py-4 flex flex-wrap gap-x-5 gap-y-2">
          {audiencePages.map((item) => (
            <Link
              key={item.slug}
              href={`/who-we-serve/${item.slug}`}
              className="text-[13.5px] font-medium text-navy hover:text-ocean transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <Section>
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Roles</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            Built for the seats that carry the review record.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {audiencePages.map((item, index) => (
            <Link
              key={item.slug}
              href={`/who-we-serve/${item.slug}`}
              className="liquid-glass liquid-glass--subtle lg-pad-md block group h-full"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean mb-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[17px] font-semibold mb-2 group-hover:text-ocean">{item.title}</h3>
              <p className="text-[14px] text-structural leading-relaxed mb-3">{item.headline}</p>
              <span className="text-[13px] font-semibold text-ocean">View role fit</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-3xl">
          <Eyebrow>Note on Industries</Eyebrow>
          <p className="text-[15px] text-structural leading-relaxed">
            Stakeholder roles are the organizing concept for CertaMaris. The former{" "}
            <Link href="/industries" className="font-semibold text-ocean hover:underline">
              /industries
            </Link>{" "}
            route now points here so SEO equity is preserved while the information architecture stays role-first.
          </p>
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.06} className="flex flex-wrap gap-3">
          <Button href="/contact?intent=demo">Request a demo</Button>
          <Button href="/solutions" variant="secondary">
            Solutions
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
