
# Global Lifecycle Agent — Papaya Parity Refactor

The current `GlobalLifecycleAgentPage` already has the 3-stage scaffold (queue → launch → running → results) and rich scenario data (Amelia / Priya / Devon). The interaction quality gap vs. the `Papaya Lifecycle Agent` project is what we are closing. This is a single-file refactor of `src/pages/GlobalLifecycleAgentPage.tsx` plus one new component, with UnfoldHRAI branding (Gloock + Instrument Sans, slate / electric blue, no Papaya orange/papaya gradient) preserved throughout.

## Papaya files used as reference

- `src/routes/index.tsx` — top-level AnimatePresence transition between picker and view
- `src/components/agent/ScenarioPicker.tsx` — queue layout: grouped by lifecycle type, hover-glow event cards, "What lifecycle event requires action?" prompt, situation bullets
- `src/components/agent/ScenarioView.tsx` — `LifecycleEventHeader` two-column launch panel (event details + "Agent ready" / Run CTA side rail), sticky case header, sectioned result panels (ExecutionReadiness with overall %, PreparedActionsBySystem grouped by domain, audit timeline)
- `src/components/agent/ExecutionOverlay.tsx` — modal run overlay: backdrop blur, sequential steps (spinner → check), bottom progress bar, completion → scroll to outcome
- `src/lib/scenarios.ts` — sequencing of `EXECUTION_STEPS` and per-scenario `audit` trail shape

We borrow the **interaction patterns and structural composition**, not visual styling.

## Changes

### 1. Queue stage — make it feel like an active work queue
- Group the three events into **"New Hire Onboarding"** and **"Employee Offboarding"** sections (Papaya `groups` pattern), each with a small section label and icon (`UserPlus` / `UserMinus`).
- Rebuild `QueueCard`:
  - Stronger hover state (border + subtle blue radial glow, lift), focus-ring for a11y
  - Header row: avatar tile (initials in a rounded square with ring) + name/title; right side shows a small mono "source" pill ("via BambooHR")
  - Body: 3 situation bullets (derive from `evaluation_focus` / `contextNote`)
  - Footer: **status urgency pill** mapped from `summary.status` (Ready to Review / Approval Blocked / Escalated) with appropriate semantic color, plus "Open event →" affordance
- Add framer-motion fade/stagger on the groups (already in `package.json` as `framer-motion`).
- Above the queue, add the small operational meta strip ("Synthetic workforce only · No real PII · Simulated integrations · Human-in-the-loop") that Papaya uses to set tone.

### 2. Launch stage — feel like opening a case
- Replace stacked cards with one **two-column launch panel** modeled on Papaya `LifecycleEventHeader`:
  - Left (1.4fr): Section index "01 · Lifecycle Event · New Hire / Termination", large employee name, meta row (title · department · location · manager · event date), then a 2-col grid of situation bullets driven by `evaluation_focus`.
  - Right (1fr, separated by border): "Agent ready" label, one-paragraph prep sentence personalized to the event ("I'll evaluate this {event} against policy, payroll, approvals…"), and the **primary Run CTA** as a gradient button (UnfoldHRAI electric blue gradient — no orange).
- Below the panel, a single **"Why this event is flagged"** callout card (uses `summary.reason` / `contextNote`) — concise, one block, not a stack.
- Below that, a compact **"What the agent will evaluate"** chip/list grid (`evaluation_focus`), styled as muted bordered chips, not a full card.
- Sticky breadcrumb header stays; add a small mono case ID ("CASE · HIRE-READY-2026") for operational weight.

