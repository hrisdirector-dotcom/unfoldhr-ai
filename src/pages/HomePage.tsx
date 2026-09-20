import { useState } from "react";
import { Toast } from "@/components/Toast";
import PlatformHero from "@/components/landing/PlatformHero";
import PlatformExplainer from "@/components/landing/PlatformExplainer";
import BusinessProblemSection from "@/components/landing/BusinessProblemSection";
import WorkDesignSection from "@/components/landing/WorkDesignSection";
import DesignToExecutionSection from "@/components/landing/DesignToExecutionSection";
import AgentFamiliesSection from "@/components/landing/AgentFamiliesSection";
import FlagshipAgentSection from "@/components/landing/FlagshipAgentSection";
import ExploreAgentsByType from "@/components/landing/ExploreAgentsByType";
import EngagementModels from "@/components/landing/EngagementModels";
import SprintOfferSection from "@/components/landing/SprintOfferSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import type { InquiryPreset } from "@/pages/Index";

interface HomePageProps {
  setPage: (p: string) => void;
  onOpenWorkflow?: (id: string) => void;
  inquiry?: InquiryPreset | null;
  onDiscussWorkflow?: () => void;
}

export default function HomePage({ setPage, onOpenWorkflow, inquiry, onDiscussWorkflow }: HomePageProps) {
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 5000); };

  return (
    <div className="bg-background">
      <PlatformHero
        setPage={setPage}
        onOpenWorkflow={onOpenWorkflow}
        onDiscussWorkflow={onDiscussWorkflow}
      />
      <BusinessProblemSection />
      <SprintOfferSection onOpenWorkflow={onOpenWorkflow} onDiscussWorkflow={onDiscussWorkflow} />
      <WorkDesignSection setPage={setPage} />
      <DesignToExecutionSection setPage={setPage} onOpenWorkflow={onOpenWorkflow} />
      <PlatformExplainer />
      <AgentFamiliesSection setPage={setPage} />
      <FlagshipAgentSection setPage={setPage} />
      <ExploreAgentsByType setPage={setPage} />
      <EngagementModels setPage={setPage} onDiscussWorkflow={onDiscussWorkflow} />
      <FinalCTA setPage={setPage} showToast={showToast} inquiry={inquiry} />
      <Footer setPage={setPage} />
      <Toast message={toast} />
    </div>
  );
}
