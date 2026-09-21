import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ExecutiveDeckPage from "@/pages/ExecutiveDeckPage";
import type { SavedRun } from "@/hooks/useSavedRuns";
import type { Json } from "@/integrations/supabase/types";

/**
 * Synthetic regression tests for the executive deck's result-narrowing boundary
 * (`toDeckResult`). No network, database, session or file access.
 */

const branding = { logoUrl: null, primaryColor: "#2B5CE6", accentColor: "#1C2330" };

function makeRun(result: unknown): SavedRun {
  return {
    id: "test-run",
    agent_type: "workforce",
    agent_name: "Workforce Planning",
    title: "Synthetic Test Run",
    inputs: { headcount: "120", region: "EMEA" },
    result: result as { [key: string]: Json | undefined },
    created_at: "2026-01-15T10:00:00.000Z",
  };
}

const VALID_RESULT = {
  contextLine: "Hiring plan review for a 120 person engineering group.",
  summary: "Prioritise backfilling critical engineering roles before opening new headcount.",
  sections: [
    {
      title: "Recommended Actions",
      items: [
        { label: "Backfill critical roles", detail: "Focus on the roles blocking delivery.", tag: "High" },
        { label: "Freeze speculative hiring", detail: "Pause requisitions without a named owner.", tag: "Medium" },
      ],
    },
  ],
  timeline: [
    { phase: "Phase 1", focus: "Confirm role criticality with leaders." },
    { phase: "Phase 2", focus: "Re-sequence open requisitions." },
  ],
  risks: ["Medium risk of delivery slippage if backfills slip."],
  confidence: { level: "Medium", score: 0.62, reason: "Based on the roles and region provided." },
};

describe("ExecutiveDeckPage — valid saved run", () => {
  it("renders summary, metrics, recommendations, timeline and qualitative confidence", () => {
    render(<ExecutiveDeckPage run={makeRun(VALID_RESULT)} branding={branding} onBack={() => {}} />);

    expect(screen.getByText(VALID_RESULT.summary)).toBeInTheDocument();
    expect(screen.getByText(VALID_RESULT.contextLine)).toBeInTheDocument();

    // First metric card takes its value from the first section item.
    expect(screen.getByText("Headcount Gap")).toBeInTheDocument();
    expect(screen.getAllByText("Backfill critical roles").length).toBeGreaterThan(0);

    // Recommendation label + detail.
    expect(screen.getByText("Recommended Actions")).toBeInTheDocument();
    expect(screen.getByText("Focus on the roles blocking delivery.")).toBeInTheDocument();

    // Timeline phases.
    expect(screen.getByText("Phase 1")).toBeInTheDocument();
    expect(screen.getByText("Re-sequence open requisitions.")).toBeInTheDocument();

    // Confidence is shown qualitatively, never as a numeric score.
    expect(screen.getByText("Medium Confidence")).toBeInTheDocument();
    expect(screen.queryByText(/0\.62/)).toBeNull();
  });
});

describe("ExecutiveDeckPage — malformed saved JSON", () => {
  it("renders without crashing and drops non-record and non-string values", () => {
    const malformed = {
      summary: "Partial result from a malformed record.",
      sections: [
        "not-an-object",
        42,
        {
          title: "Recommended Actions",
          items: ["bad-item", null, { label: "Valid item", detail: "Valid detail." }],
        },
      ],
      timeline: [null, { phase: "Phase 1", focus: "Valid focus." }],
      risks: ["High risk of drift.", 7, { text: "object risk" }, null],
      confidence: "not-an-object",
    };

    render(<ExecutiveDeckPage run={makeRun(malformed)} branding={branding} onBack={() => {}} />);

    expect(screen.getByText("Partial result from a malformed record.")).toBeInTheDocument();
    expect(screen.getByText("Valid item")).toBeInTheDocument();
    expect(screen.getByText("High risk of drift.")).toBeInTheDocument();

    // Invalid entries never reach the page.
    expect(screen.queryByText("not-an-object")).toBeNull();
    expect(screen.queryByText("object risk")).toBeNull();
    expect(screen.queryByText("7")).toBeNull();

    // No confidence block when confidence is not a record.
    expect(screen.queryByText(/Confidence$/)).toBeNull();
  });

  it("renders an empty result without crashing", () => {
    render(<ExecutiveDeckPage run={makeRun({})} branding={branding} onBack={() => {}} />);
    expect(screen.getByText(/Executive Recommendation/)).toBeInTheDocument();
    expect(screen.getByText("Executive Summary")).toBeInTheDocument();
  });

  it("renders when the stored result is not an object at all", () => {
    render(<ExecutiveDeckPage run={makeRun(null)} branding={branding} onBack={() => {}} />);
    expect(screen.getByText("Key Metrics at a Glance")).toBeInTheDocument();
  });
});
