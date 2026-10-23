import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { pressContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Press",
  "Press and media inquiries for CertaMaris. Contact the team with outlet, deadline, and topic.",
  "/about/press"
);

const processSteps = [
  {
    title: "Send the request",
    body: "Include your outlet, deadline, and topic so the inquiry can be routed without avoidable back-and-forth.",
  },
  {
    title: "Clarify the scope",
    body: "The team may ask for context needed to answer a fact check, interview request, or brand-asset question. No response timeline is promised here.",
  },
  {
    title: "Use public material responsibly",
    body: "No press archive or media kit is published on this page. Publicly posted pages remain the source; marks require permission outside ordinary news reporting.",
  },
];

const relatedLinks = [
  {
    href: "/about",
    label: "About CertaMaris",
    description: "Company mission, product philosophy, and operating model.",
  },
  {
    href: "/about/leadership",
    label: "Leadership",
    description: "Verified founder background and public professional contact.",
  },
  {
    href: "/about/corporate-information",
    label: "Corporate information",
    description: "Published corporate facts and official contact channels.",
  },
  {
    href: "/trust",
    label: "Trust Center",
    description: "Security, procurement, and operating transparency.",
  },
];

export default function PressPage() {
  return (
    <>
      <PageHero eyebrow={pressContent.eyebrow} title={pressContent.title} intro={pressContent.intro} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Press" },
          ]}
        />

        <Reveal>
          <EmptyState
            variant="press"
            eyebrow="Media contact"
            statusLabel="Media archive"
            statusValue="Not published"
            title="Press inquiries"
            body={
              <>
                <p>{pressContent.body}</p>
                <p>{pressContent.brandNote}</p>
              </>
            }
            primaryAction={<Button href={pressContent.contactHref}>Contact about press</Button>}
            supporting={
              <p>
                Email{" "}
                <a
                  href={`mailto:${pressContent.salesEmail}`}
                  className="empty-state__inline-link"
                >
                  {pressContent.salesEmail}
                </a>{" "}
                with a subject line indicating a press inquiry.
              </p>
            }
            processEyebrow="Inquiry path"
            processTitle="How media requests are routed."
            processIntro="This page is a contact path. It does not represent a live newsroom, press archive, or media-kit download."
            processSteps={processSteps}
            relatedTitle="Find the right public context."
            relatedLinks={relatedLinks}
          />
        </Reveal>
      </Section>
    </>
  );
}
