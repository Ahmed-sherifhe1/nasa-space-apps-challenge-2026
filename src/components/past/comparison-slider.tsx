"use client";

import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ComparisonImage } from "@/types";
import { cn } from "@/lib/utils";

interface ComparisonSliderProps {
  before: ComparisonImage;
  after: ComparisonImage;
  illustrative?: boolean;
  className?: string;
}

export function ComparisonSlider({
  before,
  after,
  illustrative = false,
  className,
}: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-line bg-panel select-none",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={after.src}
          alt={after.alt}
          unoptimized
          fill
          priority
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            unoptimized
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className={cn("object-cover", illustrative && "saturate-[0.65]")}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-cloud/90 shadow-[0_0_0_1px_rgba(8,16,32,0.35)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cloud/80 bg-navy/85 text-cloud shadow-xl backdrop-blur">
            <MoveHorizontal className="size-4" aria-hidden="true" />
          </span>
        </div>

        <span className="absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-navy/75 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-cloud backdrop-blur">
          Before
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full border border-cyan/30 bg-navy/75 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-cyan backdrop-blur">
          After
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy via-navy/65 to-transparent px-4 pb-4 pt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="max-w-[48%] text-[10px] leading-snug text-cloud/85">{before.caption}</p>
            <p className="max-w-[48%] text-right text-[10px] leading-snug text-cloud/85">
              {after.caption}
            </p>
          </div>
        </div>

        <label className="absolute inset-0 z-30 cursor-ew-resize">
          <span className="sr-only">
            Drag or use arrow keys to compare the before and after images
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-valuetext={`${position}% of the before image visible`}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </label>
      </div>

      <div className="flex flex-col justify-between gap-2 border-t border-line bg-intelligence/70 px-4 py-3 sm:flex-row sm:items-center">
        <p className="font-mono text-[8px] uppercase tracking-[0.11em] text-muted">
          {before.credit}
        </p>
        <p className="font-mono text-[8px] uppercase tracking-[0.11em] text-muted">
          {after.credit}
        </p>
      </div>
    </div>
  );
}
