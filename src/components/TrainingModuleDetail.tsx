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
          input={[
            "Current headcount: 120",
            "Growth target: +25%",
            "Budget constraint: +15%"
          ]}
          prompt={`Draft a headcount plan based on growth and budget constraints.`}
          output={`Headcount Plan Summary

Recommended hires:
• 8 Sales Reps
• 3 Engineers
• 2 HR Business Partners

Timeline:
• Q1: 5 hires
• Q2: 4 hires
• Q3: 4 hires

Risks:
• Budget overrun if hiring accelerates early
• Engineering hiring constraints`}
        />
      )}
    </div>
  );
}
