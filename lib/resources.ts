export type Article = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  publishedLabel: string;
  body: string[];
};

export type ArticleSection = {
  heading: string;
  paragraph: string;
};

export type RelatedResourceLink = {
  title: string;
  href: string;
};

export const RESOURCE_PUBLISHED_DATE = "2026-07-25";
export const RESOURCE_PUBLISHED_LABEL = "July 25, 2026";

const baseArticles: Omit<Article, "publishedDate" | "publishedLabel">[] = [
  {
    slug: "imo-msc-428-98-explained",
    title: "IMO Resolution MSC.428(98): what it actually requires",
    topic: "Regulatory intelligence",
    readTime: "6 min read",
    excerpt:
      "MSC.428(98) does not create a standalone cyber code. It treats cyber risk as a category of risk the SMS must address under the ISM Code.",
    body: [
      "IMO Resolution MSC.428(98), adopted in 2017, encourages administrations to ensure cyber risks are appropriately addressed in existing safety management systems. It does not introduce a new, separate certification regime. Instead, it treats cyber risk as a category of operational risk that an SMS is already required to manage under the ISM Code.",
      "In practice, this means cyber risk management needs to show up in the same places your SMS already documents risk: hazard identification, risk assessment, procedures, training, and internal audit. An operator without a distinct 'cyber plan' isn't automatically non-compliant — but an SMS that never mentions cyber risk at all is difficult to defend during an audit.",
      "The practical challenge is less about understanding the resolution's intent and more about evidencing it consistently across a fleet. Where does cyber risk assessment live in your SMS? Which procedures address it? What evidence would you show an auditor that cyber risk is actually being managed, not just mentioned?",
      "This is where a lot of operators struggle — not with interpreting the resolution, but with maintaining a consistent, traceable answer to those questions across every vessel and every audit cycle. That traceability, not the regulatory text itself, is usually the actual gap.",
    ],
  },
  {
    slug: "iacs-ur-e26-e27-overview",
    title: "IACS UR E26 and E27: the design-stage cyber resilience requirements",
    topic: "Regulatory intelligence",
    readTime: "7 min read",
    excerpt:
      "UR E26 addresses cyber resilience of the ship as a whole; UR E27 addresses systems and equipment on board. The split changes who owns which controls and evidence.",
    body: [
      "IACS Unified Requirements E26 (Cyber Resilience of Ships) and E27 (Cyber Resilience of On-board Systems and Equipment) apply from new construction contracts signed after their effective date, targeting cyber resilience at the design and build stage rather than retrofitting it onto an operating vessel.",
      "UR E26 sets requirements at the ship level: computer-based system identification, network segmentation, access control, and the overall cyber resilience of the vessel as an integrated system. UR E27 sets requirements at the equipment level — the resilience properties individual on-board computer-based systems and equipment need to meet before they're integrated into that ship-level architecture.",
      "The two work together: E27 defines what a compliant piece of equipment looks like, and E26 defines how those compliant pieces are supposed to function together as a resilient vessel. A shipyard, OEM, and classification society all have distinct roles in demonstrating that chain.",
      "For an operator managing an existing or growing fleet, the practical task is keeping the control mapping between these requirements and your actual on-board systems current — particularly as new-build tonnage enters the fleet alongside older vessels that were never designed against E26/E27 in the first place.",
    ],
  },
  {
    slug: "evidence-sufficiency-cyber-compliance",
    title: "What makes cyber-compliance evidence 'sufficient'?",
    topic: "Evidence & findings",
    readTime: "5 min read",
    excerpt:
      "A submitted document isn't automatically evidence of compliance. Sufficiency depends on relevance, reliability, completeness, and who's actually reviewed it.",
    body: [
      "It's tempting to treat evidence collection as a checklist exercise: request the document, receive the document, mark it done. But a policy document that was never actually implemented, or a procedure that's three revisions out of date, isn't sufficient evidence of anything — it's just a file.",
      "Sufficiency has a few concrete components: relevance (does this artifact actually address the requirement it's attached to), reliability (is the source credible and current), completeness (does it cover the full scope of what's being claimed), and reviewer judgment (has someone with the authority to say so actually confirmed it holds up).",
      "The failure mode we see most often isn't missing evidence — it's evidence that was collected once, never revisited, and quietly went stale while still being treated as current. A procedure reviewed eighteen months ago against a system that's since been reconfigured isn't evidence anymore; it's a historical record.",
      "Building sufficiency into the evidence workflow itself — expiration windows, version tracking, explicit reviewer sign-off — turns this from an audit-week fire drill into something that's simply true on any given day.",
    ],
  },
  {
    slug: "corrective-action-verification",
    title: "Why 'closed' shouldn't mean 'the owner said so'",
    topic: "Evidence & findings",
    readTime: "4 min read",
    excerpt:
      "A corrective action closed only by the action owner is not independently verified. Reviewers need a separate verification decision and supporting evidence.",
    body: [
      "It's common, and understandable, for a corrective action to get marked closed the moment the responsible party says the fix is in place. It's also one of the more common weak points an auditor will pull on, because self-attested closure isn't independent verification.",
      "Independent verification means someone other than the action owner reviews evidence that the fix was actually implemented and actually addresses the finding — not just that work happened, but that the work closes the specific gap that was identified.",
      "This doesn't need to be bureaucratic. It needs a clear separation between 'the owner says it's done' and 'a reviewer confirmed it's done,' with evidence attached to the second step, not just the first.",
      "Fleets that build this separation into their workflow from the start find it far less disruptive than fleets that try to retrofit it after an auditor asks who verified a closure and the honest answer is 'no one, yet.'",
    ],
  },
  {
    slug: "fleet-scale-cyber-governance",
    title: "Cyber governance at fleet scale: what changes past the first few vessels",
    topic: "Fleet operations",
    readTime: "6 min read",
    excerpt:
      "Processes that work for three vessels often break between ten and thirty: ownership, evidence freshness, and review packages diverge by vessel and manager.",
    body: [
      "A shared drive and a diligent DPA can genuinely work for a small fleet. The friction shows up as the fleet grows: a requirement change now means checking dozens of vessel folders instead of three, and 'who has the current version of this procedure' stops having an obvious answer.",
      "The first thing that typically breaks is version control — not because anyone is careless, but because there's no single source of truth once a document has been emailed, downloaded, and edited independently on more than a handful of vessels.",
      "The second is accountability drift. When ownership of a finding or corrective action isn't explicitly assigned and tracked, it defaults to whoever last touched it, which tends to be inconsistent and hard to reconstruct after the fact.",
      "The fix isn't more process for its own sake — it's making the fleet-level structure explicit before growth forces the issue: one system of record, explicit ownership per finding, and a control-mapping layer that scales without a manual re-check every time a requirement changes.",
    ],
  },
  {
    slug: "reading-a-cyber-risk-register",
    title: "How to read a cyber risk register (and what's usually missing from one)",
    topic: "Risk & governance",
    readTime: "5 min read",
    excerpt:
      "A risk register that lists risks without decisions, owners, and review dates isn't a governance tool — it's a list.",
    body: [
      "A well-formed cyber risk register does more than enumerate risks. For each entry, it should be possible to answer: what treatment was chosen (accept, treat, transfer, or defer), who had the authority to make that decision, what the rationale was, and when it's due for review.",
      "The most common gap is treatment without ownership — a risk marked 'accepted' with no record of who accepted it or why. That's not a governance decision; it's a placeholder that will be hard to defend if the risk materializes.",
      "The second most common gap is a register that's accurate on the day it was created and never revisited. Residual risk changes as systems, vendors, and threats change; a register that isn't tied to a recurring review cadence quietly goes stale the same way evidence does.",
      "A useful register connects each entry back to the finding or assessment that raised it and forward to the corrective action or compensating control that addresses it — so the register reads as a decision trail, not a static list.",
    ],
  },
];

