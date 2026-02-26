// src/components/hero/process/ConnectorLines.tsx

import React, { useMemo } from "react";
import { processSteps } from "./process_data";
import {
  getCurveParams,
  getBezierPoint,
  CURVE_EDGE_GAP,
  CURVE_CONFIG,
} from "./curveConfig";
import type { ScreenType } from "./curveConfig";

interface ConnectorLinesProps {
  height: number;
  width: number;
  screen: ScreenType;
}

const ConnectorLines: React.FC<ConnectorLinesProps> = ({
  height,
  width,
  screen,
}) => {
  if (!processSteps?.length || width <= 0 || height <= 0) {
    return null;
  }

  const curveParams = useMemo(() => {
    return getCurveParams(width, height, CURVE_CONFIG[screen]);
  }, [width, height, screen]);

  const dotRadius = useMemo(() => {
    if (width < 500) return 5;
    if (width < 900) return 6;
    if (width < 1200) return 7;
    return 8;
  }, [width]);

  const horizontalPlaneY = useMemo(() => {
    const config = CURVE_CONFIG[screen];
    const baseY = height * config.curveVerticalShift;

    const leftMaxY =
      baseY +
      height * config.startYOffset +
      height * config.leftStretchDownRatio;

    const rightMaxY =
      baseY +
      height * config.endYOffset +
      height * config.rightStretchDownRatio;

    const maxCurveY = Math.max(leftMaxY, rightMaxY);

    return maxCurveY + height * 0.1;
  }, [height, screen]);

  const total = processSteps.length;

  return (
    <>
      <defs>
        {processSteps.map((step) => (
          <React.Fragment key={`defs-${step.id}`}>
            {/* Gradient for rain drop */}
            <linearGradient
              id={`rain-grad-${step.id}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={step.color} stopOpacity="0" />
              <stop offset="50%" stopColor={step.color} stopOpacity="1" />
              <stop offset="100%" stopColor={step.color} stopOpacity="0" />
            </linearGradient>

            {/* Glow filter */}
            <filter
              id={`rain-glow-${step.id}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </React.Fragment>
        ))}
      </defs>

      {processSteps.map((step, index) => {
        const t =
          total === 1
            ? 0.5
            : CURVE_EDGE_GAP +
              (index / (total - 1)) * (1 - CURVE_EDGE_GAP * 2);

        const { x, y } = getBezierPoint(t, curveParams);

        const delay = `${index * 0.4}s`;

        return (
          <g key={step.id}>
            {/* Dot on curve */}
            <circle cx={x} cy={y} r={dotRadius} fill={step.color} />

            {/* Base vertical line (theme aware) */}
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={horizontalPlaneY}
              stroke="var(--connector-line)"
              strokeWidth={2}
              strokeDasharray="4 6"
              strokeLinecap="round"
            />

            {/* Animated rain drop moving along line */}
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={horizontalPlaneY}
              stroke={`url(#rain-grad-${step.id})`}
              strokeWidth={3}
              strokeLinecap="round"
              filter={`url(#rain-glow-${step.id})`}
              style={{
                strokeDasharray: "12 200",
                animation: "rainDrop 2.2s linear infinite",
                animationDelay: delay,
              }}
            />
          </g>
        );
      })}

      <style>
        {`
          :root {
            --connector-line: rgba(0,0,0,0.25);
          }

          html.dark {
            --connector-line: rgba(255,255,255,0.6);
          }

          @keyframes rainDrop {
            0% {
              stroke-dashoffset: 0;
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              stroke-dashoffset: -240;
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default React.memo(ConnectorLines);