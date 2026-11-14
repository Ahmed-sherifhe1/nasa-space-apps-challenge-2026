"use client";

import { useOnboarding } from "./onboarding-provider";
import { useState } from "react";

export const HelpButton = () => {
  const { state, start } = useOnboarding();
  const [showTour, setShowTour] = useState(false);

  const handleClick = () => {
    if (state.status === "completed" || state.status === "skipped") {
      start();
      setShowTour(true);
    } else if (state.status === "in-progress") {
      setShowTour(false);
    } else {
      start();
      setShowTour(true);
    }
  };

  const btnClassName = "flex items-center gap-2 rounded-full border border-amber/25 bg-amber/[0.07] text-amber px-3 py-1.5 text-[8px] uppercase tracking-wider hover:bg-amber/15 transition-colors";

  return (
    <button
      onClick={handleClick}
      className={btnClassName}
      aria-label="Take a tour or replay instructions"
    >
      {state.status === "in-progress" ? "Tour active" : "Help"}
      {state.status === "in-progress" && (
        <svg
          className="size-4 -mr-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1={3} y1={5} x2={21} y2={5} />
          <line x1={3} y1={12} x2={21} y2={12} />
          <line x1={3} y1={19} x2={21} y2={19} />
        </svg>
      )}
      {showTour && (
        <svg
          className="size-4 rotate-180 mr-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1={3} y1={5} x2={21} y2={5} />
          <line x1={3} y1={12} x2={21} y2={12} />
          <line x1={3} y1={19} x2={21} y2={19} />
        </svg>
      )}
    </button>
  );
}