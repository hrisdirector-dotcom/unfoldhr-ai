import { useEffect, useMemo, useState } from "react";
import {
  trainingModules,
  getTrainingModuleById,
  type TrainingModule,
} from "@/data/trainingModules";

type ExplainersPageProps = {
  initialModuleId?: string;
};

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
    <div>{children}</div>
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        {item}
      </li>
    ))}
  </ul>
);

const ExplainersPage = ({ initialModuleId }: ExplainersPageProps) => {
  const defaultModule = useMemo(() => {
    return (
      (initialModuleId && getTrainingModuleById(initialModuleId)) ||
      trainingModules[0]
    );
  }, [initialModuleId]);

  const [selectedModuleId, setSelectedModuleId] = useState(
    defaultModule.id
  );

  useEffect(() => {
    if (initialModuleId && getTrainingModuleById(initialModuleId)) {
      setSelectedModuleId(initialModuleId);
    }
  }, [initialModuleId]);

  const selectedModule =
    getTrainingModuleById(selectedModuleId) || trainingModules[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Training Modules
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {selectedModule.title}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {selectedModule.objective}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Category: {selectedModule.category}
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Level: {selectedModule.level}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Duration: {selectedModule.duration}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <div className="space-y-3">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Available Modules
            </h2>
            <div className="space-y-2">
              {trainingModules.map((module) => {
                const isActive = module.id === selectedModule.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModuleId(module.id)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <p className="text-sm font-medium">{module.title}</p>
                    <p className="mt-0.5 text-xs opacity-70">
                      {module.level} • {module.duration}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <SectionCard title="The Challenge">
              <BulletList items={selectedModule.audience} />
            </SectionCard>

            <SectionCard title="The Challenge">
              <p className="text-sm text-muted-foreground">{selectedModule.challenge}</p>
            </SectionCard>

            {selectedModule.positioning && (
              <SectionCard title="Positioning">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-muted p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">AI</p>
                    <p className="text-sm text-muted-foreground">{selectedModule.positioning.ai}</p>
                  </div>
                  <div className="rounded-xl bg-muted p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      Agents
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedModule.positioning.agents}</p>
                  </div>
                </div>
              </SectionCard>
            )}

            <div className="grid gap-8 sm:grid-cols-2">
              <SectionCard title="What AI Can Do">
                <BulletList items={selectedModule.whatAiCanDo} />
              </SectionCard>

              <SectionCard title="What AI Should Not Do">
                <BulletList items={selectedModule.whatAiShouldNotDo} />
              </SectionCard>
            </div>

            <SectionCard title="Core Use Case">
              <BulletList items={selectedModule.coreUseCase.scenarios} />
            </SectionCard>

            <SectionCard title="How to Ask">
              <p className="text-sm text-muted-foreground">{selectedModule.howToAsk}</p>
              <div className="mt-4 rounded-xl bg-muted p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Framework</p>
                <p className="text-sm font-medium text-foreground">{selectedModule.promptFramework}</p>
              </div>
            </SectionCard>

            <SectionCard title="Example Prompt">
              <pre className="whitespace-pre-wrap rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                {selectedModule.examplePrompt}
              </pre>
            </SectionCard>

            <SectionCard title="Exercise">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Exercise Type</p>
                    <p className="text-sm font-medium text-foreground">{selectedModule.exercise.type}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</p>
                  <p className="text-sm text-muted-foreground">{selectedModule.exercise.summary}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Raw Input</p>
                  <div className="mt-1 rounded-xl bg-muted p-4">
                    <p className="text-sm italic text-muted-foreground">{selectedModule.exercise.rawInput}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Learner Tasks
                  </p>
                  <BulletList items={selectedModule.exercise.learnerTasks} />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Output Template">
              <BulletList items={selectedModule.outputTemplate} />
            </SectionCard>

            <SectionCard title={selectedModule.leaderLayer.title}>
              <BulletList items={selectedModule.leaderLayer.points} />
            </SectionCard>

            <SectionCard title="Bridge to Agents">
              <p className="text-sm text-muted-foreground">{selectedModule.bridgeToAgents.summary}</p>
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Example Workflow
                </p>
                <BulletList items={selectedModule.bridgeToAgents.exampleWorkflow} />
              </div>
            </SectionCard>

            <SectionCard title="Video">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedModule.video.title}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedModule.video.duration}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next Module</p>
                  <p className="text-sm font-medium text-foreground">
                    {selectedModule.video.nextModule}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tone</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedModule.video.tone.map((tone) => (
                    <span key={tone} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {tone}
                    </span>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Downloadable Assets">
              <BulletList items={selectedModule.downloadableAssets} />
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainersPage;
