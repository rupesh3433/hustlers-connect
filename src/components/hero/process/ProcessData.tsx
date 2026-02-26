// src/components/hero/process/ProcessData.tsx

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { processSteps } from "./process_data";
import {
  getCurveParams,
  getBezierPoint,
  CURVE_EDGE_GAP,
  getLabelPlaneY,
  CURVE_CONFIG,
} from "./curveConfig";
import type { ScreenType } from "./curveConfig";

interface ProcessDataProps {
  height: number;
  width: number;
  screen: ScreenType;
}

const ProcessData: React.FC<ProcessDataProps> = ({
  height,
  width,
  screen,
}) => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  if (!processSteps?.length || width <= 0 || height <= 0) {
    return null;
  }

  const curveParams = useMemo(() => {
    return getCurveParams(width, height, CURVE_CONFIG[screen]);
  }, [width, height, screen]);

  const labelTopY = useMemo(() => {
    return getLabelPlaneY(height, CURVE_CONFIG[screen]);
  }, [height, screen]);

  const totalSteps = processSteps.length;

  const handleClose = useCallback(() => {
    setActiveStep(null);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveStep(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {activeStep && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 md:hidden z-40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {processSteps.map((step, index) => {
        const t =
          totalSteps === 1
            ? 0.5
            : CURVE_EDGE_GAP +
              (index / (totalSteps - 1)) *
                (1 - CURVE_EDGE_GAP * 2);

        const { x } = getBezierPoint(t, curveParams);
        const isActive = activeStep === step.id;

        return (
          <div
            key={step.id}
            className="absolute flex flex-col items-center text-center cursor-pointer select-none z-50 group"
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
            <h3
              className={`
                font-extrabold
                transition-all
                duration-300
                text-sm sm:text-base md:text-lg
                ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400 scale-105"
                    : "text-[color:var(--text-primary)] group-hover:text-purple-500"
                }
              `}
            >
              {step.title}
            </h3>

            {isActive && (
              <p
                className="
                  mt-2
                  text-xs sm:text-sm
                  max-w-[200px] md:max-w-[250px]
                  text-[color:var(--text-primary)]/70
                  dark:text-[color:var(--text-primary)]/80
                  leading-relaxed
                  backdrop-blur-md
                  bg-white/40 dark:bg-white/5
                  border border-black/10 dark:border-white/10
                  rounded-lg
                  px-3 py-2
                  shadow-lg
                "
              >
                {step.description}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default React.memo(ProcessData);