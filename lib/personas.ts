/**
 * Persona-gated homepage / demo entry.
 * Four high-signal roles — enough for a first-10-seconds choice without
 * duplicating the full /who-we-serve catalog. Copy stays claim-safe:
 * no invented metrics, customers, or compliance guarantees.
 */

export type PersonaId =
  | "technical-managers-dpas"
  | "ship-owners"
  | "maritime-it-ot"
  | "classification-survey";

export type Persona = {
  id: PersonaId;
  /** Short picker label */
  label: string;
  /** Mono ledger label shown near the brand */
  ledger: string;
  /** Hero headline — one job, role-specific */
  headline: string;
  /** One supporting sentence */
  support: string;
  /** Primary CTA label nuance (href stays demo request) */
  ctaHint: string;
  /** Sample-record object id to open first */
  sampleRecordId: string;
  /** Demo scrub-tour beat id to open first */
  demoBeatId: string;
  /** Deep link into who-we-serve */
  audienceHref: string;
};

export const PERSONA_STORAGE_KEY = "certamaris.persona";

export const PERSONAS: Persona[] = [
  {
    id: "technical-managers-dpas",
    label: "Technical manager / DPA",
    ledger: "ROLE · DPA",
    headline: "Keep SMS cyber evidence, findings, and CAPA verification in one inspectable record.",
    support:
      "Walk the sample chain from requirement to readiness package — the same object model shoreside teams use before survey week.",
    ctaHint: "Request a readiness demo",
    sampleRecordId: "EVD-0847",
    demoBeatId: "evidence",
    audienceHref: "/who-we-serve/technical-managers-dpas",
  },
  {
    id: "ship-owners",
    label: "Ship owner / operator",
    ledger: "ROLE · OWNER",
    headline: "See fleet readiness and open decisions without chasing every vessel inbox.",
    support:
      "Inspect how company, fleet, and vessel work stay linked — then follow one sample record end to end.",
    ctaHint: "Request a fleet demo",
    sampleRecordId: "PKG-0067",
    demoBeatId: "fleet",
    audienceHref: "/who-we-serve/ship-owners",
  },
  {
    id: "maritime-it-ot",
    label: "Maritime IT / OT",
    ledger: "ROLE · IT/OT",
    headline: "Map technical controls and evidence across the IT/OT boundary — without losing custody.",
    support:
      "Start at the control object in the sample record, then scrub the product views that hold implementation proof.",
    ctaHint: "Request a technical demo",
    sampleRecordId: "CTL-0389",
    demoBeatId: "control",
    audienceHref: "/who-we-serve/maritime-it-ot",
  },
  {
    id: "classification-survey",
    label: "Classification / survey",
    ledger: "ROLE · CLASS",
    headline: "Review a structured evidence trail — not a last-week document dump.",
    support:
      "Open the released sample package, then scrub how operators assemble scope, evidence, findings, and actions for review.",
    ctaHint: "Request a survey-prep demo",
    sampleRecordId: "PKG-0067",
    demoBeatId: "package",
    audienceHref: "/who-we-serve/classification-survey",
  },
];

/** Default homepage copy when no persona is chosen (and for QA). */
export const DEFAULT_HOME_COPY = {
  ledger: "MARITIME CYBER ASSURANCE",
  headline: "Maritime cyber assurance from requirement to readiness package.",
  support:
    "Inspect one sample record end to end — then scrub the product tour that follows the same chain.",
  ctaHint: "Request a demo",
  sampleRecordId: "REQ-0104",
  demoBeatId: "requirement",
} as const;

export function getPersona(id: string | null | undefined): Persona | undefined {
  if (!id) return undefined;
  return PERSONAS.find((persona) => persona.id === id);
}

export function isPersonaId(value: string | null | undefined): value is PersonaId {
  return Boolean(getPersona(value));
}
