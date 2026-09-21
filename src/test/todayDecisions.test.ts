import { describe, it, expect } from "vitest";
import { buildFromRuns } from "@/lib/todayDecisions";
import type { SavedRun } from "@/hooks/useSavedRuns";

const run = (result: SavedRun["result"], agent_name = "Leave Control"): SavedRun => ({
  id: "1",
  agent_type: "demo",
  agent_name,
  title: "t",
  inputs: {},
  result,
  created_at: "2026-01-01",
});

// Test-only boundary injection: the database can return a non-object jsonb
// value, which the SavedRun type cannot express. Isolated to malformed cases.
const runWithRawResult = (result: unknown): SavedRun =>
  ({ ...run({}), result }) as SavedRun;

describe("buildFromRuns", () => {
  it("builds a card from a valid run and uses the surfaced risk", () => {
    const cards = buildFromRuns([
      run({ summary: "Leave backlog is growing.", risks: [{ text: "Coverage gap" }] }),
    ]);
    expect(cards).toHaveLength(1);
    expect(cards[0].title).toBe("Follow-through on Leave Control");
    expect(cards[0].context).toBe("Leave backlog is growing.");
    expect(cards[0].risk).toBe("Coverage gap");
  });

  it("falls back through execution_risks and insights", () => {
    expect(buildFromRuns([run({ summary: "s", execution_risks: [{ text: "E" }] })])[0].risk).toBe("E");
    expect(buildFromRuns([run({ summary: "s", insights: [{ text: "I" }] })])[0].risk).toBe("I");
  });

  it("uses the default risk line when none is present", () => {
    expect(buildFromRuns([run({ summary: "s" })])[0].risk).toMatch(/Momentum is lost/);
  });

  it("truncates long summaries at 177 characters", () => {
    const long = "a".repeat(300);
    const context = buildFromRuns([run({ summary: long })])[0].context;
    expect(context).toHaveLength(178);
    expect(context.endsWith("…")).toBe(true);
  });

  it("skips runs without a usable string summary", () => {
    expect(buildFromRuns([run({}), run({ summary: 42 }), run(null), run("nope")])).toHaveLength(0);
  });

  it("ignores malformed risk shapes without throwing", () => {
    const cards = buildFromRuns([
      run({ summary: "s", risks: "bad", execution_risks: [null], insights: [{ text: 7 }] }),
    ]);
    expect(cards[0].risk).toMatch(/Momentum is lost/);
  });

  it("uses only the first three runs", () => {
    const cards = buildFromRuns([1, 2, 3, 4].map((n) => run({ summary: `s${n}` })));
    expect(cards).toHaveLength(3);
  });
});
