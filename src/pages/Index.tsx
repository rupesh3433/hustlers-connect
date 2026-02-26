// src/pages/Index.tsx

import { type FC, useRef } from "react";
import Navbar from "../components/indexcomponents/Navbar";
import HeroSection from "../components/indexcomponents/HeroSection";
import ServicesSection from "../components/indexcomponents/ServicesSection";
import ContactSection from "../components/indexcomponents/ContactSection";
import Footer from "../components/indexcomponents/Footer";
import type { SectionScrollerHandle } from "./SectionScroller";
import SectionScroller from "./SectionScroller";


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ✦ SCROLL SETTINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

// ─────────────────────────────────────────────────────────────────────────────

const Index: FC = () => {
  const scrollerRef = useRef<SectionScrollerHandle>(null);

  const handleNavigate = (index: number) => {
    scrollerRef.current?.scrollTo(index);
  };

  return (
    <div className="fixed inset-0 bg-[#010106] overflow-hidden">
      
      {/* ✅ Pass required prop */}
      <Navbar onNavigate={handleNavigate} />

      <SectionScroller
        ref={scrollerRef}
        {...SCROLL_SETTINGS}
        sections={[
          <HeroSection key="hero" />,
          <ServicesSection key="services" />,
          <ContactSection key="contact" />,
          <Footer key="footer" />,
        ]}
      />
    </div>
  );
};

export default Index;