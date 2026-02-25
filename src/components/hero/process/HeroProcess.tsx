import React, { useEffect, useRef, useState } from "react";
import ProcessCurve from "./ProcessCurve";
import ConnectorLines from "./ConnectorLines";
import ProcessData from "./ProcessData";

const HeroProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(1300);

  const height = 310;

  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;

      if (containerWidth > 0) {
        setWidth(containerWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mb-35 relative w-full h-[320px] overflow-visible"
    >
      {/* Curve */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <ProcessCurve width={width} height={height} />
      </svg>

      {/* Lines */}
      <ConnectorLines
        width={width}
        height={height}
      />

      {/* Labels */}
      <ProcessData
        width={width}
        height={height}
      />
    </div>
  );
};

export default HeroProcess;