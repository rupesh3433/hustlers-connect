// src/components/hero/process/ProcessCurve.tsx

import React, { useMemo, useId } from "react";
import { getCurveParams, getBezierPoint, getBezierThickness, CURVE_CONFIG } from "./curveConfig";
import type { ScreenType } from "./curveConfig";

interface ProcessCurveProps {
  width: number;
  height: number;
  screen: ScreenType;
}

const ProcessCurve: React.FC<ProcessCurveProps> = ({
  width,
  height,
  screen,
}) => {
  if (width <= 0 || height <= 0) return null;

  const gradientId = useId();

  const curveParams = useMemo(
    () => getCurveParams(width, height, CURVE_CONFIG[screen]),
    [width, height, screen]
  );

  const pathData = useMemo(() => {
    const segments = 50;
    const topPoints: string[] = [];
    const bottomPoints: string[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const { x, y } = getBezierPoint(t, curveParams);
      const thickness = getBezierThickness(t, curveParams);

      topPoints.push(`${i === 0 ? "M" : "L"} ${x},${y - thickness / 2}`);
      bottomPoints.unshift(`L ${x},${y + thickness / 2}`);
    }

    return [...topPoints, ...bottomPoints, "Z"].join(" ");
  }, [curveParams]);

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#2563EB" stopOpacity="1" />
          <stop offset="60%" stopColor="#7C3AED" stopOpacity="1" />
          <stop offset="90%" stopColor="#EC4899" stopOpacity="1" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <path d={pathData} fill={`url(#${gradientId})`} />
    </>
  );
};

export default React.memo(ProcessCurve);