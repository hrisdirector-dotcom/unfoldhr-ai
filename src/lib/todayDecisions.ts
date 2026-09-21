import type { SavedRun } from "@/hooks/useSavedRuns";

export interface DecisionCard {
  title: string;
  context: string;
  decision: string;
  risk: string;
}

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** First `text` string from an array of `{ text }` entries, when present. */
const firstText = (value: unknown): string | undefined => {
  if (!Array.isArray(value)) return undefined;
  const first = value[0];
  return isRecord(first) && typeof first.text === "string" ? first.text : undefined;
};

/** Build decision cards from prior agent outputs when available. */
export function buildFromRuns(runs: SavedRun[]): DecisionCard[] {
  const cards: DecisionCard[] = [];

  for (const run of runs.slice(0, 3)) {
    const res: UnknownRecord = isRecord(run?.result) ? run.result : {};
    const agent = typeof run?.agent_name === "string" && run.agent_name ? run.agent_name : "Workforce";
    const summary = typeof res.summary === "string" ? res.summary : undefined;

    if (!summary) continue;

    // Pull a risk if the agent surfaced one
    const risk =
      firstText(res.risks) ?? firstText(res.execution_risks) ?? firstText(res.insights);

    cards.push({
      title: `Follow-through on ${agent}`,
      context: summary.length > 180 ? summary.slice(0, 177) + "…" : summary,
      decision:
        "Confirm the recommended next step with the accountable leader and lock owner + date.",
      risk:
        risk ||
        "Momentum is lost if the recommendation sits unresolved past this week.",
    });
  }

  return cards;
}
