# Release 7 — Leave workflow as the representative sprint sample

## Inspection findings

1. **Leave identifier:** `leave-of-absence` (workflow 08, "Leave of Absence — Request to Return", domain HR Service Delivery). It is also already the library's flagship (`FLAGSHIP_WORKFLOW_ID`). Exactly one Leave record exists, in `src/data/workflows/hrServiceDelivery.ts`.
2. **Its data already contains:** outcome, description, current-state summary and steps, future-state steps with Eliminate/AI/Deterministic/Human classifications and control levels, control gates, "what AI should not do", systems and architecture, metrics, related agents, sources. All counts are computed from those steps.
3. **Renderer:** one shared component `src/components/workflows/WorkflowDetail.tsx` used by all 20 workflows.
4. **Navigation to a detail:** the Workflows page holds the selected workflow in its own state and swaps in the detail view; nothing is routed separately.
5. **Current detail order:** hero (outcome + score strip) → current vs redesign → work allocation map → boundaries → architecture → measurement → related agents → provenance → footer. There is **no pilot or implementation guidance** anywhere in the data or the page.
6. **Returning home:** the detail hero has a "Home" button using the existing page navigation. There is **no existing mechanism that navigates to the homepage and then scrolls to a section** — page changes always jump to the top.

## What this release adds

**On the Leave detail page only** (everything conditional on the `leave-of-absence` id — the other 19 pages render exactly as today):

- A restrained framing block directly under the existing hero, inside the same dark header, not a second hero:
  - Eyebrow "Sample Workflow Redesign"
  - Heading "What a Leave Workflow Redesign Sprint Produces"
  - "This is a representative UnfoldHR.ai example. It is not a customer case study and does not contain customer or employee data." — styled as quiet information, not a warning.
  - "This example shows how one HR workflow can be examined across current-state friction, work elimination, AI reasoning, deterministic execution, human judgment, controls, architecture, and measurable outcomes."
  - A compact "What this example covers" list naming only sections that actually exist on the page: Workflow objective, Current-state friction, Work allocation, Human judgment boundaries, Controls, Systems and architecture, Measures. No "Pilot considerations" label, because no pilot content exists.
- A short closing note near the end of the page: pilot scope, baseline measures, system access, controls, evaluation criteria and rollout decisions are defined during a client sprint. No phases, dates, durations, staffing or promised outcomes.
- A "Bring Us Your Workflow" button beside it (see limitation below).

No Leave content is duplicated, restated or hard-coded — every substantive element stays driven by the existing data and its calculated counts.

**On the homepage Sprint Offer section:** a secondary button "See a Sample Workflow Redesign" next to the unchanged primary "Book a Confidential Introduction". It opens the existing Leave detail page through the library's own selection mechanism — no new route, no duplicate record, no modal.

## The one limitation to note

There is no existing safe way to land on the homepage and scroll to the application form in one step. Rather than invent timing-based navigation, "Bring Us Your Workflow" will open the existing **Contact page**, which is the site's established contact destination and already uses the same saved submission path. The homepage form, its anchor and all existing buttons stay exactly as they are.

## Technical notes

- `src/pages/Index.tsx`: add an optional pending-workflow value set by a new `navigateToWorkflow(id)` callback, mirroring the existing `navigateToAgent` pattern; pass it into the Workflows page and clear it on navigation away.
- `src/pages/WorkflowsPage.tsx`: accept an optional initial workflow id and seed the existing `selected` state from it. No change to filtering, sorting or the catalog.
- `src/components/workflows/WorkflowDetail.tsx`: add `isSample = workflow.id === "leave-of-absence"` and render the framing block, closing note and button only when true; accept an optional `onContact` callback.
- `src/components/landing/SprintOfferSection.tsx`: add the secondary button; accept the workflow-open callback.
- `src/pages/HomePage.tsx`: pass the callback through.

No data, calculations, classifications, controls, architecture, metrics, agent mappings, routes, auth, pricing, backend or Release 1–6 content changes.

## Verification

Leave is the only workflow labelled as the sample; one Leave record only; disclosure clearly states it is not a customer case study; all substance comes from existing data with counts still matching the modelled steps; map, gates, architecture, measures and related-agent links still work; the other 19 detail pages unchanged; the homepage button opens the Leave page; the primary Sprint button still reaches the form; logged-out and logged-in; desktop, tablet, mobile; heading order, contrast, keyboard, focus, wrapping, no sideways scrolling; console clean; typecheck, build and test suite run; final report of every file changed.
