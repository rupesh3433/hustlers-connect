import React from "react";
import { getCurveParams } from "./curveConfig";

interface ProcessCurveProps {
  width: number;
  height: number;
}

const ProcessCurve: React.FC<ProcessCurveProps> = ({ width, height }) => {
  if (width <= 0 || height <= 0) return null;

  const {
    startX,
    startY,
    control1X,
    control1Y,
    control2X,
    control2Y,
    endX,
    endY,
  } = getCurveParams(width, height);

  // Maximum thickness at middle
  const maxThickness = height * 0.1;

  // Slightly reduced control thickness to create taper
  const control1Offset = maxThickness * 0.1;
  const control2Offset = maxThickness * 0.6;

  const pathData = `
    M ${startX},${startY}

    C ${control1X},${control1Y}
      ${control2X},${control2Y}
      ${endX},${endY}

    C ${control2X},${control2Y - control2Offset}
      ${control1X},${control1Y - control1Offset}
      ${startX},${startY}

    Z
  `;

  return (
    <>
      <defs>
        <linearGradient
          id="process-gradient"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          {/* Fade in */}
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0" />

          {/* Dark Blue */}
          <stop offset="20%" stopColor="#1E3A8A" stopOpacity="1" />

          {/* Purple (mid) */}
          <stop offset="25%" stopColor="#7C3AED" stopOpacity="1" />

          {/* Dark Red */}
          <stop offset="65%" stopColor="#991B1B" stopOpacity="1" />
        </linearGradient>
      </defs>

      <path d={pathData} fill="url(#process-gradient)" />
    </>
  );
};

export default ProcessCurve;
