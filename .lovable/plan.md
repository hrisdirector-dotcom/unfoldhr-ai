## Problem

On every Try-Agent result screen, the "← Try a different agent" link opens the legacy "try-picker" modal instead of returning the user to the Agents catalog page they originated from.

## Fix

Change the "Try a different agent" link on all four try pages to route to `agents` (the Agents catalog) instead of `try-picker`.

Files to update:
- `src/pages/TryAgentPage.tsx` — line 207: `setPage("try-picker")` → `setPage("agents")`
- `src/pages/TryListeningAgentPage.tsx` — line 267: same change
- `src/pages/TryPerformanceAgentPage.tsx` — line 176: same change
- `src/pages/TryUSWorkforceAgentPage.tsx` — line 459: same change

No other behavior changes. The existing top "Back to Agents" pill already points to `agents`, so this just makes the bottom link consistent.
