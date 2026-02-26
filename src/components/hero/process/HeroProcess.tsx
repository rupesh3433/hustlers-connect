// src/components/hero/process/HeroProcess.tsx

import React, { useEffect, useRef, useState, useMemo } from "react";
import ProcessCurve from "./ProcessCurve";
import ConnectorLines from "./ConnectorLines";
import ProcessData from "./ProcessData";
import type { ScreenType } from "./curveConfig";

const GEOMETRY_HEIGHT = 300;
const VISIBLE_HEIGHT = 350;

const HeroProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const newWidth = entry.contentRect.width;
      if (newWidth > 0) setWidth(newWidth);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const screen: ScreenType = useMemo(() => {
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    if (width < 1536) return "laptop";
    return "desktop";
  }, [width]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible"
      style={{ height: VISIBLE_HEIGHT }}
    >
      {width > 0 && (
        <>
          <svg
            viewBox={`0 -${GEOMETRY_HEIGHT} ${width} ${GEOMETRY_HEIGHT * 2}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <ProcessCurve
              width={width}
              height={GEOMETRY_HEIGHT}
              screen={screen}
            />
          </svg>

          <svg
            viewBox={`0 -${GEOMETRY_HEIGHT} ${width} ${GEOMETRY_HEIGHT * 2}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <ConnectorLines
              width={width}
              height={GEOMETRY_HEIGHT}
              screen={screen}
            />
          </svg>

          <ProcessData
            width={width}
            height={GEOMETRY_HEIGHT}
            screen={screen}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(HeroProcess);