import React, { useState } from "react";
import { processSteps } from "./process_data";
import {
  getCurveParams,
  getBezierPoint,
  CURVE_EDGE_GAP,
  getLabelPlaneY,
} from "./curveConfig";

interface ProcessDataProps {
  height: number;
  width: number;
}

const ProcessData: React.FC<ProcessDataProps> = ({
  height,
  width,
}) => {
  const [activeStep, setActiveStep] = useState<string | null>(
    null
  );

  if (!processSteps?.length || width <= 0 || height <= 0)
    return null;

  const curveParams = getCurveParams(width, height);
  const labelTopY = getLabelPlaneY(height);

  return (
    <>
      {/* Subtle Overlay */}
      {activeStep && (
        <div
          className="fixed inset-0 bg-black/25 md:hidden z-40"
          onClick={() => setActiveStep(null)}
        />
      )}

      {processSteps.map((step, index) => {
        const t =
          processSteps.length === 1
            ? 0.5
            : CURVE_EDGE_GAP +
              (index / (processSteps.length - 1)) *
                (1 - CURVE_EDGE_GAP * 2);

        const { x } = getBezierPoint(t, curveParams);
        const isActive = activeStep === step.id;

        return (
          <div
            key={step.id}
            className="absolute flex flex-col items-center text-center cursor-pointer select-none z-50"
            style={{
              left: x,
              top: labelTopY,
              transform: "translateX(-50%)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveStep(isActive ? null : step.id);
            }}
          >
            {/* Title */}
            <h3
              className={`font-extrabold leading-tight tracking-tight transition-all duration-300 ${
                isActive
                  ? "text-blue-400 scale-105 drop-shadow-lg"
                  : "text-white hover:text-blue-300"
              }`}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.6rem)",
              }}
            >
              {step.title}
            </h3>

            {/* Desktop Description */}
            <p
              className={`hidden md:block mt-2 max-w-[220px] leading-relaxed transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-white/60"
              }`}
              style={{
                fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
              }}
            >
              {step.description}
            </p>

            {/* Mobile Popup */}
            {isActive && (
              <div className="md:hidden absolute bottom-full mb-3 px-4 py-3 bg-black/75 rounded-lg shadow-xl max-w-[260px] transition-all duration-300">
                <p className="text-white leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ProcessData;