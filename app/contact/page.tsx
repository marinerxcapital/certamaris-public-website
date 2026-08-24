import { Suspense } from "react";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { BuyerDiligencePacket } from "@/components/BuyerDiligencePacket";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { APP_SALES_EMAIL, APP_SCHEDULING_URL } from "@/lib/constants";
import { CONTACT_INTENTS } from "@/lib/faq-pricing";

export const metadata = pageMetadata(
  "Contact",
  "Contact CertaMaris for a product demo, readiness conversation, procurement or security diligence, support, partnership, press, or careers.",
  "/contact"
);

const expectations = [
  {
    title: "Submit details — we arrange the time",
    body: "Submit your details and we will contact you to arrange a suitable time. The form does not create a calendar event by itself.",
  },
  {
    title: "Intent-based routing",
    body: "Choose demo, readiness, procurement, security, privacy, support, partnership, press, careers, or disclosure. Each path is tagged so the right CertaMaris contact can respond.",
  },
  {
    title: "What to prepare",
    body: "For sales and readiness: vessel count, role, objective, timeline, and current process help. Nothing needs to be polished before you write in.",
  },
  {
    title: "What happens next",
    body: "Submit your request through the form or email the team directly. A team member follows up on the email you provide. This is not a timed SLA.",
  },
];

const requestChecklist = [
  "Fleet size and vessel types in scope",
  "Primary pressure: demo, readiness, procurement, security, support, or disclosure",
  "Current evidence condition and target planning horizon",
  "Documents needed, if this is a procurement or security request",
];

export default function ContactPage() {
  const hasScheduling = Boolean(APP_SCHEDULING_URL.trim());

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need — we will route it and follow up."
        intro="Use the multi-intent form for demos, readiness calls, procurement, security diligence, and other paths. Submit your details and we will contact you to arrange a suitable time."
      />

      <Section spacing="compact" surface="paper">
        <Reveal className="max-w-3xl mb-6">
          <Eyebrow>Intent paths</Eyebrow>
          <h2 className="text-[22px] sm:text-[26px] leading-[1.16] mb-3">Pick a path or use the form selector.</h2>
          <p className="text-[14px] text-structural leading-relaxed mb-5">
            Links set <span className="font-mono text-[13px]">?intent=</span> so the form opens on the right path.
            You can also switch intents inside the form.
          </p>
        </Reveal>
        <div className="flex flex-wrap gap-2">
          {CONTACT_INTENTS.map((intent) => (
            <a
              key={intent.id}
              href={`/contact?intent=${intent.id}`}
              className="rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-[13px] font-medium text-navy hover:border-ocean/40 hover:text-ocean"
            >
              {intent.label}
            </a>
          ))}
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal>
          <BuyerDiligencePacket compact />
        </Reveal>
      </Section>

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
            <div className="mt-8 rounded-md border border-ocean/15 bg-ocean/5 p-5">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ocean">
                Fastest useful request
              </p>
              <ul className="mt-3 space-y-2">
                {requestChecklist.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13.5px] leading-6 text-structural">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t space-y-4" style={{ borderColor: "var(--hairline)" }}>
              <div>
                <p className="text-[13px] text-structural mb-1">Prefer email?</p>
                <a
                  href={`mailto:${APP_SALES_EMAIL}`}
                  className="text-[15px] font-medium text-ocean hover:underline"
                  data-integration-point="contact-sales"
                >
                  {APP_SALES_EMAIL}
                </a>
              </div>
              {hasScheduling && (
                <div>
                  <p className="text-[13px] text-structural mb-2">
                    Prefer to pick a time yourself? Scheduling is optional and separate from the request form.
                  </p>
                  <Button href={APP_SCHEDULING_URL} variant="secondary" external>
                    Book a time
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/demo" variant="secondary">
                  Product demo tour
                </Button>
                <Button href="/pricing" variant="ghost">
                  Pricing packages
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="premium-card p-7 sm:p-9">
              <Suspense
                fallback={
                  <div className="space-y-3" role="status">
                    <p className="text-[14px] text-structural">Loading contact form…</p>
                    <p className="text-[14px] text-structural">
                      If the form does not load, email{" "}
                      <a
                        href={`mailto:${APP_SALES_EMAIL}`}
                        className="font-medium text-ocean hover:underline"
                      >
                        {APP_SALES_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                }
              >
                <ContactForm defaultIntent="demo" />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
