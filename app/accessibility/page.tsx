import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Accessibility", "The CertaMaris accessibility commitment and how to report an issue.", "/accessibility");

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Accessibility Statement" intro="Last updated: to be set at publication." />
      <Section>
        <div className="max-w-2xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Our commitment</h2>
            <p>
              CertaMaris is designed and built to meet WCAG 2.1 Level AA guidelines across this website: semantic
              HTML, logical heading structure, keyboard-operable navigation and forms, visible focus states,
              sufficient color contrast, and non-color status indicators throughout.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Motion and animation</h2>
            <p>
              This site respects your operating system's reduced-motion preference. When enabled, scroll-triggered
              animation, the hero background video, and decorative motion are disabled in favor of a stable, fully
              legible static presentation — with no loss of information or functionality.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Known limitations</h2>
            <p>
              We are not aware of any outstanding accessibility barriers at time of publication. If you encounter
              one, we want to know about it.
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Reporting an issue</h2>
            <p>
              If you experience any difficulty accessing content on this website, contact{" "}
              <span className="font-medium">accessibility@certamaris.com</span> with a description of the issue and
              the page where it occurred. We aim to respond promptly.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
