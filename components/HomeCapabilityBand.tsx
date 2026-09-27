import { DomainIcon, type DomainIconId } from "@/components/DomainIcons";
import { Eyebrow } from "@/components/Section";

const capabilityItems: {
  id: string;
  icon: DomainIconId;
  title: string;
  support: string;
}[] = [
  {
    id: "maritime-cybersecurity",
    icon: "Vessel",
    title: "Maritime cyber controls",
    support: "Bridge, engine, vessel, and shoreside controls in one fleet view.",
  },
  {
    id: "cyber-risk-intelligence",
    icon: "RSK",
    title: "Cyber-risk change intelligence",
    support: "Requirement changes tied to affected clauses, mappings, and tasks.",
  },
  {
    id: "compliance",
    icon: "REQ",
    title: "Compliance workflow mapping",
    support: "IMO and IACS work structured with official-source boundaries visible.",
  },
  {
    id: "assurance",
    icon: "EVD",
    title: "Assurance evidence chain",
    support: "Evidence, findings, and corrective actions stay connected for review.",
  },
  {
    id: "operational-resilience",
    icon: "PKG",
    title: "Operational readiness package",
    support: "Approved work compiles into a reviewable readiness package.",
  },
];

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
        {capabilityItems.map((item) => (
          <li key={item.id}>
            <DomainIcon id={item.icon} className="h-7 w-7 text-ocean" />
            <h3 className="mt-3 text-[16px] font-semibold text-navy">{item.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-structural">{item.support}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
