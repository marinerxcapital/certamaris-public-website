import Link from "next/link";

import { Eyebrow } from "@/components/Section";
import { homeCapabilityPillars } from "@/lib/content";

/**
 * Plain-language "what this covers" band placed between the hero and the
 * sample-record plane, so the category is explained before the technical depth.
 */
export function HomeCapabilityBand() {
  return (
    <>
      <Eyebrow>What CertaMaris covers</Eyebrow>
      <h2 className="section-h2 section-h2--lg">
        Maritime cyber assurance across the whole operation.
      </h2>
      <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-structural">
        CertaMaris keeps requirements, evidence, findings, and readiness in one controlled record
        built for real vessel and shoreside operations — not generic office IT.
      </p>

      <ul className="home-capability-grid mt-8">
        {homeCapabilityPillars.map((pillar, index) => (
          <li key={pillar.id}>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-[17.5px] font-semibold text-navy">{pillar.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-navy/85">{pillar.summary}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-structural">{pillar.detail}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[14px] text-structural">
        <Link href="/platform" className="font-semibold text-ocean hover:underline">
          Platform
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/solutions" className="font-semibold text-ocean hover:underline">
          Solutions
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/compliance" className="font-semibold text-ocean hover:underline">
          Compliance hub
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/who-we-serve" className="font-semibold text-ocean hover:underline">
          Who we serve
        </Link>
      </p>
    </>
  );
}
