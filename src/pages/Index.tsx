import { useState } from "react";
import { UnfoldNav } from "@/components/UnfoldNav";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import ContactPage from "@/pages/ContactPage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminPage from "@/pages/AdminPage";
import ExplainersPage from "@/pages/ExplainersPage";

type User = { email: string; role: string } | null;

const Index = () => {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [explainerModuleId, setExplainerModuleId] = useState<string | undefined>();

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

  const handleLogin = (user: { email: string; role: string }) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo("home");
  };

  return (
    <div className="min-h-screen bg-background">
      <UnfoldNav page={page} setPage={navigateTo} currentUser={currentUser} />

      {page === "home" && <HomePage setPage={navigateTo} />}
      {page === "explainers" && <ExplainersPage initialModuleId={explainerModuleId} />}
      {page === "about" && <AboutPage />}
      {page === "integrations" && <IntegrationsPage />}
      {page === "contact" && <ContactPage />}
      {page === "login" && <AuthPage onLogin={handleLogin} setPage={navigateTo} />}
      {page === "dashboard" && currentUser && (
        <DashboardPage currentUser={currentUser} onLogout={handleLogout} setPage={navigateTo} />
      )}
      {page === "admin" && currentUser?.role === "admin" && <AdminPage setPage={navigateTo} />}
    </div>
  );
};

export default Index;
