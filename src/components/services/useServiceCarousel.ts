// src/components/services/useServiceCarousel.ts
// All stateful logic for the infinite carousel.
// Returns everything ServicesSection needs to drive the UI.

import { useRef, useState, useEffect, useCallback, type CSSProperties } from "react";
import { SERVICES } from "./services.data";

// ── Re-exported so consumers can reference them ───────────────────────────────
export const N        = SERVICES.length;
export const EXTENDED = [SERVICES[N - 1], ...SERVICES, SERVICES[0]];
export const TRACK_N  = EXTENDED.length;

// ── Config injected by ServicesSection ───────────────────────────────────────
export interface CarouselConfig {
  scrollThreshold: number;
  accumulatorDecay: number;
  slideDuration: number;
  autoAdvanceMs: number;
  touchThreshold: number;
}

// ── Return shape ─────────────────────────────────────────────────────────────
export interface CarouselState {
  realIdx: number;
  displayIdx: number;
  trackStyle: CSSProperties;
  go: (dir: 1 | -1) => void;
  selectService: (i: number) => void;
  onTransitionEnd: () => void;
  pauseAuto: () => void;
  resumeAuto: () => void;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd:   (e: React.TouchEvent) => void;
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export function useServiceCarousel(
  panelWidth: number,
  cfg: CarouselConfig,
): CarouselState {
  const { scrollThreshold, accumulatorDecay, slideDuration, autoAdvanceMs, touchThreshold } = cfg;

  const [displayIdx, setDisplayIdx] = useState(1);
  const [animated,   setAnimated]   = useState(true);
  const [realIdx,    setRealIdx]    = useState(0);

  const transitioning = useRef(false);
  const accumulator   = useRef(0);
  const decayTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer     = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused        = useRef(false);
  const touchStartX   = useRef(0);

  // ── Core navigation ───────────────────────────────────────────────────────

  const go = useCallback((dir: 1 | -1) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setDisplayIdx(d => d + dir);
  }, []);

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
    setTimeout(() => { setRealIdx(i); transitioning.current = false; }, slideDuration + 60);
  }, [slideDuration]);

  // ── Auto-advance ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (autoAdvanceMs <= 0) return;
    autoTimer.current = setInterval(() => { if (!paused.current) go(1); }, autoAdvanceMs);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [go, autoAdvanceMs]);

  // ── Keyboard ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { if (autoTimer.current) clearInterval(autoTimer.current); go(1);  }
      if (e.key === "ArrowLeft")  { if (autoTimer.current) clearInterval(autoTimer.current); go(-1); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go]);

  // ── Scroll wheel — boundary pass-through ──────────────────────────────────
  // NOTE: We don't attach here — ServicesSection owns the ref so it can
  // conditionally call stopPropagation. We expose go + config so it can do it.
  // But we DO expose the accumulator logic via a wheel handler factory below.

  // ── Touch ─────────────────────────────────────────────────────────────────

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; },
    onTouchEnd:   (e: React.TouchEvent) => {
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) < touchThreshold) return;
      if (autoTimer.current) clearInterval(autoTimer.current);
      go(delta > 0 ? 1 : -1);
    },
  };

  // ── Pause/resume ──────────────────────────────────────────────────────────

  const pauseAuto  = useCallback(() => { paused.current = true;  }, []);
  const resumeAuto = useCallback(() => { paused.current = false; }, []);

  // ── Cleanup ───────────────────────────────────────────────────────────────

  useEffect(() => () => {
    if (autoTimer.current)  clearInterval(autoTimer.current);
    if (decayTimer.current) clearTimeout(decayTimer.current);
  }, []);

  // ── Scroll wheel accumulator ──────────────────────────────────────────────
  // Exposed via scrollHandlers below but we need refs accessible in the effect.
  // ServicesSection calls this directly via the returned go + realIdx.

  // ── Track style ───────────────────────────────────────────────────────────

  const trackStyle: CSSProperties = {
    display: "flex",
    width:  panelWidth > 0 ? `${TRACK_N * panelWidth}px` : "100%",
    height: "100%",
    transform: panelWidth > 0
      ? `translateX(-${displayIdx * panelWidth}px)`
      : `translateX(-${(displayIdx / TRACK_N) * 100}%)`,
    transition: animated ? `transform ${slideDuration}ms cubic-bezier(.77,0,.18,1)` : "none",
    willChange: "transform",
  };

  return {
    realIdx,
    displayIdx,
    trackStyle,
    go,
    selectService,
    onTransitionEnd,
    pauseAuto,
    resumeAuto,
    touchHandlers,
  };
}

// ── Wheel handler factory (used by ServicesSection to attach to its ref) ──────

export function makeWheelHandler(
  go: (dir: 1 | -1) => void,
  getRealIdx: () => number,
  cfg: Pick<CarouselConfig, "scrollThreshold" | "accumulatorDecay">,
) {
  let acc = 0;
  let decay: ReturnType<typeof setTimeout> | null = null;

  return (e: WheelEvent) => {
    if (e.ctrlKey) return;

    const down   = e.deltaY > 0;
    const up     = e.deltaY < 0;
    const atFirst = getRealIdx() === 0;
    const atLast  = getRealIdx() === N - 1;

    // Boundary → let SectionScroller catch it
    if ((atFirst && up) || (atLast && down)) { acc = 0; return; }

    e.preventDefault();
    e.stopPropagation();

    acc += e.deltaY;

    if (decay) clearTimeout(decay);
    decay = setTimeout(() => { acc = 0; }, cfg.accumulatorDecay);

    if (Math.abs(acc) >= cfg.scrollThreshold) {
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      if (decay) { clearTimeout(decay); decay = null; }
      go(dir);
    }
  };
}