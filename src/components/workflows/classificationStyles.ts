import type { Classification } from "@/data/workflows";

export const CLASSIFICATION_STYLES: Record<
  Classification,
  { chip: string; dot: string; ring: string }
> = {
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
  return CLASSIFICATION_STYLES[c];
}
