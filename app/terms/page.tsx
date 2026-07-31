import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Terms of Service",
  "The terms governing use of the CertaMaris public website.",
  "/terms"
);

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        intro="These terms govern use of the public CertaMaris website. Platform access is covered by a separate customer agreement when one exists."
      />
      <Section>
        <div className="legal-panel max-w-3xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <p className="text-[14px] text-structural leading-relaxed border-b border-navy/10 pb-6">
            Scope: informational website use and inquiry forms only. Registered legal entity, address, governing law,
            and venue — when required — appear in a signed customer or commercial agreement, not as public-site
            placeholders here.
          </p>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">1. Scope of this website</h2>
            <p>
              This website provides information about the CertaMaris platform and enables prospective customers to
              request a readiness call or contact our team. It does not itself provide compliance workflows. Those are
              delivered through the authenticated CertaMaris application under a separate customer agreement.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">2. No legal or regulatory advice</h2>
            <p>
              Content on this website, including pages describing IMO cyber-risk management and IACS UR E26/E27, is
              provided for general informational purposes only. It is not legal or regulatory advice and should not be
              relied upon as a substitute for qualified counsel or the controlling official source text.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">3. No guaranteed outcomes</h2>
            <p>
              CertaMaris does not guarantee any audit, survey, inspection, or certification outcome. Compliance
              determinations remain the responsibility of the customer&apos;s accountable personnel, classification
              societies, flag states, and regulators.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">4. Acceptable use</h2>
            <p>
              You agree not to use this website to submit false or misleading information, attempt unauthorized access
              to any system, or interfere with the website&apos;s normal operation.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">5. Intellectual property</h2>
            <p>
              The CertaMaris name, logo, and website content are protected as CertaMaris brand and site materials and
              may not be reproduced without permission, except for ordinary viewing and fair use of publicly posted
              pages.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">6. Customer agreements</h2>
            <p>
              If CertaMaris enters a customer agreement with you, that agreement controls the ordered services,
              governing law, venue, data-processing terms, and order-specific obligations. This public website page does
              not alter any signed agreement.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">7. Contact</h2>
            <p>
              Questions about these terms can be directed to{" "}
              <span className="font-medium">legal@certamaris.com</span>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
