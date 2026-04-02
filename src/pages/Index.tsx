import { useEffect, useState } from "react";
import { UnfoldNav } from "@/components/UnfoldNav";
import { RevealDiv } from "@/components/RevealDiv";
import { useAuth } from "@/hooks/useAuth";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import ContactPage from "@/pages/ContactPage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminDashboard from "@/pages/AdminDashboard";
import ExplainersPage from "@/pages/ExplainersPage";

function AgentDemo({
  input,
  prompt,
  output,
}: {
  input: string[];
  prompt: string;
  output: string;
}) {
  const [step, setStep] = useState(0);
  const [promptText, setPromptText] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);

  useEffect(() => {
    if (step === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setPromptText(prompt.slice(0, i));
        i++;
        if (i > prompt.length) {
          clearInterval(interval);
          setTimeout(() => setStep(2), 700);
        }
      }, 18);
      return () => clearInterval(interval);
    }

    if (step === 2) {
      const timeout = setTimeout(() => {
        setOutputVisible(true);
      }, 900);
      return () => clearTimeout(timeout);
    }
  }, [step, prompt]);

  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background border border-border rounded-xl p-6 space-y-5">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Business Context
        </h4>
        <div className="space-y-1.5">
          {input.map((item) => (
            <p key={item} className="text-sm text-foreground">{item}</p>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          You Ask
        </h4>
        <p className="text-sm text-foreground/90 bg-muted p-3 rounded leading-relaxed min-h-[60px]">
          {promptText}
        </p>
      </div>

      {step >= 2 && !outputVisible && (
        <p className="text-xs text-muted-foreground animate-pulse">
          Analyzing scenario...
        </p>
      )}

      {outputVisible && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            What You Get
          </h4>
          <div className="text-sm text-foreground whitespace-pre-wrap bg-muted p-4 rounded">
            {output}
          </div>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground">
        Illustrative example based on the scenario above.
      </p>
    </div>
  );
}

function WorkforcePlanningAgent({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-14 py-32 space-y-20">
        <RevealDiv>
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-primary mb-5 bg-accent px-3 py-1.5 rounded-md">
            Workforce Planning Agent
          </span>

          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            Plan your workforce before problems appear
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Turn headcount planning from reactive guesswork into a structured, data-driven
            process powered by AI agents.
          </p>
        </RevealDiv>

        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">The problem</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Workforce planning is still driven by spreadsheets, disconnected systems, and
              last-minute decisions. HR teams are expected to align hiring with growth
              targets, budgets, and business strategy without real-time visibility or
              predictive insight.
            </p>
          </div>
        </RevealDiv>

        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">Ask the agent</h2>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "How should we plan headcount for next year based on growth and budget
              constraints?"
            </p>
          </div>
        </RevealDiv>

        <RevealDiv>
          <AgentDemo
            input={["Workforce of 120 employees", "30% growth target next year", "$2.4M annual hiring budget"]}
            prompt={"We are planning for 30% growth next year. How should we structure hiring by quarter while staying within budget and identifying risk early?"}
            output={"Q1: Hire 12 (Engineering 6, Sales 4, Ops 2) — $680K\nQ2: Hire 10 (Engineering 4, Marketing 3, Support 3) — $580K\nQ3: Hire 9 (Product 3, Sales 3, HR 3) — $540K\nQ4: Hire 5 (buffer + backfills) — $600K\n\n⚠ Risk: Engineering hiring in Q1 depends on updated JDs.\n⚠ Risk: Q4 buffer may be insufficient if attrition exceeds 8%."}
          />
        </RevealDiv>

        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">What the agent delivers</h2>
            <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <li>• Structured headcount plan aligned to business growth</li>
              <li>• Hiring timeline across quarters</li>
              <li>• Budget-aware recommendations</li>
              <li>• Identified risks before execution</li>
            </ul>
          </div>
        </RevealDiv>

        <RevealDiv>
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-xl text-foreground mb-3">How the agent works</h2>
            <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <li>→ Connects to HR systems</li>
              <li>→ Analyzes workforce composition</li>
              <li>→ Models hiring scenarios</li>
              <li>→ Generates structured outputs</li>
            </ul>
          </div>
        </RevealDiv>

        <RevealDiv>
          <div className="text-center space-x-4">
            <button
              onClick={() => setPage("contact")}
              className="px-6 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-primary transition-colors"
            >
              Build this agent →
            </button>
            <button
              onClick={() => setPage("explainers")}
              className="px-6 py-3 border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
            >
              Back to Agents
            </button>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

const Index = () => {
  const [page, setPage] = useState("home");
  const [explainerModuleId, setExplainerModuleId] = useState<string | undefined>();
  const { user, isAdmin, loading, signOut } = useAuth();

  const currentUser = user ? { email: user.email || "", role: isAdmin ? "admin" : "user" } : null;

  const navigateTo = (p: string) => {
    setPage(p);
    if (p !== "explainers") setExplainerModuleId(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToExplainer = (moduleId: string) => {
    setExplainerModuleId(moduleId);
    setPage("explainers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (_user: { email: string; role: string }) => {
    navigateTo("dashboard");
  };

  const handleLogout = async () => {
    await signOut();
    navigateTo("home");
  };

  useEffect(() => {
    if (!loading && !user && (page === "dashboard" || page === "admin")) {
      setPage("login");
    }
  }, [user, loading, page]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {page !== "admin" && (
        <UnfoldNav page={page} setPage={navigateTo} currentUser={currentUser} />
      )}

      {page === "home" && <HomePage setPage={navigateTo} />}
      {page === "explainers" && <ExplainersPage initialModuleId={explainerModuleId} />}
      {page === "agent-workforce" && <WorkforcePlanningAgent setPage={navigateTo} />}
      {page === "about" && <AboutPage />}
      {page === "integrations" && <IntegrationsPage />}
      {page === "contact" && <ContactPage />}
      {page === "login" && <AuthPage onLogin={handleLogin} setPage={navigateTo} />}
      {page === "dashboard" && currentUser && (
        <DashboardPage currentUser={currentUser} onLogout={handleLogout} setPage={navigateTo} />
      )}
      {page === "admin" && isAdmin && (
        <AdminDashboard onBack={() => navigateTo("dashboard")} onLogout={handleLogout} />
      )}

    </div>
  );
};

export default Index;
