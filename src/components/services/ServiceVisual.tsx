// src/components/services/ServiceVisual.tsx

import React from "react";
import type { ServiceItem } from "./services.data";

interface Props {
  service: ServiceItem;
}

const ServiceVisual: React.FC<Props> = ({ service: s }) => (
  <div
    style={{
      flexShrink: 0,
      width: "clamp(180px,28vw,340px)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      animation: "svc-visual-in 620ms cubic-bezier(.22,1,.36,1) both",
    }}
  >
    {/* Spinning dashed ring */}
    <div
      style={{
        position: "absolute",
        width: "78%",
        paddingTop: "78%",
        borderRadius: "50%",
        border: `1px dashed ${s.accent}30`,
        animation: "svc-spin 36s linear infinite",
        transition: "border-color .6s",
      }}
    />

    {/* Inner glow */}
    <div
      style={{
        position: "absolute",
        width: "52%",
        paddingTop: "52%",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${s.accent}18 0%, transparent 70%)`,
        transition: "background .6s",
      }}
    />

    {/* Icon badge */}
    <div
      style={{
        position: "absolute",
        top: "6%",
        right: "2%",
        width: "clamp(40px,5vw,60px)",
        height: "clamp(40px,5vw,60px)",
        borderRadius: 14,
        background:
          "linear-gradient(135deg, var(--svc-surface) 0%, var(--svc-surface-soft) 100%)",
        border: `1.5px solid ${s.accent}40`,
        padding: "14%",
        backdropFilter: "blur(10px)",
        boxShadow: `0 8px 32px ${s.accent}25`,
        transition: "border-color .5s, background .5s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {s.icon}
    </div>

    {/* Illustration */}
    <div
      key={s.id}
      style={{
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
    >
      {s.visual}
    </div>

    {/* Corner glow */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "60%",
        height: "60%",
        background: `radial-gradient(circle at 100% 100%, ${s.accentDim}30 0%, transparent 60%)`,
        pointerEvents: "none",
        transition: "background .7s",
      }}
    />

    <style>
      {`
        :root {
          --svc-surface: rgba(0,0,0,0.04);
          --svc-surface-soft: rgba(0,0,0,0.02);
        }

        html.dark {
          --svc-surface: rgba(255,255,255,0.06);
          --svc-surface-soft: rgba(255,255,255,0.03);
        }
      `}
    </style>
  </div>
);

export default ServiceVisual;