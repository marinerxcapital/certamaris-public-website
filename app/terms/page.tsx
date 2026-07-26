import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Terms of Service", "The terms governing use of the CertaMaris website and platform.", "/terms");

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" intro="Last updated: to be set at publication." />
      <Section>
        <div className="max-w-2xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <div>
            <h2 className="text-[19px] font-semibold mb-2">1. Scope of this website</h2>
            <p>
              This website provides information about the CertaMaris platform and enables prospective customers to
              request a demo or contact our team. It does not itself provide compliance workflows — those are
              delivered through the authenticated CertaMaris application under a separate customer agreement.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">2. No legal or regulatory advice</h2>
            <p>
              Content on this website, including pages describing IMO cyber-risk management and IACS UR E26/E27, is
              provided for general informational purposes only. It is not legal or regulatory advice and should
              not be relied upon as a substitute for qualified counsel or the controlling official source text.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">3. No guaranteed outcomes</h2>
            <p>
              CertaMaris does not guarantee any audit, survey, inspection, or certification outcome. Compliance
              determinations remain the responsibility of the customer's accountable personnel, classification
              societies, flag states, and regulators.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">4. Acceptable use</h2>
            <p>
              You agree not to use this website to submit false or misleading information, attempt unauthorized
              access to any system, or interfere with the website's normal operation.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">5. Intellectual property</h2>
            <p>
              The CertaMaris name, logo, and website content are the property of CertaMaris and may not be
              reproduced without permission.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">6. Governing law</h2>
            <p>
              The governing law and venue for disputes arising from use of this website will be specified here
              once the controlling legal entity and jurisdiction are finalized ahead of general availability.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">7. Contact</h2>
            <p>
              Questions about these terms can be directed to <span className="font-medium">legal@certamaris.com</span>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
