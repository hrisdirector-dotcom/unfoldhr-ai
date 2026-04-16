

## Plan: Enhance Employee Listening Agent Fields

### What changes

**Both** the dedicated Try Listening Agent page (`TryListeningAgentPage.tsx`) and the homepage gallery form (`InteractiveAgentSection.tsx` — `ListeningForm`) will get two new fields:

1. **Survey Participation Percentage** — A number input (0–100%) so the AI can factor response representativeness into its analysis.

2. **Department / Team with "Other" option** — Add an "Other" choice to the department dropdown. When selected, show a text input where the user can type a custom department or team name.

### Files to edit

| File | Change |
|------|--------|
| `src/components/landing/InteractiveAgentSection.tsx` | Update `ListeningForm`: add "Other" to department options, add conditional text input for custom department, add survey participation % input. Pass new fields in `onRun`. |
| `src/pages/TryListeningAgentPage.tsx` | Add "Other" to `GROUPS` array with conditional text input. Add a survey participation % input field. Pass both new values in the `handleGenerate` inputs. |
| `supabase/functions/run-agent/index.ts` | Update the `listening` system prompt to mention survey participation rate and custom department/team so the AI incorporates them into its analysis. |

### Implementation details

- **Department "Other" pattern**: When user selects "Other", a text input appears below/beside the dropdown. The value sent to the API is the custom text (or the dropdown value if not "Other").
- **Survey Participation**: Simple numeric input with `%` suffix, placeholder like `e.g. 72`, clamped 0–100.
- **Edge function prompt**: Add a line like "Consider the survey participation rate when assessing data reliability and confidence" to the listening system prompt.

