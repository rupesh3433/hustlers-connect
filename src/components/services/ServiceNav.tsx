// src/components/services/ServiceNav.tsx
// Desktop: numbered vertical list with accent border.
// Mobile:  horizontal scrollable pill strip.

import React from "react";
import type { ServiceItem } from "./services.data";

interface Props {
  services: ServiceItem[];
  active: number;
  isMobile: boolean;
  onSelect: (i: number) => void;
}

// ── Desktop ───────────────────────────────────────────────────────────────────

const Desktop: React.FC<Props> = ({ services, active, onSelect }) => (
  <aside style={{
    flexShrink: 0,
    width: "clamp(128px,15vw,185px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
  }}>
    {services.map((s, i) => {
      const on = i === active;
      return (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          style={{
            all: "unset",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding: "11px 12px 11px 0",
            borderLeft: `2px solid ${on ? s.accent : "rgba(255,255,255,0.08)"}`,
            paddingLeft: 14,
            transition: "border-color .35s, transform .28s",
            transform: on ? "translateX(4px)" : "translateX(0)",
          }}
        >
          {/* Small icon */}
          <div style={{
            width: 22, height: 22, flexShrink: 0,
            opacity: on ? 1 : 0.3,
            transition: "opacity .35s",
          }}>
            {s.icon}
          </div>
          {/* Label */}
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.68rem,.92vw,.8rem)",
            fontWeight: on ? 500 : 300,
            color: on ? "#fff" : "rgba(255,255,255,0.28)",
            letterSpacing: "0.05em",
            transition: "color .35s",
            whiteSpace: "nowrap",
          }}>
            {s.label}
          </span>
        </button>
      );
    })}
  </aside>
);

// ── Mobile ────────────────────────────────────────────────────────────────────

const Mobile: React.FC<Props> = ({ services, active, onSelect }) => (
  <div style={{
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 2,
    scrollbarWidth: "none",
  }}>
    {services.map((s, i) => {
      const on = i === active;
      return (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          style={{
            all: "unset",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 13px",
            borderRadius: 40,
            border: `1.5px solid ${on ? s.accent : "rgba(255,255,255,0.1)"}`,
            background: on ? `${s.accent}1a` : "rgba(255,255,255,0.03)",
            flexShrink: 0,
            transition: "border-color .3s, background .3s",
          }}
        >
          <div style={{ width: 16, height: 16, opacity: on ? 1 : 0.38, transition: "opacity .3s" }}>
            {s.icon}
          </div>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            fontWeight: on ? 500 : 300,
            color: on ? "#fff" : "rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
            transition: "color .3s",
          }}>
            {s.label}
          </span>
        </button>
      );
    })}
  </div>
);

// ── Export ────────────────────────────────────────────────────────────────────

const ServiceNav: React.FC<Props> = (props) =>
  props.isMobile ? <Mobile {...props} /> : <Desktop {...props} />;

export default ServiceNav;