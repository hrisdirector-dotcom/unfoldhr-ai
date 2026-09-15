import { CLASSIFICATION_MAP } from "@/data/workflows";
import type { Classification } from "@/data/workflows";

const STYLES: Record<Classification, { chip: string; dot: string; ring: string }> = {
  eliminate: {
    chip: "bg-cls-eliminate-soft text-cls-eliminate",
    dot: "bg-cls-eliminate",
    ring: "border-cls-eliminate/30",
  },
  human: {
    chip: "bg-cls-human-soft text-cls-human",
    dot: "bg-cls-human",
    ring: "border-cls-human/30",
  },
  deterministic: {
    chip: "bg-cls-deterministic-soft text-cls-deterministic",
    dot: "bg-cls-deterministic",
    ring: "border-cls-deterministic/30",
  },
  agent: {
    chip: "bg-cls-agent-soft text-cls-agent",
    dot: "bg-cls-agent",
    ring: "border-cls-agent/30",
  },
};

export function classificationStyles(c: Classification) {
  return STYLES[c];
}

interface Props {
  classification: Classification;
  /** Letter only is never used alone — the label always accompanies it. */
  size?: "sm" | "md";
  className?: string;
}

export default function ClassificationBadge({ classification, size = "sm", className = "" }: Props) {
  const meta = CLASSIFICATION_MAP[classification];
  const s = STYLES[classification];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-mono uppercase tracking-wider ${s.chip} ${
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"
      } ${className}`}
    >
      <span className="font-bold">{meta.letter}</span>
      <span className="tracking-[0.12em]">{meta.label}</span>
    </span>
  );
}
