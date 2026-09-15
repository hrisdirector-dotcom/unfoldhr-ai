# HR Work, Reimagined — Agentic Workflow Library

A new section of the site that shows 20 common HR workflows redesigned around four kinds of work: what humans judge, what AI reasons about, what systems execute deterministically, and what should be eliminated entirely. It sits alongside the existing agents, not on top of them.

## What gets added

**1. New navigation destination — "HR Work, Reimagined"**
Added to the public nav next to How It Works, Agents, Integrations, About. Existing links, logged-in behaviour, and agent routes stay exactly as they are.

**2. Library page**
- Dark hero in the existing brand language: eyebrow "Agentic HR Workflow Library", headline "Don't automate the process. Redesign the work.", supporting copy, primary CTA to the catalog, secondary CTA to the framework explainer.
- Four restrained classification cards: Human, AI Agent, Deterministic, Eliminate.
- Catalog of all 20 workflows with search and filters by domain (8), AI potential, human judgment, and risk.
- Each card shows number, domain, name, one-line outcome, and the four ratings. No visual noise.
- "The Rules" design-principles section (10 numbered rules) and the methodology note.

**3. Workflow detail experience** (one reusable page, data-driven)
- Header: domain eyebrow, name, outcome statement, score strip (AI potential, human judgment, elimination opportunity, risk, complexity).
- Today vs Agentic Design comparison, with every count calculated from the modelled steps — never invented.
- Interactive process map: horizontal on desktop, vertical stack on mobile, each step tagged H / A / D / X and keyboard-accessible. Clicking a step opens a panel with why this classification, why not AI / why not human, human-control model (HITL / HOTL / HOVL / Human Only), autonomy level 0-5, data required, systems involved, risk and control, and the measure.
- "Should AI do this?" decision framework, available from every workflow.
- Optional architecture view: Need → Context → Intelligence → Control → Execution → Verification, reinforcing that the model is not the system of record.
- Metrics section using "Baseline required" language rather than invented percentages.
- "Related UnfoldHR agent" links into the existing Global Lifecycle, Leave Control, Compensation Change, Workforce Planning, and Performance agents where relevant.

**4. Leave of Absence flagship**
Modelled in full depth as the showcase workflow, including the control gate that routes routine cases forward and ambiguous or sensitive cases to an HR specialist, with a prominent "AI reasons. Rules determine. Systems transact. Humans judge." callout.

**5. Homepage entry point**
One new section placed after the platform explainer: eyebrow "HR Work, Reimagined", headline "The question isn't where AI fits into HR. It's what HR should look like when AI exists.", short copy, CTA "Explore Agentic Workflows", and the line "20 workflows · 8 domains · Human + AI + Systems". Nothing else on the homepage changes.

## Depth

All 20 workflows are complete: outcome, five ratings, current-state and future-state steps, classifications, control models, systems, and metrics. Leave of Absence gets the richest step-level reasoning; the rest get solid but leaner detail, structured identically so depth can be added later.

## Guardrails honoured

No payroll or benefits calculation assigned to a language model. No AI deciding hiring, firing, employee-relations findings, compensation, or succession. No invented benchmarks, ROI percentages, or fabricated citations. Existing auth, dashboard, admin, agents, pricing, integrations and contact behaviour untouched.

## Technical notes

- New data layer `src/data/workflows/` — a `Workflow` / `WorkflowStep` model matching the brief's schema (including `relatedAgents` and `sources`), one file per domain plus an index, so later additions don't touch components.
- New components under `src/components/workflows/`: catalog, card, filters, detail, score strip, map, node, node drawer, classification and control legends, autonomy scale, current-vs-future, architecture view, metrics, related agents, methodology note.
- Pages `WorkflowLibraryPage.tsx` and `WorkflowDetailPage.tsx` registered in the existing page-state navigation in `Index.tsx` (routes `workflows` and `workflow-detail` with a `workflowId`), preserving browser back/forward. No React Router change.
- `UnfoldNav.tsx`: one new link, plus `workflows` added to the dark-hero set so the logo stays legible.
- Classification conveyed by letter and label as well as colour, using existing tokens plus four restrained classification colours added to the design system.
- Vitest coverage for data integrity: all 20 present, every workflow has an outcome, ratings, both step sets, every future step classified, consequential AI steps carry a control model, metrics and systems present.

## Out of V1

Uploads, AI-generated redesigns, ROI calculator, workflow editing, saved workflows, PDF export, gating, benchmarking, vendor recommendations. The data model leaves room for them.
