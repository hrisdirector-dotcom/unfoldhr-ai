interface LevelBadgeProps {
  level: "beg" | "int" | "adv";
  label: string;
}

export function LevelBadge({ level, label }: LevelBadgeProps) {
  const styles = {
    beg: "bg-emerald-50 text-emerald-700",
    int: "bg-accent text-accent-foreground",
    adv: "bg-orange-50 text-orange-600",
  };

  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${styles[level]}`}>
      {label}
    </span>
  );
}
