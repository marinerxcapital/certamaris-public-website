import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { APP_SALES_EMAIL } from "@/lib/constants";

export const metadata = pageMetadata(
  "Contact & Readiness Call",
  "Send CertaMaris a readiness-call request, or contact the team directly about your fleet's cyber compliance program.",
  "/contact"
);

const expectations = [
  { title: "No calendar assumption", body: "The form starts a routed request. It does not create a calendar event or imply a scheduling integration is already in place." },
  { title: "What the intake captures", body: "Fleet scope, current evidence condition, readiness pressure, accountable roles, and the IACS UR E26/E27 or IMO cyber-risk workflows most relevant to you." },
  { title: "What to prepare", body: "A rough sense of vessel count, current SMS cyber-risk coverage, and any upcoming survey or review pressure helps. Nothing needs to be polished before you write in." },
  { title: "What happens next", body: "If the request is deliverable through the configured channel, CertaMaris uses the context to route a focused conversation. If delivery is unavailable, use the direct email fallback shown below." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a readiness call with enough context to make it useful."
        intro="Tell us what is happening across your fleet, what evidence or review pressure exists, and which workflow needs structure. The form routes a request; it is not a calendar booking."
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
