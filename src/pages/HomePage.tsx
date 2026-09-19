import { useState } from "react";
import { Toast } from "@/components/Toast";
import PlatformHero from "@/components/landing/PlatformHero";
import PlatformExplainer from "@/components/landing/PlatformExplainer";
import BusinessProblemSection from "@/components/landing/BusinessProblemSection";
import WorkDesignSection from "@/components/landing/WorkDesignSection";
import AgentFamiliesSection from "@/components/landing/AgentFamiliesSection";
import FlagshipAgentSection from "@/components/landing/FlagshipAgentSection";
import ExploreAgentsByType from "@/components/landing/ExploreAgentsByType";
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
      <PlatformHero setPage={setPage} />
      <PlatformExplainer />
      <WorkDesignSection setPage={setPage} />
      <AgentFamiliesSection setPage={setPage} />
      <FlagshipAgentSection setPage={setPage} />
      <ExploreAgentsByType setPage={setPage} />
      <FinalCTA setPage={setPage} showToast={showToast} />
      <Footer setPage={setPage} />
      <Toast message={toast} />
    </div>
  );
}
