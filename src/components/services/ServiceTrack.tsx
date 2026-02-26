// src/components/services/ServiceTrack.tsx
// Measures itself, renders the infinite sliding track of ServicePanels.

import React, { useRef, useEffect, useState, type CSSProperties } from "react";
import ServicePanel from "./ServicePanel";
import { EXTENDED } from "./useServiceCarousel";

interface Props {
  trackStyle: CSSProperties;
  isMobile: boolean;
  onTransitionEnd: () => void;
  onMeasure: (w: number, h: number) => void;
}

const ServiceTrack: React.FC<Props> = ({ trackStyle, isMobile, onTransitionEnd, onMeasure }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
      onMeasure(width, height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [onMeasure]);

  return (
    <div ref={containerRef} style={{ flex: 1, minWidth: 0, overflow: "hidden", height: "100%" }}>
      {size.w > 0 && (
        <div style={trackStyle} onTransitionEnd={onTransitionEnd}>
          {EXTENDED.map((s, i) => (
            <ServicePanel
              key={`${i}-${s.id}`}
              service={s}
              isMobile={isMobile}
              panelWidth={size.w}
              panelHeight={size.h}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceTrack;