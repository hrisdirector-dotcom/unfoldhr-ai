import { useState, useEffect } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import { Toast } from "@/components/Toast";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AgentsShowcase from "@/components/landing/AgentsShowcase";
import EngagementModels from "@/components/landing/EngagementModels";
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
      <ProblemSolutionSection />
      <HowItWorksSection />
      <AgentsShowcase setPage={setPage} />
      <EngagementModels />
      <TrustSection />
      <FinalCTA setPage={setPage} showToast={showToast} />
      <Footer />
      <Toast message={toast} />
    </div>
  );
}
