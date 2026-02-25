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

  // Single horizontal plane for all lines to end at
  const horizontalPlaneY = useMemo(() => {
    const config = CURVE_CONFIG[screen];
    const baseY = height * config.curveVerticalShift;
    const leftMaxY = baseY + height * config.startYOffset + height * config.leftStretchDownRatio;
    const rightMaxY = baseY + height * config.endYOffset + height * config.rightStretchDownRatio;
    const maxCurveY = Math.max(leftMaxY, rightMaxY);
    
    // Add offset below the curve for the horizontal plane
    return maxCurveY + height * 0.1; // Adjust 0.1 to move plane up/down
  }, [height, screen]);

  const total = processSteps.length;

  return (
    <>
      {processSteps.map((step, index) => {
        const t =
          total === 1
            ? 0.5
            : CURVE_EDGE_GAP +
              (index / (total - 1)) * (1 - CURVE_EDGE_GAP * 2);

        const { x, y } = getBezierPoint(t, curveParams);

        return (
          <g key={step.id}>
            {/* Dot on curve */}
            <circle cx={x} cy={y} r={dotRadius} fill={step.color} />

            {/* Vertical connector line - all end at same horizontal plane */}
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={horizontalPlaneY}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth={2}
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </>
  );
};

export default React.memo(ConnectorLines);