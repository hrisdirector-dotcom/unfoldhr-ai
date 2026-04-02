import { type TrainingModule } from "@/data/trainingModules";
import AgentDemo from "@/components/AgentDemo";

type Props = {
  module: TrainingModule;
};

export default function TrainingModuleDetail({ module }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Objective</h3>
        <p className="text-muted-foreground mt-1">{module.objective}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">Challenge</h3>
        <p className="text-muted-foreground mt-1">{module.challenge}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-foreground mb-2">What AI Can Do</h4>
          <ul className="space-y-1">
            {module.whatAiCanDo.map((item) => (
              <li key={item} className="text-muted-foreground">• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-2">What AI Should Not Do</h4>
          <ul className="space-y-1">
            {module.whatAiShouldNotDo.map((item) => (
              <li key={item} className="text-muted-foreground">• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {module.id === "workforce-planning" && (
        <AgentDemo
          situation={[
            "Workforce of 120 employees",
            "Growth target of 25%",
            "Hiring budget increase capped at 15%",
          ]}
          question="How should we structure hiring to hit our growth target within budget constraints?"
          plan={
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Headcount Plan</h4>
                <div className="space-y-1 text-sm text-foreground">
                  <p>Sales — 8 hires</p>
                  <p>Engineering — 3 hires</p>
                  <p>HR — 2 hires</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Timeline</h4>
                <div className="space-y-1 text-sm text-foreground">
                  <p>Q1 — 5 hires</p>
                  <p>Q2 — 4 hires</p>
                  <p>Q3 — 4 hires</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Risks</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Budget overrun if hiring accelerates early</p>
                  <p>Engineering hiring constraints</p>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
