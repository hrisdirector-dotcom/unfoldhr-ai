import { RevealDiv } from "@/components/RevealDiv";
import { ArrowRight } from "lucide-react";

export default function TryItYourselfCTA() {
  const scrollToAgents = () => document.getElementById("agent-gallery")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-14 text-center">
        <RevealDiv>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-5">
            Try it <span className="font-serif-alt italic text-primary">yourself</span>
          </h2>
        </RevealDiv>
        <RevealDiv delay={0.1}>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
            Run a scenario and see how decisions come together.
          </p>
        </RevealDiv>
        <RevealDiv delay={0.2}>
          <button
            onClick={scrollToAgents}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-semibold text-sm border-none cursor-pointer hover:bg-foreground/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Try an Agent
            <ArrowRight className="w-4 h-4" />
          </button>
        </RevealDiv>
      </div>
    </section>
  );
}
