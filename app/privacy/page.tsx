import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Privacy Policy",
  "How CertaMaris collects, uses, and protects personal information on this website.",
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="This page describes how the public CertaMaris website handles information. It is not a product data-processing agreement."
      />
      <Section>
        <div className="legal-panel max-w-3xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <p className="text-[14px] text-structural leading-relaxed border-b border-navy/10 pb-6">
            Scope: the public marketing website at certamaris.com and related public pages. Authenticated product
            processing, if any, is governed by a separate customer agreement when one is in place. Registered legal
            entity, address, and jurisdiction details appear in signed commercial documents where applicable — not as
            placeholders on this page.
          </p>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">1. Information we collect</h2>
            <p>
              When you submit a form on this website (for example, requesting a readiness call or contacting sales), we
              collect the information you provide directly: your name, work email address, company name, fleet size,
              conversation focus, planning horizon, and any message you include. We may also collect standard technical
              information automatically, such as IP address, browser type, and pages visited, through server logs and
              any analytics tooling we enable.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">2. How we use information</h2>
            <p>
              We use the information you submit to respond to your inquiry, route and prepare for readiness
              conversations, and communicate with you about CertaMaris. We do not sell personal information collected
              through this website to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">3. Data retention</h2>
            <p>
              Inquiry and contact-form data is retained for as long as reasonably necessary to respond to your inquiry
              and maintain a business record of the interaction. Retention can vary by inquiry type, applicable
              agreement, and legal requirement.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">4. Cookies and analytics</h2>
            <p>
              This website may use cookies or similar technologies for basic functionality and, where enabled,
              privacy-conscious analytics to understand aggregate site usage. Analytics tooling is reviewed for business
              necessity, access control, and retention before use. If a specific provider is enabled later, this section
              should be updated to name it.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">5. Your rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, or request deletion of your
              personal information. To exercise these rights, contact us using the details below. We will respond as
              promptly as practical; this page does not state a formal SLA.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">6. Contact</h2>
            <p>
              Questions about this policy can be directed to{" "}
              <span className="font-medium">privacy@certamaris.com</span>. Do not include passwords, credentials,
              vessel-security details, or other sensitive operational information in a website contact request.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
