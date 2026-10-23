import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { partnersContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Partners",
  "Partner and collaboration inquiries for CertaMaris, including technology, advisory, referral, and channel relationships.",
  "/about/partners"
);

const processSteps = [
  {
    title: "Send the context",
    body: "Include your organization, proposed relationship model, and geography so the request can be understood without another round of basic questions.",
  },
  {
    title: "CertaMaris review",
    body: "The request is reviewed for relevance to current collaboration needs. Submitting it does not create a partnership or authorize a public listing.",
  },
  {
    title: "Follow-up",
    body: "If there is a relevant next step, the team follows up through the contact details you provide. This page does not promise a response timeline.",
  },
];

const relatedLinks = [
  {
    href: "/about",
    label: "About CertaMaris",
    description: "The company mission, operating model, and product philosophy.",
  },
  {
    href: "/platform",
    label: "Platform overview",
    description: "How company, fleet, and vessel assurance work fit together.",
  },
  {
    href: "/who-we-serve",
    label: "Who we serve",
    description: "Role-specific paths for maritime operators and technical teams.",
  },
  {
    href: "/trust/procurement",
    label: "Trust and procurement",
    description: "Security and diligence context for qualified evaluations.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow={partnersContent.eyebrow} title={partnersContent.title} intro={partnersContent.intro} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Partners" },
          ]}
        />

        <Reveal>
          <EmptyState
            variant="partnership"
            eyebrow="Relationship directory"
            statusLabel="Directory status"
            statusValue="Not published"
            title="No public partner listings"
            body={<p>{partnersContent.body}</p>}
            primaryAction={
              <Button href={partnersContent.contactHref}>Contact about partnerships</Button>
            }
            supporting={
              <p>
                Prefer email?{" "}
                <a
                  href={`mailto:${partnersContent.salesEmail}`}
                  className="empty-state__inline-link"
                >
                  {partnersContent.salesEmail}
                </a>
                . Include the same organization, relationship model, and geography details.
              </p>
            }
            processEyebrow="Inquiry path"
            processTitle="How partnership requests are routed."
            processIntro="This is an inquiry path, not a published partner directory or an acceptance process."
            processSteps={processSteps}
            relatedTitle="Continue with the right context."
            relatedLinks={relatedLinks}
          />
        </Reveal>
      </Section>
    </>
  );
}
