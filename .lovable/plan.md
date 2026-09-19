# Release 1 — Homepage hero repositioning

Update only the homepage hero to the new commercial positioning. No redesign, no new routes, no changes to agents, auth, dashboards, workflows data, pricing, or contact logic.

## New hero content

- Eyebrow: Agentic HR Work Design
- Headline: Redesign HR work before you automate it
- Supporting copy: UnfoldHR.ai helps HR leaders determine what work should be eliminated, where AI should reason, where rules should determine, where systems should transact, and where humans must retain judgment. Move from scattered AI experiments to a governed, implementation-ready HR operating model.
- Primary button: Explore HR Work Reimagined
- Secondary button: Book a Workflow Redesign Sprint

## Button behavior

- Primary opens the existing Workflows library through the current page-state navigation (`setPage("workflows")`). No duplicate route is created.
- Secondary scrolls to the existing engagement/contact block already on the homepage (the closing call-to-action section with the request form anchor). It is a real destination, not a dead link.

## Design

Keeps the existing dark hero, current typography, colors, spacing, motion, and button styles. The italic accent line, eyebrow styling, and layout rhythm stay as they are. No new palette, gradients, imagery, or pricing in the hero. Supporting copy stays two short lines so the hero remains compact on mobile; buttons keep current focus and contrast behavior.

## File to modify

- `src/components/landing/PlatformHero.tsx` — replace eyebrow, headline, supporting paragraph, and the two button labels/actions. Primary switches from the flagship agent to `setPage("workflows")`; secondary switches from scrolling to `agent-families` to scrolling to `final-cta`.

No other files change.

## Verification

- Primary button lands on the Workflows library page.
- Secondary button scrolls to the engagement section.
- Homepage checked logged out and logged in.
- Desktop, tablet, and mobile layouts checked for wrapping and horizontal scroll.
- Browser console checked for errors.
- Final report lists every modified file and the exact change.
