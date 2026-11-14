"use client";

import { createContext, useContext, useState, useEffect } from "react";

type OnboardingStep = {
  id: string;
  title: string;
  explanation: string;
  target: string;
};

type OnboardingScreen =
  | "dashboard"
  | "past"
  | "risk-intelligence"
  | "regional-dashboard"
  | "last-100-years";

type OnboardingStatus = "idle" | "in-progress" | "completed" | "skipped";

type OnboardingState = {
  status: OnboardingStatus;
  currentStep: number;
  screen: OnboardingScreen;
  screenVisited: boolean;
  completed: boolean;
  skipped: boolean;
};

const OnboardingContext = createContext<{
  state: OnboardingState;
  start: () => void;
  next: () => void;
  skipPage: () => void;
  skipAll: () => void;
  reset: () => void;
}>({
  state: {
    status: "idle",
    currentStep: 0,
    screen: "dashboard" as OnboardingScreen,
    screenVisited: false,
    completed: false,
    skipped: false,
  },
  start: () => {},
  next: () => {},
  skipPage: () => {},
  skipAll: () => {},
  reset: () => {},
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<OnboardingState>(() => {
    const stored = typeof window !== "undefined"
      ? localStorage.getItem("delta2100_onboarding")
      : null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.status === "completed" || parsed.status === "skipped") {
          return {
            status: parsed.status as OnboardingStatus,
            currentStep: 0,
            screen: "dashboard" as OnboardingScreen,
            screenVisited: false,
            completed: false,
            skipped: false,
          };
        }
        return {
          status: parsed.status as OnboardingStatus,
          currentStep: parsed.currentStep ?? 0,
          screen: parsed.screen as OnboardingScreen ?? "dashboard",
          screenVisited: parsed.screenVisited ?? false,
          completed: parsed.completed ?? false,
          skipped: parsed.skipped ?? false,
        };
      } catch {
        // corrupted – fall through to idle
      }
    }

    return {
      status: "idle",
      currentStep: 0,
      screen: "dashboard" as OnboardingScreen,
      screenVisited: false,
      completed: false,
      skipped: false,
    };
  });

  useEffect(() => {
    if (state.status === "idle") return;
    try {
      localStorage.setItem(
        "delta2100_onboarding",
        JSON.stringify({
          status: state.status,
          currentStep: state.currentStep,
          screen: state.screen,
          screenVisited: state.screenVisited,
          completed: state.completed,
          skipped: state.skipped,
        })
      );
    } catch {
      // ignore localStorage errors
    }
  }, [state]);

  const start = () => {
    setState({
      status: "in-progress",
      currentStep: 0,
      screen: "dashboard" as OnboardingScreen,
      screenVisited: true,
      completed: false,
      skipped: false,
    });
  };

  const next = () => {
    setState((prev) => {
      if (prev.status !== "in-progress") return prev;

      const screenOrder: OnboardingScreen[] = [
        "dashboard",
        "past",
        "risk-intelligence",
        "regional-dashboard",
        "last-100-years",
      ];
      const currentIdx = screenOrder.indexOf(prev.screen);
      const nextIdx = currentIdx + 1;

      if (nextIdx >= screenOrder.length) {
        return { ...prev, status: "completed" };
      }

      return {
        ...prev,
        currentStep: 0,
        screen: screenOrder[nextIdx],
        screenVisited: true,
      };
    });
  };

  const skipPage = () => {
    setState((prev) => {
      if (prev.status !== "in-progress") return prev;

      const screenOrder: OnboardingScreen[] = [
        "dashboard",
        "past",
        "risk-intelligence",
        "regional-dashboard",
        "last-100-years",
      ];
      const currentIdx = screenOrder.indexOf(prev.screen);
      const nextIdx = currentIdx + 1;

      if (nextIdx < screenOrder.length) {
        return {
          ...prev,
          currentStep: 0,
          screen: screenOrder[nextIdx],
          screenVisited: true,
        };
      }
      return { ...prev, status: "completed" };
    });
  };

  const skipAll = () => {
    setState({ status: "skipped", currentStep: 0, screen: "dashboard" as OnboardingScreen, screenVisited: false, completed: false, skipped: true });
  };

  const reset = () => {
    setState({ status: "idle", currentStep: 0, screen: "dashboard" as OnboardingScreen, screenVisited: false, completed: false, skipped: false });
  };

  return (
    <OnboardingContext.Provider value={{ state, start, next, skipPage, skipAll, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}