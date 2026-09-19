# Release 6 — Engagement model alignment

## What I found first

- There is currently **no engagement-model section visible on the homepage**. An old component `EngagementModels.tsx` exists in the project but is not rendered on any page — its content is outdated ("Start Free", "Upgrade to Deploy Real Agents", "Get Expert Help", plus pricing and gallery buttons).
- The homepage today runs: hero → explainer → the gap → the UnfoldHR Method → agent families → flagship agent → explore agents → Sprint Offer → application form (`final-cta`) → footer.
- The Release 5 application form lives in `FinalCTA.tsx`; the engagement content is a **separate file**, so the form stays completely untouched.
- Existing buttons scroll to the form with `document.getElementById("final-cta")?.scrollIntoView(...)` and open the library with `setPage("workflows")`. Both patterns are reused as-is.

So this release rewrites that one existing component and puts it on the page — it does not create a second engagement section.

## The section

Eyebrow "Engagement Models", headline "Three ways to work with UnfoldHR", supporting line: "Start by exploring the work, redesign one material workflow, or move an approved operating model toward a governed pilot."

Three cards in this exact order, stacking on tablet and mobile:

1. **Explore** — "Explore HR Work Reimagined". Button "Explore Workflows" opens the existing Workflows library through the current page navigation.
2. **Redesign** — "Agentic HR Workflow Redesign Sprint". Button "Book a Confidential Introduction" scrolls to the existing application form. Given restrained visual priority through the existing border/emphasis styles only — no badges, no "Most Popular", no new colours or gradients. No price shown here; the $7,500 stays in the Sprint Offer section.
3. **Implement** — "Pilot and Implementation Advisory". Button "Discuss an Implementation" scrolls to the same form. No price, and advisory scope only: pilot scoping, architecture, stakeholder alignment, vendor coordination, evaluation design, controls and governance, adoption. No promise of custom software, deployment, integrations, compliance, savings, timelines, or legal advice.

Neither button changes anything the visitor has already typed into the form or the option they selected — they only scroll.

## Placement

Directly after the "Explore agents by type" block and before the Sprint Offer section, so the three stages frame the page and the Sprint detail follows immediately. No existing section moves or changes.

## Files

- `src/components/landing/EngagementModels.tsx` — rewritten: new eyebrow/headline/copy, three stage cards, `setPage("workflows")` for Explore, `final-cta` scroll for the two commercial CTAs, existing card/typography/spacing/motion tokens kept, `setPage` accepted as a prop instead of the current manual history push. Icons come from the same existing icon set but the outdated ones are replaced — nothing implying "free", upgrading, software deployment or pricing. Explore gets a map/compass-style mark, Redesign a drafting/redesign mark, Implement a governed-rollout mark; all three are decorative and hidden from screen readers.
- `src/pages/HomePage.tsx` — one import and one render line.

Nothing else: no route, modal, calendar, second form, backend, schema, pricing, navigation, agent, workflow-library, or Decision Support change.

## Verification

Only one engagement section on the page; stage order Explore → Redesign → Implement; Explore opens the library; both commercial buttons land on the application form without altering its values; no price or unsupported promise in the section; Releases 1–5 unchanged; logged-out and logged-in; desktop, tablet and mobile; heading order, contrast, keyboard and focus, wrapping, no sideways scrolling; console clean; typecheck, build and the test suite run.
