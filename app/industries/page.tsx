import type { Metadata } from "next";
import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { audiencePages } from "@/lib/solutions-audience";
import { IndustriesClientRedirect } from "./IndustriesClientRedirect";

/**
 * Static-export friendly hub: soft client redirect to /who-we-serve plus full
 * link list so crawlers and users without JS still reach role pages.
 * Preferred permanent destination is /who-we-serve.
 */
export const metadata: Metadata = pageMetadata(
  "Industries → Who We Serve",
  "CertaMaris organizes buyers by stakeholder role. This legacy industries path points to Who we serve.",
  "/industries"
);

export default function IndustriesRedirectHubPage() {
  return (
    <>
      <IndustriesClientRedirect />
      <PageHero
        emphasis="elevated"
        eyebrow="Industries → Who we serve"
        title="Roles are the organizing concept. Continue to Who we serve."
        intro="CertaMaris organizes buyers and users by stakeholder role rather than a generic industry list. This page preserves the /industries URL and points to the permanent Who we serve section."
      />

      <Section spacing="compact">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>Permanent destination</Eyebrow>
          <p className="text-[15.5px] text-structural leading-relaxed mb-6">
            You are being redirected to{" "}
            <Link href="/who-we-serve" className="font-semibold text-ocean hover:underline">
              /who-we-serve
            </Link>
            . Role pages:
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Button href="/who-we-serve" variant="primary">
              Who we serve
            </Button>
            <Button href="/contact?intent=demo" variant="secondary">
              Request a demo
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {audiencePages.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/who-we-serve/${a.slug}`}
                  className="block rounded-lg border border-line bg-white/60 px-4 py-3 text-[14.5px] font-medium text-navy hover:border-ocean/40"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <BoundaryPanel className="mt-10" />
      </Section>
    </>
  );
}
