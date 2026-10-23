import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { careersContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Careers",
  "CertaMaris careers — open roles are published only when available. No open roles are listed at this time.",
  "/about/careers"
);

const processSteps = [
  {
    title: "Send an introduction",
    body: "Use the contact channel or email with relevant maritime, compliance, security, or product experience.",
  },
  {
    title: "Routing review",
    body: "Submissions may be routed for consideration. Unsolicited applications are not a guarantee of review or of an open role.",
  },
  {
    title: "Open roles",
    body: "When a role is published, it appears on this page with its own application details. This site does not invent headcount plans or office locations.",
  },
];

const relatedLinks = [
  {
    href: "/about",
    label: "About CertaMaris",
    description: "Why the company exists and how its operating model is structured.",
  },
  {
    href: "/about/leadership",
    label: "Leadership",
    description: "The verified public profile of founder Skyler Brown.",
  },
  {
    href: "/who-we-serve/operators",
    label: "Fleet operators",
    description: "How operational teams use CertaMaris across fleets and vessels.",
  },
  {
    href: "/trust",
    label: "Trust Center",
    description: "Security, procurement, and operating transparency.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow={careersContent.eyebrow} title={careersContent.title} intro={careersContent.intro} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Careers" },
          ]}
        />

        <Reveal>
          <EmptyState
            variant="careers"
            eyebrow="Open roles"
            statusLabel="Role listings"
            statusValue="Not published"
            title={careersContent.status}
            body={<p>{careersContent.body}</p>}
            primaryAction={
              <Button href={careersContent.contactHref}>Contact about careers</Button>
            }
            supporting={
              <p>
                Routing channel:{" "}
                <a
                  href={`mailto:${careersContent.salesEmail}`}
                  className="empty-state__inline-link"
                >
                  {careersContent.salesEmail}
                </a>
                . A brief introduction and resume overview are sufficient for routing.
              </p>
            }
            processEyebrow="Hiring path"
            processTitle="How unsolicited introductions are handled."
            processIntro="Openings are published only when available; this page does not maintain a speculative candidate pipeline."
            processSteps={processSteps}
            relatedTitle="Learn more before you write."
            relatedLinks={relatedLinks}
          />
        </Reveal>
      </Section>
    </>
  );
}
