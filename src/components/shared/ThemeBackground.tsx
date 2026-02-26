// src/components/shared/ThemeBackground.tsx
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ✦ SINGLE SOURCE OF TRUTH FOR ALL BACKGROUND THEMING
//
//  Dark mode  → deep space dark with subtle radial glows
//  Light mode → soft blue-slate with a grid overlay
//
//  To change theme backgrounds, ONLY edit this file.
//  All sections (Hero, Services, Contact, Footer) stay untouched.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React from "react";
import { useTheme } from "./ThemeContext";

// ── CONFIG — edit these to change the look ────────────────────────
const THEME_CONFIG = {
  dark: {
    /** Base page background */
    base: "#010106",

    /** Radial glow colours — blue, purple, red to match accent theme */
    glow1: "rgba(59, 78, 230, 0.07)",   // blue  — top-left
    glow2: "rgba(139, 42, 230, 0.05)",  // purple — centre
    glow3: "rgba(220, 38, 38,  0.04)",  // red   — bottom-right

    /** Grid line colour */
    gridLine: "rgba(255, 255, 255, 0.025)",

    /** Grid cell size */
    gridSize: "52px",
  },

  light: {
    /** Base page background */
    base: "#eef0f8",

    /** Radial glow colours — lighter tints of same blue/purple/red */
    glow1: "rgba(99, 102, 241, 0.10)",  // indigo — top-left
    glow2: "rgba(139, 92,  246, 0.07)", // violet — centre
    glow3: "rgba(239, 68,  68,  0.05)", // red    — bottom-right

    /** Grid line colour — dark on light bg */
    gridLine: "rgba(99, 102, 241, 0.10)",

    /** Grid cell size */
    gridSize: "48px",
  },
} as const;
// ─────────────────────────────────────────────────────────────────

const ThemeBackground: React.FC = () => {
  const { theme } = useTheme();
  const cfg = THEME_CONFIG[theme];

  return (
    <>
      {/* ── 1. Base background colour ──────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundColor: cfg.base,
          transition: "background-color 0.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* ── 2. Grid overlay ────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(${cfg.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${cfg.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: `${cfg.gridSize} ${cfg.gridSize}`,
          transition: "opacity 0.5s ease",
          opacity: theme === "light" ? 1 : 0.7,
          pointerEvents: "none",
        }}
      />

      {/* ── 3. Ambient radial glows (blue / purple / red) ──────── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          background: `
            radial-gradient(ellipse 55% 50% at 12%  18%, ${cfg.glow1} 0%, transparent 65%),
            radial-gradient(ellipse 50% 45% at 55%  50%, ${cfg.glow2} 0%, transparent 65%),
            radial-gradient(ellipse 50% 45% at 88%  82%, ${cfg.glow3} 0%, transparent 65%)
          `,
          transition: "background 0.6s ease",
          pointerEvents: "none",
        }}
      />

      {/* ── 4. Light mode only: dot accent in grid intersections ── */}
      {theme === "light" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3,
            backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)`,
            backgroundSize: `${cfg.gridSize} ${cfg.gridSize}`,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />
      )}
    </>
  );
};

export default ThemeBackground;