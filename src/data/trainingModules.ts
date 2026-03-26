export type TrainingModule = {
  id: string;
  title: string;
  objective: string;
  challenge: string;
  whatAiCanDo: string[];
  whatAiShouldNotDo: string[];
};

export const trainingModules: TrainingModule[] = [
  {
    id: "ai-foundations-hr",
    title: "AI Foundations for HR",
    objective:
      "Understand what AI can do in HR workflows and how to apply it safely and effectively.",
    challenge:
      "HR teams are hearing about AI constantly but are unsure where it fits and how to use it responsibly.",
    whatAiCanDo: [
      "Structure messy information",
      "Draft manager guidance",
      "Summarize employee situations",
    ],
    whatAiShouldNotDo: [
      "Make final HR decisions",
      "Interpret policy as final authority",
      "Replace human judgment",
    ],
  },
];

export const getTrainingModuleById = (id: string) =>
  trainingModules.find((m) => m.id === id);
