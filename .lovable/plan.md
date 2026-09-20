# Release 10 — Commercial positioning: services first, agent platform second

Two offerings, clearly separated: **HR Workflow Redesign Services** (primary) and the **UnfoldHR Agent Platform** (secondary). Nothing is rebuilt — existing design, workflows, agents, forms, sign-in and stored records stay as they are.

## 1. Navigation

Top bar becomes: Services, Agent Platform, Workflow Library, Our Method, About. Integrations leaves the top bar and its existing content moves onto the Agent Platform page (its route keeps working). Buttons: **Discuss a Workflow →** (opens the application form with Workflow Redesign already chosen) and **Explore Agent Demos**. The Calendly "Book a Demo" button is removed from the header, as agreed. "My Dashboard" and everything signed-in stays untouched. Same items and order on mobile.

"Our Method" scrolls to the real four-lens method section. The current "How It Works" link points at a section that does not exist — it is removed with the restructure, so the dead link goes away.

## 2. Homepage

New order:
1. Hero
2. Business problem and differentiation
3. Workflow Redesign Sprint (moved far up — this is the thing to buy)
4. The UnfoldHR Method — four lenses
5. Representative workflow — Leave of Absence
6. From Design to Execution (new bridge section)
7. Agent Platform overview
8. Agent families and demonstrations
9. Engagement Models
10. Application form
11. Footer

Hero keeps its look and headline. New supporting line, microcopy "One workflow. Ten business days. A defined future-state operating model.", primary button **Discuss Your Workflow →** (form, Workflow Redesign preselected), secondary **See a Sample Redesign** (the existing Leave of Absence page). The agent platform does not get an equal hero button.

The "What UnfoldHRAI is" platform explainer is repositioned as the agent-platform overview (section 7) rather than the second thing a visitor reads.

New bridge section — eyebrow "From Design to Execution", headline "Design the work. Then enable it.", three stages using Leave of Absence: Redesign (what the sprint examines), Enable (Leave Control Agent supports selected activities — readiness, missing information, exceptions; it does not own the process), Implement (connect, govern, measure; separately scoped). Closes on "One operating model. Multiple execution components." with buttons to Services and Agent Platform. Built from existing card and reveal patterns, no new styling.

## 3. New Services page

"HR Workflow Redesign Services" — "Don't automate the existing process. Redesign the work." Covers the problem, the ten-business-day sprint, $7,500 for the first three organizations with existing qualifications intact, the nine deliverables exactly as already written in the sprint section, and a clear note that implementation is scoped separately. Button: **Discuss Your Workflow**. Carries the vendor-neutral statement prominently: redesign services are technology-independent and may use your existing systems, deterministic automation, third-party AI, UnfoldHR agents, or no AI at all.

The Pricing & Engagements page stays exactly as Release 9 left it.

## 4. Agent Platform page (existing Agents page, extended)

Headline "Purpose-built intelligence for redesigned HR work." with the supporting line about reasoning, readiness, decision-support and orchestration inside governed workflows. Adds the six-layer architecture (systems and data, orchestration, deterministic rules, AI agents, human judgment, governance) labelled as a conceptual model, not shipped capability. The existing integrations content appears here. Every interactive agent is labelled **Demonstration** — runs on prepared scenario data, not a live system connection; no autonomous-execution, SLA, subscription or enterprise-readiness claims. Buttons: **Discuss Agent Implementation** (form, Agent Platform preselected) and **Explore Agent Demos**. All agent routes and demos keep working.

## 5. Application form

The existing form, storage, confirmation email and notifications are untouched. The "Preferred next step" choice gains **Agent Platform / Agent Implementation** alongside the existing options; existing stored records keep their values and stay valid. Choosing Agent Platform shows three questions: which workflow or use case, which HCM/HRIS/payroll/workflow systems are involved, and what you are trying to enable with agents. Workflow Redesign keeps its current questions; General question keeps its current single box. The selected inquiry type appears clearly in the notification.

## 6. Footer and metadata

Footer copyright uses the current year. Terms and Security are dead text today — I will leave them out rather than publish empty legal pages, and report them as launch items. Page titles: homepage "HR Workflow Redesign & Applied AI | UnfoldHR", Services "HR Workflow Redesign Services | UnfoldHR", Agent Platform "HR Agent Platform & Decision Support | UnfoldHR". Canonical address, share image, sitemap and domain untouched.

## Technical notes

- New route `services` in `Index.tsx`; `integrations` route kept for existing links.
- `navigateTo` gains an optional inquiry preselection carried into `FinalCTA` so "Discuss a Workflow" and "Discuss Agent Implementation" land on the form with the right option chosen; no new route, no timing hacks.
- Files changed: `UnfoldNav.tsx`, `PlatformHero.tsx`, `HomePage.tsx`, `Index.tsx`, `FinalCTA.tsx`, `EngagementModels.tsx` (wording + button destinations only), `AgentsPage.tsx`, `Footer.tsx`, `index.html`; new `src/pages/ServicesPage.tsx` and `src/components/landing/DesignToExecutionSection.tsx`.
- No change to agent logic, workflow data, auth, permissions, database, backend functions, or the pricing page.
- Verification: typecheck, production build, lint, the 88 tests, and browser checks of every nav item, both preselection paths, all three form submissions, and desktop/tablet/mobile layout. No publish until you approve the result.
