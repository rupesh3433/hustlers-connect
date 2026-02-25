import React from "react";
import { processSteps } from "./process_data";
import {
  getCurveParams,
  getBezierPoint,
  CURVE_EDGE_GAP,
  getLabelPlaneY,
  LABEL_VISUAL_OFFSET,
} from "./curveConfig";

interface ConnectorLinesProps {
  height: number;
  width: number;
}

const ConnectorLines: React.FC<ConnectorLinesProps> = ({
  height,
  width,
}) => {
  if (!processSteps?.length || width <= 0 || height <= 0)
    return null;

  const curveParams = getCurveParams(width, height);
  const labelTopY = getLabelPlaneY(height);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      {processSteps.map((step, index) => {
        const t =
          processSteps.length === 1
            ? 0.5
            : CURVE_EDGE_GAP +
              (index / (processSteps.length - 1)) *
                (1 - CURVE_EDGE_GAP * 2);

        const { x, y } = getBezierPoint(t, curveParams);

        return (
          <g key={step.id}>
            {/* Dot on curve */}
            <circle
              cx={x}
              cy={y}
              r={6}
              fill={step.color}
            />

            {/* Line touching label */}
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={labelTopY + LABEL_VISUAL_OFFSET}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1.5}
              strokeDasharray="4 6"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default ConnectorLines;