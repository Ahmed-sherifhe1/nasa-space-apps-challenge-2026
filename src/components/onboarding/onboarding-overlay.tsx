"use client";

import { useEffect } from "react";

type OverlayProps = {
  isActive: boolean;
  spotlightX: number;
  spotlightY: number;
  spotlightW: number;
  spotlightH: number;
  spotlightPadding?: number;
};

export const OnboardingOverlay = ({
  isActive,
  spotlightX,
  spotlightY,
  spotlightW,
  spotlightH,
  spotlightPadding = 20,
}: OverlayProps) => {
  useEffect(() => {
    if (!isActive) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  if (!isActive) return null;

  const spotlightStyle: React.CSSProperties = {
    position: "fixed",
    left: spotlightX - spotlightPadding + "px",
    top: spotlightY - spotlightPadding + "px",
    width: spotlightW + spotlightPadding * 2 + "px",
    height: spotlightH + spotlightPadding * 2 + "px",
    pointerEvents: "none",
    zIndex: 1000,
    border: "2px solid #00B8D9",
    borderRadius: "4px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.7)",
    pointerEvents: "auto",
    zIndex: 999,
  };

  return (
    <>
      <div style={overlayStyle} />
      <div style={spotlightStyle} />
    </>
  );
};