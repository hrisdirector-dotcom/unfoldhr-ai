import { useState } from "react";
import { useSubmissions, type Submission } from "@/hooks/useSubmissions";
import { SubmissionDetailModal } from "@/components/admin/SubmissionDetailModal";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SubmissionsTable } from "@/components/admin/SubmissionsTable";
import { AdminStats } from "@/components/admin/AdminStats";
import AdminAgentStudio from "@/pages/AdminAgentStudio";

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

type AdminView = "all" | "builds" | "contacts" | "agent-studio";

export default function AdminDashboard({ onBack, onLogout }: AdminDashboardProps) {
  const { submissions, loading, updateStatus } = useSubmissions();
  const [activeView, setActiveView] = useState<AdminView>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const filtered = submissions.filter(s => {
    if (activeView === "builds") return s.request_type === "build_request";
    if (activeView === "contacts") return s.request_type === "contact";
    return true;
  });

  const stats = {
    total: submissions.length,
    builds: submissions.filter(s => s.request_type === "build_request").length,
    contacts: submissions.filter(s => s.request_type === "contact").length,
    newCount: submissions.filter(s => s.status === "new").length,
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onBack={onBack}
        onLogout={onLogout}
        stats={stats}
      />

      {activeView === "agent-studio" ? (
        <AdminAgentStudio />
      ) : (
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="font-display text-3xl text-foreground mb-1">
                {activeView === "all" ? "All Submissions" : activeView === "builds" ? "Build Requests" : "Contact Inquiries"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {filtered.length} submission{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            <AdminStats stats={stats} />

            <SubmissionsTable
              submissions={filtered}
              loading={loading}
              onSelect={setSelectedSubmission}
            />
          </div>
        </main>
      )}

      <SubmissionDetailModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        onStatusChange={updateStatus}
      />
    </div>
  );
}
