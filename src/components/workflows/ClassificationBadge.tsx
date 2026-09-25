import { CLASSIFICATION_MAP } from "@/data/workflows";
import type { Classification } from "@/data/workflows";
import { CLASSIFICATION_STYLES } from "./classificationStyles";

interface Props {
  classification: Classification;
  /** Letter only is never used alone — the label always accompanies it. */
  size?: "sm" | "md";
  className?: string;
  id?: string;
}

export default function ClassificationBadge({ classification, size = "sm", className = "", id }: Props) {
  const meta = CLASSIFICATION_MAP[classification];
  const s = STYLES[classification];
  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 rounded-md font-mono uppercase tracking-wider ${s.chip} ${
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"
      } ${className}`}
    >
      <span className="font-bold">{meta.letter}</span>
      <span className="tracking-[0.12em]">{meta.label}</span>
    </span>
  );
}
