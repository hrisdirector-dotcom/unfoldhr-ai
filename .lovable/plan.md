# Release 10.1 — Final Acceptance Corrections

Four wording and linking corrections only. No routing change, no database change, no agent logic change, no redesign, no publish.

## 1. Correct demonstration language on the agent experiences

Today the Global Lifecycle and Leave / LOA pages say workforce events are "ingested from BambooHR", and the Compensation / Job Change page carries the same claim. That reads as a live connection to a customer system.

- Reword all three to describe prepared demonstration scenarios modelled on a BambooHR-style workflow.
- Add a prominent, consistently worded notice on each agent experience: it uses prepared scenario data, does not connect to a live customer system, and does not execute production transactions.
- Apply the same phrasing to the shared control-agent frame (the "via BambooHR" label) and to the homepage flagship agent blurb, so the language matches everywhere.
- Scenario titles and agent behaviour stay exactly as they are.

## 2. Restore access to the integrations catalogue

On the Agent Platform page, the Connection Points section gains a clear link through to the existing Integrations page. That page and its route stay as they are. Both places state plainly that the catalogue describes potential integration options, not completed or deployed customer connections.

## 3. Complete the workflow-to-agent bridge

In the "From Design to Execution" section, add a direct link to the existing Leave Control Agent demonstration, alongside the existing Leave of Absence workflow link. No new demonstration is created.

## 4. Align the six conceptual layers

Replace the current layer names and descriptions with the six specified:

1. HR systems and source data
2. Workflow orchestration
3. Deterministic rules
4. AI agents and decision support
5. Human judgment and approvals
6. Governance, security, and audit

The "conceptual model, not a deployed production system" disclaimer stays.

## Technical notes

- Files touched: `GlobalLifecycleAgentPage.tsx`, `LeaveControlAgentPage.tsx`, `CompensationChangeAgentPage.tsx`, `ControlAgentFramework.tsx` (label only), `FlagshipAgentSection.tsx` (blurb only), `AgentsPage.tsx` (`ARCHITECTURE_LAYERS`, Connection Points link and wording), `DesignToExecutionSection.tsx` (one added link).
- Scenario data files keep their internal "Receive event from BambooHR" step labels, since those describe the modelled workflow step, not a live feed — the surrounding copy makes the demonstration framing explicit. Say the word if you want those reworded too.
- Verification: typecheck, the 88 tests, and the production build; plus a browser pass over the three agent pages, the Agent Platform page and the homepage bridge. Actual results reported, including anything that fails.
- No publish.
