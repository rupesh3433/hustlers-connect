// src/components/indexcomponents/ServicesSection.tsx
//
// ── RESPONSIBILITIES ──────────────────────────────────────────────────────────
//   • Global config  (all tunable constants at the top)
//   • Scroll / wheel / touch → drive carousel left↔right
//   • Boundary pass-through → let SectionScroller handle section changes
//   • Inject global keyframes (once)
//   • Render layout shell using ServiceNav / ServicePanel / dot indicators
//
// ── CAROUSEL STRATEGY ─────────────────────────────────────────────────────────
//   Extended array: [ LAST_GHOST, ...SERVICES, FIRST_GHOST ]
//   Nav lives OUTSIDE the track — only content+visual slides.
//   Ghost-slot wrap-around gives seamless infinite loop.
//
// ── SCROLL BOUNDARY PASS-THROUGH ─────────────────────────────────────────────
//   At first service + scroll UP  → do not stopPropagation → parent (SectionScroller) gets it
//   At last service  + scroll DOWN → same
//   Otherwise → preventDefault + stopPropagation + accumulate → navigate service
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  useRef, useState, useEffect, useCallback,
  type CSSProperties,
} from "react";
import { SERVICES }    from "../services/services.data";
import ServiceNav      from "../services/ServiceNav";
import ServicePanel    from "../services/ServicePanel";

// ══════════════════════════════════════════════════════════════════════════════
//  ✦  GLOBAL CONFIGURATION  — tune everything here
// ══════════════════════════════════════════════════════════════════════════════

const SCROLL_THRESHOLD    = 90;    // wheel delta accumulation before advancing a slide
const ACCUMULATOR_DECAY   = 380;   // ms of inactivity before accumulator resets
const SLIDE_DURATION      = 680;   // ms CSS transition duration
const AUTO_ADVANCE_MS     = 6000;  // ms between auto-advances (0 = disabled)
const MOBILE_BREAKPOINT   = 768;   // px — switches layout + nav
const TOUCH_THRESHOLD     = 46;    // px swipe distance required on touch

// ══════════════════════════════════════════════════════════════════════════════

// ── Keyframe injection ────────────────────────────────────────────────────────

