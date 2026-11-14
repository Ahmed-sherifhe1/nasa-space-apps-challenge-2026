import type { RiskLevel } from "@/types";
import { cn } from "@/lib/utils";

const colors: Record<RiskLevel, string> = {
  Critical: "#EF4444",
  High: "#F97316",
  Moderate: "#F5C542",
  Low: "#35B86B",
};

interface SparklineProps {
  values: number[];
  risk: RiskLevel;
  className?: string;
}

export function Sparkline({ values, risk, className }: SparklineProps) {
  const width = 104;
  const height = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * (width - 4) + 2;
    const y = height - 4 - ((value - min) / span) * (height - 8);
    return [x, y] as const;
  });
  const path = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-8 w-[104px]", className)}
      aria-hidden="true"
    >
      <path
        d={`${path} L${width - 2},${height} L2,${height} Z`}
        fill={colors[risk]}
        opacity="0.07"
      />
      <path
        d={path}
        fill="none"
        stroke={colors[risk]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {last ? <circle cx={last[0]} cy={last[1]} r="2" fill={colors[risk]} /> : null}
    </svg>
  );
}
