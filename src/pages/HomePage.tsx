import { useState } from "react";
import { Toast } from "@/components/Toast";
import HeroSection from "@/components/landing/HeroSection";
import PatternBreak from "@/components/landing/PatternBreak";
import WhereAIFitsSection from "@/components/landing/WhereAIFitsSection";
import RealWorldDecisionsSection from "@/components/landing/RealWorldDecisionsSection";
import ScenarioToDecisionSection from "@/components/landing/ScenarioToDecisionSection";
import DailyDecisionBriefSection from "@/components/landing/DailyDecisionBriefSection";
import ExampleOutputSection from "@/components/landing/ExampleOutputSection";
import TryItYourselfCTA from "@/components/landing/TryItYourselfCTA";
import InteractiveAgentSection from "@/components/landing/InteractiveAgentSection";
import AgentsShowcase from "@/components/landing/AgentsShowcase";
import DecisionToExecutionSection from "@/components/landing/DecisionToExecutionSection";
import TrustSection from "@/components/landing/TrustSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

interface HomePageProps {
  setPage: (p: string) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 5000); };

  return (
    <div className="bg-background">
      <HeroSection setPage={setPage} />
      <PatternBreak />
      <WhereAIFitsSection />
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:max-w-md">
            <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 leading-snug">
              See the one-page executive view
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              A concise snapshot of where UnfoldHRAI fits, how it works, and why it matters.
            </p>
          </div>
          <button
            onClick={() => setPage("snapshot")}
            className="self-start md:self-auto shrink-0 px-6 py-3 rounded-xl bg-card text-foreground font-semibold text-sm border border-border hover:border-primary/50 hover:bg-accent transition-all duration-200"
          >
            View Executive Snapshot
          </button>
        </div>
      </section>
      <RealWorldDecisionsSection />
      <ScenarioToDecisionSection />
      <DailyDecisionBriefSection setPage={setPage} />
      <ExampleOutputSection />
      <TryItYourselfCTA />
      <InteractiveAgentSection setPage={setPage} />
      <AgentsShowcase setPage={setPage} />
      <DecisionToExecutionSection />
      <TrustSection />
      <FinalCTA setPage={setPage} showToast={showToast} />
      <Footer setPage={setPage} />
      <Toast message={toast} />
    </div>
  );
}
