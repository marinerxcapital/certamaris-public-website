import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Request received — CertaMaris",
  robots: { index: false, follow: false },
};

export default function ContactSubmittedPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Your request has been received."
        intro="CertaMaris accepted your request for delivery. We will follow up using the email address you provided."
      />
      <Section spacing="compact">
        <div className="mx-auto max-w-2xl rounded-md border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[15px] leading-relaxed text-structural">
            This confirmation contains no submitted personal information. If you need to add context,
            reply when the CertaMaris team contacts you rather than submitting the same request again.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/">Return home</Button>
            <Button href="/resources" variant="secondary">Browse resources</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
