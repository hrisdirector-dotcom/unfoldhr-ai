# Release 3 — UnfoldHR work redesign methodology

Update the existing Work Design section on the homepage so it presents the four-lens method. No new section, no change to position or to the workflow library.

## Files to change

- `src/components/landing/WorkDesignSection.tsx` — the only file modified.

No new components, no data changes, no route changes.

## What the section becomes

Eyebrow: The UnfoldHR Method

Headline: "Do not automate the process. Redesign the work." (keeps the existing two-line display/italic accent treatment)

Supporting copy: "Every workflow is examined through four lenses to determine how the work should operate before technology is selected or deployed."

Four lenses, in this order, each with the existing library badge (letter + label) above a one-line explanation:

1. Eliminate — Remove work, approvals, handoffs, and reporting that no longer create value.
2. AI — Use AI where interpretation, synthesis, recommendation, or contextual reasoning improves the outcome.
3. Deterministic — Use policies, business rules, calculations, validations, and systems when the result must be consistent.
4. Human — Preserve human judgment where accountability, empathy, material risk, or consequential decisions require it.

Closing principle, set apart but restrained: "AI reasons. Rules determine. Systems transact. Humans judge."

CTA: "Explore the Workflow Library", opening the existing library exactly as today.

## What is removed from this section

The current statistics panel (workflows modelled / domains / activities eliminated / already live as agents) and the "counts are calculated" note come out, along with the sentence that recites those totals. The brief asks for no counts on this section, and the four lenses take that space. Those figures remain available inside the workflow library itself, unchanged.

## Technical details

- Keeps `ClassificationBadge` and the `CLASSIFICATION_MAP` labels/colors from `@/data/workflows` — no second classification system, no new colors. `eliminate`, `agent` (displayed as AI), `deterministic`, `human` are rendered in the required sequence rather than the array's storage order.
- Drops the `WORKFLOWS`, `DOMAINS`, `computeCounts`, and `CLASSIFICATIONS` imports so the homepage no longer pulls the dataset for static copy.
- Keeps the section wrapper, `bg-paper-2`, top/bottom borders, padding, `RevealDiv` motion, typography, and the `setPage("workflows")` button styling.
- Lenses render as a four-up grid on desktop collapsing to two-up on tablet and single column on mobile; `h2` for the headline, `h3` for each lens name.

## Verification

Typecheck and the existing test suite; browser pass at desktop, tablet, and mobile for wrapping, horizontal scroll, contrast, focus states, and console errors; confirm the section still sits between the business-problem block and the agent families, that the CTA opens the library, and that Releases 1 and 2 are untouched.
