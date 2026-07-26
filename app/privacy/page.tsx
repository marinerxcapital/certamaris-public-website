import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy Policy", "How CertaMaris collects, uses, and protects personal information.", "/privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro="Last updated: to be set at publication." />
      <Section>
        <div className="max-w-2xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <div>
            <h2 className="text-[19px] font-semibold mb-2">1. Information we collect</h2>
            <p>
              When you submit a form on this website (for example, requesting a demo or contacting sales), we
              collect the information you provide directly: your name, work email address, company name, fleet
              size, and any message you include. We also collect standard technical information automatically,
              such as IP address, browser type, and pages visited, through server logs and any analytics tooling
              we enable.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">2. How we use information</h2>
            <p>
              We use the information you submit to respond to your inquiry, schedule and prepare for demo calls,
              and communicate with you about CertaMaris. We do not sell personal information collected through
              this website to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">3. Data retention</h2>
            <p>
              Inquiry and contact-form data is retained for as long as reasonably necessary to respond to your
              inquiry and maintain a business record of the interaction. Specific retention periods by data
              category are being finalized and will be published here before general availability.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">4. Cookies and analytics</h2>
            <p>
              This website may use cookies or similar technologies for basic functionality and, where enabled,
              privacy-conscious analytics to understand aggregate site usage. Any analytics provider in use, along
              with its data retention terms, will be disclosed here once finalized.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">5. Your rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, or request deletion of your
              personal information. To exercise these rights, contact us using the details below.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">6. Contact</h2>
            <p>
              Questions about this policy can be directed to <span className="font-medium">privacy@certamaris.com</span>.
              The controlling legal entity name and registered address for CertaMaris will be published here
              ahead of general availability, pending final confirmation.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
