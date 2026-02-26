// src/components/services/ServiceHeader.tsx
// Header bar: pulsing dot + label (left) · arrows + counter (right, desktop).

import React from "react";
import type { ServiceItem } from "./services.data";

interface Props {
  active: ServiceItem;
  total: number;
  realIdx: number;
  isMobile: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const ArrowBtn: React.FC<{
  label: string;
  accent: string;
  onClick: () => void;
}> = ({ label, accent, onClick }) => (
  <button
    onClick={onClick}
    style={{
      all: "unset",
      cursor: "pointer",
      width: 30, height: 30,
      borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.5)",
      fontSize: "0.8rem",
      transition: "background .2s, color .2s, transform .15s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = `${accent}22`;
      e.currentTarget.style.color      = accent;
      e.currentTarget.style.transform  = "scale(1.14)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      e.currentTarget.style.color      = "rgba(255,255,255,0.5)";
      e.currentTarget.style.transform  = "scale(1)";
    }}
  >
    {label}
  </button>
);

const ServiceHeader: React.FC<Props> = ({ active, total, realIdx, isMobile, onPrev, onNext }) => (
  <header style={{
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `clamp(12px,2vh,20px) clamp(18px,4vw,48px) 0`,
  }}>
    {/* Left — pulsing dot + label */}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{
        display: "inline-block",
        width: 5, height: 5, borderRadius: "50%",
        background: active.accent,
        animation: "svc-pulse 2.4s infinite",
        transition: "background .5s",
      }} />
      <span style={{
        fontSize: "0.62rem",
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.26)",
      }}>
        Our Services
      </span>
    </div>

    {/* Right — arrows (desktop) + counter */}
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {!isMobile && (
        <>
          <ArrowBtn label="←" accent={active.accent} onClick={onPrev} />
          <ArrowBtn label="→" accent={active.accent} onClick={onNext} />
        </>
      )}
      <span style={{
        fontSize: "0.62rem",
        letterSpacing: "0.16em",
        color: "rgba(255,255,255,0.16)",
      }}>
        {String(realIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
      </span>
    </div>
  </header>
);

export default ServiceHeader;