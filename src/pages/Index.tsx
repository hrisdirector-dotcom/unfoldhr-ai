import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UnfoldNav } from "@/components/UnfoldNav";
import { useAuth } from "@/hooks/useAuth";
import AgentPickerModal from "@/components/AgentPickerModal";
import Seo from "@/components/Seo";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import ContactPage from "@/pages/ContactPage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminDashboard from "@/pages/AdminDashboard";
import TryListeningAgentPage from "@/pages/TryListeningAgentPage";
import TryPerformanceAgentPage from "@/pages/TryPerformanceAgentPage";
import TryAgentPage from "@/pages/TryAgentPage";
import PricingPage from "@/pages/PricingPage";
import WorkforcePlanningAgent from "@/pages/WorkforcePlanningAgent";
import TryUSWorkforceAgentPage from "@/pages/TryUSWorkforceAgentPage";
import ExecutiveDeckPage from "@/pages/ExecutiveDeckPage";
import ExecutiveSnapshotPage from "@/pages/ExecutiveSnapshotPage";
import TodayDecisionsPage from "@/pages/TodayDecisionsPage";
import GlobalLifecycleAgentPage from "@/pages/GlobalLifecycleAgentPage";
import LeaveControlAgentPage from "@/pages/LeaveControlAgentPage";
import CompensationChangeAgentPage from "@/pages/CompensationChangeAgentPage";
import AgentsPage from "@/pages/AgentsPage";
import WorkflowsPage from "@/pages/WorkflowsPage";
import AgentDetailPage from "@/pages/AgentDetailPage";
import ServicesPage from "@/pages/ServicesPage";
import NotFound from "@/pages/NotFound";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import { canonicalPathFor, metaForRoute, pathForPage, resolveAlias, resolvePath } from "@/lib/routes";
import type { SavedRun } from "@/hooks/useSavedRuns";

export type InquiryPreset = { type: string; n: number };

