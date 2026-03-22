import { RevealDiv } from "@/components/RevealDiv";

export default function AboutPage() {
  return (
    <div className="bg-card pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-14">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">About</span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            The origin of <span className="font-serif-alt italic text-primary">unfoldHR</span>
          </h1>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <div className="bg-background border border-border rounded-2xl p-8 md:p-10 mb-12">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              We started unfoldHR because we saw the same pattern over and over: brilliant HR teams drowning in manual processes while AI tools sat unused on the shelf.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              The problem wasn't the technology — it was the translation layer. HR leaders needed someone who spoke both "people operations" and "AI engineering."
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              That's us. We build AI agents that automate the repetitive, surface the invisible, and give HR teams back the time they need to do what actually matters — taking care of people.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.2}>
          <h2 className="font-display text-2xl text-foreground mb-6">Founded by practitioners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { name: "Eric Maré", role: "Co-founder & CEO", bio: "15+ years in HR technology. Previously led People Analytics at scale. Obsessed with making AI practical for HR teams." },
              { name: "Kirk Deis", role: "Co-founder & CTO", bio: "Engineering leader turned HR tech builder. Believes every HR process has an agent waiting to be built." }
            ].map((person) => (
              <div key={person.name} className="bg-background border border-border rounded-xl p-6">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-2xl font-display text-primary mb-4">
                  {person.name[0]}
                </div>
                <h3 className="font-display text-lg text-foreground mb-1">{person.name}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{person.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </RevealDiv>

        <RevealDiv delay={0.3}>
          <h2 className="font-display text-2xl text-foreground mb-6">Trust signals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: "12", label: "HR Modules" },
              { metric: "36", label: "Agent Prompts" },
              { metric: "23", label: "API Integrations" },
              { metric: "2–4wk", label: "Avg Delivery" },
            ].map((s) => (
              <div key={s.label} className="bg-background border border-border rounded-xl p-5 text-center">
                <div className="font-display text-2xl text-foreground mb-1">{s.metric}</div>
                <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}
