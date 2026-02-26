// src/pages/Index.tsx

import type { FC } from "react";
import Navbar from "../components/indexcomponents/Navbar";
import HeroSection from "../components/indexcomponents/HeroSection";
import ServicesSection from "../components/indexcomponents/ServicesSection";
import Footer from "../components/indexcomponents/Footer";
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
  return (
    /*
      `fixed inset-0`   — always covers exactly the visual viewport
      `bg-[#010106]`    — page background, never shows a gap
      `overflow-hidden` — clips anything that momentarily overflows

      SectionScroller's <main> uses position:absolute so it needs a
      positioned ancestor — `fixed` provides that.
    */
    <div className="fixed inset-0 bg-[#010106] overflow-hidden">
      <Navbar />

      <SectionScroller
        {...SCROLL_SETTINGS}
        sections={[
          <HeroSection />,
          <ServicesSection />,
          <Footer />,
        ]}
      />
    </div>
  );
};

export default Index;