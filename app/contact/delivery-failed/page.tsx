import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { APP_SALES_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact delivery unavailable — CertaMaris",
  robots: { index: false, follow: false },
};

export default function ContactDeliveryFailedPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="The website could not deliver your request."
        intro="No success state was recorded. You can safely retry later or contact CertaMaris directly."
      />
      <Section spacing="compact">
        <div className="mx-auto max-w-2xl rounded-md border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[15px] leading-relaxed text-structural">
            Email <a className="font-semibold text-ocean underline underline-offset-2" href={`mailto:${APP_SALES_EMAIL}`}>{APP_SALES_EMAIL}</a>{" "}
            with the same details. Do not include passwords, authentication factors, recovery codes, or exploit payloads.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">Try the form again</Button>
            <Button href="/" variant="secondary">Return home</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
