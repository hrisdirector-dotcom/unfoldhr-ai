## Goal
Make the new Global Lifecycle Agent page reachable from the existing homepage Agents Showcase, without adding a top-level nav item.

## Changes

### 1. `src/components/landing/AgentsShowcase.tsx`
Add a new featured card at the top of `SHOWCASE_AGENTS`:

- icon: `🌐`
- name: `Global Lifecycle Agent`
- subtitle (new optional field `subtitle`): `BambooHR Edition`
- outcome / descriptor: `Workforce Event Control & Readiness`
- benefit: `Catch payroll, PTO, and policy conflicts before they ship`
- tag: `Featured`
- pageId: `global-lifecycle-agent`

Small UI tweak: render `subtitle` (when present) under the title in a smaller muted line so the BambooHR Edition label is visible without changing the card layout for other agents. Existing `handleCardClick` already routes via `pageId` to `setPage("global-lifecycle-agent")`, which `Index.tsx` already wires to `GlobalLifecycleAgentPage`. No routing changes needed.

### 2. Verify Phase 2 scenario-state is on `GlobalLifecycleAgentPage.tsx`
Read the file and confirm the six scenarios + readiness checks / gates / prepared actions / operating trail blocks are present. If anything from Phase 2 is missing, note it and re-apply the missing pieces — but do not rebuild the page structure.

## Out of scope
- No top-level nav entry.
- No new card in `src/data/agents.ts` / `AgentsPage` gallery (homepage showcase is the requested surface).
- No design-system changes.

## Deliverable
After build: one featured "Global Lifecycle Agent — BambooHR Edition" card on the homepage Agents Showcase that navigates straight to the rebuilt page, plus a one-line confirmation of Phase 2 state in the page file.
