// src/components/services/ServiceContent.tsx
// Animated text content: ghost watermark · title · tagline · description · tags.
// key={service.id} forces re-mount + re-animation on each slide change.

import React from "react";
import type { ServiceItem } from "./services.data";

interface Props {
  service: ServiceItem;
  isMobile: boolean;
}

const ServiceContent: React.FC<Props> = ({ service: s, isMobile }) => (
  <div
    key={s.id}
    style={{
      position: "relative",
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      padding: isMobile ? "0 0 8px" : "0",
      animation: "svc-content-in 550ms cubic-bezier(.22,1,.36,1) both",
    }}
  >
    {/* Ghost watermark number */}
    <div style={{
      position: "absolute",
      right: isMobile ? "-10px" : "-20px",
      bottom: isMobile ? "-10px" : "-30px",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: isMobile ? "38vw" : "clamp(10rem,20vw,18rem)",
      fontWeight: 700,
      lineHeight: 1,
      color: s.accent,
      opacity: 0.04,
      pointerEvents: "none",
      userSelect: "none",
      letterSpacing: "-0.06em",
    }}>
      {String(s.id).padStart(2, "0")}
    </div>

    {/* Accent vertical stripe + ID badge */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: isMobile ? 10 : 14 }}>
      <div style={{
        width: 3, height: isMobile ? 32 : 44,
        borderRadius: 2,
        background: `linear-gradient(180deg, ${s.accent}, ${s.accentDim})`,
        boxShadow: `0 0 14px ${s.accent}88`,
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.66rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: s.accent,
        opacity: 0.75,
      }}>
        {String(s.id).padStart(2, "0")} / 04
      </span>
    </div>

    {/* Title */}
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: isMobile
        ? "clamp(1.7rem,8vw,2.4rem)"
        : "clamp(2rem,3.8vw,3.4rem)",
      fontWeight: 600,
      letterSpacing: "-0.025em",
      lineHeight: 1.05,
      color: "#fff",
      margin: "0 0 8px 0",
    }}>
      {s.title}
    </h2>

    {/* Tagline */}
    <p style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: isMobile
        ? "clamp(0.9rem,4vw,1.1rem)"
        : "clamp(0.95rem,1.4vw,1.2rem)",
      fontStyle: "italic",
      color: s.accent,
      opacity: 0.85,
      margin: "0 0 16px 0",
      lineHeight: 1.4,
    }}>
      {s.tagline}
    </p>

    {/* Description */}
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: isMobile
        ? "clamp(0.78rem,3.2vw,0.9rem)"
        : "clamp(0.8rem,1vw,0.94rem)",
      fontWeight: 300,
      lineHeight: 1.8,
      color: "rgba(255,255,255,0.55)",
      maxWidth: 480,
      margin: "0 0 18px 0",
    }}>
      {s.description}
    </p>

    {/* Tags */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 5 : 6 }}>
      {s.tags.map(tag => (
        <span key={tag} style={{
          padding: isMobile ? "3px 10px" : "4px 12px",
          borderRadius: 30,
          border: `1px solid ${s.accent}38`,
          background: `linear-gradient(135deg, ${s.accent}10, ${s.accentDim}08)`,
          fontSize: isMobile ? "0.65rem" : "clamp(0.65rem,.88vw,.76rem)",
          fontFamily: "'DM Sans', sans-serif",
          color: s.accent,
          letterSpacing: "0.04em",
          backdropFilter: "blur(6px)",
          boxShadow: `inset 0 0 0 1px ${s.accent}1a`,
        }}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default ServiceContent;