### 3. Run stage — the emotional center
- New component `src/components/agent/LifecycleRunOverlay.tsx` (UnfoldHRAI-branded port of Papaya `ExecutionOverlay`):
  - Full-screen fixed overlay, `bg-slate/85` + `backdrop-blur-xl`, soft electric-blue radial glow
  - Centered card with brand mark + "executing" live-dot in header
  - Stepped list — each item shows spinner when active, animated check when done, dimmed dot when pending; active item is highlighted
  - Bottom progress bar tied to `(active+1)/total`
  - Steps tailored by event type (6 steps, ~700ms each → ~4.2s total, matching Papaya's pacing):
    - "Receiving lifecycle event from BambooHR"
    - "Reviewing employee & employment record"
    - "Evaluating policy, PTO, and payroll readiness"
    - "Checking approvals, exceptions, and release conditions"
    - "Preparing communications, coordination, and operating trail"
    - "Publishing lifecycle control status"
  - On completion: fade out → switch stage to `results` → smooth-scroll to the result summary anchor
- Replace the current in-page run panel with this overlay so the launch panel stays visible underneath, creating continuity (Papaya does this).

### 4. Results stage — orchestrated single outcome surface
Reorganize results into a clearly sequenced narrative (not a card dump):

1. **Lifecycle Control Summary (dominant)** — full-width banner panel with status pill, event type, employee, one-sentence verdict, and a thin "Overall Readiness" progress bar derived from `readiness` pass count. Anchor id `lifecycle-outcome` for scroll target.
2. **Blocking Conditions / Approvals / Release State** — highly visible second block, lists only blocking gates with reason + who/what is required. Suppressed entirely when status is `Ready` (replaced by a green "Cleared for release" confirmation).
3. **Readiness Outcomes** — pass/warn/fail summary counters + checklist grouped by status; compact, not the visual centerpiece.
4. **Prepared Workstreams** — group `actions` into operational buckets by `actionClass` (Communication / Coordination / Control-status) shown as a 3-column grid, modeled on Papaya `PreparedActionsBySystem`.
5. **Operating Trail** — narrow audit timeline with timestamps and emphasis dots (info / warn / critical).

A footer action row: "Back to queue" + "Request this agent for your team" (existing contact CTA).

### 5. Termination scenario weighting
Devon Pierce already carries the strongest control signals. Tighten copy so the difference is visible without changing the data shape:
- Launch panel shows a **sensitive-separation banner stripe** above the header (amber/slate, not red) when `separationType` is present.
- Results status pill renders `Escalated` in a more serious tone (slate-900 with amber accent border).
- Blocking gates block list is more prominent (only termination has 3 blocking gates simultaneously).

### 6. Branding guardrails (explicit)
- Keep Gloock for `font-display` headings, Instrument Sans body.
- Replace any orange/papaya gradients with the existing electric-blue → slate gradient tokens already in `tailwind.config.ts` / `index.css`.
- No "Papaya", "Comeet", "Shapes", "Trello" labels anywhere.
- Keep the BambooHR Edition framing in the page hero.
- Keep the existing navigation/hero shell, breadcrumb, and `setPage` routing untouched.

### 7. Out of scope
- Homepage, taxonomy, flagship section, `FlagshipAgentSection` — untouched.
- Other agent pages — untouched.
- No route changes; still a single page with internal stage state.

## Technical notes

- Files touched:
  - `src/pages/GlobalLifecycleAgentPage.tsx` — replace `QueueStage`, `LaunchStage`, `RunStage`, `ResultsStage` internals; keep `Scenario` types and `SCENARIOS` data intact.
  - `src/components/agent/LifecycleRunOverlay.tsx` — new, ~120 lines, uses `framer-motion` (already installed) and existing `lucide-react` icons.
- Scenario data structures (`readiness`, `gates`, `actions`, `trail`, `summary`) are reused verbatim — only presentation changes.
- All existing scroll-to-top behavior on page entry is preserved; results scroll target switches to the new `#lifecycle-outcome` anchor on overlay completion.

## Deliverable summary (will be reported back after build)

1. How the queue was rebuilt (grouped sections, urgency pills, hover affordance)
2. How the launch panel works (two-column case-open layout, central gradient Run CTA)
3. How the run overlay sequences and paces the work
4. How the results were re-orchestrated into a single outcome surface
5. How existing scenario content was reused (zero data loss — purely presentational)
6. Which Papaya files informed each piece (listed above)
