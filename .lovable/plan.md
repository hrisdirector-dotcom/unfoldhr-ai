# Release 8 — Commercialization audit and launch QA

Audit-only release with a small set of targeted corrections. No new features, pages, routes, pricing, workflow content, or visual concepts.

## Audit findings so far (from reading the code)

**PASS (verified by inspection)**
- Homepage section order matches the required sequence exactly: hero, platform explainer, business problem, UnfoldHR Method, agent families, flagship agent, explore agents by type, Engagement Models, Sprint Offer, application form, footer. No duplicates.
- Hero carries the approved eyebrow, headline and both buttons.
- Exactly one Leave record; its identifier is the flagship identifier; the workflow library data is untouched.
- The sample framing on the Leave page renders only for Leave; another workflow page was checked and shows no trace of it.

**FAIL — stale visiting card (search/social wording)**
`index.html` still says "AI Agents for Every HR Workflow" and "Build AI agents for every HR workflow…" in the page title, description, and the social sharing title/description. This is exactly the outdated positioning the audit asks to find.

**FAIL — the library can open on the wrong screen**
After using "See a Sample Workflow Redesign", the remembered Leave selection is never cleared. Opening Workflows later from the top menu re-opens the Leave page instead of the catalog. Cause: `src/pages/Index.tsx` keeps the chosen workflow and never resets it on ordinary navigation.

**Known-good, unchanged**
- One hard-coded Leave identifier remains in `SprintOfferSection.tsx` and one in `WorkflowDetail.tsx`. Both can be replaced with the single authoritative constant already exported by the workflow library — no circular dependency.

**Not yet verified (will be checked during the audit pass, before any further edits)**
Form behaviour end to end, Engagement Models buttons, Contact page, agents, login and the paid dashboard, console output on every main screen, accessibility checks, and desktop/tablet/mobile layout. Backend, database, policies, routes and pricing will be inspected for any change during Releases 1–7; the expectation is none.

## Corrections proposed

1. `index.html` — update the page title and description, and the matching social title/description, to:
   - Title: `UnfoldHR.ai | Agentic HR Work Design`
   - Description: `UnfoldHR.ai helps HR leaders redesign workflows across human judgment, AI reasoning, deterministic rules, system transactions, and work elimination.`
   Canonical address, social image, robots and sitemap untouched.
2. `src/pages/Index.tsx` — clear the remembered workflow whenever the visitor navigates normally, so Workflows always opens the catalog unless the sample button was just used.
3. `src/components/landing/SprintOfferSection.tsx` and `src/components/workflows/WorkflowDetail.tsx` — use the library's single authoritative Leave identifier instead of repeating the text, so it can never drift.
4. Any further defect the audit pass proves exists — smallest possible correction, reported individually.

## Technical notes

- `Index.tsx`: reset `workflowId` inside `navigateTo` (set to `undefined` for every destination) while `navigateToWorkflow` continues to set it; this keeps `WorkflowsPage`'s `initialWorkflowId` accurate on each mount.
- Replace the literals with `FLAGSHIP_WORKFLOW_ID` from `@/data/workflows`; `WorkflowDetail`'s `SAMPLE_WORKFLOW_ID` becomes an alias of it.
- No database, migration, function, secret, environment variable, route, policy or entitlement change.
- No new test records will be created; the existing form tests and the 88-test suite, typecheck and production build will be run.

## Final report you will receive

Launch verdict, a PASS / PARTIAL / FAIL / NOT VERIFIED table for every requirement, each issue graded blocker / important / optional, every file changed with the exact correction, typecheck, build, test and lint results, the screens and device sizes actually tested, logged-out and logged-in coverage, confirmation that nothing in the backend changed, and the remaining known limitations (including the unconfirmed submission state when a connection drops).
