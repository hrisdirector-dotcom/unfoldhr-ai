# HR Work, Reimagined — Agentic Workflow Library

A new section of the site that shows 20 common HR workflows redesigned around four kinds of work: work that should be eliminated, work AI reasons about, work systems execute deterministically, and work where human judgment must remain. It sits alongside the existing agents, not on top of them.

Governing idea: eliminate what shouldn't exist, let AI reason, let rules determine, let systems transact, let humans judge.

## What gets added

**1. New navigation destination — "Workflows"**
Short nav label; the section itself is branded "HR Work, Reimagined" with the eyebrow "Agentic HR Workflow Library". Existing links, logged-in behaviour, and agent routes stay exactly as they are.

**2. Library page** (discovery)
- Dark hero in the existing brand language: headline "Don't automate the process. Redesign the work.", supporting copy, primary CTA to the catalog, secondary CTA to the framework explainer.
- The work-design sequence shown as a spine: Outcome → Question → Eliminate → Allocate → Control → Orchestrate → Execute → Verify → Measure. Eliminate is presented first and given weight, so the four classifications never read as four equivalent automation options.
- Classification legend ordered Eliminate, Human, Deterministic, AI Agent — each with its reasoning, not just a letter.
- Catalog of all 20 workflows with search and filters by domain (8), AI potential, human judgment, and risk. Cards stay quiet: number, domain, name, one-line outcome, four ratings.
- "The Rules" design-principles section (10 numbered rules) and the methodology note crediting PwC and AT&T as inspiration while keeping the analysis clearly UnfoldHR's own.

**3. Workflow detail experience — the centrepiece** (one reusable page, data-driven)
Within roughly 30 seconds a reader should grasp the outcome, what's wrong with the traditional process, what work disappears, what AI reasons about, what systems execute, where humans keep judgment, what authority AI has, which systems are involved, and what to measure.

- Header: domain eyebrow, name, outcome statement, score strip (AI potential, human judgment, elimination opportunity, risk, complexity).
- "Typical Current State" vs "Agentic Design", with a What Changed block leading on work eliminated, then AI, deterministic, human counts. Every count calculated from the modelled steps. Copy makes clear real processes vary.
- Interactive process map — the most designed element. Horizontal on desktop, vertical on mobile, every node tagged H / A / D / X, keyboard-accessible, classification never conveyed by colour alone. Control gates are drawn as distinct diamond nodes in the flow, not hidden in a drawer: routine and within authority continues; exception, low confidence, or sensitive routes to human review.
- Node panel: why this classification (in plain reasoning, e.g. "eligibility is determined from codified rules and authoritative worker data"), why not AI / why not human, human-control model (HITL / HOTL / HOVL / Human Only), autonomy level, data required, systems involved, risk and control, and the measure.
- "What AI should not do" — a short explicit list on every workflow.
- "Should AI do this?" decision framework, reachable from every workflow, starting with "should this activity exist?".
- Autonomy scale 0–5 with the standing note that higher autonomy is not inherently better; the right level depends on risk, consequence, reversibility, policy and evidence. Authority comes from policy, permissions, risk class, transaction type and governance — never from model confidence alone.
- Architecture view: Need → Context → Intelligence → Control → Execution → Verification, with systems shown as vendor-neutral roles (HCM, Payroll, WFM, ATS, Benefits, LMS, Identity, Finance, Policy/Knowledge, Case Management). Reinforces that the model is not the system of record, not the calculation engine, and not the decision authority.
- Metrics using "Baseline required" / "Measure against your current process" rather than invented percentages.
- Related agent block, framed so the agent supports selected reasoning, monitoring and orchestration within the workflow — it does not own the workflow. Links to the existing Global Lifecycle, Leave Control, Compensation Change, Workforce Planning and Performance agents where relevant.
- Source provenance: each source carries title, organisation, URL, date, type, optional note, and what it supports. Anything that is our judgement is labelled "UnfoldHR Analysis". No fabricated citations.

**4. Leave of Absence built first as the reference implementation**
Built and validated before the other 19, and used to prove the component architecture: elimination, natural-language interpretation, policy context, deterministic eligibility, document collection, the control gate, human exception handling, payroll and benefits treatment, HCM transactions, proactive communication, monitoring, auditability, and return-to-work orchestration. It carries the prominent "AI reasons. Rules determine. Systems transact. Humans judge." callout and sets the quality bar for the rest.

**5. Homepage entry point**
One new section after the platform explainer: eyebrow "HR Work, Reimagined", headline "The question isn't where AI fits into HR. It's what HR should look like when AI exists.", the supporting copy, CTA "Explore Agentic Workflows", and the line "20 workflows · 8 domains · Human + AI + Systems". Nothing else on the homepage changes.

## Depth and tone

All 20 workflows are complete: outcome, five ratings, current-state and future-state steps, classifications, control models, systems, metrics, and a "what AI should not do" list. Leave of Absence gets the richest step-level reasoning; the rest are structured identically so depth can be deepened later. Language stays analytical and restrained — "AI is well suited to…", "this should remain human-led because…" — never marketing register.

## Guardrails honoured

No payroll or benefits calculation assigned to a language model. No AI deciding hiring, firing, employee-relations findings, compensation, succession, or who loses a job. No invented benchmarks, ROI percentages, or fabricated sources. Existing auth, dashboard, admin, agents, pricing, integrations and contact behaviour untouched.

## Technical notes

- New data layer `src/data/workflows/` — a `Workflow` / `WorkflowStep` model matching the brief's schema, plus `controlGate` nodes, `aiShouldNot[]`, structured `sources[]`, and `relatedAgents[]`. Named as a reference model so a future customer-specific workflow layer can sit beside it without reshaping V1 data. One file per domain plus an index.
- New components under `src/components/workflows/`: catalog, card, filters, detail, score strip, map, node, control-gate node, node drawer, classification and control legends, autonomy scale, current-vs-future, architecture view, metrics, related agents, methodology note.
- Pages `WorkflowLibraryPage.tsx` and `WorkflowDetailPage.tsx` registered in the existing page-state navigation in `Index.tsx` (routes `workflows` and `workflow-detail` with a `workflowId`), preserving browser back/forward. No React Router change.
- `UnfoldNav.tsx`: one new "Workflows" link, plus `workflows` added to the dark-hero set so the logo stays legible.
- Four restrained classification tokens added to the design system; letter and label always present alongside colour.
- Vitest coverage for data integrity: all 20 present, every workflow has an outcome, ratings, both step sets, every future step classified, consequential AI steps carry a control model, metrics, systems and "what AI should not do" present.

## Out of V1

Uploads, AI-generated redesigns, ROI calculator, workflow editing, saved workflows, PDF export, gating, benchmarking, vendor-specific architecture. The data model leaves room for them; no UI is added for them now.
