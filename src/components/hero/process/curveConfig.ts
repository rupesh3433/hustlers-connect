// src/components/hero/process/curveConfig.ts

export interface CurveParams {
    startX: number;
    startY: number;
  
    control1X: number;
    control1Y: number;
  
    control2X: number;
    control2Y: number;
  
    endX: number;
    endY: number;
  }
  
  /**
   * ===== Global Layout Controls =====
   */
  
  export const CURVE_EDGE_GAP = 0.15;
  export const LABEL_PLANE_RATIO = 0.8;
  export const LABEL_VISUAL_OFFSET = 8;
  export const CURVE_VERTICAL_OFFSET_RATIO = -0.2;
  
  /**
   * NEW: Controls how wide the curve is
   * 1 = full width
   * 0.8 = 80% width
   * 0.6 = compact
   */
  export const CURVE_WIDTH_RATIO = 0.9;
  
  /**
   * ===== Curve Generator =====
   */
  export const getCurveParams = (
    width: number,
    height: number
  ): CurveParams => {
    const verticalOffset = height * CURVE_VERTICAL_OFFSET_RATIO;
  
    // Calculate actual curve width
    const curveWidth = width * CURVE_WIDTH_RATIO;
    const horizontalOffset = (width - curveWidth) / 2;
  
    const startX = horizontalOffset;
    const endX = horizontalOffset + curveWidth;
  
    return {
      // Bottom-left (centered within allowed width)
      startX,
      startY: height * 0.9 + verticalOffset,
  
      // Control 1
      control1X: startX + curveWidth * 0.35,
      control1Y: height * 0.9 + verticalOffset,
  
      // Control 2
      control2X: startX + curveWidth * 0.85,
      control2Y: height * 0.9 + verticalOffset,
  
      // End
      endX,
      endY: height * 0.25 + verticalOffset,
    };
  };
  
  /**
   * ===== Cubic Bézier Calculator =====
   */
  export const getBezierPoint = (
    t: number,
    params: CurveParams
  ) => {
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
  
    const x =
      Math.pow(1 - t, 3) * startX +
      3 * Math.pow(1 - t, 2) * t * control1X +
      3 * (1 - t) * Math.pow(t, 2) * control2X +
      Math.pow(t, 3) * endX;
  
    const y =
      Math.pow(1 - t, 3) * startY +
      3 * Math.pow(1 - t, 2) * t * control1Y +
      3 * (1 - t) * Math.pow(t, 2) * control2Y +
      Math.pow(t, 3) * endY;
  
    return { x, y };
  };
  
  /**
   * ===== Shared Horizontal Plane =====
   */
  export const getLabelPlaneY = (height: number) =>
    height * LABEL_PLANE_RATIO;