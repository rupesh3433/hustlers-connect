// src/components/hero/process/curveConfig.ts

/* ===================================================== */
/* ================= TYPES ============================= */
/* ===================================================== */

export type ScreenType = "mobile" | "tablet" | "laptop" | "desktop";

export interface CurveShapeConfig {
  // Full Y position control (can be negative to go upwards)
  curveVerticalShift: number;  // Shifts entire curve up (-) or down (+)
  
  // Start and end Y positions relative to shifted position
  startYOffset: number;
  endYOffset: number;
  
  // Width control
  widthRatio: number;
  
  // Inward positioning from edges (0.1 = 10% from edge)
  leftInwardRatio: number;
  rightInwardRatio: number;
  
  // Stretch control (both downwards from their start points)
  leftStretchDownRatio: number;
  rightStretchDownRatio: number;
  
  // Thickness control
  startThicknessRatio: number;
  midThicknessRatio: number;
  endThicknessRatio: number;
  
  // Label offset below curve
  labelOffsetRatio: number;
}

export interface CurveParams {
  startX: number;
  startY: number;

  control1X: number;
  control1Y: number;

  control2X: number;
  control2Y: number;

  endX: number;
  endY: number;

  startThickness: number;
  midThickness: number;
  endThickness: number;
}

/* ===================================================== */
/* ================= CONSTANTS ========================= */
/* ===================================================== */

export const CURVE_EDGE_GAP = 0.11;

/* ===================================================== */
/* ================= RESPONSIVE CONFIG ================= */
/* ===================================================== */

export const CURVE_CONFIG: Record<ScreenType, CurveShapeConfig> = {
  mobile: {
    curveVerticalShift: -0.8,
    startYOffset: 0.9,
    endYOffset: -0.25,
    widthRatio: 0.98,
    leftInwardRatio: 0.05,
    rightInwardRatio: 0.01,
    leftStretchDownRatio: 0.02,
    rightStretchDownRatio: 1.42,
    startThicknessRatio: 0.002,
    midThicknessRatio: 0.06,
    endThicknessRatio: 0.002,
    labelOffsetRatio: 0.49,
  },

  tablet: {
    curveVerticalShift: -0.7,
    startYOffset: 0.9,
    endYOffset: -0.45,
    widthRatio: 0.98,
    leftInwardRatio: 0.15,
    rightInwardRatio: 0.09,
    leftStretchDownRatio: 0.02,
    rightStretchDownRatio: 1.82,
    startThicknessRatio: 0.002,
    midThicknessRatio: 0.08,
    endThicknessRatio: 0.002,
    labelOffsetRatio: 0.34,
  },

  laptop: {
    curveVerticalShift: -0.7,
    startYOffset: 0.9,
    endYOffset: -0.45,
    widthRatio: 0.78,
    leftInwardRatio: 0.15,
    rightInwardRatio: 0.14,
    leftStretchDownRatio: 0.12,
    rightStretchDownRatio: 1.82,
    startThicknessRatio: 0.002,
    midThicknessRatio: 0.08,
    endThicknessRatio: 0.002,
    labelOffsetRatio: 0.35,
  },

  desktop: {
    curveVerticalShift: -0.7,
    startYOffset: 0.9,
    endYOffset: -0.45,
    widthRatio: 0.78,
    leftInwardRatio: 0.15,
    rightInwardRatio: 0.14,
    leftStretchDownRatio: 0.12,
    rightStretchDownRatio: 1.82,
    startThicknessRatio: 0.002,
    midThicknessRatio: 0.08,
    endThicknessRatio: 0.002,
    labelOffsetRatio: 0.35,
  },
};

/* ===================================================== */
/* ================= CURVE GENERATOR =================== */
/* ===================================================== */

export const getCurveParams = (
  width: number,
  height: number,
  config: CurveShapeConfig
): CurveParams => {
  if (width <= 0 || height <= 0) {
    return {
      startX: 0,
      startY: 0,
      control1X: 0,
      control1Y: 0,
      control2X: 0,
      control2Y: 0,
      endX: 0,
      endY: 0,
      startThickness: 0,
      midThickness: 0,
      endThickness: 0,
    };
  }

  // Calculate horizontal positions
  const curveWidth = width * config.widthRatio;
  const horizontalOffset = (width - curveWidth) / 2;

  const startX = horizontalOffset + curveWidth * config.leftInwardRatio;
  const endX = horizontalOffset + curveWidth - curveWidth * config.rightInwardRatio;

  // Calculate vertical positions with full freedom
  const baseY = height * config.curveVerticalShift;
  
  const startY = baseY + height * config.startYOffset;
  const endY = baseY + height * config.endYOffset;

  // Control points with downward stretch
  const leftStretchY = startY + height * config.leftStretchDownRatio;
  const rightStretchY = endY + height * config.rightStretchDownRatio;

  const control1X = startX + (endX - startX) * 0.3;
  const control1Y = leftStretchY;

  const control2X = startX + (endX - startX) * 0.7;
  const control2Y = rightStretchY;

  return {
    startX,
    startY,
    control1X,
    control1Y,
    control2X,
    control2Y,
    endX,
    endY,
    startThickness: height * config.startThicknessRatio,
    midThickness: height * config.midThicknessRatio,
    endThickness: height * config.endThicknessRatio,
  };
};

/* ===================================================== */
/* ================= BEZIER MATH ======================= */
/* ===================================================== */

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

export const getBezierPoint = (
  t: number,
  params: CurveParams
): { x: number; y: number } => {
  const {
    startX,
    startY,
    control1X,
    control1Y,
    control2X,
    control2Y,
    endX,
    endY,
  } = params;

  const clampedT = clamp(t, 0, 1);

  const x =
    Math.pow(1 - clampedT, 3) * startX +
    3 * Math.pow(1 - clampedT, 2) * clampedT * control1X +
    3 * (1 - clampedT) * Math.pow(clampedT, 2) * control2X +
    Math.pow(clampedT, 3) * endX;

  const y =
    Math.pow(1 - clampedT, 3) * startY +
    3 * Math.pow(1 - clampedT, 2) * clampedT * control1Y +
    3 * (1 - clampedT) * Math.pow(clampedT, 2) * control2Y +
    Math.pow(clampedT, 3) * endY;

  return { x, y };
};

export const getBezierThickness = (
  t: number,
  params: CurveParams
): number => {
  const { startThickness, midThickness, endThickness } = params;
  const clampedT = clamp(t, 0, 1);

  if (clampedT < 0.5) {
    const localT = clampedT * 2;
    return startThickness + (midThickness - startThickness) * localT;
  } else {
    const localT = (clampedT - 0.5) * 2;
    return midThickness + (endThickness - midThickness) * localT;
  }
};

/* ===================================================== */
/* ================= LABEL POSITION ==================== */
/* ===================================================== */

export const getLabelPlaneY = (
  height: number,
  config: CurveShapeConfig
): number => {
  const baseY = height * config.curveVerticalShift;
  
  const leftMaxY = baseY + height * config.startYOffset + height * config.leftStretchDownRatio;
  const rightMaxY = baseY + height * config.endYOffset + height * config.rightStretchDownRatio;
  const maxCurveY = Math.max(leftMaxY, rightMaxY);
  
  return maxCurveY + height * config.labelOffsetRatio;
};