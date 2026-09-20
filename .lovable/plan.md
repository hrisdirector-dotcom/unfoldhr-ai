# Release 10 — Commercial positioning: services first, agent platform second

Two offerings, clearly separated: **HR Workflow Redesign Services** (primary) and the **UnfoldHR Agent Platform** (secondary). Nothing is rebuilt — existing design, workflows, agents, forms, sign-in and stored records stay as they are.

## 1. Navigation

Top bar becomes: Services, Agent Platform, Workflow Library, Our Method, About. Integrations leaves the top bar and its existing content moves onto the Agent Platform page (its route keeps working). Buttons: **Discuss a Workflow →** (opens the application form with Workflow Redesign already chosen) and **Explore Agent Demos**. The "Book a Demo" button leaves the header, but your existing booking link is preserved unchanged and resurfaces on the Services page and after a successful Workflow Redesign submission (see below). "My Dashboard" and everything signed-in stays untouched. Same items and order on mobile.

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

"HR Workflow Redesign Services" — "Don't automate the existing process. Redesign the work." Covers the problem, the ten-business-day sprint, $7,500 for the first three organizations with existing qualifications intact, the nine deliverables exactly as already written in the sprint section, and a clear note that implementation is scoped separately. Primary button: **Discuss Your Workflow**. Secondary button: **Book a Discovery Call**, opening your existing booking link in a new tab — same URL as today, unchanged. Carries the vendor-neutral statement prominently: redesign services are technology-independent and may use your existing systems, deterministic automation, third-party AI, UnfoldHR agents, or no AI at all.

The Pricing & Engagements page stays exactly as Release 9 left it.

## 4. Agent Platform page (existing Agents page, extended)

Headline "Purpose-built intelligence for redesigned HR work." with the supporting line about reasoning, readiness, decision-support and orchestration inside governed workflows. Adds the six-layer architecture (systems and data, orchestration, deterministic rules, AI agents, human judgment, governance), explicitly labelled a conceptual model rather than shipped capability. The existing integrations content appears here, described as possible connection points rather than live customer integrations. Every interactive agent is labelled **Demonstration — prepared scenario data**, never a live system connection; no autonomous-execution, SLA, subscription, enterprise-readiness or immediate-deployment claims on this page or on the agent detail and demo pages. **Discuss Agent Implementation** is worded as starting a qualified conversation about fit and requirements, not as ordering a deployment. Buttons: **Discuss Agent Implementation** (form, Agent Platform preselected) and **Explore Agent Demos**. All agent routes and demos keep working.

## 5. Application form

The existing form, storage, confirmation email and notifications are untouched. The "Preferred next step" choice gains **Agent Platform / Agent Implementation** alongside the existing options; existing stored records keep their original values and stay valid — nothing is renamed or migrated. Choosing Agent Platform shows three questions: which workflow or use case, which HCM/HRIS/payroll/workflow systems are involved, and what you are trying to enable with agents. Workflow Redesign keeps its current questions; General question keeps its current single box. The selected inquiry type appears clearly in the notification. After a successful Workflow Redesign submission, the confirmation panel also offers **Book a Discovery Call** using your existing booking link.

Testing: one submission of each of the three types, each clearly marked as a test (company "UnfoldHR Release 10 Test") and sent from one designated test address. For each I confirm the stored record, the inquiry type and answers, the confirmation email and the notification. I also confirm preselection is correct arriving from each button and when moving between Services and Agent Platform. Afterwards I delete only those three identified test records, by their exact identifiers — no other record is touched.

## 6. Footer and metadata

Footer copyright uses the current year. Terms and Security are dead text today — I will leave them out rather than publish empty legal pages, and report them as launch items. Homepage title and description become "HR Workflow Redesign & Applied AI | UnfoldHR" with a matching description. Canonical address, share image and domain configuration untouched.

**A finding you should know about before I touch the sitemap.** The whole site runs as one web address: Services, Agent Platform, Workflow Library, Pricing and About are screens inside `/`, not separate addresses. The hand-maintained sitemap already lists `/about`, `/agents`, `/pricing`, `/integrations`, `/explainers` and `/executive-deck` — none of those addresses actually resolve; they land on the not-found page. So I will **not** add a `/services` line to the sitemap, because it would be a seventh dead entry. Services will be publicly reachable from the navigation, and its title text is set for the screen, but it cannot have its own canonical address or search listing until the site gets real per-page addresses. I will report the existing dead sitemap entries as a launch issue; fixing them is real routing work and is not part of Release 10 unless you ask for it.

## Technical notes

- New route `services` in `Index.tsx`; `integrations` route kept for existing links.
- `navigateTo` gains an optional inquiry preselection carried into `FinalCTA` so "Discuss a Workflow" and "Discuss Agent Implementation" land on the form with the right option chosen; no new route, no timing hacks.
- Files changed: `UnfoldNav.tsx`, `PlatformHero.tsx`, `HomePage.tsx`, `Index.tsx`, `FinalCTA.tsx`, `EngagementModels.tsx` (wording + button destinations only), `AgentsPage.tsx`, `Footer.tsx`, `index.html`; new `src/pages/ServicesPage.tsx` and `src/components/landing/DesignToExecutionSection.tsx`.
- No change to agent logic, workflow data, auth, permissions, database, backend functions, or the pricing page.
- Verification: typecheck, production build, lint, the 88 tests, and browser checks of every nav item, both preselection paths, all three form submissions, and desktop/tablet/mobile layout. No publish until you approve the result.
