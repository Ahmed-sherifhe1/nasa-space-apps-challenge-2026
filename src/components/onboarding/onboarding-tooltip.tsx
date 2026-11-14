"use client";

import { useEffect, useRef, useState } from "react";

type OnboardingStep = {
  id: string;
  title: string;
  explanation: string;
  target: string;
};

type TooltipProps = {
  isActive: boolean;
  step: OnboardingStep | null;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onSkipPage: () => void;
  onSkipAll: () => void;
};

export const OnboardingTooltip = ({
  isActive,
  step,
  currentStepIndex,
  totalSteps,
  onNext,
  onSkipPage,
  onSkipAll,
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"top" | "bottom" | "left" | "right">("top");

  useEffect(() => {
    if (!isActive || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const rect = tooltip.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };

    const candidates = ["top", "bottom", "left", "right"];
    let best = "top";
    let bestScore = -Infinity;

    for (const cand of candidates) {
      let score = 0;
      if (cand === "top") score = viewport.height - rect.top - rect.height > 20 ? 1 : -1;
      else if (cand === "bottom") score = rect.top > 20 ? 1 : -1;
      else if (cand === "left") score = viewport.width - rect.left - rect.width > 20 ? 1 : -1;
      else if (cand === "right") score = rect.left > 20 ? 1 : -1;
      if (score > bestScore) {
        bestScore = score;
        best = cand;
      }
    }
    setPlacement(best as "top" | "bottom" | "left" | "right");
  }, [isActive]);

  if (!isActive || !step) return null;

  const progressText = `${currentStepIndex + 1} of ${totalSteps}`;

  return (
    <div
      ref={tooltipRef}
      style={{
        position: "fixed",
        zIndex: 1002,
        maxWidth: "260px",
        background: "rgba(8, 16, 32, 0.85)",
        border: "1px solid #101B35",
        borderRadius: "6px",
        color: "#F8FAFC",
        fontFamily: "Space Grotesk, system-ui, sans-serif",
        padding: "16px 18px",
        lineHeight: 1.4,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">
          Step {progressText} / {totalSteps}
        </div>
        <h4 className="font-medium text-cloud text-sm">{step.title}</h4>
        <p className="text-muted/60 text-sm">{step.explanation}</p>
        <div className="mt-4 flex justify-between gap-2">
          <button
            onClick={onSkipPage}
            className="py-1 px-2 text-[9px] uppercase tracking-wider text-muted rounded-control bg-control/20 hover:bg-control/30 transition-colors"
          >
            Skip Page
          </button>
          <button
            onClick={onSkipAll}
            className="py-1 px-2 text-[9px] uppercase tracking-wider text-muted rounded-control bg-control/20 hover:bg-control/30 transition-colors"
          >
            Skip All
          </button>
          <button
            onClick={onNext}
            className="py-1 px-2 text-[9px] uppercase tracking-wider text-intelligence bg-intelligence rounded-control hover:bg-intelligence/90 transition-colors font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};