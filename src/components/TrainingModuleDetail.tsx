import { type TrainingModule } from "@/data/trainingModules";

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
    </div>
  );
}