const KF_ID = "svc-kf-v3";
if (typeof document !== "undefined" && !document.getElementById(KF_ID)) {
  const s = document.createElement("style");
  s.id = KF_ID;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    @keyframes svc-content-in  { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:none} }
    @keyframes svc-visual-in   { from{opacity:0;transform:translateX(52px) scale(.97)} to{opacity:1;transform:none scale(1)} }
    @keyframes svc-spin        { to{transform:rotate(360deg)} }
    @keyframes svc-pulse       { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.5);opacity:1} }
    @keyframes svc-header-in   { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:none} }
    @keyframes svc-footer-in   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
  `;
  document.head.appendChild(s);
}

// ── Infinite carousel setup ───────────────────────────────────────────────────

const N        = SERVICES.length;
const EXTENDED = [SERVICES[N - 1], ...SERVICES, SERVICES[0]]; // length = N + 2
const TRACK_N  = EXTENDED.length;

// ─────────────────────────────────────────────────────────────────────────────

const ServicesSection: React.FC = () => {
  // displayIdx: 1…N = real slots; 0 = ghost-prev; N+1 = ghost-next
  const [displayIdx,  setDisplayIdx]  = useState(1);
  const [animated,    setAnimated]    = useState(true);
  const [realIdx,     setRealIdx]     = useState(0);      // 0-based in SERVICES
  const [isMobile,    setIsMobile]    = useState(false);
  const [visible,     setVisible]     = useState(false);
  const [panelSize,   setPanelSize]   = useState({ w: 0, h: 0 });

  const rootRef        = useRef<HTMLDivElement>(null);
  const panelRef       = useRef<HTMLDivElement>(null);
  const transitioning  = useRef(false);
  const accumulator    = useRef(0);
  const decayTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer      = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX    = useRef(0);
  const paused         = useRef(false);

  // ── Measure panel container ───────────────────────────────────────────────

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setPanelSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Responsive ───────────────────────────────────────────────────────────

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Entry visibility ──────────────────────────────────────────────────────

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // ── Navigate core ─────────────────────────────────────────────────────────

  const go = useCallback((dir: 1 | -1) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setDisplayIdx(d => d + dir);
  }, []);

  // Ghost-slot wrap + realIdx sync
  const onTransitionEnd = useCallback(() => {
    setDisplayIdx(d => {
      if (d === 0) {
        setAnimated(false);
        setRealIdx(N - 1);
        transitioning.current = false;
        return N;
      }
      if (d === N + 1) {
        setAnimated(false);
        setRealIdx(0);
        transitioning.current = false;
        return 1;
      }
      setRealIdx(d - 1);
      transitioning.current = false;
      return d;
    });
  }, []);

  // Re-enable animation after silent jump
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const selectService = useCallback((i: number) => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setDisplayIdx(i + 1);
    setTimeout(() => {
      setRealIdx(i);
      transitioning.current = false;
    }, SLIDE_DURATION + 50);
  }, []);

  // ── Auto-advance ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (AUTO_ADVANCE_MS <= 0) return;
    const start = () => {
      autoTimer.current = setInterval(() => {
        if (!paused.current) go(1);
      }, AUTO_ADVANCE_MS);
    };
    start();
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [go]);

  // ── Wheel — boundary pass-through ────────────────────────────────────────

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let pinch-zoom through

      const scrollingDown = e.deltaY > 0;
      const scrollingUp   = e.deltaY < 0;
      const atFirst = realIdx === 0;
      const atLast  = realIdx === N - 1;

      // ── Boundary: let parent SectionScroller handle section navigation ──
      if ((atFirst && scrollingUp) || (atLast && scrollingDown)) {
        accumulator.current = 0;
        return; // no preventDefault, no stopPropagation → bubbles to parent
      }

      // ── Within services: consume event ──
      e.preventDefault();
      e.stopPropagation();

      if (transitioning.current) return;

      accumulator.current += e.deltaY;

      if (decayTimer.current) clearTimeout(decayTimer.current);
      decayTimer.current = setTimeout(() => { accumulator.current = 0; }, ACCUMULATOR_DECAY);

      if (Math.abs(accumulator.current) >= SCROLL_THRESHOLD) {
        const dir = accumulator.current > 0 ? 1 : -1;
        accumulator.current = 0;
        if (decayTimer.current) { clearTimeout(decayTimer.current); decayTimer.current = null; }
        if (autoTimer.current) clearInterval(autoTimer.current);
        go(dir);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, realIdx]);

  // ── Keyboard ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { if (autoTimer.current) clearInterval(autoTimer.current); go(1); }
      if (e.key === "ArrowLeft")  { if (autoTimer.current) clearInterval(autoTimer.current); go(-1); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  // ── Touch ─────────────────────────────────────────────────────────────────

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < TOUCH_THRESHOLD) return;
    if (autoTimer.current) clearInterval(autoTimer.current);
    go(delta > 0 ? 1 : -1);
  };

  // ── Cleanup ───────────────────────────────────────────────────────────────

  useEffect(() => () => {
    if (autoTimer.current)  clearInterval(autoTimer.current);
    if (decayTimer.current) clearTimeout(decayTimer.current);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  const svc = SERVICES[realIdx];

  const trackStyle: CSSProperties = {
    display: "flex",
    width: panelSize.w > 0 ? `${TRACK_N * panelSize.w}px` : "100%",
    height: "100%",
    transform: panelSize.w > 0
      ? `translateX(-${displayIdx * panelSize.w}px)`
      : `translateX(-${(displayIdx / TRACK_N) * 100}%)`,
    transition: animated ? `transform ${SLIDE_DURATION}ms cubic-bezier(.77,0,.18,1)` : "none",
    willChange: "transform",
  };

  return (
    <section
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#030309",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(22px)",
        transition: "opacity 650ms ease, transform 750ms cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Ambient background mesh ───────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 55% at 78% 54%, ${svc.accent}0f 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 18% 28%, ${svc.accentDim}0b 0%, transparent 55%),
          radial-gradient(ellipse 70% 40% at 50% 100%, ${svc.accentDim}09 0%, transparent 50%)
        `,
        transition: "background 900ms ease",
      }} />

      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.012) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        opacity: 0.7,
      }} />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header style={{
        position: "relative", zIndex: 10, flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `clamp(12px,2vh,20px) clamp(18px,4vw,48px) 0`,
        animation: visible ? "svc-header-in 600ms ease both" : undefined,
      }}>
        {/* Brand label */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block",
            width: 5, height: 5, borderRadius: "50%",
            background: svc.accent,
            animation: "svc-pulse 2.4s infinite",
            transition: "background .5s",
          }} />
          <span style={{
            fontSize: "0.64rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}>
            Our Services
          </span>
        </div>

        {/* Desktop arrows + count */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {!isMobile && (
            <>
              {(["←", "→"] as const).map((lbl, i) => (
                <button
                  key={lbl}
                  onClick={() => { if (autoTimer.current) clearInterval(autoTimer.current); go(i === 0 ? -1 : 1); }}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    width: 32, height: 32, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.85rem",
                    transition: "background .2s, color .2s, transform .15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${svc.accent}22`;
                    e.currentTarget.style.color = svc.accent;
                    e.currentTarget.style.transform = "scale(1.12)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {lbl}
                </button>
              ))}
            </>
          )}
          <span style={{
            fontSize: "0.64rem",
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.18)",
          }}>
            {String(realIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(N).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* ── Mobile nav ────────────────────────────────────────────────────── */}
      {isMobile && (
        <div style={{
          position: "relative", zIndex: 10, flexShrink: 0,
          padding: "10px clamp(18px,5vw,28px) 0",
        }}>
          <ServiceNav
            services={SERVICES}
            active={realIdx}
            isMobile
            onSelect={selectService}
          />
        </div>
      )}

      {/* ── Body row: [desktop nav] + [carousel track container] ──────────── */}
      <div style={{
        position: "relative", zIndex: 10,
        flex: 1, minHeight: 0,
        display: "flex",
        padding: `clamp(10px,1.5vh,16px) clamp(18px,4vw,48px) clamp(8px,1.2vh,14px)`,
        gap: isMobile ? 0 : "clamp(16px,2.2vw,36px)",
      }}>
        {/* Desktop sidebar nav — fixed, outside the track */}
        {!isMobile && (
          <ServiceNav
            services={SERVICES}
            active={realIdx}
            isMobile={false}
            onSelect={selectService}
          />
        )}

        {/* Track container — overflow hidden, fills remaining space */}
        <div ref={panelRef} style={{ flex: 1, minWidth: 0, overflow: "hidden", height: "100%" }}>
          {panelSize.w > 0 && (
            <div style={trackStyle} onTransitionEnd={onTransitionEnd}>
              {EXTENDED.map((s, i) => (
                <ServicePanel
                  key={`${i}-${s.id}`}
                  service={s}
                  isMobile={isMobile}
                  panelWidth={panelSize.w}
                  panelHeight={panelSize.h}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Dot indicators ────────────────────────────────────────────────── */}
      <footer style={{
        position: "relative", zIndex: 10, flexShrink: 0,
        display: "flex", justifyContent: "center", alignItems: "center",
        gap: 8,
        paddingBottom: "clamp(10px,1.6vh,18px)",
        animation: visible ? "svc-footer-in 700ms ease both" : undefined,
      }}>
        {SERVICES.map((s, i) => {
          const on = i === realIdx;
          return (
            <button
              key={s.id}
              onClick={() => selectService(i)}
              style={{
                all: "unset",
                cursor: "pointer",
                width: on ? 24 : 7,
                height: 7,
                borderRadius: 4,
                background: on ? svc.accent : "rgba(255,255,255,0.14)",
                boxShadow: on ? `0 0 12px ${svc.accent}99` : "none",
                transition: `width ${SLIDE_DURATION}ms cubic-bezier(.22,1,.36,1), background .4s, box-shadow .4s`,
              }}
            />
          );
        })}
      </footer>
    </section>
  );
};

export default ServicesSection;