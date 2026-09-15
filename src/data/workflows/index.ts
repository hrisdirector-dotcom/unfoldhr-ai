import { TALENT_ACQUISITION_WORKFLOWS } from "./talentAcquisition";
import { EMPLOYEE_LIFECYCLE_WORKFLOWS } from "./employeeLifecycle";
import { HR_SERVICE_DELIVERY_WORKFLOWS } from "./hrServiceDelivery";
import { PAYROLL_TIME_BENEFITS_WORKFLOWS } from "./payrollTimeBenefits";
import { TALENT_DEVELOPMENT_WORKFLOWS } from "./talentDevelopment";
import { REWARDS_WORKFLOWS } from "./rewards";
import { WORKFORCE_PLANNING_WORKFLOWS } from "./workforcePlanning";
import { EXIT_WORKFLOWS } from "./exit";
import type { Classification, Workflow } from "./types";

export * from "./types";
export * from "./framework";

/** The UnfoldHR reference model — 20 workflows across 8 domains. */
export const WORKFLOWS: Workflow[] = [
  ...TALENT_ACQUISITION_WORKFLOWS,
  ...EMPLOYEE_LIFECYCLE_WORKFLOWS,
  ...HR_SERVICE_DELIVERY_WORKFLOWS,
  ...PAYROLL_TIME_BENEFITS_WORKFLOWS,
  ...TALENT_DEVELOPMENT_WORKFLOWS,
  ...REWARDS_WORKFLOWS,
  ...WORKFORCE_PLANNING_WORKFLOWS,
  ...EXIT_WORKFLOWS,
].sort((a, b) => a.number - b.number);

export const FLAGSHIP_WORKFLOW_ID = "leave-of-absence";

export function getWorkflow(id: string): Workflow | undefined {
  return WORKFLOWS.find((w) => w.id === id);
}

export interface WorkflowCounts {
  currentActivities: number;
  currentHandoffs: number;
  currentCoordination: number;
  futureActivities: number;
  eliminated: number;
  agent: number;
  deterministic: number;
  human: number;
  humanDecisionPoints: number;
  controlGates: number;
}

/** Every count is derived from the modelled steps — never from a benchmark. */
export function computeCounts(w: Workflow): WorkflowCounts {
  const by = (c: Classification) =>
    w.futureStateSteps.filter((s) => s.classification === c).length;

  const remaining = w.futureStateSteps.filter(
    (s) => s.classification !== "eliminate"
  );

  return {
    currentActivities: w.currentStateSteps.length,
    currentHandoffs: w.currentStateSteps.filter((s) => s.friction === "handoff").length,
    currentCoordination: w.currentStateSteps.filter(
      (s) => s.friction === "coordination" || s.friction === "wait"
    ).length,
    futureActivities: remaining.length,
    eliminated: by("eliminate"),
    agent: by("agent"),
    deterministic: by("deterministic"),
    human: by("human"),
    humanDecisionPoints: w.futureStateSteps.filter(
      (s) => s.humanControl === "human-only" || s.humanControl === "hitl"
    ).length,
    controlGates: w.controlGates.length,
  };
}
