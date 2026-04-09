import { RevealDiv } from "@/components/RevealDiv";

const MODELS = [
  {
    icon: "🏗️",
    title: "Build It For Me",
    desc: "We scope, build, and deploy your AI agent end to end. You get a production-ready tool, not a prototype.",
    tag: "Most popular",
    features: ["Full agent design & build", "HRIS/ATS integration", "Ongoing tuning & support"],
    highlight: true,
  },
  {
    icon: "🤝",
    title: "Co-Build",
    desc: "Your team works alongside ours. We handle architecture and integrations while you own the domain logic.",
    tag: "Collaborative",
    features: ["Joint design sessions", "Shared development", "Knowledge transfer included"],
    highlight: false,
  },
  {
    icon: "🎓",
    title: "Advisory",
    desc: "Strategic guidance on where AI fits in your HR operations, with a clear roadmap to implementation.",
    tag: "Strategy first",
    features: ["AI readiness assessment", "Use case prioritization", "Implementation roadmap"],
    highlight: false,
  },
];

export default function EngagementModels() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Engagement Models</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Three ways to work with us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the model that fits your team's capacity, timeline, and ambition.
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MODELS.map((m, i) => (
            <RevealDiv key={i} delay={i * 0.1}>
              <div className={`rounded-2xl p-7 h-full flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                m.highlight
                  ? "bg-foreground text-background border-foreground shadow-xl"
                  : "bg-card border-border hover:border-primary/40"
              }`}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl">{m.icon}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    m.highlight ? "bg-background/20 text-background" : "bg-accent text-accent-foreground"
                  }`}>
                    {m.tag}
                  </span>
                </div>
                <h3 className={`font-display text-xl mb-2 ${m.highlight ? "text-background" : "text-foreground"}`}>
                  {m.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${m.highlight ? "text-background/70" : "text-muted-foreground"}`}>
                  {m.desc}
                </p>
                <ul className="mt-auto space-y-2.5">
                  {m.features.map((f, j) => (
                    <li key={j} className={`text-sm flex items-center gap-2 ${m.highlight ? "text-background/80" : "text-muted-foreground"}`}>
                      <span className={m.highlight ? "text-background/60" : "text-primary"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
