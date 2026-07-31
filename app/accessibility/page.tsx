import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Accessibility",
  "How the CertaMaris public website approaches accessibility, and how to report an issue.",
  "/accessibility"
);

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility Statement"
        intro="What this public site does today to support access, and how to report barriers. This is not a formal conformance certification."
      />
      <Section>
        <div className="legal-panel max-w-3xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <p className="text-[14px] text-structural leading-relaxed border-b border-navy/10 pb-6">
            We design this marketing site for clear reading and keyboard use. We have not published a third-party WCAG
            audit result on this page, so we do not claim formal WCAG conformance here.
          </p>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">What this site includes</h2>
            <p className="mb-3">
              Practical accessibility measures on the public site include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                A skip link to main content (<span className="font-medium">Skip to main content</span>) for keyboard
                users.
              </li>
              <li>Semantic page structure with headings, landmarks, and an identified main content region.</li>
              <li>Visible focus styles on interactive controls (links, buttons, form fields).</li>
              <li>
                Contact and inquiry forms with labeled fields, client-side validation messages, and honest delivery
                status.
              </li>
              <li>
                Respect for <span className="font-medium">prefers-reduced-motion</span>: decorative Pixel Grid motion is
                disabled and scroll-triggered animation is reduced so content remains fully legible.
              </li>
              <li>Contrast-minded brand colors and status cues that are not color-only where product UI is shown.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Motion and animation</h2>
            <p>
              When your operating system prefers reduced motion, this site reduces or disables decorative animation in
              favor of a stable presentation. Information and primary actions remain available without relying on motion
              alone.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Ongoing work and known limitations</h2>
            <p>
              We review public pages for keyboard access, heading structure, contrast, reduced-motion behavior, and
              responsive readability. Gaps can still exist — especially on third-party embeds if any are added later, or
              on edge cases across assistive technologies. If you hit a barrier, please tell us.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Reporting an issue</h2>
            <p>
              If you experience difficulty accessing content on this website, contact{" "}
              <span className="font-medium">accessibility@certamaris.com</span> with a description of the issue, the page
              URL, and your browser or assistive technology if known. We aim to respond promptly; this is not a timed
              SLA.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
