import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Submission } from "@/hooks/useSubmissions";

interface Props {
  submission: Submission | null;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => Promise<{ error: unknown }>;
}

const STATUSES = ["new", "in_progress", "resolved", "archived"] as const;

const statusStyles: Record<string, string> = {
  new: "bg-accent text-primary border-primary/20",
  in_progress: "bg-amber-50 text-amber-700 border-amber-200",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  archived: "bg-muted text-muted-foreground border-border",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function SubmissionDetailModal({ submission, onClose, onStatusChange }: Props) {
  if (!submission) return null;

  const handleStatus = async (status: string) => {
    await onStatusChange(submission.id, status);
  };

  return (
    <Dialog open={!!submission} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {submission.request_type === "build_request" ? "Build Request" : "Contact Inquiry"}
          </DialogTitle>
          <DialogDescription>
            Submitted {formatDate(submission.created_at)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Contact Name" value={submission.contact_name} />
            <Field label="Email" value={submission.email} />
            <Field label="Company" value={submission.company_name || "—"} />
            {submission.module && <Field label="Module" value={submission.module} />}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
              Message
            </label>
            <div className="bg-muted rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {submission.message}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
              Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => handleStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer capitalize transition-all ${
                    submission.status === s
                      ? statusStyles[s]
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {submission.updated_at !== submission.created_at && (
            <p className="text-xs text-muted-foreground">
              Last updated: {formatDate(submission.updated_at)}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
        {label}
      </label>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}
