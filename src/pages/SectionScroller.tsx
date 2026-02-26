// src/pages/SectionScroller.tsx
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  TWO-MODE SCROLL SYSTEM
//  ──────────────────────
//  MODE 1 — Normal (scale ≈ 1.0):
//    • <main> overflow-y: scroll, controlled by our rAF navigation.
//    • Each <section> overflow: hidden.
//    • Wheel/touch/keyboard navigate between sections.
//
//  MODE 2 — Zoomed in (scale > 1.05):
//    • <main> overflow: hidden — stops inter-section navigation.
//    • Active <section> overflow: auto — user scrolls freely inside it.
//    • All wheel/touch events passed through natively, no interception.
//    • On zoom-out back to ≈1.0, re-snap to current section, restore mode 1.
//
//  PERSISTENCE
//  ───────────
//  The active section index survives browser refresh via localStorage.
//  Key: STORAGE_KEY ("sectionScroller.activeIndex")
//  Write: after every navigation animation completes (final rAF frame).
//  Read: on first mount, before first paint — sets scrollTop directly
//        (no animation) so there is no visible jump.
//
//  IMPERATIVE HANDLE
//  ─────────────────
//  Exposes scrollTo(index) via forwardRef + useImperativeHandle so that
//  external callers (e.g. Navbar) can programmatically navigate sections
//  without prop-drilling callbacks into every section component.
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import {
    type FC,
    type ReactNode,
    forwardRef,
    useRef,
    useEffect,
    useLayoutEffect,
    useState,
    useCallback,
    useImperativeHandle,
  } from "react";
  
  // ─────────────────────────────────────────────────────────────────────────────
  //  Persistence key
  // ─────────────────────────────────────────────────────────────────────────────
  
  const STORAGE_KEY = "sectionScroller.activeIndex";
  
  const readStoredIndex = (): number => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return 0;
      const parsed = parseInt(raw, 10);
      return Number.isFinite(parsed) ? parsed : 0;
    } catch {
      return 0;
    }
  };
  
  const writeStoredIndex = (index: number): void => {
    try {
      localStorage.setItem(STORAGE_KEY, String(index));
    } catch {
      // Storage quota exceeded or private-browsing restriction — silently ignore.
    }
  };
  
  // ─────────────────────────────────────────────────────────────────────────────
  //  Public handle type — import this wherever you hold a ref to SectionScroller
  // ─────────────────────────────────────────────────────────────────────────────
  
  export interface SectionScrollerHandle {
    /** Programmatically navigate to a section by zero-based index. */
    scrollTo: (index: number) => void;
  }
  
  // ─────────────────────────────────────────────────────────────────────────────
  //  Config interface
  // ─────────────────────────────────────────────────────────────────────────────
  
  export interface ScrollerConfig {
    scrollThreshold?: number;
    scrollDuration?: number;
    accumulatorDecay?: number;
    transitionRatio?: number;
    touchThreshold?: number;
    easing?: (t: number) => number;
    navbarHeightMobile?: number;
    navbarHeightDesktop?: number;
    desktopBreakpoint?: number;
    /**
     * Scale threshold above which "zoomed in" mode activates.
     * 1.05 = any zoom beyond 105% triggers it.
     * Default: 1.05
     */
    zoomScaleThreshold?: number;
    /** Ms after zoom-out before navigation re-enables. Default: 150. */
    zoomSettleDelay?: number;
  }
  
  export interface SectionScrollerProps extends ScrollerConfig {
    sections: ReactNode[];
  }
  
  // ─────────────────────────────────────────────────────────────────────────────
  //  Defaults
  // ─────────────────────────────────────────────────────────────────────────────
  
  const DEFAULT_SCROLL_THRESHOLD    = 180;
  const DEFAULT_SCROLL_DURATION     = 900;
  const DEFAULT_ACCUMULATOR_DECAY   = 400;
  const DEFAULT_TRANSITION_RATIO    = 0.30;
  const DEFAULT_TOUCH_THRESHOLD     = 60;
  const DEFAULT_NAVBAR_H_MOBILE     = 64;
  const DEFAULT_NAVBAR_H_DESKTOP    = 80;
  const DEFAULT_DESKTOP_BREAKPOINT  = 768;
  const DEFAULT_ZOOM_SCALE_THRESHOLD = 1.05;
  const DEFAULT_ZOOM_SETTLE_DELAY   = 150;
  
  const DEFAULT_EASING = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  
  // ─────────────────────────────────────────────────────────────────────────────
  //  Helpers
  // ─────────────────────────────────────────────────────────────────────────────
  
  const clamp = (v: number, lo: number, hi: number): number =>
    Math.min(Math.max(v, lo), hi);
  
  const fadeProgress = (pos: number, start: number, zone: number): number =>
    clamp((pos - start) / zone, 0, 1);
  
  const getScale = (): number =>
    typeof window !== "undefined" && window.visualViewport
      ? window.visualViewport.scale
      : 1;
  
  // ─────────────────────────────────────────────────────────────────────────────
  //  Inner component (receives forwarded ref as second argument)
  // ─────────────────────────────────────────────────────────────────────────────
  
  const SectionScrollerInner: FC<SectionScrollerProps & {
    forwardedRef: React.ForwardedRef<SectionScrollerHandle>;
  }> = ({
    forwardedRef,
    sections,
    scrollThreshold      = DEFAULT_SCROLL_THRESHOLD,
    scrollDuration       = DEFAULT_SCROLL_DURATION,
    accumulatorDecay     = DEFAULT_ACCUMULATOR_DECAY,
    transitionRatio      = DEFAULT_TRANSITION_RATIO,
    touchThreshold       = DEFAULT_TOUCH_THRESHOLD,
    easing               = DEFAULT_EASING,
    navbarHeightMobile   = DEFAULT_NAVBAR_H_MOBILE,
    navbarHeightDesktop  = DEFAULT_NAVBAR_H_DESKTOP,
    desktopBreakpoint    = DEFAULT_DESKTOP_BREAKPOINT,
    zoomScaleThreshold   = DEFAULT_ZOOM_SCALE_THRESHOLD,
    zoomSettleDelay      = DEFAULT_ZOOM_SETTLE_DELAY,
  }) => {
    const total = sections.length;
  
    // ── Refs ──────────────────────────────────────────────────────────────────
    const mainRef            = useRef<HTMLDivElement>(null);
    const rafRef             = useRef<number | null>(null);
    const isAnimating        = useRef<boolean>(false);
    const currentIdx         = useRef<number>(0);          // authoritative index
    const accumulator        = useRef<number>(0);
    const decayTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
    const zoomSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
    // ── State ─────────────────────────────────────────────────────────────────
    const [scrollY,    setScrollY]    = useState<number>(0);
    const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);
    const [vw, setVw] = useState<number>(
      typeof window !== "undefined" ? window.innerWidth : 1024
    );
  
    const navbarH = vw >= desktopBreakpoint ? navbarHeightDesktop : navbarHeightMobile;
  
    // ── vw tracking (only for navbar height breakpoint) ───────────────────────
    useEffect(() => {
      const onResize = (): void => setVw(window.innerWidth);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);
  
    // ── Live section height from DOM ──────────────────────────────────────────
    const getSectionH = useCallback((): number =>
      mainRef.current?.clientHeight ?? (window.innerHeight - navbarH),
    [navbarH]);
  
    // ── Restore persisted index on mount ─────────────────────────────────────
    //
    //  useLayoutEffect fires after DOM mount but BEFORE the browser paints.
    //  This means scrollTop is corrected before the first visible frame —
    //  eliminating the Hero flash that useEffect caused (runs post-paint).
    //  Must clamp against total so a stale localStorage value never causes
    //  an out-of-bounds scroll (e.g. if sections were removed after last visit).
    //
    useLayoutEffect(() => {
      const el = mainRef.current;
      if (!el) return;
  
      const saved   = clamp(readStoredIndex(), 0, total - 1);
      const targetY = saved * el.clientHeight;
  
      currentIdx.current = saved;
      el.scrollTop       = targetY;
      setScrollY(targetY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentionally empty — runs exactly once after first mount
  
    // ── Zoom scale tracking via visualViewport ────────────────────────────────
    useEffect(() => {
      const vv = window.visualViewport;
      if (!vv) return;
  
      const onVVResize = (): void => {
        const scale  = getScale();
        const zoomed = scale > zoomScaleThreshold;
  
        if (zoomed) {
          setIsZoomedIn(true);
  
          if (zoomSettleTimerRef.current !== null) {
            clearTimeout(zoomSettleTimerRef.current);
            zoomSettleTimerRef.current = null;
          }
  
          if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            isAnimating.current = false;
          }
  
          accumulator.current = 0;
          if (decayTimerRef.current !== null) {
            clearTimeout(decayTimerRef.current);
            decayTimerRef.current = null;
          }
        } else {
          if (zoomSettleTimerRef.current !== null) clearTimeout(zoomSettleTimerRef.current);
          zoomSettleTimerRef.current = setTimeout(() => {
            const el = mainRef.current;
            if (el) {
              const h       = el.clientHeight;
              const targetY = currentIdx.current * h;
              el.scrollTop  = targetY;
              setScrollY(targetY);
            }
            setIsZoomedIn(false);
          }, zoomSettleDelay);
        }
      };
  
      vv.addEventListener("resize", onVVResize);
      return () => vv.removeEventListener("resize", onVVResize);
    }, [zoomScaleThreshold, zoomSettleDelay]);
  
    // ── Animation engine ──────────────────────────────────────────────────────
    const animateScrollTo = useCallback((targetY: number, targetIdx: number): void => {
      const el = mainRef.current;
      if (!el) return;
  
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
  
      const startY    = el.scrollTop;
      const delta     = targetY - startY;
      const startTime = performance.now();
      isAnimating.current = true;
  
      const step = (now: number): void => {
        const rawT   = Math.min((now - startTime) / scrollDuration, 1);
        const easedT = easing(rawT);
        const newY   = startY + delta * easedT;
  
        el.scrollTop = newY;
        setScrollY(newY);
  
        if (rawT < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          el.scrollTop        = targetY;
          setScrollY(targetY);
          isAnimating.current = false;
          rafRef.current      = null;
  
          // ── Persist index AFTER animation fully settles ──────────────────
          //    Writing here (not at navigateTo call-site) guarantees we only
          //    store indices that were actually reached, not mid-flight ones.
          writeStoredIndex(targetIdx);
        }
      };
  
      rafRef.current = requestAnimationFrame(step);
    }, [scrollDuration, easing]);
  
    // ── Core navigation ───────────────────────────────────────────────────────
    const navigateTo = useCallback((idx: number): void => {
      if (isAnimating.current || isZoomedIn) return;
      const next     = clamp(idx, 0, total - 1);
      const sectionH = getSectionH();
      currentIdx.current = next;
      animateScrollTo(next * sectionH, next);  // ← pass next so animateScrollTo can persist it
    }, [animateScrollTo, getSectionH, total, isZoomedIn]);
  
    // ── Imperative handle — exposes scrollTo() to parent via ref ──────────────
    useImperativeHandle(
      forwardedRef,
      () => ({
        scrollTo: (index: number): void => {
          navigateTo(index);
        },
      }),
      // Rebuild handle whenever navigateTo identity changes (zoom / total shifts)
      [navigateTo]
    );
  
    // ── Wheel ─────────────────────────────────────────────────────────────────
    useEffect(() => {
      const el = mainRef.current;
      if (!el) return;
  
      /*
        KEY FIX: When zoomed, DON'T register the wheel listener at all.
  
        The previous approach registered with passive:false and returned early.
        But passive:false alone — regardless of whether preventDefault() is
        called — forces the browser compositor thread to pause and wait for
        the JS thread to finish before processing the gesture.
        That wait is what caused the stuck/laggy feeling. Zero JS in the path
        is the only way to get native-speed scrolling.
  
        Since isZoomedIn is in the dependency array, this effect tears down
        and re-registers whenever zoom mode changes — clean toggle.
      */
      if (isZoomedIn) return; // ← no listener registered at all while zoomed
  
      const onWheel = (e: WheelEvent): void => {
        if (e.ctrlKey) return; // let zoom gestures through
        e.preventDefault();
        if (isAnimating.current) return;
  
        accumulator.current += e.deltaY;
        if (decayTimerRef.current !== null) clearTimeout(decayTimerRef.current);
        decayTimerRef.current = setTimeout(() => { accumulator.current = 0; }, accumulatorDecay);
  
        if (Math.abs(accumulator.current) >= scrollThreshold) {
          const direction = accumulator.current > 0 ? 1 : -1;
          accumulator.current = 0;
          if (decayTimerRef.current !== null) {
            clearTimeout(decayTimerRef.current);
            decayTimerRef.current = null;
          }
          navigateTo(currentIdx.current + direction);
        }
      };
  
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [navigateTo, scrollThreshold, accumulatorDecay, isZoomedIn]);
  
    // ── Touch ─────────────────────────────────────────────────────────────────
    useEffect(() => {
      const el = mainRef.current;
      if (!el) return;
  
      // Same pattern as wheel: when zoomed, register nothing.
      // Browser handles all touch gestures (pan, pinch, momentum) natively.
      if (isZoomedIn) return;
  
      let touchStartY = 0;
      let touchLocked = false;
  
      const onTouchStart = (e: TouchEvent): void => {
        if (e.touches.length !== 1) return;
        touchStartY = e.touches[0].clientY;
        touchLocked = false;
      };
  
      const onTouchEnd = (e: TouchEvent): void => {
        if (e.changedTouches.length !== 1) return;
        if (isAnimating.current || touchLocked) return;
        const delta = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(delta) < touchThreshold) return;
        touchLocked = true;
        navigateTo(currentIdx.current + (delta > 0 ? 1 : -1));
      };
  
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchend",   onTouchEnd,   { passive: true });
      return () => {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchend",   onTouchEnd);
      };
    }, [navigateTo, touchThreshold, isZoomedIn]);
  
    // ── Keyboard ──────────────────────────────────────────────────────────────
    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent): void => {
        if (isAnimating.current || isZoomedIn) return;
        if (e.key === "ArrowDown" || e.key === "PageDown") {
          e.preventDefault(); navigateTo(currentIdx.current + 1);
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault(); navigateTo(currentIdx.current - 1);
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [navigateTo, isZoomedIn]);
  
    // ── Cleanup ───────────────────────────────────────────────────────────────
    useEffect(() => {
      return () => {
        if (rafRef.current !== null)             cancelAnimationFrame(rafRef.current);
        if (decayTimerRef.current !== null)      clearTimeout(decayTimerRef.current);
        if (zoomSettleTimerRef.current !== null) clearTimeout(zoomSettleTimerRef.current);
      };
    }, []);
  
    // ── Opacity ───────────────────────────────────────────────────────────────
    const sectionH = mainRef.current?.clientHeight ?? (
      typeof window !== "undefined" ? window.innerHeight - navbarH : 800
    );
    const zone = sectionH * transitionRatio;
  
    const getOpacity = (index: number): number => {
      if (index === 0) return 1 - fadeProgress(scrollY, 0, zone);
      const fadeIn  = fadeProgress(scrollY, (index - 1) * sectionH, zone);
      const fadeOut = index < total - 1
        ? fadeProgress(scrollY, index * sectionH, zone)
        : 0;
      return fadeIn * (1 - fadeOut);
    };
  
    // ── Render ────────────────────────────────────────────────────────────────
    return (
      <main
        ref={mainRef}
        style={{
          position: "absolute",
          top: navbarH,
          left: 0,
          right: 0,
          bottom: 0,
          /*
            MODE SWITCH on <main>:
  
            Normal    → overflow-y: scroll
              Our rAF engine drives scrollTop for section navigation.
  
            Zoomed in → overflow: hidden on <main>, but we also unregistered
              ALL our wheel/touch listeners above, so the browser compositor
              thread handles every gesture with zero JS involvement.
              The browser natively pans the zoomed visual viewport.
          */
          overflowY: isZoomedIn ? "hidden" : "scroll",
          overflowX: "hidden",
          scrollBehavior: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          /*
            touchAction MODE SWITCH:
            Normal    → "pinch-zoom": allows pinch zoom, blocks native pan
                        so our rAF owns section navigation.
            Zoomed in → "auto": full native gesture handling.
                        Since no touch listeners are registered when zoomed,
                        the compositor handles pan+pinch at full hardware speed.
          */
          touchAction: isZoomedIn ? "auto" : "pinch-zoom",
        }}
      >
        {sections.map((section, i) => {
          const opacity = getOpacity(i);
  
          return (
            <section
              key={i}
              style={{
                height: "100%",
                flexShrink: 0,
                opacity,
                pointerEvents: opacity < 0.05 ? "none" : "auto",
                willChange: "opacity",
                /*
                  Section overflow:
                  Normal    → hidden: clips content, navigation via <main>.
                  Zoomed    → visible: don't clip. Browser pans the zoomed
                              visual viewport natively — no DOM scroll needed.
                              overflow:auto here would actually interfere because
                              it creates a new scroll container that fights the
                              browser's native zoom panning.
                */
                overflow: isZoomedIn ? "visible" : "hidden",
                touchAction: isZoomedIn ? "auto" : "none",
              }}
            >
              {section}
            </section>
          );
        })}
      </main>
    );
  };
  
  // ─────────────────────────────────────────────────────────────────────────────
  //  forwardRef wrapper — bridges React's ref forwarding API with our inner FC
  // ─────────────────────────────────────────────────────────────────────────────
  
  const SectionScroller = forwardRef<SectionScrollerHandle, SectionScrollerProps>(
    (props, ref) => <SectionScrollerInner {...props} forwardedRef={ref} />
  );
  
  SectionScroller.displayName = "SectionScroller";
  
  export default SectionScroller;