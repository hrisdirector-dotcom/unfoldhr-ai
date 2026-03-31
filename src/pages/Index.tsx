import { useState, useEffect } from "react";
import { UnfoldNav } from "@/components/UnfoldNav";
import { useAuth } from "@/hooks/useAuth";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import ContactPage from "@/pages/ContactPage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminDashboard from "@/pages/AdminDashboard";
import ExplainersPage from "@/pages/ExplainersPage";
import WorkforcePlanningAgent from "@/pages/WorkforcePlanningAgent";

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
    // Auth state is now managed by useAuth hook
    navigateTo("dashboard");
  };

  const handleLogout = async () => {
    await signOut();
    navigateTo("home");
  };

  // Redirect away from protected pages if not logged in
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
