import { cn, statusLabel, statusTone } from "@/lib/utils";
import type { DataStatus } from "@/types";

interface DataStatusBadgeProps {
  status: DataStatus;
  className?: string;
}

export function DataStatusBadge({ status, className }: DataStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]",
        statusTone[status],
        className,
      )}
      title={
        status === "demo" || status === "illustrative"
          ? "Illustrative or demonstration data — not a verified measurement."
          : undefined
      }
    >
      {status === "observed" || status === "projected" ? (
        <span className="size-1 rounded-full bg-current" aria-hidden="true" />
      ) : null}
      {statusLabel[status]}
    </span>
  );
}
