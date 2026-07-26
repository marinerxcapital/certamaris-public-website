import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { APP_SALES_EMAIL } from "@/lib/constants";

export const metadata = pageMetadata(
  "Contact & Book a Demo",
  "Book a CertaMaris readiness call, or contact our sales team directly about your fleet's cyber compliance program.",
  "/contact"
);

const expectations = [
  { title: "Length", body: "Most calls run 30 minutes. We keep it focused on your fleet, not a generic product tour." },
  { title: "What we cover", body: "Current compliance state, evidence and assessment condition, accountable roles, and the IACS UR E26/E27 or IMO cyber-risk workflows most relevant to you." },
  { title: "What to prepare", body: "A rough sense of fleet size, current SMS cyber-risk coverage, and any upcoming survey or audit dates helps — nothing needs to be polished beforehand." },
  { title: "After the call", body: "We'll follow up with a written summary and, where it makes sense, a scoped path to onboarding your fleet." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a readiness call, or reach our team directly."
        intro="Tell us about your fleet and we'll route you to the right conversation — whether that's a product walkthrough, a technical question, or a scoping discussion."
      />

      <Section>
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14">
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <div className="space-y-6 mt-4">
              {expectations.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[15.5px] font-semibold mb-1">{item.title}</h3>
                  <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--hairline)" }}>
              <p className="text-[13px] text-structural mb-1">Prefer email?</p>
              {/* INTEGRATION POINT — Contact Sales mailto fallback; replace with a routed sales inbox once confirmed. */}
              <a href={`mailto:${APP_SALES_EMAIL}`} className="text-[15px] font-medium text-ocean hover:underline" data-integration-point="contact-sales">
                {APP_SALES_EMAIL}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border rounded-sm p-7 sm:p-9 bg-paper" style={{ borderColor: "var(--hairline-strong)" }}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
