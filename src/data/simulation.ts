import type {
  SimulationAllocation,
  SimulationRegion,
  SimulationStrategy,
} from "@/types";

export const SIMULATION_BUDGET = 100_000_000;

export const simulationStrategies: SimulationStrategy[] = [
  {
    id: "coastal-barriers",
    name: "Coastal Barriers",
    shortName: "Barriers",
    description:
      "Engineered surge gates, sea walls and dune reinforcement that reduce wave energy and storm-surge penetration.",
    tradeoff:
      "Strong surge protection, but expensive to maintain and can create a false sense of safety if subsidence continues.",
    color: "#00B8D9",
    defaultAllocation: 40_000_000,
    primaryHazard: "Storm surge",
  },
  {
    id: "mangrove-restoration",
    name: "Mangrove Restoration",
    shortName: "Mangroves",
    description:
      "Re-establishing living coastal buffers that attenuate waves, trap sediment and support fisheries.",
    tradeoff:
      "Slow to mature and vulnerable to oil spills or heat stress, but offers erosion and ecological co-benefits.",
    color: "#35B86B",
    defaultAllocation: 20_000_000,
    primaryHazard: "Coastal erosion",
  },
  {
    id: "drainage-systems",
    name: "Drainage Systems",
    shortName: "Drainage",
    description:
      "Upgraded canals, pumps, retention spaces and permeable surfaces that move rainfall and river water away from people.",
    tradeoff:
      "Reduces rainfall flooding quickly, but can be overwhelmed by compound surge and may require continuous power.",
    color: "#F59E0B",
    defaultAllocation: 25_000_000,
    primaryHazard: "Rainfall flooding",
  },
  {
    id: "groundwater-management",
    name: "Groundwater Management",
    shortName: "Groundwater",
    description:
      "Managed aquifer recharge, extraction limits and water-supply alternatives that slow land subsidence.",
    tradeoff:
      "Addresses the cause of sinking, but results are gradual and depend on enforcement and public trust.",
    color: "#9AAAC0",
    defaultAllocation: 15_000_000,
    primaryHazard: "Land subsidence",
  },
];

export const defaultAllocation: SimulationAllocation = {
  "coastal-barriers": 40_000_000,
  "mangrove-restoration": 20_000_000,
  "drainage-systems": 25_000_000,
  "groundwater-management": 15_000_000,
};

export const simulationRegions: SimulationRegion[] = [
  {
    id: "nile-delta",
    name: "Nile Delta",
    country: "Egypt",
    image: "/images/nile-hero.jpg",
    imageAlt:
      "Earth-observation view of the Nile Delta meeting the Mediterranean.",
    coordinates: "31.2°E · 31.0°N",
    baseline: {
      exposedLand: 1_840,
      exposedPopulation: 5_700_000,
      agriculturalLand: 9_800,
      annualDamage: 1_450_000_000,
      surgeExposure: 0.78,
      rainfallExposure: 0.34,
      erosionPressure: 0.63,
      subsidencePressure: 0.82,
    },
    briefing:
      "A low, densely cultivated delta where subsidence and rising seas are compressing the safety margin. Sea defenses, drainage and groundwater reform all compete for the same budget.",
    threatSignals: [
      { label: "Surge exposure", value: "High", detail: "Northern delta front" },
      { label: "Subsidence", value: "6.2 mm/yr", detail: "Illustrative median" },
      { label: "Rainfall signal", value: "Variable", detail: "Drainage-limited" },
    ],
    scenario:
      "A century of relative sea-level rise, continued subsidence and episodic coastal flooding. No single intervention can address every pathway.",
  },
  {
    id: "ganges-brahmaputra",
    name: "Ganges–Brahmaputra Delta",
    country: "India & Bangladesh",
    image: "/images/ganges.jpg",
    imageAlt:
      "Satellite view of the sediment-rich Ganges–Brahmaputra delta.",
    coordinates: "89.8°E · 22.7°N",
    baseline: {
      exposedLand: 4_900,
      exposedPopulation: 14_200_000,
      agriculturalLand: 22_000,
      annualDamage: 3_200_000_000,
      surgeExposure: 0.86,
      rainfallExposure: 0.76,
      erosionPressure: 0.79,
      subsidencePressure: 0.68,
    },
    briefing:
      "The world's largest delta combines monsoon rainfall, cyclone surge and an eroding mangrove fringe. Embankments alone cannot manage a system this dynamic.",
    threatSignals: [
      { label: "Cyclone surge", value: "Critical", detail: "Exposed polders" },
      { label: "Monsoon", value: "2,100 mm/yr", detail: "Illustrative total" },
      { label: "Mangrove edge", value: "Eroding", detail: "Living buffer" },
    ],
    scenario:
      "Compound river, rainfall and coastal flooding, with the Sundarbans acting as both a buffer and a vulnerable ecosystem.",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    image: "/images/maldives.jpg",
    imageAlt: "Satellite view of Ari Atoll and its reef structures.",
    coordinates: "73.5°E · 4.2°N",
    baseline: {
      exposedLand: 298,
      exposedPopulation: 520_000,
      agriculturalLand: 170,
      annualDamage: 920_000_000,
      surgeExposure: 0.91,
      rainfallExposure: 0.56,
      erosionPressure: 0.88,
      subsidencePressure: 0.24,
    },
    briefing:
      "A nation of low coral islands where shoreline protection, reef health and freshwater security are inseparable. Land is scarce, so every intervention has an opportunity cost.",
    threatSignals: [
      { label: "Land elevation", value: "~2 m", detail: "National average" },
      { label: "Reef buffer", value: "Under stress", detail: "Illustrative signal" },
      { label: "Freshwater", value: "Thin lens", detail: "Salt intrusion" },
    ],
    scenario:
      "Rising seas, wave overtopping and saltwater intrusion on islands where retreat is a question of sovereignty, not only engineering.",
  },
];

export function getSimulationRegion(
  id: string,
): SimulationRegion | undefined {
  return simulationRegions.find((region) => region.id === id);
}
