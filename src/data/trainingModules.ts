export type TrainingModule = {
  id: string;
  title: string;
  audience: string[];
  category: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  objective: string;
  challenge: string;
  positioning?: {
    ai: string;
    agents: string;
  };
  whatAiCanDo: string[];
  whatAiShouldNotDo: string[];
  coreUseCase: {
    title: string;
    scenarios: string[];
  };
  howToAsk: string;
  promptFramework: string;
  examplePrompt: string;
  exercise: {
    type: "Light" | "Moderate" | "Hands-On";
    summary: string;
    rawInput: string;
    learnerTasks: string[];
  };
  outputTemplate: string[];
  leaderLayer: {
    title: string;
    points: string[];
  };
  bridgeToAgents: {
    summary: string;
    exampleWorkflow: string[];
  };
  video: {
    title: string;
    duration: string;
    tone: string[];
    nextModule: string;
  };
  downloadableAssets: string[];
};

export const trainingModules: TrainingModule[] = [
  {
    id: "ai-foundations-hr",
    title: "AI Foundations for HR: From Understanding to Application",
    audience: [
      "HR Business Partners",
      "Recruiters",
      "HR Managers",
      "HR Operations",
      "CHRO / HR Leadership",
    ],
    category: "Core",
    duration: "5–7 minutes",
    level: "Beginner",
    objective:
      "Help HR professionals understand what AI can realistically do in HR workflows, where it fits safely, how to interact with it effectively, and how agents extend AI into real work.",
    challenge:
      "HR teams are hearing about AI constantly, but many are still unclear on where to start, how to manage risk, and how to use it in practical workforce scenarios.",
    positioning: {
      ai: "AI is a capability that can summarize, structure, draft, and support thinking.",
      agents:
        "Agents are how that capability gets applied to repeatable workflows with inputs, outputs, and human review.",
    },
    whatAiCanDo: [
      "Structure messy information",
      "Draft manager guidance",
      "Summarize employee situations",
      "Generate conversation frameworks",
      "Identify patterns across repeated issues",
    ],
    whatAiShouldNotDo: [
      "Make final performance decisions",
      "Interpret policy as a final authority",
      "Handle employee relations issues without review",
      "Replace manager or HR judgment",
    ],
    coreUseCase: {
      title: "Manager Support",
      scenarios: [
        "Underperformance: a manager is unsure how to address declining performance",
        "High performer disengagement: a manager needs guidance on possible attrition risk",
        "Team conflict: a manager needs support navigating interpersonal tension",
      ],
    },
    howToAsk:
      "Use a structure that includes role, context, task, desired output, and guardrails. Ask the model to flag missing information and assumptions.",
    promptFramework: "Role + Context + Task + Output + Guardrails",
    examplePrompt: `Act as an experienced HR Business Partner.

Context:
A manager is dealing with an employee whose performance has declined over the past two months. The employee was previously a strong performer.

Task:
Provide structured guidance for the manager on how to approach the conversation.

Output:
- Key points to address
- Suggested conversation structure
- Risks to be aware of
- Questions the manager should ask

Constraints:
Do not make final decisions. Flag any assumptions or missing information.`,
    exercise: {
      type: "Moderate",
      summary:
        "Learners refine a prompt, compare outputs, and see how better context improves usefulness.",
      rawInput:
        "Employee has been missing deadlines, seems disengaged, used to be high performer. Manager frustrated but hasn't addressed directly yet.",
      learnerTasks: [
        "Improve the raw prompt by adding context",
        "Define the output structure you want back",
        "Add guardrails so the AI does not overstep",
        "Compare a weak prompt to a refined prompt",
      ],
    },
    outputTemplate: [
      "Situation Summary",
      "Key Considerations",
      "Risks",
      "Suggested Conversation Flow",
      "Questions to Ask",
      "Missing Information",
    ],
    leaderLayer: {
      title: "Strategic Overlay for HR Leaders",
      points: [
        "Improve consistency of manager support",
        "Reduce dependency on repetitive HR questions",
        "Scale guidance without removing human accountability",
        "Create more structured decision-support experiences",
      ],
    },
    bridgeToAgents: {
      summary:
        "What begins as a strong prompt can become an agent that guides managers through repeatable support scenarios with optional HR review.",
      exampleWorkflow: [
        "Manager enters situation details",
        "Agent structures the issue and suggested response",
        "HR reviews when needed",
        "Output becomes a repeatable support workflow",
      ],
    },
    video: {
      title: "AI Foundations for HR: From Understanding to Application",
      duration: "4–5 minutes",
      tone: ["Professional", "Clear", "Confidence-building", "Practical"],
      nextModule: "Use Case Discovery",
    },
    downloadableAssets: [
      "AI Foundations Worksheet",
      "Prompt Basics Cheat Sheet",
      "Manager Support Prompt Template",
    ],
  },
];

export const getTrainingModuleById = (id: string) =>
  trainingModules.find((module) => module.id === id);

export const getTrainingModulesByCategory = (category: string) =>
  trainingModules.filter((module) => module.category === category);
