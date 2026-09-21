/**
 * Control-Agent verdict vocabulary and shared display helpers.
 * ------------------------------------------------------------
 * Kept in a non-component module so the framework file exports
 * components only (fast refresh stays intact).
 */
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

/** Canonical verdict vocabulary shared by every Control & Readiness agent. */
export type ControlVerdict = "Ready" | "Approval Required" | "Held";

export const CONTROL_VERDICT_STYLES: Record<
  ControlVerdict,
  {
    dot: string;
    text: string;
    bg: string;
    border: string;
    chip: string;
    headline: string;
    icon: LucideIcon;
  }
> = {
  Ready: {
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    chip: "border-emerald-200 text-emerald-700 bg-emerald-50",
    headline: "Ready to progress",
    icon: CheckCircle2,
  },
  "Approval Required": {
    dot: "bg-blue-500",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    chip: "border-blue-200 text-blue-700 bg-blue-50",
    headline: "Approval required to release",
    icon: AlertTriangle,
  },
  Held: {
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    chip: "border-red-200 text-red-700 bg-red-50",
    headline: "Held for control review",
    icon: ShieldAlert,
  },
};

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
