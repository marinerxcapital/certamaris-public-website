export type AssuranceStageCode =
  | "REQ"
  | "APP"
  | "CTL"
  | "ASM"
  | "EVD"
  | "FND"
  | "RSK"
  | "CAP"
  | "QA"
  | "PKG";

export type AssuranceStage = {
  code: AssuranceStageCode;
  label: string;
  sentence: string;
};

export const assuranceStages: AssuranceStage[] = [
  {
    code: "REQ",
    label: "Requirement",
    sentence: "The obligation is recorded as source text before anyone interprets scope or evidence.",
  },
  {
    code: "APP",
    label: "Applicability",
    sentence: "Qualified reviewers mark which vessels, systems, or engagements the requirement touches.",
  },
  {
    code: "CTL",
    label: "Control",
    sentence: "A mapped safeguard or procedure shows how the requirement is intended to be met.",
  },
  {
    code: "ASM",
    label: "Assessment",
    sentence: "Review work tests the mapped control against the agreed scope and records the basis.",
  },
  {
    code: "EVD",
    label: "Evidence",
    sentence: "Artifacts keep custodian, version, sufficiency, freshness, and mapped-control context.",
  },
  {
    code: "FND",
    label: "Finding",
    sentence: "A gap separates condition, criterion, evidence, consequence, and responsible owner.",
  },
  {
    code: "RSK",
    label: "Risk",
    sentence: "Residual exposure is tied to an accountable treatment or acceptance decision.",
  },
  {
    code: "CAP",
    label: "Corrective action",
    sentence: "Remediation stays owned and time-bound until verification evidence supports closure.",
  },
  {
    code: "QA",
    label: "QA review",
    sentence: "An independent reviewer checks package completeness before controlled release.",
  },
  {
    code: "PKG",
    label: "Release package",
    sentence: "Approved scope, evidence, findings, actions, and decisions are compiled for inspection.",
  },
];

export function getStage(code: AssuranceStageCode): AssuranceStage {
  const stage = assuranceStages.find((item) => item.code === code);
  if (!stage) throw new Error(`Unknown assurance stage: ${code}`);
  return stage;
}
