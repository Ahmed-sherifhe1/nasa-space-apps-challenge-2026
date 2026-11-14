import {
  SIMULATION_BUDGET,
  defaultAllocation,
  simulationStrategies,
} from "@/data/simulation";
import type {
  SimulationAllocation,
  SimulationRegion,
  SimulationResult,
  SimulationStrategyId,
  StrategyContribution,
} from "@/types";

type Hazard = "surge" | "rainfall" | "erosion" | "subsidence";

const hazardWeights: Record<Hazard, number> = {
  surge: 0.38,
  rainfall: 0.2,
  erosion: 0.22,
  subsidence: 0.2,
};

const strategyEffects: Record<
  SimulationStrategyId,
  Partial<Record<Hazard, number>>
> = {
  "coastal-barriers": { surge: 0.58, erosion: 0.08 },
  "mangrove-restoration": { surge: 0.12, rainfall: 0.04, erosion: 0.52 },
  "drainage-systems": { surge: 0.04, rainfall: 0.58 },
  "groundwater-management": { subsidence: 0.56, erosion: 0.05 },
};

const hazardLabels: Record<Hazard, string> = {
  surge: "storm surge",
  rainfall: "rainfall flooding",
  erosion: "coastal erosion",
  subsidence: "land subsidence",
};

function saturation(effort: number): number {
  return 1 - Math.exp(-4.2 * Math.max(0, effort));
}

function safeAllocation(allocation: SimulationAllocation): SimulationAllocation {
  return {
    "coastal-barriers": Math.max(0, allocation["coastal-barriers"]),
    "mangrove-restoration": Math.max(0, allocation["mangrove-restoration"]),
    "drainage-systems": Math.max(0, allocation["drainage-systems"]),
    "groundwater-management": Math.max(0, allocation["groundwater-management"]),
  };
}

export function totalAllocated(allocation: SimulationAllocation): number {
  return Object.values(allocation).reduce((sum, value) => sum + value, 0);
}

export function remainingBudget(allocation: SimulationAllocation): number {
  return Math.max(0, SIMULATION_BUDGET - totalAllocated(allocation));
}

