import type { Region, TrendSeries } from "@/types";

const seaLevelYears = Array.from({ length: 26 }, (_, index) => 2000 + index);

function trend(base: number, step: number, wobble = 0.7): number[] {
  return seaLevelYears.map((_, index) =>
    Number(
      (
        base +
        index * step +
        Math.sin(index * 1.7) * wobble +
        Math.cos(index * 0.55) * wobble * 0.4
      ).toFixed(1),
    ),
  );
}

function seaLevelSeries(
  label: string,
  base: number,
  step: number,
  source: string,
): TrendSeries {
  return {
    label,
    unit: "mm relative to 2000",
    years: seaLevelYears,
    values: trend(base, step),
    status: "illustrative",
    source,
    note: "Demonstration series. Replace with the verified regional tide-gauge and altimetry adapter.",
  };
}

export const regions: Region[] = [
  {
    id: "nile-delta",
    name: "Nile Delta",
    shortName: "Nile Delta",
    country: "Egypt",
    coordinates: { lon: 31.2, lat: 31.0 },
    image: "/images/nile-hero.jpg",
    imageAlt:
      "Earth-observation view of the Nile Delta meeting the Mediterranean Sea.",
    imageCredit: "NASA / ISS Expedition 35 — public domain",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:ISS035-E-007148_Nile_-_Sinai_-_Dead_Sea_-_Wide_Angle_View.jpg",
    riskLevel: "Critical",
    riskScore: 91,
    population: "46M+ in the delta",
    areaLabel: "~25,000 km²",
    headline: "A low-lying agricultural heartland under compound pressure.",
    summary:
      "The Nile Delta concentrates population, agriculture and infrastructure on land that is both sinking and exposed to a rising Mediterranean. Salinisation is moving inland as groundwater is withdrawn.",
    context:
      "The delta is the final reach of a river that supports tens of millions of people. Its exposure is not caused by one hazard alone: relative sea-level rise, subsidence, reduced sediment delivery and episodic coastal flooding interact.",
    threats: [
      "Sea-level rise",
      "Land subsidence",
      "Coastal flooding",
      "Salinisation",
    ],
    indicators: [
      {
        id: "slr",
        label: "Relative sea-level trend",
        value: "+4.8",
        unit: "mm / yr",
        trend: "Rising",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · sentinel/altimetry pending",
        updated: "2025-01-15",
        description:
          "Illustrative combined land-motion and ocean signal for the delta front.",
        sparkline: [2.9, 3.1, 3.0, 3.6, 3.8, 4.0, 4.4, 4.3, 4.7, 4.8],
        risk: "High",
      },
      {
        id: "subsidence",
        label: "Land subsidence",
        value: "6.2",
        unit: "mm / yr",
        trend: "Accelerating",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · InSAR pending",
        updated: "2025-01-15",
        description:
          "Illustrative median vertical land motion across the northern delta.",
        sparkline: [4.0, 4.2, 4.6, 4.9, 5.1, 5.3, 5.6, 5.9, 6.0, 6.2],
        risk: "Critical",
      },
      {
        id: "exposed-land",
        label: "Land below 1 m",
        value: "1,840",
        unit: "km²",
        trend: "Expanding",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · DEM pending",
        updated: "2024-11-02",
        description:
          "Illustrative low-elevation land envelope used for planning, not a surveyed extent.",
        sparkline: [1490, 1535, 1570, 1620, 1660, 1710, 1740, 1772, 1805, 1840],
        risk: "Critical",
      },
      {
        id: "rainfall",
        label: "Annual rainfall",
        value: "182",
        unit: "mm",
        trend: "Highly variable",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · station network pending",
        updated: "2024-10-30",
        description:
          "Illustrative coastal-delta rainfall total; flood risk is driven more by sea level and drainage than annual volume.",
        sparkline: [164, 188, 173, 205, 171, 199, 182, 219, 176, 182],
        risk: "Moderate",
      },
      {
        id: "population",
        label: "Population in low zone",
        value: "5.7M",
        unit: "people",
        trend: "Growing",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · gridded population pending",
        updated: "2024-08-01",
        description:
          "Illustrative count of residents within the projected 1-in-100-year coastal flood envelope.",
        sparkline: [4.6, 4.8, 5.0, 5.1, 5.25, 5.38, 5.49, 5.58, 5.65, 5.7],
        risk: "Critical",
      },
      {
        id: "agriculture",
        label: "Delta agriculture",
        value: "38",
        unit: "% of Egypt's farmland",
        trend: "At risk",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · land-cover pending",
        updated: "2024-06-18",
        description:
          "Illustrative share of national farmland contained within the delta study area.",
        sparkline: [40, 40, 39.6, 39.4, 39.2, 39, 38.8, 38.5, 38.2, 38],
        risk: "High",
      },
    ],
    historical: [
      seaLevelSeries(
        "Relative sea level — demonstration",
        0,
        2.8,
        "Demonstration adapter · NOAA / PSMSL pending",
      ),
      {
        label: "Subsidence proxy — demonstration",
        unit: "mm cumulative",
        years: seaLevelYears,
        values: trend(0, 3.4, 0.9),
        status: "illustrative",
        source: "Demonstration adapter · InSAR pending",
        note: "Illustrative cumulative land-motion proxy, not a measured station record.",
      },
    ],
    scenarios: [
      {
        id: "low",
        label: "Low emissions pathway",
        shortLabel: "Low",
        description:
          "Rapid global mitigation with strong local adaptation. Still committed to additional sea-level rise.",
        slr2100M: 0.43,
        exposedLandPct: 21,
        exposedPopulation: 2_900_000,
        assumption: "Illustrative SSP1-2.6-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "mid",
        label: "Intermediate pathway",
        shortLabel: "Intermediate",
        description:
          "Current policy trajectory with uneven adaptation investment across the delta.",
        slr2100M: 0.72,
        exposedLandPct: 32,
        exposedPopulation: 4_500_000,
        assumption: "Illustrative SSP2-4.5-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "high",
        label: "High emissions pathway",
        shortLabel: "High",
        description:
          "Limited mitigation and delayed adaptation expose the northern delta to chronic inundation.",
        slr2100M: 1.01,
        exposedLandPct: 46,
        exposedPopulation: 6_800_000,
        assumption: "Illustrative SSP5-8.5-aligned planning envelope.",
        status: "projected",
      },
    ],
    futureNarrative: {
      look:
        "Under the illustrative intermediate pathway, the northern delta edge becomes a more fragmented landscape by 2100. Shallow coastal basins experience more frequent saltwater intrusion and longer drainage recovery times after storms.",
      why:
        "Relative sea-level rise is amplified by land subsidence. Reduced sediment delivery and groundwater withdrawal lower the land surface while the Mediterranean rises against it.",
      vulnerable:
        "The lowest-elevation northern governorates, dense informal settlements, irrigation networks and brackish coastal farmland carry the highest compound exposure.",
      consequences:
        "Repeated inundation can disrupt agriculture, salinise wells, damage roads and raise the cost of maintaining drainage. Displacement is likely to be gradual and uneven rather than a single event.",
      interventions:
        "Managed aquifer recharge, reduced groundwater extraction, wetland buffers, drainage upgrades and strategic retreat can lower residual risk. Barriers alone do not address subsidence.",
      uncertainty:
        "The visual overlay is an illustrative planning envelope, not a forecast of a specific flood event. Elevation, subsidence, adaptation and emissions assumptions materially change the result.",
    },
    sources: [
      {
        label: "Sea Level Change Portal",
        provider: "NASA",
        url: "https://sealevel.nasa.gov/",
      },
      {
        label: "IPCC AR6 Sea Level Projection Tool",
        provider: "NASA Sea Level Change",
        url: "https://sealevel.nasa.gov/ipcc-ar6-sea-level-projection-tool",
      },
      {
        label: "Copernicus Earth Observation",
        provider: "European Space Agency",
        url: "https://www.copernicus.eu/",
      },
    ],
    isDemo: true,
  },
  {
    id: "ganges-brahmaputra",
    name: "Ganges–Brahmaputra Delta",
    shortName: "Ganges Delta",
    country: "India & Bangladesh",
    coordinates: { lon: 89.8, lat: 22.7 },
    image: "/images/ganges.jpg",
    imageAlt:
      "Satellite view of the Ganges–Brahmaputra delta and its sediment-rich distributaries.",
    imageCredit: "European Space Agency / Copernicus Sentinel-3",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ganges_Delta_ESA22274217.jpeg",
    riskLevel: "Critical",
    riskScore: 94,
    population: "100M+ in the delta",
    areaLabel: "~100,000 km²",
    headline: "The world's largest delta, shaped by rivers and exposed by the sea.",
    summary:
      "A dense, sediment-rich delta where cyclones, river flooding, subsidence and sea-level rise overlap. The Sundarbans provide a first line of ecological defense for millions of people.",
    context:
      "The delta spans India and Bangladesh and is formed by the Ganges, Brahmaputra and Meghna rivers. Exposure is concentrated in low-elevation settlements, embankment-dependent farmland and the Sundarbans mangrove fringe.",
    threats: [
      "Sea-level rise",
      "Coastal flooding",
      "Coastal erosion",
      "Land subsidence",
      "Salinisation",
    ],
    indicators: [
      {
        id: "slr",
        label: "Relative sea-level trend",
        value: "+4.2",
        unit: "mm / yr",
        trend: "Rising",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · tide gauges pending",
        updated: "2025-01-15",
        description:
          "Illustrative relative sea-level trend across the delta front.",
        sparkline: [2.6, 2.8, 2.9, 3.1, 3.3, 3.5, 3.6, 3.8, 4.0, 4.2],
        risk: "High",
      },
      {
        id: "subsidence",
        label: "Land subsidence",
        value: "5.5",
        unit: "mm / yr",
        trend: "Variable",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · InSAR pending",
        updated: "2025-01-15",
        description:
          "Illustrative vertical land motion; local values vary with sediment loading and groundwater use.",
        sparkline: [3.8, 4.0, 4.2, 4.5, 4.7, 4.9, 5.1, 5.2, 5.4, 5.5],
        risk: "High",
      },
      {
        id: "exposed-land",
        label: "Land below 1 m",
        value: "4,900",
        unit: "km²",
        trend: "Expanding",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · DEM pending",
        updated: "2024-11-02",
        description:
          "Illustrative low-elevation land envelope across the delta.",
        sparkline: [4100, 4200, 4290, 4380, 4460, 4540, 4620, 4710, 4805, 4900],
        risk: "Critical",
      },
      {
        id: "rainfall",
        label: "Monsoon rainfall",
        value: "2,100",
        unit: "mm / yr",
        trend: "More intense",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · gridded rainfall pending",
        updated: "2024-10-30",
        description:
          "Illustrative annual total; short-duration intensity drives urban and river flooding.",
        sparkline: [1880, 1960, 2010, 2070, 2020, 2110, 2090, 2160, 2120, 2100],
        risk: "High",
      },
      {
        id: "population",
        label: "Population in low zone",
        value: "14.2M",
        unit: "people",
        trend: "Growing",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · gridded population pending",
        updated: "2024-08-01",
        description:
          "Illustrative residents within the coastal flood planning envelope.",
        sparkline: [10.4, 10.9, 11.4, 11.9, 12.3, 12.7, 13.1, 13.5, 13.9, 14.2],
        risk: "Critical",
      },
      {
        id: "mangrove",
        label: "Sundarbans mangrove edge",
        value: "~4,000",
        unit: "km of tidal edge",
        trend: "Eroding",
        trendDirection: "down",
        status: "illustrative",
        source: "Demonstration adapter · land-cover pending",
        updated: "2024-05-10",
        description:
          "Illustrative length of the mangrove–water interface used as a defense indicator.",
        sparkline: [4480, 4410, 4350, 4290, 4220, 4160, 4100, 4060, 4020, 4000],
        risk: "High",
      },
    ],
    historical: [
      seaLevelSeries(
        "Relative sea level — demonstration",
        0,
        2.5,
        "Demonstration adapter · PSMSL pending",
      ),
      {
        label: "Monsoon intensity index — demonstration",
        unit: "index (2000 = 100)",
        years: seaLevelYears,
        values: trend(100, 0.9, 2.8),
        status: "illustrative",
        source: "Demonstration adapter · gridded rainfall pending",
        note: "Illustrative annual variability index; not a verified basin-wide statistic.",
      },
    ],
    scenarios: [
      {
        id: "low",
        label: "Low emissions pathway",
        shortLabel: "Low",
        description:
          "Strong mitigation and sustained mangrove and embankment investment.",
        slr2100M: 0.45,
        exposedLandPct: 24,
        exposedPopulation: 10_800_000,
        assumption: "Illustrative SSP1-2.6-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "mid",
        label: "Intermediate pathway",
        shortLabel: "Intermediate",
        description:
          "Uneven adaptation and continued delta development in exposed areas.",
        slr2100M: 0.76,
        exposedLandPct: 37,
        exposedPopulation: 15_600_000,
        assumption: "Illustrative SSP2-4.5-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "high",
        label: "High emissions pathway",
        shortLabel: "High",
        description:
          "Rapid sea-level rise, stronger cyclones and retreating mangrove buffers.",
        slr2100M: 1.05,
        exposedLandPct: 52,
        exposedPopulation: 21_400_000,
        assumption: "Illustrative SSP5-8.5-aligned planning envelope.",
        status: "projected",
      },
    ],
    futureNarrative: {
      look:
        "By 2100, the delta's tidal fringe could be more dynamic and less continuous under the intermediate pathway. Some embanked polders remain productive; others require managed realignment.",
      why:
        "Relative sea-level rise combines with subsidence, sediment starvation and changing monsoon discharge. Cyclone surge can temporarily extend water far inland.",
      vulnerable:
        "Low-lying polders, Sundarbans communities, brackish-water aquaculture, rice systems and urban informal settlements are most exposed.",
      consequences:
        "Salinisation can reduce crop yields and drinking-water quality. Repeated embankment damage and displacement may increase adaptation costs over time.",
      interventions:
        "Mangrove restoration, tidal-river management, embankment redesign, early warning and managed retreat can reduce risk when combined. Single-line defenses can create a false sense of safety.",
      uncertainty:
        "Projected exposure depends on elevation data, subsidence, sediment supply, storm climatology and adaptation choices. The overlay is illustrative.",
    },
    sources: [
      {
        label: "Sentinel-3",
        provider: "ESA Copernicus",
        url: "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-3",
      },
      {
        label: "Sea Level Change Portal",
        provider: "NASA",
        url: "https://sealevel.nasa.gov/",
      },
      {
        label: "IPCC AR6 Reports",
        provider: "IPCC",
        url: "https://www.ipcc.ch/report/ar6/",
      },
    ],
    isDemo: true,
  },
  {
    id: "mississippi-delta",
    name: "Mississippi Delta",
    shortName: "Mississippi Delta",
    country: "United States",
    coordinates: { lon: -89.6, lat: 29.1 },
    image: "/images/mississippi.jpg",
    imageAlt:
      "Satellite view of the Mississippi River Delta and sediment plumes in the Gulf of Mexico.",
    imageCredit: "NASA MODIS Land Rapid Response Team",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mississippi_River_Delta_(MODIS_2024-04-01).jpg",
    riskLevel: "Critical",
    riskScore: 87,
    population: "2.1M in coastal Louisiana",
    areaLabel: "~12,000 km²",
    headline: "A delta losing ground faster than the river can rebuild it.",
    summary:
      "Coastal Louisiana is experiencing some of the highest relative sea-level rise rates in the world. Subsidence, sediment starvation, canal construction and storm surge drive land loss.",
    context:
      "The Mississippi River has been engineered to protect navigation and reduce flooding. Those interventions also limit the sediment delivery that built the delta, while extraction and natural compaction lower the land.",
    threats: [
      "Land subsidence",
      "Coastal erosion",
      "Sea-level rise",
      "Coastal flooding",
    ],
    indicators: [
      {
        id: "slr",
        label: "Relative sea-level trend",
        value: "+9.1",
        unit: "mm / yr",
        trend: "Rising",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · tide gauges pending",
        updated: "2025-01-15",
        description:
          "Illustrative relative sea-level trend for coastal Louisiana.",
        sparkline: [5.8, 6.2, 6.6, 7.0, 7.4, 7.8, 8.1, 8.5, 8.8, 9.1],
        risk: "Critical",
      },
      {
        id: "subsidence",
        label: "Land subsidence",
        value: "8.6",
        unit: "mm / yr",
        trend: "Variable",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · GNSS/InSAR pending",
        updated: "2025-01-15",
        description:
          "Illustrative composite vertical land motion; local rates vary sharply.",
        sparkline: [7.1, 7.4, 7.7, 7.9, 8.0, 8.2, 8.3, 8.4, 8.5, 8.6],
        risk: "High",
      },
      {
        id: "land-loss",
        label: "Historic land loss",
        value: "~4,800",
        unit: "km² since 1932",
        trend: "Slowing but ongoing",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · USGS pending",
        updated: "2024-09-12",
        description:
          "Illustrative summary of reported coastal land loss, for context only.",
        sparkline: [3000, 3350, 3700, 3980, 4200, 4380, 4520, 4640, 4730, 4800],
        risk: "Critical",
      },
      {
        id: "rainfall",
        label: "Annual rainfall",
        value: "1,620",
        unit: "mm",
        trend: "More intense",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · station network pending",
        updated: "2024-10-30",
        description:
          "Illustrative coastal rainfall total with increasing heavy-rain signal.",
        sparkline: [1510, 1560, 1490, 1620, 1540, 1680, 1580, 1720, 1650, 1620],
        risk: "Moderate",
      },
      {
        id: "population",
        label: "Population in low zone",
        value: "612k",
        unit: "people",
        trend: "Shifting",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · gridded population pending",
        updated: "2024-08-01",
        description:
          "Illustrative residents in the 1-in-100-year coastal flood envelope.",
        sparkline: [680, 672, 664, 655, 646, 638, 630, 623, 617, 612],
        risk: "High",
      },
      {
        id: "wetland",
        label: "Coastal wetland buffer",
        value: "−12",
        unit: "% since 2000",
        trend: "Declining",
        trendDirection: "down",
        status: "illustrative",
        source: "Demonstration adapter · land-cover pending",
        updated: "2024-05-10",
        description:
          "Illustrative change in vegetated coastal wetland extent.",
        sparkline: [100, 98.8, 97.5, 96.1, 94.8, 93.2, 91.9, 90.4, 89.2, 88],
        risk: "High",
      },
    ],
    historical: [
      seaLevelSeries(
        "Relative sea level — demonstration",
        0,
        3.8,
        "Demonstration adapter · NOAA tide gauges pending",
      ),
      {
        label: "Wetland extent index — demonstration",
        unit: "index (2000 = 100)",
        years: seaLevelYears,
        values: trend(100, -0.5, 0.8),
        status: "illustrative",
        source: "Demonstration adapter · land-cover pending",
        note: "Illustrative index of vegetated wetland extent.",
      },
    ],
    scenarios: [
      {
        id: "low",
        label: "Low emissions pathway",
        shortLabel: "Low",
        description:
          "Aggressive mitigation plus large-scale sediment diversion and wetland restoration.",
        slr2100M: 0.5,
        exposedLandPct: 19,
        exposedPopulation: 380_000,
        assumption: "Illustrative SSP1-2.6-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "mid",
        label: "Intermediate pathway",
        shortLabel: "Intermediate",
        description:
          "Partial restoration with continued subsidence and storm-driven loss.",
        slr2100M: 0.82,
        exposedLandPct: 31,
        exposedPopulation: 610_000,
        assumption: "Illustrative SSP2-4.5-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "high",
        label: "High emissions pathway",
        shortLabel: "High",
        description:
          "High relative sea-level rise and repeated surge events overwhelm wetland accretion.",
        slr2100M: 1.12,
        exposedLandPct: 47,
        exposedPopulation: 930_000,
        assumption: "Illustrative SSP5-8.5-aligned planning envelope.",
        status: "projected",
      },
    ],
    futureNarrative: {
      look:
        "Under the intermediate pathway, some coastal marsh and barrier systems may persist where sediment and freshwater are restored; others could convert to open water.",
      why:
        "High relative sea-level rise, subsidence, sediment starvation and storm surge interact. Wetlands can accrete vertically, but only if sediment supply and plant productivity keep pace.",
      vulnerable:
        "Low-lying marsh communities, tribal lands, port and energy infrastructure, and areas outside current levee protection are most exposed.",
      consequences:
        "Land loss can increase surge exposure, damage ecosystems and disrupt livelihoods. Maintenance costs for levees, roads and drainage rise as the land settles.",
      interventions:
        "Sediment diversions, marsh creation, ridge restoration, groundwater management and strategic retreat can help. Levees reduce some flood pathways but cannot rebuild land.",
      uncertainty:
        "The visual is an illustrative exposure envelope, not a parcel-level prediction. Subsidence, sediment delivery, storms and restoration funding drive the outcome.",
    },
    sources: [
      {
        label: "Coastal Change Analysis Program",
        provider: "NOAA",
        url: "https://coast.noaa.gov/digitalcoast/tools/lca.html",
      },
      {
        label: "World of Change: Mississippi Delta",
        provider: "NASA Earth Observatory",
        url: "https://earthobservatory.nasa.gov/world-of-change/MississippiDelta",
      },
      {
        label: "Coastal Louisiana",
        provider: "USGS",
        url: "https://www.usgs.gov/centers/wetland-and-aquatic-research-center/science/coastal-louisiana",
      },
    ],
    isDemo: true,
  },
  {
    id: "venice",
    name: "Venice",
    shortName: "Venice",
    country: "Italy",
    coordinates: { lon: 12.33, lat: 45.43 },
    image: "/images/venice.jpg",
    imageAlt:
      "Satellite view of the Venice lagoon, islands and tidal channels.",
    imageCredit:
      "NASA/GSFC/MITI/ERSDAC/JAROS, U.S./Japan ASTER Science Team",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Venice_Lagoon_December_9_2001.jpg",
    riskLevel: "High",
    riskScore: 79,
    population: "~50k in the historic centre",
    areaLabel: "~550 km² lagoon",
    headline: "A city built in water, now defending its relationship with it.",
    summary:
      "Venice faces relative sea-level rise, subsidence and increasingly frequent acqua alta. The MOSE barriers can close the lagoon, but the city's long-term exposure is not solved by gates alone.",
    context:
      "The historic city and lagoon depend on tidal exchange. Flood defenses reduce inundation during high tides, but repeated closures, saltwater intrusion and sea-level rise create ecological and maintenance trade-offs.",
    threats: [
      "Tidal flooding",
      "Sea-level rise",
      "Land subsidence",
    ],
    indicators: [
      {
        id: "slr",
        label: "Relative sea-level trend",
        value: "+2.5",
        unit: "mm / yr",
        trend: "Rising",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · tide gauges pending",
        updated: "2025-01-15",
        description:
          "Illustrative relative sea-level trend for the Venice lagoon.",
        sparkline: [1.6, 1.7, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.5],
        risk: "High",
      },
      {
        id: "subsidence",
        label: "Land subsidence",
        value: "1.2",
        unit: "mm / yr",
        trend: "Slowing",
        trendDirection: "down",
        status: "illustrative",
        source: "Demonstration adapter · InSAR pending",
        updated: "2025-01-15",
        description:
          "Illustrative residual subsidence after historical groundwater controls.",
        sparkline: [2.2, 2.0, 1.9, 1.7, 1.6, 1.5, 1.4, 1.3, 1.25, 1.2],
        risk: "Moderate",
      },
      {
        id: "high-water",
        label: "Acqua alta events",
        value: "1.87",
        unit: "m · Nov 2019 peak",
        trend: "More frequent",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · Comune di Venezia pending",
        updated: "2024-12-01",
        description:
          "Illustrative highest recorded tide in the modern record; use as context, not a forecast.",
        sparkline: [1.1, 1.58, 1.42, 1.87, 1.38, 1.53, 1.66, 1.45, 1.61, 1.87],
        risk: "High",
      },
      {
        id: "rainfall",
        label: "Annual rainfall",
        value: "830",
        unit: "mm",
        trend: "Stable",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · station network pending",
        updated: "2024-10-30",
        description:
          "Illustrative annual rainfall for the lagoon area.",
        sparkline: [780, 840, 795, 865, 810, 875, 820, 850, 825, 830],
        risk: "Low",
      },
      {
        id: "population",
        label: "Historic centre residents",
        value: "~49k",
        unit: "people",
        trend: "Declining",
        trendDirection: "down",
        status: "illustrative",
        source: "Demonstration adapter · municipal data pending",
        updated: "2024-08-01",
        description:
          "Illustrative resident population of the historic centre.",
        sparkline: [58, 56.8, 55.4, 54.1, 52.9, 51.8, 50.9, 50.2, 49.6, 49],
        risk: "Moderate",
      },
      {
        id: "gate-closures",
        label: "MOSE closures",
        value: "87",
        unit: "events by 2024",
        trend: "Increasing",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · MOSE operations pending",
        updated: "2025-01-05",
        description:
          "Illustrative count of barrier closures since activation; operational data should replace this value.",
        sparkline: [0, 0, 0, 12, 24, 38, 51, 64, 76, 87],
        risk: "Moderate",
      },
    ],
    historical: [
      seaLevelSeries(
        "Relative sea level — demonstration",
        0,
        1.6,
        "Demonstration adapter · Venice tide gauge pending",
      ),
      {
        label: "Acqua alta frequency — demonstration",
        unit: "events above 110 cm",
        years: seaLevelYears,
        values: trend(2, 0.22, 0.9),
        status: "illustrative",
        source: "Demonstration adapter · Comune di Venezia pending",
        note: "Illustrative frequency proxy, not a verified annual count.",
      },
    ],
    scenarios: [
      {
        id: "low",
        label: "Low emissions pathway",
        shortLabel: "Low",
        description:
          "Mitigation plus managed barrier operations and lagoon restoration.",
        slr2100M: 0.42,
        exposedLandPct: 12,
        exposedPopulation: 11_000,
        assumption: "Illustrative SSP1-2.6-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "mid",
        label: "Intermediate pathway",
        shortLabel: "Intermediate",
        description:
          "Frequent barrier closures and rising maintenance demand.",
        slr2100M: 0.71,
        exposedLandPct: 23,
        exposedPopulation: 21_000,
        assumption: "Illustrative SSP2-4.5-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "high",
        label: "High emissions pathway",
        shortLabel: "High",
        description:
          "Chronic high-water exposure and ecological stress in the lagoon.",
        slr2100M: 0.98,
        exposedLandPct: 34,
        exposedPopulation: 32_000,
        assumption: "Illustrative SSP5-8.5-aligned planning envelope.",
        status: "projected",
      },
    ],
    futureNarrative: {
      look:
        "With the intermediate pathway, Venice may remain inhabitable but increasingly dependent on managed barrier closures and elevated public spaces.",
      why:
        "Relative sea-level rise and subsidence raise the baseline tide. Storminess and lagoon morphology influence how often defenses must close.",
      vulnerable:
        "Low-lying campos, ground-floor housing, heritage structures, salt marshes and the lagoon ecosystem are most exposed.",
      consequences:
        "More frequent closures can reduce tidal flushing and alter lagoon ecology. Heritage repair and maintenance costs rise as the water baseline increases.",
      interventions:
        "Barrier operation, raised walkways, permeable pavements, lagoon restoration and adaptive heritage planning can help. Long-term viability depends on emissions and governance.",
      uncertainty:
        "This is not a projection of a particular tide event. Barrier performance, subsidence and lagoon ecology remain active areas of measurement and research.",
    },
    sources: [
      {
        label: "Venice and its Lagoon",
        provider: "UNESCO World Heritage Centre",
        url: "https://whc.unesco.org/en/list/394/",
      },
      {
        label: "Sea Level Change Portal",
        provider: "NASA",
        url: "https://sealevel.nasa.gov/",
      },
      {
        label: "Venice Lagoon observations",
        provider: "ESA Copernicus",
        url: "https://www.copernicus.eu/",
      },
    ],
    isDemo: true,
  },
  {
    id: "maldives",
    name: "Maldives",
    shortName: "Maldives",
    country: "Maldives",
    coordinates: { lon: 73.5, lat: 4.2 },
    image: "/images/maldives.jpg",
    imageAlt:
      "Satellite view of Ari Atoll in the Maldives, showing reef and lagoon structures.",
    imageCredit: "European Space Agency",
    imageSourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ari_Atoll,_Maldives_ESA22111096.jpeg",
    riskLevel: "Critical",
    riskScore: 89,
    population: "~520k nationwide",
    areaLabel: "~298 km² land",
    headline: "A nation of low islands confronting a rising ocean.",
    summary:
      "The Maldives is an archipelago of low-lying coral islands where sea-level rise, wave exposure and freshwater scarcity intersect. Adaptation is not hypothetical; it is national infrastructure.",
    context:
      "Most land lies only a few metres above sea level. The islands depend on reef buffers, groundwater lenses and engineered coastal protection. Storm surge and king tides can inundate entire inhabited islands.",
    threats: [
      "Sea-level rise",
      "Coastal flooding",
      "Coastal erosion",
      "Salinisation",
    ],
    indicators: [
      {
        id: "slr",
        label: "Sea-level trend",
        value: "+3.5",
        unit: "mm / yr",
        trend: "Rising",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · tide gauges pending",
        updated: "2025-01-15",
        description:
          "Illustrative regional sea-level trend from the demonstration adapter.",
        sparkline: [2.1, 2.3, 2.4, 2.6, 2.8, 2.9, 3.1, 3.2, 3.4, 3.5],
        risk: "High",
      },
      {
        id: "elevation",
        label: "Land below 1.5 m",
        value: "80",
        unit: "% of land area",
        trend: "Fixed exposure",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · national DEM pending",
        updated: "2024-11-02",
        description:
          "Illustrative national exposure indicator; island elevation varies.",
        sparkline: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
        risk: "Critical",
      },
      {
        id: "population",
        label: "Population on low islands",
        value: "~390k",
        unit: "people",
        trend: "Urbanising",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · census pending",
        updated: "2024-08-01",
        description:
          "Illustrative residents on islands at or below the low-elevation planning threshold.",
        sparkline: [330, 340, 349, 356, 363, 369, 374, 380, 385, 390],
        risk: "Critical",
      },
      {
        id: "rainfall",
        label: "Annual rainfall",
        value: "2,000",
        unit: "mm",
        trend: "Highly variable",
        trendDirection: "steady",
        status: "illustrative",
        source: "Demonstration adapter · station network pending",
        updated: "2024-10-30",
        description:
          "Illustrative annual rainfall; dry spells stress thin freshwater lenses.",
        sparkline: [1900, 2150, 1860, 2240, 1980, 2100, 1780, 2040, 1920, 2000],
        risk: "Moderate",
      },
      {
        id: "reef",
        label: "Reef-buffered shoreline",
        value: "~85",
        unit: "% of inhabited edge",
        trend: "Under stress",
        trendDirection: "down",
        status: "illustrative",
        source: "Demonstration adapter · reef survey pending",
        updated: "2024-07-14",
        description:
          "Illustrative share of inhabited coastline with a functioning reef buffer.",
        sparkline: [94, 93, 92, 91, 90, 89, 88, 87, 86, 85],
        risk: "High",
      },
      {
        id: "freshwater",
        label: "Freshwater lens",
        value: "Thin",
        unit: "limited storage",
        trend: "Salt intrusion",
        trendDirection: "up",
        status: "illustrative",
        source: "Demonstration adapter · groundwater monitoring pending",
        updated: "2024-09-01",
        description:
          "Qualitative demonstration indicator of groundwater salinisation risk.",
        sparkline: [30, 33, 36, 39, 42, 45, 48, 51, 54, 57],
        risk: "High",
      },
    ],
    historical: [
      seaLevelSeries(
        "Sea level — demonstration",
        0,
        2.0,
        "Demonstration adapter · PSMSL pending",
      ),
      {
        label: "Rainfall variability — demonstration",
        unit: "mm annual",
        years: seaLevelYears,
        values: trend(2000, 1.5, 95),
        status: "illustrative",
        source: "Demonstration adapter · station network pending",
        note: "Illustrative annual rainfall variability, not a verified national series.",
      },
    ],
    scenarios: [
      {
        id: "low",
        label: "Low emissions pathway",
        shortLabel: "Low",
        description:
          "Strong mitigation and sustained reef, shoreline and freshwater investment.",
        slr2100M: 0.44,
        exposedLandPct: 58,
        exposedPopulation: 280_000,
        assumption: "Illustrative SSP1-2.6-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "mid",
        label: "Intermediate pathway",
        shortLabel: "Intermediate",
        description:
          "Incremental adaptation with periodic overwash and freshwater stress.",
        slr2100M: 0.74,
        exposedLandPct: 76,
        exposedPopulation: 410_000,
        assumption: "Illustrative SSP2-4.5-aligned planning envelope.",
        status: "projected",
      },
      {
        id: "high",
        label: "High emissions pathway",
        shortLabel: "High",
        description:
          "High sea-level rise, reef degradation and recurrent island-scale inundation.",
        slr2100M: 1.02,
        exposedLandPct: 92,
        exposedPopulation: 500_000,
        assumption: "Illustrative SSP5-8.5-aligned planning envelope.",
        status: "projected",
      },
    ],
    futureNarrative: {
      look:
        "Under the intermediate pathway, some islands may remain habitable through shoreline engineering and freshwater management; others could experience more frequent overwash.",
      why:
        "Sea-level rise raises the baseline for waves and tides. Coral reef health, sediment supply and island morphology determine how shorelines respond.",
      vulnerable:
        "Low islands, densely built capital islands, critical infrastructure, freshwater lenses and reef-dependent ecosystems face the highest exposure.",
      consequences:
        "Inundation can disrupt freshwater, energy, sanitation and transport. Adaptation costs rise sharply when islands lose their natural buffers.",
      interventions:
        "Reef protection, beach nourishment, natural shoreline restoration, water harvesting and planned relocation may all be needed. Hard barriers are only one option.",
      uncertainty:
        "The overlay is illustrative. Coral response, ice-sheet dynamics, wave climate and local shoreline processes remain uncertain.",
    },
    sources: [
      {
        label: "Sea Level Change Portal",
        provider: "NASA",
        url: "https://sealevel.nasa.gov/",
      },
      {
        label: "Maldives",
        provider: "UN Environment Programme",
        url: "https://www.unep.org/",
      },
      {
        label: "Ari Atoll imagery",
        provider: "European Space Agency",
        url: "https://www.esa.int/",
      },
    ],
    isDemo: true,
  },
];

export function getRegionById(id: string): Region | undefined {
  return regions.find((region) => region.id === id);
}
