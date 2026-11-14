import type { TrendSeries } from "@/types";
import { cn } from "@/lib/utils";

interface LineChartProps {
  series: TrendSeries[];
  className?: string;
}

const colors = ["#00B8D9", "#F59E0B", "#F97316"];

function pathFor(values: number[], min: number, max: number, width: number, height: number, offsetX: number, offsetY: number) {
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = offsetX + (index / Math.max(values.length - 1, 1)) * width;
      const y = offsetY + (1 - (value - min) / span) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function LineChart({ series, className }: LineChartProps) {
  const width = 720;
  const height = 260;
  const margin = { top: 26, right: 18, bottom: 36, left: 46 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const values = series.flatMap((item) => item.values);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const padding = (rawMax - rawMin) * 0.12 || 1;
  const min = rawMin - padding;
  const max = rawMax + padding;
  const years = series[0]?.years ?? [];
  const labelIndices = [0, Math.floor((years.length - 1) / 4), Math.floor((years.length - 1) / 2), Math.floor(((years.length - 1) * 3) / 4), years.length - 1];

  return (
    <div className={cn("", className)}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {series.map((item, index) => (
          <span key={item.label} className="inline-flex items-center gap-1.5 text-[9px] text-muted">
            <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} aria-hidden="true" />
            {item.label}
          </span>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 w-full"
        role="img"
        aria-label={`Trend chart: ${series.map((item) => `${item.label}, ${item.unit}`).join("; ")}`}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = margin.top + tick * plotHeight;
          const value = max - tick * (max - min);
          return (
            <g key={tick}>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={y}
                y2={y}
                stroke="#263B58"
                strokeWidth="0.7"
                strokeDasharray={tick === 1 ? undefined : "3 5"}
              />
              <text
                x={margin.left - 8}
                y={y + 3}
                textAnchor="end"
                fill="#7E91AA"
                fontSize="8"
                fontFamily="var(--font-ibm-plex-mono), monospace"
              >
                {value.toFixed(0)}
              </text>
            </g>
          );
        })}

        {labelIndices.map((index) => {
          const x = margin.left + (index / Math.max(years.length - 1, 1)) * plotWidth;
          return (
            <text
              key={index}
              x={x}
              y={height - 14}
              textAnchor="middle"
              fill="#7E91AA"
              fontSize="8"
              fontFamily="var(--font-ibm-plex-mono), monospace"
            >
              {years[index]}
            </text>
          );
        })}

        {series.map((item, index) => (
          <path
            key={item.label}
            d={pathFor(item.values, min, max, plotWidth, plotHeight, margin.left, margin.top)}
            fill="none"
            stroke={colors[index % colors.length]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        <text
          x={margin.left}
          y={14}
          fill="#9AAAC0"
          fontSize="8"
          fontFamily="var(--font-ibm-plex-mono), monospace"
          letterSpacing="0.08em"
        >
          {series[0]?.unit}
        </text>
      </svg>

      <div className="mt-2 space-y-1">
        {series.map((item) => (
          <p key={item.label} className="text-[9px] leading-relaxed text-muted/75">
            <span className="text-muted">{item.source}.</span> {item.note}
          </p>
        ))}
      </div>
    </div>
  );
}
