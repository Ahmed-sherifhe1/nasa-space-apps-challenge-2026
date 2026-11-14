"use client";

import { OnboardingProvider } from "@/components/onboarding/onboarding-provider";
import { AppShell } from "@/components/app/app-shell";
import { useEffect } from "react";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Auto-start on first visit to /app if no tour has been completed/skipped
  useEffect(() => {
    const stored = localStorage.getItem("delta2100_onboarding");
    if (!stored) {
      const alreadyStarted = localStorage.getItem("delta2100_onboarding_started");
      if (!alreadyStarted) {
        localStorage.setItem("delta2100_onboarding_started", "true");
      }
    }
  }, []);

  return (
    <OnboardingProvider>
      <AppShell>
        {children}
      </AppShell>
    </OnboardingProvider>
  );
}