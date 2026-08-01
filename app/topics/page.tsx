import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";
import { topics } from "@/lib/topics";

export const metadata = pageMetadata(
  "Topics",
  "High-intent topics on maritime cyber compliance software, IMO MSC.428(98), IACS UR E26/E27, risk assessment, evidence, SBOM, OT, and survey readiness.",
  "/topics"
);

export default function TopicsIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Topics",
            description: "High-intent maritime cyber compliance topic landings.",
            path: "/topics",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Topics", path: "/topics" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Topics"
        title="High-intent maritime cyber topics"
        intro="Task-oriented landings with honest product framing. For authority metadata see Compliance; for long-form explainers see Resources."
      />
      <Section>
        <Reveal className="mb-8">
          <Eyebrow>{topics.length} topics</Eyebrow>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <Reveal key={topic.slug}>
              <Link href={`/topics/${topic.slug}`} className="premium-card block h-full p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ocean mb-2">{topic.eyebrow}</p>
                <h2 className="text-[16px] font-semibold text-navy mb-2 leading-snug">{topic.title}</h2>
                <p className="text-[13.5px] text-structural leading-relaxed line-clamp-3">{topic.intro}</p>
                <span className="mt-3 inline-block text-[13.5px] font-medium text-ocean">Open topic →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section spacing="tight">
        <BoundaryPanel className="max-w-3xl" />
      </Section>
    </>
  );
}
