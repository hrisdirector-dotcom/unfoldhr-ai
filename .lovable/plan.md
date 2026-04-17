

## Plan: Lock Agent Output Integrity Across All 6 Agents

### Goal
Stop fabricated numbers from appearing anywhere in agent outputs, static examples, PDFs, or executive decks. Build one durable shared sanitization layer.

---

### 1. New shared sanitization layer (the durable piece)

Create **`src/lib/sanitizeAgentOutput.ts`** — single source of truth used by every render path (homepage results, Try pages, PDF export, Executive Deck, static examples).

It exports two functions:

- **`extractUserNumbers(inputs)`** — collects every numeric value the user actually typed (employees, growth %, positions, affected, participation, budgetPerHire, quarters, etc.) into an allow-list of allowed number strings.
- **`sanitizeResult(result, inputs)`** — walks `summary`, `sections[].items[].label/detail`, `risks[]`, `timeline[].focus/phase`, `confidence.reason` and:
  - Strips/replaces any numeric pattern not in the allow-list:
    - `\d+%`, `$\d[\d,]*[KMk]?`, `\d+[-–]\d+ days?/weeks?/months?`, `\d+[xX]`, `\d+/\d+` (e.g. 8/10), bare standalone integers ≥ 2 used as quantities (`8 hires`, `3 engineers`, `+12`), date durations, benchmark deltas (`+8 points`).
  - Replaces them with qualitative phrases from a curated map (e.g. `\d+%` → "an elevated share", `$\dK/M` → "within a meaningful budget envelope", `+\d+ points` → "directional improvement", `\d+ hires` → "targeted hiring focus").
  - Removes whole sentences that are pure metric claims and unsupported (e.g. "Industry benchmark: 85% — target 95%").
  - Forces `confidence.score` to be omitted from display (or normalized to a band) — UI will switch to qualitative-only confidence (Low/Medium/High) and stop showing the % score.

It's pure, deterministic, and reused everywhere — so any future agent or UI automatically inherits the rule.

---

### 2. Edge function — strengthen the system prompts

**`supabase/functions/run-agent/index.ts`**
- Replace the per-agent prompt instructions that say *"Be specific with numbers"* / *"Include 5-6 departments with hire counts"* with a shared **NON-FABRICATION RULE** appended to every prompt:
  > "Never invent specific numbers. Only use exact figures the user provided in inputs. Replace all other quantitative claims with qualitative executive language ('elevated', 'early-phase focus', 'leadership-level gap', etc.). Do not mention missing data or disclaimers. Do not output `confidence.score` as a precise number — only a qualitative `level`."
- Update each agent prompt to drop hire-count and pct-based instructions; ask for qualitative phasing labels (`Early phase`, `Mid phase`, `Final phase`) without `pct` requirements (pct becomes optional/derived equally).
- After parsing the JSON response, run `sanitizeResult()` server-side as a defense-in-depth pass before returning.

---

### 3. Remove fabricated numbers from local simulators & static examples

| File | Action |
|---|---|
| `src/components/landing/InteractiveAgentSection.tsx` | Delete legacy `simulateWorkforce/Recruiting/Onboarding/Performance/Compliance/Listening` functions and the `SIMULATORS` map (already unused — homepage uses the edge function). Removes ~250 lines of fake-number code. |
| `src/components/landing/ExampleOutputSection.tsx` | Replace hardcoded `TIMELINE` (43/30/27%), `HIRING` (+9, +8, +6, +5, +3), and the "120 employees · 25% growth" context with qualitative chips ("Revenue-focus phase", "Technical capacity phase", "Stabilization phase") and qualitative hire emphasis ("Critical priority", "High priority", etc. — no counts). Drop the 74% confidence ring → show qualitative "Medium confidence" pill. |
| `src/pages/WorkforcePlanningAgent.tsx` (AgentDemo) | Rewrite the static demo: remove "Engineering — 14 hires", "$680K", "Q1 — 12 hires", "$2.4M budget" etc. Use qualitative phrasing matching section 3 of the spec. |
| `src/pages/TryAgentPage.tsx` | The in-file `generateBrief` is already mostly qualitative — pass its output through `sanitizeResult` to be safe and remove the `${growth}` echoes that re-introduce numbers into headings (only allowed because they are user-entered — keep). |
| `src/pages/TryPerformanceAgentPage.tsx` + `src/data/performanceAgentData.ts` | Run output through `sanitizeResult`. Audit `performanceAgentData.ts` for any `%`/count strings and convert to qualitative. |
| `src/data/listeningAgentData.ts` | Audit for any %/count phrases (most already qualitative — confirm and convert any stragglers). Pipe through sanitizer. |
| `src/data/agents.ts` | Audit static `primaryItems`/`secondaryItems` shown on agent detail pages — convert any `+X hires` / `Y%` to qualitative. |

---

### 4. PDF export & Executive Deck inherit the rule

**`src/lib/downloadResult.ts`**
- `downloadPDF()` and `downloadCSV()` call `sanitizeResult(result, inputs)` first.
- Confidence circle stops showing the `%` number — shows only "HIGH / MEDIUM / LOW" with the colored dot.
- Timeline progress bars: keep visual proportional bars (they are visual weight, not a quantitative claim) but drop the `XX%` label.

**`src/pages/ExecutiveDeckPage.tsx`**
- Wrap `res = sanitizeResult(run.result, run.inputs)` at the top.
- Confidence card: replace the `{score}%` circle text with the qualitative level initial ("M" / "H" / "L") or a checkmark. Remove the score line.
- Timeline: drop the `{t.pct}%` badge and width-proportional `{pct}%` width — use evenly-weighted progress bars or qualitative phase chips ("Early", "Mid", "Final").
- Update Slide 7 copy: remove "based on modeled patterns" disclaimer (per spec: don't mention missing data) — replace with forward-looking action prompt.

---

### 5. Update DecisionBriefCard confidence display

**`src/components/DecisionBriefCard.tsx`** — already qualitative (no score shown). No change needed beyond verifying no number leaks in `confidence.reason` (sanitizer handles it).

---

### Files touched

- **NEW** `src/lib/sanitizeAgentOutput.ts`
- `supabase/functions/run-agent/index.ts`
- `src/lib/downloadResult.ts`
- `src/pages/ExecutiveDeckPage.tsx`
- `src/pages/TryAgentPage.tsx`
- `src/pages/TryPerformanceAgentPage.tsx`
- `src/pages/WorkforcePlanningAgent.tsx`
- `src/components/landing/InteractiveAgentSection.tsx` (delete unused simulators + sanitize result)
- `src/components/landing/ExampleOutputSection.tsx`
- `src/data/agents.ts`, `src/data/listeningAgentData.ts`, `src/data/performanceAgentData.ts` (audit + qualitative rewrite)

### What does NOT change
- Page layout, navigation, CTAs, card copy outside output regions, agent entry points, question flow, form inputs, save/dashboard/upgrade flows, branding modal, deck structure (still 7 slides).

### Net effect
- All 6 agents work identically for users.
- Numbers only appear when they came from user input.
- A single sanitizer guards every render path (live, saved, PDF, deck, static example) — so future UI edits cannot reintroduce fake metrics.

