import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI Provider & Data Classification Policy",
  "How CertaMaris selects AI providers, classifies customer data, applies human review, and budgets AI inference costs.",
  "/trust/ai-policy"
);

const classificationRows = [
  {
    level: "PUBLIC",
    allowed: "Yes",
    policy:
      "May be sent to an approved provider. No customer-confidential context may be appended.",
  },
  {
    level: "INTERNAL",
    allowed: "Yes",
    policy:
      "May be sent to AWS Bedrock or the approved Azure fallback after data minimization. Unnecessary names, identifiers, and tenant metadata are removed.",
  },
  {
    level: "CONFIDENTIAL",
    allowed: "Yes, conditionally",
    policy:
      "Permitted only through approved Bedrock / Azure enterprise routes with a DPA, approved subprocessors, region pinning, encryption, disabled prompt-body logging, no external web tools, and tenant-isolated retrieval.",
  },
  {
    level: "RESTRICTED",
    allowed: "Never",
    policy:
      "Must not leave CertaMaris-controlled processing. Use deterministic code, local processing, or manual handling. No automatic downgrade or provider fallback is permitted.",
  },
];

const workflowRows = [
  ["Public help, marketing, or framework explanations", "PUBLIC", "Required before publication"],
  ["Internal administrative summaries and support assistance", "INTERNAL", "Optional"],
  ["Framework and control mapping", "INTERNAL", "Required before modifying authoritative mappings"],
  ["Evidence summarization and structured extraction", "CONFIDENTIAL", "Required"],
  ["Gap and risk analysis", "CONFIDENTIAL", "Required"],
  ["Corrective-action recommendations", "CONFIDENTIAL", "Required"],
  ["Client report and executive-summary drafting", "CONFIDENTIAL", "Mandatory"],
  ["Cyber Resilience Twin narrative reasoning", "CONFIDENTIAL", "Mandatory"],
  ["Incident forensics or exploit analysis", "RESTRICTED; external provider disabled", "Mandatory / manual"],
  ["Secret, credential, or raw configuration analysis", "RESTRICTED; external provider disabled", "Mandatory / manual"],
] as const;

const budgetRows = [
  ["Core", "$10", "$25", "$3"],
  ["Assurance", "$25", "$60", "$5"],
  ["Enterprise", "$75", "$150", "$10"],
] as const;

const restrictedData = [
  "Credentials",
  "API keys",
  "Private keys",
  "Authentication material",
  "Raw security logs containing exploitable details",
  "Unredacted network diagrams",
  "Vulnerability exploit instructions",
  "Active incident-forensics evidence",
  "Legally privileged material",
  "Customer-designated crown-jewel information",
];

const humanReviewExceptions = [
  "Internal tagging and categorization",
  "Duplicate detection",
  "Search-result ranking",
  "Formatting and template normalization",
  "Non-authoritative metadata suggestions",
];

const settings = `PRIMARY_AI_PROVIDER = "AWS_BEDROCK"
FALLBACK_AI_PROVIDER = "AZURE_OPENAI"

OPENAI_DIRECT_ENABLED = false
ANTHROPIC_DIRECT_ENABLED = false
DEEPSEEK_ENABLED = false
XAI_ENABLED = false

PUBLIC_EXTERNAL_AI_ALLOWED = true
INTERNAL_EXTERNAL_AI_ALLOWED = true
CONFIDENTIAL_EXTERNAL_AI_ALLOWED = true

CONFIDENTIAL_REQUIRES_APPROVED_DPA = true
CONFIDENTIAL_REQUIRES_REGION_PINNING = true
CONFIDENTIAL_PROMPT_BODY_LOGGING_ENABLED = false
CONFIDENTIAL_EXTERNAL_WEB_TOOLS_ENABLED = false

RESTRICTED_EXTERNAL_AI_ALLOWED = false
RESTRICTED_PROVIDER = null

PUBLIC_CONTENT_MAX_CLASSIFICATION = "PUBLIC"
INTERNAL_ADMIN_MAX_CLASSIFICATION = "INTERNAL"
CONTROL_MAPPING_MAX_CLASSIFICATION = "INTERNAL"
EVIDENCE_SUMMARIZATION_MAX_CLASSIFICATION = "CONFIDENTIAL"
GAP_ANALYSIS_MAX_CLASSIFICATION = "CONFIDENTIAL"
CORRECTIVE_ACTION_MAX_CLASSIFICATION = "CONFIDENTIAL"
CLIENT_REPORT_MAX_CLASSIFICATION = "CONFIDENTIAL"
CYBER_TWIN_REASONING_MAX_CLASSIFICATION = "CONFIDENTIAL"
INCIDENT_FORENSICS_MAX_CLASSIFICATION = "RESTRICTED"

CLIENT_FACING_REQUIRES_HUMAN_REVIEW = true
AI_FALLBACK_FAILS_CLOSED_ON_CLASSIFICATION_MISMATCH = true

CORE_AI_SOFT_DAILY_USD = 10
CORE_AI_HARD_DAILY_USD = 25
CORE_AI_MAX_RUN_USD = 3

ASSURANCE_AI_SOFT_DAILY_USD = 25
ASSURANCE_AI_HARD_DAILY_USD = 60
ASSURANCE_AI_MAX_RUN_USD = 5

ENTERPRISE_AI_SOFT_DAILY_USD = 75
ENTERPRISE_AI_HARD_DAILY_USD = 150
ENTERPRISE_AI_MAX_RUN_USD = 10`;

