# Content voice guide — CertaMaris marketing site

Operator-grade maritime compliance copy. Use this when editing resources, compliance, FAQ, and related product-facing text.

**Scope:** `lib/resources.ts`, compliance explainers, FAQ items, and similar plain-language regulatory content.  
**Not scope:** legal contracts, formal policies, or inventing certifications.

---

## Voice

| Prefer | Avoid |
|---|---|
| Direct, operational, audit-aware | Conversational openers (“Here’s…”, “It’s tempting…”) |
| Precise scope and dates where known | Vague “everyone must…” claims |
| Checklists and decision tests | Meta commentary about “not marketing copy” |
| Clear boundaries of product vs regulation | Guarantees of audit pass, class approval, or legal compliance |
| Distinct tones by instrument (SMS vs design/class) | One generic “cyber compliance” mush |

**Register:** professional maritime operations — DPAs, technical managers, cyber/IT-OT, class-aware owners. Not academic, not hype.

---

## Regulatory precision (match `/compliance`)

When stating IMO / IACS facts, align with the compliance page and official sources:

| Instrument | Facts we may state (plain language) |
|---|---|
| **MSC.428(98)** | Encourages administrations to ensure cyber risks are appropriately addressed in existing SMS. Timeline: no later than the first annual verification of the company’s Document of Compliance after **1 January 2021**. Does **not** create a standalone cyber certification scheme. Treats cyber risk as a category of risk under the **ISM Code** SMS. |
| **IACS UR E26** | Cyber Resilience of **Ships** (ship-level): CBS identification, network segmentation, access control, overall ship cyber resilience. Applies from **new construction contracts signed on or after 1 July 2024**. |
| **IACS UR E27** | Cyber Resilience of **On-board Systems and Equipment** (equipment/system-level). Works with E26: E27 ≈ resilient equipment; E26 ≈ resilient vessel built from it. |

**Always:**

- Prefer “encourages administrations…” over “requires every ship to…” for MSC.428(98).
- Prefer contract-date scope for E26/E27; do not imply fleet-wide retrofit on a single date.
- Point readers to **official text controls** when summaries and instruments differ.
- Leave **applicability** to humans (company, flag, class, contract).

**Never invent:** pass guarantees, legal conclusions, unstated effective dates, regional data-residency promises, or claims that software replaces SMS, DOC, class, or flag.

---

## Article structure (resources)

Long regulatory explainers (IMO, IACS) should generally include:

1. **Scope and dates** — accurate, conservative.
2. **Operational meaning** — where work shows up (SMS vs design/build/class).
3. **Checklist** — ≥6 operator actions as separate short sections or numbered checklist paragraphs.
4. **What this is not** — not legal advice; not a full restatement; not a guarantee.
5. **Official text controls** — official instruments + flag/class as applicable.

Shorter practice articles (evidence, CA verification) may be checklist-grade and shorter; still include a concrete test or numbered checklist.

Headings in `articleHeadings` must stay **1:1** with `body` paragraphs.

---

## Phrase ban list

Do not use (or close paraphrases of):

- “Here’s…”
- “It’s tempting…”
- “simply true”
- “genuinely work”
- Meta disclaimers that the piece is “not marketing copy”
- Soft filler: “understandable that…”, “in practice we all…”

Rewrite into factual operational statements.

---

## Product boundaries (honest)

| Claim | Allowed framing |
|---|---|
| SMS | Structures cyber assurance work; **does not replace** SMS software or ISM DOC process |
| Applicability | Humans decide; platform maps and records once scope is set |
| Audit/survey | Supports readiness packages; **does not** determine pass/fail or replace class/flag |
| Hosting | Cloud hosting configured per production; no invented region without confirmed SoT |
| Evidence | Sufficiency is relevance, reliability, completeness, reviewer judgment — not file arrival |

---

## Distinct tones

- **MSC.428(98):** SMS / ISM / DOC / DPA / internal audit voice.
- **E26/E27:** design-stage / contract date / shipyard / OEM / class / mixed-fleet evidence voice.
- **Evidence & CA:** checklist and workflow discipline; no regulatory overclaim.
- **FAQ:** short, absolute on product limits; no legal advice.

---

## Checklist before publish

- [ ] Dates/scope match `/compliance` and are not overstated  
- [ ] No banned openers or meta marketing disclaimers  
- [ ] Checklist present where required (≥6 for major regulatory articles)  
- [ ] “What this is not” + official-text control on major regulatory articles  
- [ ] FAQ/product lines do not invent certifications, residency, or pass guarantees  
- [ ] TypeScript: `body.length` matches `articleHeadings[slug].length`  
- [ ] Resources index intro is professional (no defensive meta)

---

*Last updated: 2026-07-30 — content editor pass on resources + FAQ.*
