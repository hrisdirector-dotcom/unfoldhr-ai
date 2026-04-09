import { useEffect, useState, useCallback } from "react";
import { UnfoldNav } from "@/components/UnfoldNav";
import { useAuth } from "@/hooks/useAuth";
import AgentPickerModal from "@/components/AgentPickerModal";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import ContactPage from "@/pages/ContactPage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminDashboard from "@/pages/AdminDashboard";
// AgentsPage removed — agents are accessed via homepage gallery
import AgentDetailPage from "@/pages/AgentDetailPage";
import TryAgentPage from "@/pages/TryAgentPage";
import TryListeningAgentPage from "@/pages/TryListeningAgentPage";
import TryPerformanceAgentPage from "@/pages/TryPerformanceAgentPage";
import PricingPage from "@/pages/PricingPage";
import WorkforcePlanningAgent from "@/pages/WorkforcePlanningAgent";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";

const Index = () => {
  const [page, setPage] = useState(() => {
    const state = window.history.state;
    return state?.page || "home";
  });
  const [agentId, setAgentId] = useState<string | undefined>(() => {
    const state = window.history.state;
    return state?.agentId;
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const { user, isAdmin, loading, signOut } = useAuth();

  const currentUser = user ? { email: user.email || "", role: isAdmin ? "admin" : "user" } : null;

  const navigateTo = useCallback((p: string, replace = false) => {
    if (p === "try-picker") {
      setPickerOpen(true);
      return;
    }

    setPage(p);
    if (p !== "agent-detail") setAgentId(undefined);

    const stateObj = { page: p, agentId: p === "agent-detail" ? agentId : undefined };
    if (replace) {
      window.history.replaceState(stateObj, "");
    } else {
      window.history.pushState(stateObj, "");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [agentId]);

  const navigateToAgent = useCallback((id: string) => {
    const freeRoutes: Record<string, string> = {
      "workforce-planning": "try-agent",
      "employee-listening": "try-listening-agent",
      "performance-management": "try-performance-agent",
    };

    const route = freeRoutes[id];
    if (route) {
      setPage(route);
      window.history.pushState({ page: route }, "");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setAgentId(id);
    setPage("agent-detail");
    window.history.pushState({ page: "agent-detail", agentId: id }, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBuildAgent = useCallback((id: string) => {
    setAgentId(id);
    setPage("contact");
    window.history.pushState({ page: "contact", agentId: id }, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLogin = () => {
    navigateTo("dashboard");
  };

  const handleLogout = async () => {
    await signOut();
    navigateTo("home");
  };

  // Handle browser back/forward
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const state = e.state;
      setPage(state?.page || "home");
      setAgentId(state?.agentId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPopState);

    // Set initial state if none exists
    if (!window.history.state?.page) {
      window.history.replaceState({ page: "home" }, "");
    }

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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
      {page !== "admin" && <UnfoldNav page={page} setPage={navigateTo} currentUser={currentUser} />}

      {page === "home" && <HomePage setPage={navigateTo} />}
      {/* AgentsPage removed — use homepage gallery instead */}
      {page === "agent-detail" && agentId && <AgentDetailPage agentId={agentId} setPage={navigateTo} />}
      {page === "try-agent" && <TryAgentPage setPage={navigateTo} />}
      {page === "try-listening-agent" && <TryListeningAgentPage setPage={navigateTo} />}
      {page === "try-performance-agent" && <TryPerformanceAgentPage setPage={navigateTo} />}
      {page === "workforce-planning" && <WorkforcePlanningAgent />}
      {page === "pricing" && <PricingPage setPage={navigateTo} />}
      {page === "about" && <AboutPage />}
      {page === "integrations" && <IntegrationsPage />}
      {page === "contact" && <ContactPage />}
      {page === "login" && <AuthPage onLogin={handleLogin} setPage={navigateTo} />}
      {page === "dashboard" && currentUser && (
        <DashboardPage currentUser={currentUser} onLogout={handleLogout} setPage={navigateTo} />
      )}
      {page === "admin" && isAdmin && <AdminDashboard onBack={() => navigateTo("dashboard")} onLogout={handleLogout} />}

      <AgentPickerModal open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={navigateTo} />

      {page === "home" && <OnboardingWalkthrough />}
    </div>
  );
};

export default Index;