export function runSimulation(
  region: SimulationRegion,
  allocationInput: SimulationAllocation,
): SimulationResult {
  const allocation = safeAllocation(allocationInput);
  const spaced = Math.min(totalAllocated(allocation), SIMULATION_BUDGET);

  const returnByStrategy = Object.fromEntries(
    simulationStrategies.map((strategy) => [
      strategy.id,
      saturation(allocation[strategy.id] / SIMULATION_BUDGET),
    ]),
  ) as Record<SimulationStrategyId, number>;

  const hazardReduction: Record<Hazard, number> = {
    surge: 0,
    rainfall: 0,
    erosion: 0,
    subsidence: 0,
  };

  const strategyHazardContribution: Record<
    SimulationStrategyId,
    Record<Hazard, number>
  > = {
    "coastal-barriers": { surge: 0, rainfall: 0, erosion: 0, subsidence: 0 },
    "mangrove-restoration": { surge: 0, rainfall: 0, erosion: 0, subsidence: 0 },
    "drainage-systems": { surge: 0, rainfall: 0, erosion: 0, subsidence: 0 },
    "groundwater-management": { surge: 0, rainfall: 0, erosion: 0, subsidence: 0 },
  };

  for (const strategy of simulationStrategies) {
    const effect = strategyEffects[strategy.id];
    const returned = returnByStrategy[strategy.id];
    for (const [hazard, coefficient] of Object.entries(effect) as [
      Hazard,
      number,
    ][]) {
      const contribution = coefficient * returned;
      strategyHazardContribution[strategy.id][hazard] = contribution;
      hazardReduction[hazard] += contribution;
    }
  }

  const complementarySurge =
    allocation["coastal-barriers"] > 20_000_000 &&
    allocation["mangrove-restoration"] > 8_000_000
      ? 0.035
      : 0;
  const complementaryWater =
    allocation["drainage-systems"] > 15_000_000 &&
    allocation["groundwater-management"] > 8_000_000
      ? 0.025
      : 0;

  hazardReduction.surge += complementarySurge;
  hazardReduction.rainfall += complementaryWater * 0.6;
  hazardReduction.subsidence += complementaryWater * 0.4;

  for (const hazard of Object.keys(hazardReduction) as Hazard[]) {
    hazardReduction[hazard] = Math.min(hazardReduction[hazard], 0.86);
  }

  const compositeProtection =
    hazardReduction.surge * hazardWeights.surge +
    hazardReduction.rainfall * hazardWeights.rainfall +
    hazardReduction.erosion * hazardWeights.erosion +
    hazardReduction.subsidence * hazardWeights.subsidence;

  const protection = Math.min(0.88, compositeProtection * 0.92);
  const landProtected = region.baseline.exposedLand * protection;
  const peopleProtected =
    region.baseline.exposedPopulation * protection * 0.86;
  const agricultureProtected =
    region.baseline.agriculturalLand * Math.min(1, protection * 1.06);
  const damageAvoided =
    region.baseline.annualDamage *
    Math.min(0.9, compositeProtection * 0.84 + complementarySurge * 0.3);
  const score = Math.round(compositeProtection * 100);

  const strategyImpactScores = simulationStrategies.map((strategy) => {
    const weighted = (
      Object.entries(strategyHazardContribution[strategy.id]) as [
        Hazard,
        number,
      ][]
    ).reduce(
      (sum, [hazard, contribution]) =>
        sum + contribution * hazardWeights[hazard],
      0,
    );
    return { strategy, weighted };
  });
  const impactTotal = strategyImpactScores.reduce(
    (sum, item) => sum + item.weighted,
    0,
  );

  const contributions: StrategyContribution[] = strategyImpactScores.map(
    ({ strategy, weighted }) => {
      const share = impactTotal > 0 ? weighted / impactTotal : 0;
      return {
        strategyId: strategy.id,
        name: strategy.name,
        allocated: allocation[strategy.id],
        protectedLand: landProtected * share,
        protectedPeople: peopleProtected * share,
        protectedAgriculture: agricultureProtected * share,
        damageAvoided: damageAvoided * share,
      };
    },
  );

  const ranked = [...contributions].sort(
    (a, b) => b.protectedLand - a.protectedLand,
  );

  const hazardEntries = (
    Object.entries(hazardReduction) as [Hazard, number][]
  ).sort(([, a], [, b]) => a - b);

  const outcome =
    compositeProtection >= 0.48
      ? "Protected"
      : compositeProtection >= 0.32
        ? "Partially protected"
        : "Insufficient protection";
  const outcomeTone =
    outcome === "Protected"
      ? "Low"
      : outcome === "Partially protected"
        ? "Moderate"
        : "Critical";

  const weakness = hazardEntries[0][0];
  const strongestStrategy = ranked[0];
  const residualPopulationExposed = Math.max(
    0,
    region.baseline.exposedPopulation - peopleProtected,
  );
  const residualDamage = Math.max(
    0,
    region.baseline.annualDamage - damageAvoided,
  );

  const narrative =
    outcome === "Protected"
      ? [
          "The portfolio addresses several hazard pathways at once. The simulated shoreline retains more land, shelters more residents and avoids a substantial share of annual damage.",
          `The strongest single contribution comes from ${strongestStrategy.name}. Residual risk remains, especially around ${hazardLabels[weakness]}, where the simulation still shows a protection gap.`,
          "A robust outcome does not mean the region is safe forever. It means the chosen mix buys time and reduces compounding stress while longer-term adaptation continues.",
        ]
      : outcome === "Partially protected"
        ? [
            "The portfolio reduces damage across the region, but it does not close the risk gap. Some communities and landscapes remain exposed.",
            `${strongestStrategy ? strongestStrategy.name : "The selected interventions"} contributes the largest share of protection. ${hazardLabels[weakness]} remains the weakest link in the simulated defense.`,
            "Rebalancing funding toward the underfunded hazard could improve the outcome, but every dollar moved away weakens another part of the system.",
          ]
        : [
            "The allocation leaves a large share of the region's exposure unaddressed in the simulation. Damage is reduced at the margin, but the underlying risk remains high.",
            `The simulation identifies ${hazardLabels[weakness]} as the dominant residual weakness. ${strongestStrategy && strongestStrategy.allocated > 0 ? `${strongestStrategy.name} is doing the most work, but it cannot compensate for the missing interventions.` : "No funded intervention is large enough to shift the outcome."}`,
            "A more balanced portfolio would not guarantee safety, but it would spread protection across more hazard pathways and reduce the chance that one failure mode dominates.",
          ];

  return {
    outcome,
    outcomeTone,
    score,
    exposureBefore: region.baseline.exposedLand,
    exposureAfter: Math.max(0, region.baseline.exposedLand - landProtected),
    landProtected,
    peopleProtected,
    agricultureProtected,
    damageAvoided,
    residualDamage,
    residualPopulationExposed,
    riskReductionPct: protection * 100,
    mostEffectiveStrategy: strongestStrategy?.name ?? "None",
    weakestLink: hazardLabels[weakness],
    contributions,
    narrative,
    assumptions: [
      "This is a provisional educational model, not an engineering, economic or climate forecast.",
      "The $100M budget and intervention costs are illustrative gameplay values.",
      "Each strategy has a saturating benefit curve: additional spending produces diminishing returns.",
      "Combined barriers and mangroves receive a small surge-buffer synergy; combined drainage and groundwater management receive a small water-cycle synergy.",
      "Protection is deterministic and proportional. No random success roll is used.",
      "Benefits are capped below 100%: no allocation can remove all residual risk.",
      "The model uses one stress snapshot and does not simulate storm sequencing, maintenance failure or multi-decade sea-level trajectories.",
    ],
    allocation,
    spent: spaced,
  };
}

export function defaultResult(region: SimulationRegion): SimulationResult {
  return runSimulation(region, defaultAllocation);
}

export const simulationAssumptions = [
  "Intervention impacts are illustrative and educational.",
  "No random outcomes are generated.",
  "Benefits diminish as spending concentrates on one strategy.",
  "Residual risk cannot be reduced to zero.",
];
