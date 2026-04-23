import { useState } from "react";
import { Toast } from "@/components/Toast";
import HeroSection from "@/components/landing/HeroSection";
import PatternBreak from "@/components/landing/PatternBreak";
import WhereAIFitsSection from "@/components/landing/WhereAIFitsSection";
import RealWorldDecisionsSection from "@/components/landing/RealWorldDecisionsSection";
import ScenarioToDecisionSection from "@/components/landing/ScenarioToDecisionSection";
import ExampleOutputSection from "@/components/landing/ExampleOutputSection";
import TryItYourselfCTA from "@/components/landing/TryItYourselfCTA";
import InteractiveAgentSection from "@/components/landing/InteractiveAgentSection";
import AgentsShowcase from "@/components/landing/AgentsShowcase";
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
      <RealWorldDecisionsSection />
      <ScenarioToDecisionSection />
      <ExampleOutputSection />
      <TryItYourselfCTA />
      <InteractiveAgentSection setPage={setPage} />
      <AgentsShowcase setPage={setPage} />
      <TrustSection />
      <FinalCTA setPage={setPage} showToast={showToast} />
      <Footer />
      <div className="flex justify-center py-8 bg-background">
        <button
          onClick={() => setPage("snapshot")}
          className="text-sm px-5 py-2 rounded-md border border-border text-foreground/70 hover:text-foreground hover:border-primary/40 transition-colors"
        >
          View Executive Snapshot
        </button>
      </div>
      <Toast message={toast} />
    </div>
  );
}
