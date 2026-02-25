import React, { useEffect, useRef, useState } from "react";
import ProcessCurve from "./ProcessCurve";
import ConnectorLines from "./ConnectorLines";
import ProcessData from "./ProcessData";

const HeroProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(1300);

  const height = 330;

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
      className="
    relative
    w-full
    h-[330px]
    overflow-visible
    mb-0
    sm:mb-0
    md:mb-14
    lg:mb-18
  "
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
      <ConnectorLines width={width} height={height} />

      {/* Labels */}
      <ProcessData width={width} height={height} />
    </div>
  );
};

export default HeroProcess;