export default function AiPolicyPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Trust · AI policy"
        title="AI provider and data classification policy."
        intro="CertaMaris routes AI-assisted work through approved enterprise providers, classifies every workload before external processing, and requires human review for anything that reaches a client."
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Trust Center", href: "/trust" },
            { label: "AI Policy" },
          ]}
        />

        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Provider decision</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">AWS Bedrock primary, Azure OpenAI fallback.</h2>
          <div className="space-y-4 text-[14.5px] text-structural leading-relaxed">
            <p>
              AWS Bedrock is the primary provider, initially with an Anthropic model available through Bedrock.
              AWS states that Bedrock does not use prompts or completions to train models, does not share them with
              model providers, encrypts data in transit and at rest, and supports private connectivity.
            </p>
            <p>
              Azure OpenAI is the fallback provider. Microsoft states that customer data is not used to retrain
              models, and Azure is covered by extensive enterprise compliance programs. Confidential-data routing
              is not enabled until the Azure tenant's abuse-monitoring, regional processing, and contractual
              settings have been reviewed and approved.
            </p>
            <p>
              Direct OpenAI, direct Anthropic, DeepSeek, and xAI adapters are disabled for production customer data
              at launch, avoiding multiplied subprocessors, retention policies, contractual reviews, and
              data-egress paths.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Data classification</Eyebrow>
          <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-4">
            Every workload has a classification ceiling.
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">
            External AI processing is permitted only up to the classification ceiling for the workflow, and only
            through the approved provider routes.
          </p>
        </Reveal>
        <Reveal>
          <div className="overflow-x-auto rounded-md border border-navy/10 bg-white">
            <table className="w-full min-w-[680px] border-collapse text-left text-[13.5px]">
              <caption className="sr-only">Data classification and external AI policy</caption>
              <thead>
                <tr className="border-b border-navy/10 bg-paper">
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Classification
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    External AI permitted?
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Policy
                  </th>
                </tr>
              </thead>
              <tbody>
                {classificationRows.map((row) => (
                  <tr key={row.level} className="border-b border-navy/8 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-navy align-top">
                      {row.level}
                    </th>
                    <td className="px-4 py-3 text-structural align-top">{row.allowed}</td>
                    <td className="px-4 py-3 text-structural align-top">{row.policy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section spacing="compact">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <Eyebrow>Restricted data</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-4">Never leaves CertaMaris-controlled processing.</h2>
            <p className="text-[14.5px] text-structural leading-relaxed mb-5">
              Restricted data is handled with deterministic code, local processing, or manual handling. No
              automatic downgrade or provider fallback is permitted.
            </p>
            <ul className="space-y-2.5">
              {restrictedData.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-structural">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="premium-card p-6">
              <Eyebrow>Workflow ceilings</Eyebrow>
              <h3 className="mb-4 text-[18px] font-semibold">Maximum classification by workflow.</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px] border-collapse text-left text-[12.5px]">
                  <caption className="sr-only">Workflow classification ceilings and human review</caption>
                  <thead>
                    <tr className="border-b border-navy/10">
                      <th scope="col" className="px-3 py-2 font-semibold text-navy">
                        Workflow
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-navy">
                        Max classification
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold text-navy">
                        Human review
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflowRows.map((row) => (
                      <tr key={row[0]} className="border-b border-navy/8 last:border-0">
                        <td className="px-3 py-2.5 text-navy align-top">{row[0]}</td>
                        <td className="px-3 py-2.5 text-structural align-top">{row[1]}</td>
                        <td className="px-3 py-2.5 text-structural align-top">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Human review</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">
            Every client-facing or compliance-influencing AI output is human-reviewed.
          </h2>
          <p className="text-[14.5px] text-structural leading-relaxed">
            Human review is required for every AI output that can reach a client or influence a client-visible
            finding, risk rating, corrective action, Cyber Resilience Twin score, or assurance report. The only
            exceptions are low-risk internal operations that do not create or modify compliance conclusions:
          </p>
        </Reveal>
        <Reveal>
          <ul className="grid gap-2 sm:grid-cols-2">
            {humanReviewExceptions.map((item) => (
              <li key={item} className="premium-card flex gap-2.5 p-4 text-[13.5px] leading-relaxed text-navy/85">
                <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Cost control</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">Daily AI budgets by tier.</h2>
          <p className="text-[14.5px] text-structural leading-relaxed">
            Soft limits disable retries, route eligible work to the lower-cost approved model, and notify
            CertaMaris operations. Hard limits block new AI runs for the organization until the next UTC billing
            day, permit only an explicitly authorized administrative override, estimate maximum cost before
            dispatch, and reject any run that could exceed its per-run cap.
          </p>
        </Reveal>
        <Reveal>
          <div className="overflow-x-auto rounded-md border border-navy/10 bg-white">
            <table className="w-full min-w-[520px] border-collapse text-left text-[13.5px]">
              <caption className="sr-only">Daily AI budget policy by tier</caption>
              <thead>
                <tr className="border-b border-navy/10 bg-paper">
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Tier
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Soft limit / day
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Hard limit / day
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Per-run cap
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgetRows.map((row) => (
                  <tr key={row[0]} className="border-b border-navy/8 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-navy align-top">
                      {row[0]}
                    </th>
                    <td className="px-4 py-3 text-structural align-top">${row[1]}</td>
                    <td className="px-4 py-3 text-structural align-top">${row[2]}</td>
                    <td className="px-4 py-3 text-structural align-top">${row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12.5px] text-structural leading-relaxed max-w-3xl">
            Cyber Resilience Twin reasoning receives structured control results, scores, normalized findings, and
            sanitized evidence summaries — not unrestricted access to every uploaded document.
          </p>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-6">
          <Eyebrow>Configuration reference</Eyebrow>
          <h2 className="text-[22px] leading-[1.16]">Policy control settings.</h2>
        </Reveal>
        <Reveal>
          <pre className="overflow-x-auto rounded-md border border-navy/10 bg-navy p-5 text-[12px] leading-relaxed text-white/85">
            {settings}
          </pre>
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
