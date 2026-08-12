# Before

Starting branch state:

- Branch base: `origin/main`
- Starting HEAD: `d194d32005c2617299857e077093c4fb4c2bbe74`
- Working tree contained pre-existing untracked `qa-artifacts/`, left untouched.
- Dashboard V2 product-proof migration was already present in source and verified by `npm run qa:product-proof`.

Observed issues addressed in this sprint:

1. Homepage H1 was accurate but overly long and literal for a premium first impression:
   `Continuous assurance across every company, fleet, vessel, control, evidence record, finding, and released report.`
2. The homepage hero CTA row could clip on narrow mobile after button styling was tightened because the hero copy grid item was allowed to grow beyond the viewport.
3. Product exhibit frames worked but the full-resolution link and caption rows were visually light for proof-bearing enterprise product UI.
4. Footer headings, legal standing line, copyright text, and link focus states were less legible than the rest of the system.
5. `/industries` used `border-line`, an undefined Tailwind utility, so the intended card border was not reliably represented by a real design token.

Preserved intentionally:

- Pixel Grid background.
- Liquid Glass surface language.
- Dashboard V2 product-proof asset system under `public/product/dashboard-v2/`.
- Regulatory boundary wording, including "does not certify", "does not guarantee", and "official texts control" discipline.
- Current route architecture and information architecture.

