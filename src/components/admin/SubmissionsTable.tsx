import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Submission } from "@/hooks/useSubmissions";

interface Props {
  submissions: Submission[];
  loading: boolean;
  onSelect: (s: Submission) => void;
}

const statusStyles: Record<string, string> = {
  new: "bg-accent text-primary",
  in_progress: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
  archived: "bg-muted text-muted-foreground",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function typeLabel(t: string) {
  return t === "build_request" ? "Build Request" : "Contact";
}

export function SubmissionsTable({ submissions, loading, onSelect }: Props) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <p className="text-sm text-muted-foreground">Loading submissions…</p>
      </div>
    );
  }

  if (!submissions.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <p className="text-sm text-muted-foreground">No submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="text-xs font-semibold uppercase tracking-wider">Date</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider">Company</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider">Contact</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider">Email</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider">Type</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map(s => (
            <TableRow
              key={s.id}
              onClick={() => onSelect(s)}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                {formatDate(s.created_at)}
              </TableCell>
              <TableCell className="text-sm font-medium text-foreground">
                {s.company_name || "—"}
              </TableCell>
              <TableCell className="text-sm text-foreground">{s.contact_name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{s.email}</TableCell>
              <TableCell>
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-muted text-foreground">
                  {typeLabel(s.request_type)}
                </span>
              </TableCell>
              <TableCell>
                <span className={`text-xs font-medium px-2 py-1 rounded-md capitalize ${statusStyles[s.status] || ""}`}>
                  {s.status.replace("_", " ")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
