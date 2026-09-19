# Release 2 — Business problem and differentiation section

Add one new homepage section explaining the commercial problem UnfoldHR.ai solves and the four capabilities it brings together. Nothing else on the site changes.

## Placement

Homepage order becomes:

```text
Hero (Release 1 — untouched)
Platform explainer
>> NEW: Business problem & differentiation
Work Design section
Agent families / Flagship / Explore agents
Engagement + contact (FinalCTA)
```

The new section sits directly after the platform explainer and before the rest of the homepage flow, which ends in the engagement/contact block.

## Content

Headline: "AI tools are advancing faster than HR operating models"

Supporting copy (two short paragraphs):
- The problem is no longer access to AI. It is deciding where AI belongs, what it should be allowed to do, which systems it must work with, and where human accountability cannot be delegated.
- UnfoldHR.ai brings together HR operations, HCM architecture, workflow design, controls, and applied AI to answer those questions.

Four capability statements, in a four-up grid:
- HR Operations — Understand how the work is actually performed across people, policies, handoffs, and exceptions.
- HCM Architecture — Define the systems, data, integrations, and deterministic rules required to support the workflow.
- Applied AI — Identify where contextual reasoning, synthesis, recommendation, and orchestration improve the outcome.
- Governance — Establish permissions, controls, auditability, escalation paths, and human accountability.

No call to action in this section. No statistics, claims, logos, or invented outcomes.

## Design

Reuses the existing explainer pattern exactly: same section padding and top border, same eyebrow / display headline treatment, same bordered card style, same reveal-on-scroll motion, same tokens. Cards go four across on desktop, two across on tablet, stacked on mobile. No new colors, gradients, icons, or imagery.

## Technical details

- New file: `src/components/landing/BusinessProblemSection.tsx`, modelled on `PlatformExplainer.tsx` (RevealDiv, `bg-card border border-border rounded-2xl`, `font-display` heading, muted body text), with a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` card grid.
- Edit: `src/pages/HomePage.tsx` — import and render the new component between `<PlatformExplainer />` and `<WorkDesignSection />`. No other lines change.
- Headings: `h2` for the section headline, `h3` for each capability label, keeping semantic order.

## Not touched

`PlatformHero.tsx` and Release 1 behavior, navigation, agents and agent logic, the 20-workflow library and its calculations, auth, logged-in behavior, Decision Support dashboard, integrations, pricing, contact form logic, routes, backend, schema.

## Verification

Typecheck plus the existing test suite; browser check at desktop, tablet, and mobile widths for wrapping, horizontal scroll, contrast, and console errors; confirm hero and the rest of the homepage are unchanged.
