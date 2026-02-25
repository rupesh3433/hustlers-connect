// src/components/services/useScrollStepper.ts

import { useEffect, useState } from "react";

export function useScrollStepper(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  totalSteps: number
): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || totalSteps <= 1) return;

    let ticking = false;

    const updateIndex = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only react while section is influencing viewport
      const isActive = rect.top < vh && rect.bottom > 0;
      if (!isActive) {
        ticking = false;
        return;
      }

      const scrollable = section.offsetHeight - vh;
      if (scrollable <= 0) {
        ticking = false;
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = scrolled / scrollable;

      // Snap to nearest step
      const stepSize = 1 / totalSteps;
      let index = Math.round(progress / stepSize);
      index = Math.min(Math.max(index, 0), totalSteps - 1);

      setActiveIndex(index);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateIndex);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial sync
    updateIndex();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRef, totalSteps]);

  return activeIndex;
}