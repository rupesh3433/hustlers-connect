// src/components/services/ServicesSection.tsx

import React, { useRef, useEffect, useState } from "react";
import LeftCounter from "./LeftCounter";
import RightContent from "./RightContent";
import { useScrollStepper } from "./useScrollStepper";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "Brand Strategy",
    description:
      "We craft strong brand positioning systems that differentiate you in competitive markets. From identity to voice, everything aligns with long-term business vision.",
    tags: ["Positioning", "Identity", "Voice", "Vision"],
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "We design intuitive, scalable interfaces that balance clarity and conversion. Every interaction is intentional and optimized for user behavior.",
    tags: ["Wireframes", "Prototyping", "Design Systems", "Research"],
  },
  {
    id: 3,
    title: "Full Stack Development",
    description:
      "Robust, scalable, and secure applications built with modern architectures. Performance, maintainability, and resilience are engineered from day one.",
    tags: ["React", "Node.js", "PostgreSQL", "DevOps"],
  },
  {
    id: 4,
    title: "Growth Marketing",
    description:
      "Data-driven campaigns engineered to scale. We analyze funnels, optimize acquisition channels, and convert attention into measurable growth.",
    tags: ["SEO", "Paid Media", "Analytics", "Funnels"],
  },
];

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const activeIndex = useScrollStepper(sectionRef, SERVICES.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        scrollSnapAlign: 'start',
        margin: 0,
        padding: 0,
        position: "relative",
        width: "100%",
        height: `${SERVICES.length * 100}vh`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition:
          "opacity 500ms ease, transform 600ms cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          margin: 0,
          padding: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          overflow: "hidden",
          background: "#05020f",
          color: "#ffffff",
        }}
      >
        {/* Noise Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            opacity: 0.5,
          }}
        />

        {/* Ambient Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(ellipse 70% 65% at 50% 105%, rgba(59,13,221,0.2) 0%, transparent 65%)",
          }}
        />

        {/* Divider */}
        <div
          style={{
            position: "absolute",
            left: "35%",
            top: "12%",
            bottom: "12%",
            width: 1,
            zIndex: 10,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.3) 30%, rgba(244,63,94,0.3) 70%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <LeftCounter services={SERVICES} activeIndex={activeIndex} />
          <RightContent services={SERVICES} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;