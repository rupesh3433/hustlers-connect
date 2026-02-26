// src/components/services/ServiceVisual.tsx
// Right-side decorative illustration panel.
// Hidden on mobile to maximise content space.

import React from "react";
import type { ServiceItem } from "./services.data";

interface Props {
  service: ServiceItem;
}

const ServiceVisual: React.FC<Props> = ({ service: s }) => (
  <div style={{
    flexShrink: 0,
    width: "clamp(180px,28vw,340px)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "svc-visual-in 620ms cubic-bezier(.22,1,.36,1) both",
  }}>
    {/* Slow-spinning dashed ring */}
    <div style={{
      position: "absolute",
      width: "78%", paddingTop: "78%",
      borderRadius: "50%",
      border: `1px dashed ${s.accent}28`,
      animation: "svc-spin 36s linear infinite",
      transition: "border-color .6s",
    }} />

    {/* Inner glow disc */}
    <div style={{
      position: "absolute",
      width: "52%", paddingTop: "52%",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${s.accent}14 0%, transparent 70%)`,
      transition: "background .6s",
    }} />

    {/* Icon badge top-right */}
    <div style={{
      position: "absolute",
      top: "6%", right: "2%",
      width: "clamp(40px,5vw,60px)",
      height: "clamp(40px,5vw,60px)",
      borderRadius: 14,
      background: `linear-gradient(135deg, ${s.accent}20, ${s.accentDim}10)`,
      border: `1.5px solid ${s.accent}38`,
      padding: "14%",
      backdropFilter: "blur(10px)",
      boxShadow: `0 8px 32px ${s.accent}22`,
      transition: "border-color .5s, background .5s",
    }}>
      {s.icon}
    </div>

    {/* Illustration — key triggers slide-in re-animation */}
    <div
      key={s.id}
      style={{ width: "100%", position: "relative", zIndex: 1 }}
    >
      {s.visual}
    </div>

    {/* Subtle corner glow */}
    <div style={{
      position: "absolute",
      bottom: 0, right: 0,
      width: "60%", height: "60%",
      background: `radial-gradient(circle at 100% 100%, ${s.accentDim}28 0%, transparent 60%)`,
      pointerEvents: "none",
      transition: "background .7s",
    }} />
  </div>
);

export default ServiceVisual;