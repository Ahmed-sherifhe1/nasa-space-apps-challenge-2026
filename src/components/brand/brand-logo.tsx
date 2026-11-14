import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  compact?: boolean;
  priority?: boolean;
  className?: string;
}

export function BrandLogo({
  compact = false,
  priority = false,
  className,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={compact ? "/mark.png" : "/logo.png"}
        alt="DELTA 2100 — The Last Line of Defense"
        width={compact ? 256 : 1200}
        height={compact ? 256 : 316}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "w-auto object-contain",
          compact ? "h-9 w-9" : "h-[42px] w-auto sm:h-[46px]",
        )}
      />
    </span>
  );
}
