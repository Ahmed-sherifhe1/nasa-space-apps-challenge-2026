import { create } from "zustand";
import { SIMULATION_BUDGET, defaultAllocation, getSimulationRegion } from "@/data/simulation";
import { runSimulation, totalAllocated } from "@/features/simulation/model";
import type {
  SimulationAllocation,
  SimulationResult,
  SimulationStrategyId,
} from "@/types";

export type SimulationStage =
  | "launch"
  | "warning"
  | "disaster"
  | "decision"
  | "consequences"
  | "legacy";

interface SimulationState {
  stage: SimulationStage;
  regionId: string | null;
  allocation: SimulationAllocation;
  result: SimulationResult | null;
  start: () => void;
  chooseRegion: (regionId: string) => void;
  beginScenario: () => void;
  goToDecision: () => void;
  setAllocation: (strategyId: SimulationStrategyId, amount: number) => void;
  resetAllocation: () => void;
  confirmAllocation: () => void;
  complete: () => void;
  replay: () => void;
  reset: () => void;
}

const freshAllocation = (): SimulationAllocation => ({ ...defaultAllocation });

export const useSimulationStore = create<SimulationState>((set, get) => ({
  stage: "launch",
  regionId: null,
  allocation: freshAllocation(),
  result: null,

  start: () => set({ stage: "warning" }),

  chooseRegion: (regionId) => set({ regionId, result: null }),

  beginScenario: () => {
    if (get().regionId) set({ stage: "disaster" });
  },

  goToDecision: () => set({ stage: "decision" }),

  setAllocation: (strategyId, amount) => {
    const state = get();
    const safeAmount = Math.max(0, Math.round(amount));
    const otherTotal = totalAllocated(state.allocation) - state.allocation[strategyId];
    const capped = Math.min(safeAmount, SIMULATION_BUDGET - otherTotal);
    set({
      allocation: {
        ...state.allocation,
        [strategyId]: Math.max(0, capped),
      },
      result: null,
    });
  },

  resetAllocation: () => set({ allocation: freshAllocation(), result: null }),

  confirmAllocation: () => {
    const { regionId, allocation } = get();
    const region = regionId ? getSimulationRegion(regionId) : undefined;
    if (!region) return;
    set({
      result: runSimulation(region, allocation),
      stage: "consequences",
    });
  },

  complete: () => set({ stage: "legacy" }),

  replay: () =>
    set({
      stage: "warning",
      result: null,
      allocation: freshAllocation(),
    }),

  reset: () =>
    set({
      stage: "launch",
      regionId: null,
      allocation: freshAllocation(),
      result: null,
    }),
}));
