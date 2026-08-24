import Link from "next/link";

import { Button } from "@/components/Button";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Eyebrow } from "@/components/Section";

const diligenceLinks = [
  {
    href: "/pricing",
    title: "Packages and pricing",
    body: "Published platform, vessel-license, trial, and enterprise package structure.",
  },
  {
    href: "/trust",
    title: "Trust Center",
    body: "Security, access, continuity, disclosure, and procurement paths in one place.",
  },
  {
    href: "/trust/assurance-model",
    title: "Assurance model",
    body: "Printable requirement-to-evidence operating model with regulatory boundary language.",
  },
  {
    href: "/trust/procurement",
    title: "Procurement packet",
    body: "NDA, questionnaire, subprocessor, architecture, DPA/MSA, and evidence request path.",
  },
  {
    href: "/trust/ai-policy",
    title: "AI and data policy",
    body: "Current public boundaries for AI support, data handling, and owner-controlled review.",
  },
  {
    href: "/legal/privacy",
    title: "Legal documents",
    body: "Privacy, terms, DPA, cookies, AUP, subprocessors, accessibility, and the PDF library.",
  },
];

const reviewSteps = [
  {
    href: "/demo#scrub-tour",
    title: "Inspect proof",
    body: "Scrub the product tour and sample record before the call.",
  },
  {
    href: "/pricing",
    title: "Confirm fit",
    body: "Check package shape, pricing basis, and fleet-size assumptions.",
  },
  {
    href: "/trust/procurement",
    title: "Review diligence",
    body: "Open procurement, security, legal documents, and AI/data boundaries.",
  },
  {
    href: "/contact?intent=procurement",
    title: "Request materials",
    body: "Send the document list and organization context through the routed form.",
  },
];

type BuyerDiligencePacketProps = {
  compact?: boolean;
  className?: string;
};

export function BuyerDiligencePacket({ compact = false, className = "" }: BuyerDiligencePacketProps) {
  return (
    <LiquidGlass
      as="section"
      variant="strong"
      padding={compact ? "md" : "lg"}
      className={`overflow-hidden ${className}`.trim()}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <Eyebrow>Buyer diligence</Eyebrow>
          <h2 className={compact ? "mt-3 text-[28px] leading-[1.12]" : "mt-3 text-[34px] leading-[1.08]"}>
            Open the packet buyers usually need before the demo.
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-structural">
            Pricing, security, assurance model, procurement, legal documents, and AI/data boundaries stay one click
            away so fleet, IT/OT, DPA, and procurement reviewers can diligence CertaMaris quickly.
          </p>
          <p className="mt-4 rounded-md border border-ocean/15 bg-ocean/5 px-3 py-2 text-[13px] leading-6 text-structural">
            Forwardable review route: proof first, package fit second, procurement/legal review third, request last.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact?intent=procurement">Request procurement materials</Button>
            <Button href="/contact?intent=demo" variant="secondary">
              Request demo
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <ol className="grid gap-3 sm:grid-cols-2" aria-label="Forwardable review route">
            {reviewSteps.map((step, index) => (
              <li key={step.href}>
                <Link
                  href={step.href}
                  className="group flex h-full gap-3 rounded-md border border-ocean/15 bg-white/78 p-3.5 transition hover:-translate-y-0.5 hover:border-ocean/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
                >
                  <span className="font-mono text-[12px] font-semibold text-ocean">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-navy group-hover:text-ocean">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-5 text-structural">{step.body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="grid gap-3 sm:grid-cols-2">
            {diligenceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-md border border-navy/10 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-ocean/35 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <span className="block text-[15px] font-semibold text-navy group-hover:text-ocean">{item.title}</span>
                <span className="mt-2 block text-[13px] leading-6 text-structural">{item.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LiquidGlass>
  );
}
