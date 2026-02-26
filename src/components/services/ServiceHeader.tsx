// src/components/services/ServiceHeader.tsx

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
      width: 30,
      height: 30,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--svc-btn-bg)",
      border: "1px solid var(--svc-btn-border)",
      color: "var(--svc-btn-text)",
      fontSize: "0.8rem",
      transition:
        "background .25s ease, color .25s ease, transform .15s ease, border-color .25s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = `${accent}22`;
      e.currentTarget.style.color = accent;
      e.currentTarget.style.borderColor = accent;
      e.currentTarget.style.transform = "scale(1.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "var(--svc-btn-bg)";
      e.currentTarget.style.color = "var(--svc-btn-text)";
      e.currentTarget.style.borderColor = "var(--svc-btn-border)";
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    {label}
  </button>
);

const ServiceHeader: React.FC<Props> = ({
  active,
  total,
  realIdx,
  isMobile,
  onPrev,
  onNext,
}) => (
  <>
    <header
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `clamp(12px,2vh,20px) clamp(18px,4vw,48px) 0`,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            display: "inline-block",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: active.accent,
            animation: "svc-pulse 2.4s infinite",
            transition: "background .5s",
          }}
        />

        <span
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--svc-muted)",
          }}
        >
          Our Services
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {!isMobile && (
          <>
            <ArrowBtn
              label="←"
              accent={active.accent}
              onClick={onPrev}
            />
            <ArrowBtn
              label="→"
              accent={active.accent}
              onClick={onNext}
            />
          </>
        )}

        <span
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.16em",
            color: "var(--svc-counter)",
          }}
        >
          {String(realIdx + 1).padStart(2, "0")}
          &thinsp;/&thinsp;
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </header>

    <style>
      {`
        :root {
          --svc-btn-bg: rgba(0,0,0,0.05);
          --svc-btn-border: rgba(0,0,0,0.12);
          --svc-btn-text: rgba(0,0,0,0.55);
          --svc-muted: rgba(0,0,0,0.45);
          --svc-counter: rgba(0,0,0,0.35);
        }

        html.dark {
          --svc-btn-bg: rgba(255,255,255,0.04);
          --svc-btn-border: rgba(255,255,255,0.08);
          --svc-btn-text: rgba(255,255,255,0.55);
          --svc-muted: rgba(255,255,255,0.26);
          --svc-counter: rgba(255,255,255,0.18);
        }
      `}
    </style>
  </>
);

export default ServiceHeader;