import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { subprocessorsContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Subprocessors",
  "How CertaMaris describes infrastructure categories and how to request the product subprocessor list under procurement.",
  "/trust/subprocessors"
);

export default function SubprocessorsPage() {
  return (
    <>
      <PageHero
        eyebrow={subprocessorsContent.eyebrow}
        title={subprocessorsContent.title}
        intro={subprocessorsContent.intro}
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Trust Center", href: "/trust" },
            { label: "Subprocessors" },
          ]}
        />

        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Infrastructure categories</Eyebrow>
          <h2 className="text-[26px] sm:text-[30px] leading-[1.14] mb-4">
            Public categories without inventing a full vendor inventory
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">
            The categories below describe known public surfaces and general infrastructure types. They are not a
            complete contractual subprocessor schedule.
          </p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-5" stagger={0.05}>
          {subprocessorsContent.publicCategories.map((item) => (
            <div key={item.title} className="premium-card p-6">
              <h3 className="text-[16px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Request the list</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">Product subprocessors on request</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-6">{subprocessorsContent.requestBody}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button href={subprocessorsContent.requestHref}>Request subprocessor materials</Button>
            <Button href="/trust/procurement" variant="secondary">
              Procurement package
            </Button>
          </div>
          <p className="text-[14px] text-structural leading-relaxed">
            Security contact:{" "}
            <a
              href={`mailto:${subprocessorsContent.securityMailto}?subject=Subprocessor%20list%20request`}
              className="font-medium text-ocean hover:underline"
            >
              {subprocessorsContent.securityMailto}
            </a>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
