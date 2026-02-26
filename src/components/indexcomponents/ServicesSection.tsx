// src/components/indexcomponents/ServicesSection.tsx
// ── CONFIG + COMPOSITION ONLY ────────────────────────────────────────────────
// All logic lives in useServiceCarousel · makeWheelHandler
// All UI lives in ServiceHeader · ServiceNav · ServiceTrack · ServiceDots

import React, { useRef, useState, useEffect, useCallback } from "react";
import { SERVICES }           from "../services/services.data";
import { useServiceCarousel, makeWheelHandler, N } from "../services/useServiceCarousel";
import ServiceHeader           from "../services/ServiceHeader";
import ServiceNav              from "../services/ServiceNav";
import ServiceTrack            from "../services/ServiceTrack";
import ServiceDots             from "../services/ServiceDots";

// ══════════════════════════════════════════════════════════════════════════════
//  ✦  CONFIG
// ══════════════════════════════════════════════════════════════════════════════
const CFG = {
  scrollThreshold:  90,
  accumulatorDecay: 380,
  slideDuration:    680,
  autoAdvanceMs:    6000,
  touchThreshold:   46,
  mobileBreakpoint: 768,
} as const;
// ══════════════════════════════════════════════════════════════════════════════

// Keyframes injected once
const KF = "svc-kf-v4";
if (typeof document !== "undefined" && !document.getElementById(KF)) {
  const s = document.createElement("style");
  s.id = KF;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    @keyframes svc-content-in  { from{opacity:0;transform:translateX(34px)} to{opacity:1;transform:none} }
    @keyframes svc-visual-in   { from{opacity:0;transform:translateX(50px) scale(.97)} to{opacity:1;transform:none} }
    @keyframes svc-spin        { to{transform:rotate(360deg)} }
    @keyframes svc-pulse       { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.5);opacity:1} }
  `;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────────────────────

const ServicesSection: React.FC = () => {
  const [panelW, setPanelW]     = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible]   = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < CFG.mobileBreakpoint);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // entry fade
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const carousel = useServiceCarousel(panelW, CFG);
  const { realIdx, go, selectService, trackStyle, onTransitionEnd, touchHandlers, pauseAuto, resumeAuto } = carousel;
  const svc = SERVICES[realIdx];

  const getRealIdx = useRef(() => realIdx);
  getRealIdx.current = () => realIdx;
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const handler = makeWheelHandler(go, () => getRealIdx.current(), CFG);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [go]);

  const onMeasure = useCallback((w: number) => setPanelW(w), []);

  return (
    <section
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        // ✅ transparent — ThemeBackground (in Index.tsx) owns all bg colour + grid
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 650ms ease, transform 750ms cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      {...touchHandlers}
    >
      {/*
        Ambient glow — uses each service's own accent colour (blue / purple / red).
        This is section-specific, NOT part of ThemeBackground, so it stays here.
        The glow blends on top of whatever ThemeBackground renders underneath.
      */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 55% at 78% 54%, ${svc.accent}0e 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 18% 28%, ${svc.accentDim}0a 0%, transparent 55%),
          radial-gradient(ellipse 70% 40% at 50% 100%, ${svc.accentDim}08 0%, transparent 50%)
        `,
        transition: "background 900ms ease",
      }} />

      {/* ── Composed UI ─────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%" }}>

        <ServiceHeader
          active={svc} total={N} realIdx={realIdx} isMobile={isMobile}
          onPrev={() => go(-1)} onNext={() => go(1)}
        />

        {isMobile && (
          <div style={{ flexShrink: 0, padding: "10px clamp(18px,5vw,28px) 0" }}>
            <ServiceNav services={SERVICES} active={realIdx} isMobile onSelect={selectService} />
          </div>
        )}

        <div style={{
          flex: 1, minHeight: 0, display: "flex",
          padding: `clamp(10px,1.4vh,16px) clamp(18px,4vw,48px) clamp(8px,1.2vh,12px)`,
          gap: isMobile ? 0 : "clamp(14px,2vw,32px)",
        }}>
          {!isMobile && (
            <ServiceNav services={SERVICES} active={realIdx} isMobile={false} onSelect={selectService} />
          )}
          <ServiceTrack
            trackStyle={trackStyle}
            isMobile={isMobile}
            onTransitionEnd={onTransitionEnd}
            onMeasure={onMeasure}
          />
        </div>

        <ServiceDots
          services={SERVICES} active={svc} realIdx={realIdx}
          slideDuration={CFG.slideDuration} onSelect={selectService}
        />
      </div>
    </section>
  );
};

export default ServicesSection;