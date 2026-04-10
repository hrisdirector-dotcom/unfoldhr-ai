import { RevealDiv } from "@/components/RevealDiv";
import { Button } from "@/components/ui/button";
import { Rocket, Zap, Users } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Rocket,
    title: "Start Free",
    desc: "Try any agent instantly in the interactive gallery above. No credit card required.",
    cta: true,
  },
  {
    num: "02",
    icon: Zap,
    title: "Upgrade to Deploy Real Agents",
    desc: "When you're ready for production use, choose a paid plan (Growth, Professional, or Enterprise). Get autonomous agents that run 24/7, integrate with your HRIS/ATS, and take real actions.",
  },
  {
    num: "03",
    icon: Users,
    title: "Get Expert Help When Needed",
    desc: "Need custom agents, complex integrations, or strategic guidance? Our team offers Build It For Me, Co-Build, or Advisory services on top of any paid plan.",
  },
];

export default function EngagementModels() {
  const scrollToGallery = () => {
    document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateTo = (page: string) => {
    window.history.pushState({ page }, "");
    window.dispatchEvent(new PopStateEvent("popstate", { state: { page } }));
  };

  return (
    <section className="py-24 md:py-32 bg-muted/30" id="engagement-models">
      <div className="max-w-5xl mx-auto px-6">
        <RevealDiv>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Get Started</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Ready to Move from Simulation to Real Agents?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              You've seen what our agents can do in the gallery. Here's how to get started with unfoldHR:
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <RevealDiv key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-card p-7 h-full flex flex-col hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary/60 tracking-widest">{s.num}</span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-auto">{s.desc}</p>
                {s.cta && (
                  <Button className="mt-5 w-full" onClick={() => navigateTo("login")}>
                    Sign Up to Save Progress
                  </Button>
                )}
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
            <Button size="lg" onClick={() => navigateTo("pricing")}>
              View Pricing &amp; Plans
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToGallery}>
              Try Gallery
            </Button>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
  const scrollToGallery = () => {
    document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-muted/30" id="engagement-models">
      <div className="max-w-5xl mx-auto px-6">
        <RevealDiv>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-4">Get Started</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Ready to Move from Simulation to Real Agents?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              You've seen what our agents can do in the gallery. Here's how to get started with unfoldHR:
            </p>
          </div>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <RevealDiv key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-card p-7 h-full flex flex-col hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary/60 tracking-widest">{s.num}</span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
            <Button
              size="lg"
              onClick={() => {
                window.history.pushState({ page: "pricing" }, "");
                window.dispatchEvent(new PopStateEvent("popstate", { state: { page: "pricing" } }));
              }}
            >
              View Pricing &amp; Plans
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToGallery}>
              Try the Gallery Again
            </Button>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
