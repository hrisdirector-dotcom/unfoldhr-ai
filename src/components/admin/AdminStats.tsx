interface AdminStatsProps {
  stats: { total: number; builds: number; contacts: number; newCount: number };
}

export function AdminStats({ stats }: AdminStatsProps) {
  const cards = [
    { label: "Total Submissions", value: stats.total, color: "text-foreground" },
    { label: "Build Requests", value: stats.builds, color: "text-primary" },
    { label: "Contact Inquiries", value: stats.contacts, color: "text-primary" },
    { label: "New / Unread", value: stats.newCount, color: "text-destructive" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(c => (
        <div key={c.label} className="bg-card border border-border rounded-xl p-5">
          <div className={`font-display text-2xl mb-1 ${c.color}`}>{c.value}</div>
          <div className="text-xs text-muted-foreground font-medium">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
