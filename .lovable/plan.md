# Release 4 — Agentic HR Workflow Redesign Sprint

Add one new homepage section presenting the sprint as the primary commercial offer, placed immediately before the existing engagement/contact block. No other section changes.

## Proposed file list

1. `src/components/landing/SprintOfferSection.tsx` — new section component (only new file).
2. `src/pages/HomePage.tsx` — one import line, one render line inserted between `ExploreAgentsByType` and `FinalCTA`.

Nothing else is touched.

## Section content

- Eyebrow: Work With UnfoldHR
- Headline: Agentic HR Workflow Redesign Sprint
- Opening: Redesign one high-value HR workflow in ten business days.
- Description: the stakeholder/target-model paragraph as supplied.
- "What you receive" — the nine deliverables as a scannable list.
- "Founding-client engagement" — the $7,500 first-three-organizations terms, stated as supplied, no discount framing, no future price range.
- Single CTA: "Book a Confidential Introduction", scrolling to the existing `final-cta` block using the same `scrollIntoView` pattern as the hero's secondary button. No secondary CTA.

Advisory framing only: analysis, facilitation, recommendations, architecture requirements, controls, pilot roadmap. No promise of software, agents, integrations, compliance, savings, or ROI.

## Layout

Two-column on desktop within the existing `max-w-6xl` section shell: left column holds eyebrow, headline, opening, description and CTA; right column holds the deliverables list and, beneath it, a bordered founding-client panel. Stacks to one column on tablet and mobile. Reuses existing tokens, `RevealDiv` motion, `bg-card border border-border rounded-2xl` cards, `font-display` headings, and existing button styles. No gradients, new colors, imagery, or new icon system. Price sized as normal emphasized body text, not a pricing headline.

## Verification

Confirm placement immediately before FinalCTA and that no existing section moved; CTA scrolls to `final-cta`; no secondary CTA or dead link; price exactly $7,500 and duration exactly ten business days; Releases 1–3 files unchanged. Check desktop, tablet and mobile for wrapping, clipping and horizontal scroll, plus heading order, focus states and console errors. Run typecheck, build, and the existing test suite, then report every modified file.
