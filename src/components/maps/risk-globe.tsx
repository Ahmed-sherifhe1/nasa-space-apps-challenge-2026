"use client";

import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { LocateFixed, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldData from "world-atlas/countries-110m.json";
import type { Region } from "@/types";
import { clamp, cn } from "@/lib/utils";

const riskColor: Record<Region["riskLevel"], string> = {
  Low: "#35B86B",
  Moderate: "#F5C542",
  High: "#F97316",
  Critical: "#EF4444",
};

const topology = worldData as unknown as Topology<{
  countries: GeometryCollection;
}>;
const countries = feature(topology, topology.objects.countries).features;
const graticule = geoGraticule10();

const INITIAL_ROTATION: [number, number] = [-35, -10];

export function RiskGlobe({
  regions,
  className,
}: {
  regions: Region[];
  className?: string;
}) {
  const router = useRouter();
  const [rotation, setRotation] = useState<[number, number]>(INITIAL_ROTATION);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; rotation: [number, number] } | null>(null);

  const { paths, outline, graticulePath, markers } = useMemo(() => {
    const projection = geoOrthographic()
      .translate([250, 250])
      .scale(222)
      .rotate([rotation[0], rotation[1], 0])
      .clipAngle(90);
    const path = geoPath(projection);
    const center: [number, number] = [-rotation[0], -rotation[1]];

    return {
      paths: countries.map((country) => ({
        id: country.id,
        d: path(country) ?? "",
      })),
      outline: path({ type: "Sphere" }) ?? "",
      graticulePath: path(graticule) ?? "",
      markers: regions.map((region) => {
        const coordinates: [number, number] = [
          region.coordinates.lon,
          region.coordinates.lat,
        ];
        const projected = projection(coordinates);
        return {
          region,
          x: projected?.[0] ?? 0,
          y: projected?.[1] ?? 0,
          visible: geoDistance(coordinates, center) < Math.PI / 2 - 0.015,
          color: riskColor[region.riskLevel],
        };
      }),
    };
  }, [regions, rotation]);

  function onPointerDown(event: React.PointerEvent<SVGSVGElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rotation };
    setDragging(true);
  }

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    setRotation([
      drag.current.rotation[0] + dx * 0.38,
      clamp(drag.current.rotation[1] - dy * 0.38, -78, 78),
    ]);
  }

  function endDrag() {
    drag.current = null;
    setDragging(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 18 : 6;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setRotation((current) => [current[0] - step, current[1]]);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setRotation((current) => [current[0] + step, current[1]]);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setRotation((current) => [current[0], clamp(current[1] - step, -78, 78)]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setRotation((current) => [current[0], clamp(current[1] + step, -78, 78)]);
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div
        role="application"
        aria-label="Interactive globe of DELTA 2100 study regions. Drag the globe or use arrow keys to rotate. Select a marker to open a region."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerLeave={endDrag}
        className="relative aspect-square w-full max-w-[560px] rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
      >
        <div className="absolute inset-[12%] rounded-full bg-cyan/[0.055] blur-3xl" aria-hidden="true" />
        <svg
          viewBox="0 0 500 500"
          className={cn(
            "relative size-full touch-none",
            dragging ? "cursor-grabbing" : "cursor-grab",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <defs>
            <radialGradient id="ocean-fill" cx="34%" cy="28%" r="76%">
              <stop offset="0%" stopColor="#173A55" />
              <stop offset="52%" stopColor="#0C1C34" />
              <stop offset="100%" stopColor="#07111F" />
            </radialGradient>
            <radialGradient id="ocean-glow" cx="50%" cy="50%" r="50%">
              <stop offset="72%" stopColor="transparent" />
              <stop offset="100%" stopColor="#00B8D9" stopOpacity="0.15" />
            </radialGradient>
            <filter id="marker-glow" x="-250%" y="-250%" width="600%" height="600%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d={outline} fill="url(#ocean-fill)" stroke="#294A6B" strokeWidth="0.9" />
          <path
            d={graticulePath}
            fill="none"
            stroke="#4B6F91"
            strokeWidth="0.35"
            strokeOpacity="0.22"
          />
          {paths.map((country, index) => (
            <path
              key={`${country.id}-${index}`}
              d={country.d}
              fill="#182F4D"
              stroke="#355574"
              strokeWidth="0.38"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={outline} fill="url(#ocean-glow)" pointerEvents="none" />
          <circle cx="250" cy="250" r="223" fill="none" stroke="#2C4A68" strokeWidth="0.8" />

          {markers.map(({ region, x, y, visible, color }) =>
            visible ? (
              <g
                key={region.id}
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-label={`${region.shortName}: ${region.name}, ${region.riskLevel} risk. Open region assessment.`}
                className="group cursor-pointer outline-none"
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(`/app/risk-intelligence/${region.id}`);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(`/app/risk-intelligence/${region.id}`);
                  }
                }}
              >
                <title>{`${region.name} — ${region.riskLevel} risk`}</title>
                <circle
                  r="9"
                  fill="none"
                  stroke="transparent"
                  strokeWidth="1.5"
                  className="group-focus-visible:stroke-cyan"
                />
                <circle r="10" fill={color} opacity="0.09" filter="url(#marker-glow)" />
                <circle r="4.3" fill={color} stroke="#081020" strokeWidth="1.2" />
                <text
                  x="9"
                  y="3.2"
                  fill="#E7EEF8"
                  fontSize="8"
                  fontFamily="var(--font-ibm-plex-mono), monospace"
                  letterSpacing="0.04em"
                  className="pointer-events-none hidden sm:block"
                >
                  {region.shortName}
                </text>
              </g>
            ) : null,
          )}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
          <span className="rounded-full border border-line/80 bg-navy/75 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted backdrop-blur">
            Drag / arrow keys to rotate
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {(["Critical", "High", "Moderate"] as const).map((level) => (
            <span key={level} className="inline-flex items-center gap-1.5 text-[9px] text-muted">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: riskColor[level] }}
                aria-hidden="true"
              />
              {level}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRotation(INITIAL_ROTATION)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[9px] text-muted transition-colors hover:border-cyan/35 hover:text-cloud"
          >
            <RotateCcw className="size-3" aria-hidden="true" />
            Reset view
          </button>
          <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted/80">
            <LocateFixed className="size-3" aria-hidden="true" />
            Orthographic
          </span>
        </div>
      </div>
    </div>
  );
}
