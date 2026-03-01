// src/pages/Index.tsx

import { type FC, useRef } from "react";
import Navbar from "../components/indexcomponents/Navbar";
import HeroSection from "../components/indexcomponents/HeroSection";
import ServicesSection from "../components/indexcomponents/ServicesSection";
import ContactSection from "../components/indexcomponents/ContactSection";
import Footer from "../components/indexcomponents/Footer";
import type { SectionScrollerHandle } from "./SectionScroller";
import SectionScroller from "./SectionScroller";
import ThemeBackground from "../components/shared/ThemeBackground";
import TestimonialSection from "../components/indexcomponents/TestimonialSection";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ✦ SCROLL SETTINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SCROLL_SETTINGS = {
  scrollThreshold:     280,
  scrollDuration:      500,
  accumulatorDecay:    400,
  transitionRatio:     0.40,
  touchThreshold:      60,
  navbarHeightMobile:  64,
  navbarHeightDesktop: 80,
  desktopBreakpoint:   768,
  zoomSettleDelay:     150,
} as const;

// ─────────────────────────────────────────────────────────────────

const Index: FC = () => {
  const scrollerRef = useRef<SectionScrollerHandle>(null);

  const handleNavigate = (index: number) => {
    scrollerRef.current?.scrollTo(index);
  };

  return (
    /*
      Root div is intentionally transparent — ThemeBackground renders
      all background layers (colour, grid, glows) as fixed elements
      behind everything else. Edit ThemeBackground.tsx to change look.
    */
    <div className="fixed inset-0 overflow-hidden" style={{ background: "transparent" }}>

      {/* ✅ All background theming lives here — one place to edit */}
      <ThemeBackground />

      {/* UI layers sit above the background (z-index > 3) */}
      <div className="relative" style={{ zIndex: 10, height: "100%" }}>
        <Navbar onNavigate={handleNavigate} />

        <SectionScroller
          ref={scrollerRef}
          {...SCROLL_SETTINGS}
          sections={[
            <HeroSection key="hero" />,
            <ServicesSection key="services" />,
            <TestimonialSection key="testimonial" />,
            <ContactSection key="contact" />,
            <Footer key="footer" />,
          ]}
        />
      </div>
    </div>
  );
};

export default Index;