const articleHeadings: Record<string, string[]> = {
  "imo-msc-428-98-explained": [
    "What the resolution changes",
    "Where it shows up in the SMS",
    "The evidence problem",
    "Traceability is the operational gap",
  ],
  "iacs-ur-e26-e27-overview": [
    "Design-stage scope",
    "Ship-level and equipment-level obligations",
    "How E26 and E27 work together",
    "What operators need to maintain",
  ],
  "evidence-sufficiency-cyber-compliance": [
    "Evidence is not the same as a file",
    "The sufficiency test",
    "Where evidence goes stale",
    "Build sufficiency into the workflow",
  ],
  "corrective-action-verification": [
    "Closure needs independence",
    "What verification means",
    "Separate owner action from reviewer judgment",
    "Make verification routine",
  ],
  "fleet-scale-cyber-governance": [
    "Small-fleet habits do not scale",
    "Version control breaks first",
    "Accountability drift follows",
    "Make the fleet structure explicit",
  ],
  "reading-a-cyber-risk-register": [
    "A register should record decisions",
    "Accepted risk needs ownership",
    "Review cadence matters",
    "Connect the decision trail",
  ],
};

const relatedLinks: Record<string, RelatedResourceLink[]> = {
  "imo-msc-428-98-explained": [
    { title: "IACS UR E26 and E27 overview", href: "/resources/iacs-ur-e26-e27-overview" },
    { title: "Evidence sufficiency in cyber compliance", href: "/resources/evidence-sufficiency-cyber-compliance" },
    { title: "Compliance overview", href: "/compliance" },
  ],
  "iacs-ur-e26-e27-overview": [
    { title: "IMO MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
    { title: "Fleet-scale cyber governance", href: "/resources/fleet-scale-cyber-governance" },
    { title: "Platform traceability", href: "/platform" },
  ],
  "evidence-sufficiency-cyber-compliance": [
    { title: "Corrective action verification", href: "/resources/corrective-action-verification" },
    { title: "Reading a cyber risk register", href: "/resources/reading-a-cyber-risk-register" },
    { title: "Platform evidence workflow", href: "/platform" },
  ],
  "corrective-action-verification": [
    { title: "Evidence sufficiency in cyber compliance", href: "/resources/evidence-sufficiency-cyber-compliance" },
    { title: "Reading a cyber risk register", href: "/resources/reading-a-cyber-risk-register" },
    { title: "Compliance overview", href: "/compliance" },
  ],
  "fleet-scale-cyber-governance": [
    { title: "IACS UR E26 and E27 overview", href: "/resources/iacs-ur-e26-e27-overview" },
    { title: "Reading a cyber risk register", href: "/resources/reading-a-cyber-risk-register" },
    { title: "Platform overview", href: "/platform" },
  ],
  "reading-a-cyber-risk-register": [
    { title: "Fleet-scale cyber governance", href: "/resources/fleet-scale-cyber-governance" },
    { title: "Corrective action verification", href: "/resources/corrective-action-verification" },
    { title: "Compliance overview", href: "/compliance" },
  ],
};

export const articles: Article[] = baseArticles.map((article) => ({
  ...article,
  publishedDate: RESOURCE_PUBLISHED_DATE,
  publishedLabel: RESOURCE_PUBLISHED_LABEL,
}));

export function getArticleSections(article: Article): ArticleSection[] {
  const headings = articleHeadings[article.slug] ?? [];
  return article.body.map((paragraph, index) => ({
    heading: headings[index] ?? `Section ${index + 1}`,
    paragraph,
  }));
}

export function getRelatedResourceLinks(article: Article): RelatedResourceLink[] {
  return relatedLinks[article.slug] ?? [{ title: "Resources", href: "/resources" }];
}
