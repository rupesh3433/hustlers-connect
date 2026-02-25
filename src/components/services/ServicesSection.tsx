// src/components/services/Services.tsx

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "Brand Strategy",
    description:
      "We craft strong brand positioning systems that differentiate you in competitive markets. From identity to voice, everything aligns with long-term business vision.",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "We design intuitive, scalable interfaces that balance clarity and conversion. Every interaction is intentional and optimized for user behavior.",
  },
  {
    id: 3,
    title: "Full Stack Development",
    description:
      "Robust, scalable, and secure applications built with modern architectures. Performance, maintainability, and resilience are engineered from day one.",
  },
  {
    id: 4,
    title: "Growth Marketing",
    description:
      "Data-driven campaigns engineered to scale. We analyze funnels, optimize acquisition channels, and convert attention into measurable growth.",
  },
];

const TRANSITION_DURATION = 800;

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const isLockedRef = useRef<boolean>(false);

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    isLockedRef.current = true;
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
    isLockedRef.current = false;
  };

  const isSectionFullyVisible = (): boolean => {
    if (!sectionRef.current) return false;

    const rect = sectionRef.current.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom >= window.innerHeight;
  };

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!sectionRef.current) return;

      const fullyVisible = isSectionFullyVisible();

      if (!fullyVisible) {
        unlockScroll();
        return;
      }

      if (!isLockedRef.current) {
        lockScroll();
      }

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      if (event.deltaY > 0) {
        // Scroll Down
        if (activeIndex < SERVICES.length - 1) {
          event.preventDefault();
          isAnimatingRef.current = true;
          setActiveIndex((prev) => prev + 1);
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, TRANSITION_DURATION);
        } else {
          // Last service reached
          unlockScroll();
        }
      } else {
        // Scroll Up
        if (activeIndex > 0) {
          event.preventDefault();
          isAnimatingRef.current = true;
          setActiveIndex((prev) => prev - 1);
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, TRANSITION_DURATION);
        } else {
          // First service reached
          unlockScroll();
        }
      }
    },
    [activeIndex]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      unlockScroll();
    };
  }, [handleWheel]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#010106] text-white"
    >
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        
        {/* LEFT PANEL */}
        <div className="w-[30%] flex flex-col justify-center items-start px-20 overflow-hidden">
          <div className="relative h-[140px] overflow-hidden">
            <div
              className="transition-transform ease-[cubic-bezier(.77,0,.18,1)]"
              style={{
                transform: `translateY(-${activeIndex * 140}px)`,
                transitionDuration: `${TRANSITION_DURATION}ms`,
              }}
            >
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="h-[140px] flex flex-col justify-center"
                >
                  <div className="text-7xl font-bold text-white/15">
                    {`0${service.id}`}
                  </div>
                  <div className="text-2xl font-semibold mt-3 tracking-wide">
                    {service.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[70%] flex items-center justify-center px-24 overflow-hidden">
          <div className="relative w-full h-[240px] overflow-hidden">
            <div
              className="transition-transform ease-[cubic-bezier(.77,0,.18,1)]"
              style={{
                transform: `translateY(-${activeIndex * 240}px)`,
                transitionDuration: `${TRANSITION_DURATION}ms`,
              }}
            >
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="h-[240px] flex items-center"
                >
                  <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;