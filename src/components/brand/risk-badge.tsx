import { cn, riskBorder, riskSurface } from "@/lib/utils";
import type { RiskLevel } from "@/types";

interface RiskBadgeProps {
  level: RiskLevel;
  label?: string;
  className?: string;
}

const riskDot: Record<RiskLevel, string> = {
  Low: "bg-low",
  Moderate: "bg-moderate",
  High: "bg-high",
  Critical: "bg-critical",
};

export function RiskBadge({ level, label, className }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em]",
        riskBorder[level],
        riskSurface[level],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", riskDot[level])} aria-hidden="true" />
      {label ?? level} risk
    </span>
  );
}
