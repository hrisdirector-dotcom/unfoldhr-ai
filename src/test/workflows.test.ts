import { describe, expect, it } from "vitest";
import {
  CLASSIFICATIONS,
  DOMAINS,
  FLAGSHIP_WORKFLOW_ID,
  WORKFLOWS,
  computeCounts,
  getWorkflow,
} from "@/data/workflows";

describe("workflow library integrity", () => {
  it("contains exactly 20 workflows numbered 1-20", () => {
    expect(WORKFLOWS).toHaveLength(20);
    expect(WORKFLOWS.map((w) => w.number)).toEqual(
      Array.from({ length: 20 }, (_, i) => i + 1)
    );
  });

  it("has unique ids", () => {
    expect(new Set(WORKFLOWS.map((w) => w.id)).size).toBe(20);
  });

  it("covers all eight domains", () => {
    const used = new Set(WORKFLOWS.map((w) => w.domain));
    expect(used.size).toBe(DOMAINS.length);
    for (const d of DOMAINS) expect(used.has(d.id)).toBe(true);
  });

  it("puts eliminate first in the classification order", () => {
    expect(CLASSIFICATIONS[0].key).toBe("eliminate");
  });

  it("has a flagship workflow", () => {
    expect(getWorkflow(FLAGSHIP_WORKFLOW_ID)).toBeDefined();
  });

  it.each(WORKFLOWS.map((w) => [w.name, w] as const))(
    "%s is completely modelled",
    (_name, w) => {
      expect(w.outcome.length).toBeGreaterThan(0);
      expect(w.currentStateSteps.length).toBeGreaterThan(0);
      expect(w.futureStateSteps.length).toBeGreaterThan(0);
      expect(w.aiShouldNot.length).toBeGreaterThan(0);
      expect(w.metrics.length).toBeGreaterThan(0);
      expect(w.sources.length).toBeGreaterThan(0);
      expect(w.architectureSystems.length).toBeGreaterThan(0);
    }
  );

  it.each(WORKFLOWS.map((w) => [w.name, w] as const))(
    "%s explains every classification and keeps step ids unique",
    (_name, w) => {
      const ids = new Set<string>();
      for (const s of w.futureStateSteps) {
        expect(ids.has(s.id)).toBe(false);
        ids.add(s.id);
        expect(s.whyClassification.length).toBeGreaterThan(0);
        if (s.classification === "human" || s.classification === "deterministic") {
          expect(s.whyNotAI, `${s.id} needs whyNotAI`).toBeTruthy();
        }
        if (s.classification === "agent" || s.classification === "deterministic") {
          expect(s.whyNotHuman, `${s.id} needs whyNotHuman`).toBeTruthy();
        }
      }
    }
  );

  it.each(WORKFLOWS.map((w) => [w.name, w] as const))(
    "%s anchors every control gate to a real step",
    (_name, w) => {
      const ids = new Set(w.futureStateSteps.map((s) => s.id));
      for (const g of w.controlGates) {
        expect(ids.has(g.afterStepId), `${g.id} points at a missing step`).toBe(true);
        expect(g.authorityBasis.length).toBeGreaterThan(0);
      }
    }
  );

  it.each(WORKFLOWS.map((w) => [w.name, w] as const))(
    "%s keeps at least one human control point",
    (_name, w) => {
      const counts = computeCounts(w);
      expect(counts.humanDecisionPoints).toBeGreaterThan(0);
    }
  );

  it("derives counts from modelled steps", () => {
    for (const w of WORKFLOWS) {
      const c = computeCounts(w);
      expect(c.currentActivities).toBe(w.currentStateSteps.length);
      expect(c.eliminated + c.agent + c.deterministic + c.human).toBe(
        w.futureStateSteps.length
      );
      expect(c.futureActivities).toBe(w.futureStateSteps.length - c.eliminated);
      expect(c.controlGates).toBe(w.controlGates.length);
    }
  });

  it("finds elimination opportunities in every workflow", () => {
    for (const w of WORKFLOWS) {
      expect(computeCounts(w).eliminated, `${w.name} eliminates nothing`).toBeGreaterThan(0);
    }
  });
});