/** Scroll to a fragment target once it exists, without a fixed timer. */
function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  let frames = 0;
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (frames++ < 90) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [deckState, setDeckState] = useState<{
    run: SavedRun;
    branding: { logoUrl: string | null; primaryColor: string; accentColor: string };
  } | null>(null);
  const { user, isAdmin, loading, signOut } = useAuth();

  const route = useMemo(() => resolvePath(location.pathname), [location.pathname]);
  const page = route.page;
  const agentId = route.agentId;
  const workflowId = route.workflowId;
  const meta = useMemo(() => metaForRoute(route), [route]);
  const canonicalPath = useMemo(() => canonicalPathFor(route), [route]);

  const inquiryState = (location.state as { inquiry?: InquiryPreset } | null)?.inquiry ?? null;

  const currentUser = user ? { email: user.email || "", role: isAdmin ? "admin" : "user" } : null;

  const navigateTo = useCallback(
    (p: string, replace = false) => {
      if (p === "try-picker") {
        setPickerOpen(true);
        return;
      }
      const resolved = resolveAlias(p);
      if (resolved === "our-method") {
        navigate({ pathname: "/", hash: "#our-method" });
        return;
      }
      navigate(pathForPage(resolved), { replace });
    },
    [navigate],
  );

  const navigateToWorkflow = useCallback(
    (id: string) => {
      navigate(`/workflows/${id}`);
    },
    [navigate],
  );

  const setWorkflowSelection = useCallback(
    (id: string | null) => {
      navigate(id ? `/workflows/${id}` : "/workflows");
    },
    [navigate],
  );

  const goToInquiry = useCallback(
    (type: string) => {
      navigate(
        { pathname: "/", hash: "#final-cta" },
        { state: { inquiry: { type, n: Date.now() } } },
      );
    },
    [navigate],
  );

  const navigateToAgent = useCallback(
    (id: string) => {
      navigate(`/agents/${id}`);
    },
    [navigate],
  );

  const handleBuildAgent = useCallback(
    (agentId?: string) => {
      // Agent context travels in router state only — never in the address.
      navigate("/contact", agentId ? { state: { agentId } } : undefined);
    },
    [navigate],
  );

  const handleLogin = () => navigateTo("dashboard");

  const handleLogout = async () => {
    await signOut();
    navigateTo("home");
  };

  // Legacy alias: /snapshot keeps working and settles on the canonical address.
  useEffect(() => {
    if (route.redirectTo && route.redirectTo !== location.pathname) {
      navigate(route.redirectTo, { replace: true });
    }
  }, [route.redirectTo, location.pathname, navigate]);

  // Scroll handling: fragment targets scroll into view, everything else starts at the top.
  useEffect(() => {
    if (location.hash) {
      scrollToHash(location.hash);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.hash, location.key]);

  // Protected screens keep their existing access behaviour.
  useEffect(() => {
    if (!loading && !user && (page === "dashboard" || page === "admin" || page === "today-decisions")) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, page, navigate]);

  // A signed-in account without the admin role never lands on a blank admin screen.
  useEffect(() => {
    if (!loading && user && page === "admin" && !isAdmin) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, isAdmin, page, navigate]);

  // The executive deck depends on data handed over in memory; never show a blank screen.
  useEffect(() => {
    if (!loading && page === "executive-deck" && !deckState) {
      navigate(user ? "/dashboard" : "/login", { replace: true });
    }
  }, [loading, page, deckState, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  if (route.notFound) {
    return (
      <>
        <Seo title={meta.title} description={meta.description} path={null} noindex />
        <NotFound />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={meta.title}
        description={meta.description}
        path={canonicalPath}
        noindex={meta.noindex}
      />

      {page !== "admin" && (
        <UnfoldNav page={page} setPage={navigateTo} currentUser={currentUser} onDiscussWorkflow={() => goToInquiry("Workflow Redesign Sprint")} />
      )}

      {page === "home" && (
        <HomePage
          setPage={navigateTo}
          onOpenWorkflow={navigateToWorkflow}
          inquiry={inquiryState}
          onDiscussWorkflow={() => goToInquiry("Workflow Redesign Sprint")}
        />
      )}
      {page === "services" && (
        <ServicesPage setPage={navigateTo} onDiscussWorkflow={() => goToInquiry("Workflow Redesign Sprint")} />
      )}
      {page === "try-listening-agent" && <TryListeningAgentPage setPage={navigateTo} />}
      {page === "try-performance-agent" && <TryPerformanceAgentPage setPage={navigateTo} />}
      {page === "try-us-workforce-agent" && <TryUSWorkforceAgentPage setPage={navigateTo} />}
      {page === "try-agent" && <TryAgentPage setPage={navigateTo} />}
      {page === "agents" && (
        <AgentsPage
          onSelectAgent={navigateToAgent}
          onBuildAgent={handleBuildAgent}
          setPage={navigateTo}
          onDiscussAgentImplementation={() => goToInquiry("Agent Platform / Agent Implementation")}
        />
      )}
      {page === "workflows" && (
        <WorkflowsPage
          setPage={navigateTo}
          initialWorkflowId={workflowId}
          onSelectWorkflow={setWorkflowSelection}
        />
      )}
      {page === "agent-detail" && agentId && <AgentDetailPage agentId={agentId} setPage={navigateTo} />}
      {page === "global-lifecycle-agent" && <GlobalLifecycleAgentPage setPage={navigateTo} />}
      {page === "leave-control-agent" && <LeaveControlAgentPage setPage={navigateTo} />}
      {page === "compensation-change-agent" && <CompensationChangeAgentPage setPage={navigateTo} />}
      {page === "workforce-planning" && <WorkforcePlanningAgent setPage={navigateTo} />}
      {page === "pricing" && <PricingPage setPage={navigateTo} />}
      {page === "about" && <AboutPage />}
      {page === "integrations" && <IntegrationsPage />}
      {page === "contact" && <ContactPage />}
      {page === "login" && <AuthPage onLogin={handleLogin} setPage={navigateTo} />}
      {page === "dashboard" && currentUser && (
        <DashboardPage
          currentUser={currentUser}
          onLogout={handleLogout}
          setPage={navigateTo}
          onGenerateDeck={(run, branding) => {
            setDeckState({ run, branding });
            navigateTo("executive-deck");
          }}
        />
      )}
      {page === "executive-deck" && deckState && (
        <ExecutiveDeckPage run={deckState.run} branding={deckState.branding} onBack={() => navigateTo("dashboard")} />
      )}
      {page === "executive-snapshot" && <ExecutiveSnapshotPage />}
      {page === "today-decisions" && currentUser && <TodayDecisionsPage setPage={navigateTo} />}
      {page === "admin" && isAdmin && <AdminDashboard onBack={() => navigateTo("dashboard")} onLogout={handleLogout} />}

      <AgentPickerModal open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={navigateTo} />

      {page === "home" && <OnboardingWalkthrough />}
    </div>
  );
};

export default Index;
