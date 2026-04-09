interface AgentPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (pageId: string) => void;
}

const AGENTS = [
  { id: "try-agent", name: "Workforce Planning", desc: "Get a hiring plan aligned to your growth targets and budget constraints." },
  { id: "try-listening-agent", name: "Employee Listening", desc: "Surface what your workforce is really saying — and what to do about it." },
  { id: "try-performance-agent", name: "Performance Management", desc: "Identify performance gaps and get a structured action plan." },
  { id: "gallery-recruiting", name: "Recruiting Agent", desc: "Screen candidates, rank top talent, and build outreach strategy." },
  { id: "gallery-onboarding", name: "Onboarding Agent", desc: "Create personalized onboarding plans, checklists, and timelines." },
  { id: "gallery-compliance", name: "Compliance Risk Agent", desc: "Identify compliance gaps and recommend corrective actions." },
];

export default function AgentPickerModal({ open, onClose, onSelect }: AgentPickerModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-2xl p-8 md:p-10 max-w-lg w-full mx-4 shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-[3px] text-primary mb-3">Try an Agent</p>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">Choose an agent</h2>
        <p className="text-sm text-muted-foreground mb-8">Pick one to get an instant, personalized recommendation.</p>
        <div className="space-y-3">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => {
                onClose();
                if (agent.id.startsWith("gallery-")) {
                  // Scroll to homepage gallery
                  onSelect("home");
                  setTimeout(() => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" }), 150);
                } else {
                  onSelect(agent.id);
                }
              }}
              className="w-full text-left bg-background border border-border rounded-xl px-5 py-4 cursor-pointer hover:border-foreground transition-colors group"
            >
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{agent.name}</span>
              <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">{agent.desc}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
