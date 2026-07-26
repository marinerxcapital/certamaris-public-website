import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Pricing",
  "CertaMaris pricing depends on fleet size, vessel count, and scope. Request a tailored quote.",
  "/pricing"
);

const factors = [
  { title: "Fleet size", body: "The number of vessels and facilities brought into scope." },
  { title: "Operational complexity", body: "Vessel types, flag states, and the number of technical managers or DPAs involved." },
  { title: "Evidence condition", body: "Whether existing assessment and plan work can be ingested, or needs to be built from scratch." },
  { title: "Required fieldwork", body: "Whether onboarding includes on-site or remote assessment support." },
  { title: "Review depth", body: "The level of ongoing regulatory intelligence and audit-readiness support required." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Priced to fleet size and scope — not a one-size list price."
        intro="Maritime fleets vary too much in size, vessel type, and existing compliance maturity for a fixed public price list to be meaningful. We scope every engagement individually."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <Eyebrow>How pricing works</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">Five factors shape every quote.</h2>
            <div className="space-y-5">
              {factors.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[15.5px] font-semibold mb-1">{item.title}</h3>
                  <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border rounded-sm p-8 bg-paper" style={{ borderColor: "var(--hairline-strong)" }}>
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-3">Request a quote</p>
              <h3 className="text-[22px] font-semibold mb-3">Tell us about your fleet.</h3>
              <p className="text-[14.5px] text-structural leading-relaxed mb-6">
                A short conversation is usually enough to scope a fixed proposal — no lengthy procurement process
                required to get a real number.
              </p>
              <Button href="/contact">Request pricing</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
