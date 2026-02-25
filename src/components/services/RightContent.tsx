import React from "react";
import type { ServiceItem } from "./ServicesSection";

interface RightContentProps {
  services: ServiceItem[];
  activeIndex: number;
}

const RightContent: React.FC<RightContentProps> = ({ services, activeIndex }) => {
  const total = services.length;

  return (
    <div
      style={{
        width: "65%",
        height: "100vh",
        position: "relative",
        padding: "4rem 4rem 4rem 3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* Sliding description panel */}
      <div
        style={{
          overflow: "hidden",
          height: "20rem", // fixed height to keep layout stable
          position: "relative",
        }}
      >
        <div
          style={{
            height: `${total * 100}%`,
            transform: `translateY(-${activeIndex * (100 / total)}%)`,
            transition: "transform 1350ms cubic-bezier(.77,0,.18,1)",
            willChange: "transform",
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                height: `${100 / total}%`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: "600px",
                  marginBottom: "2rem",
                }}
              >
                {service.description}
              </p>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.4rem 1rem",
                      background: "rgba(168,85,247,0.1)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      borderRadius: "30px",
                      fontSize: "0.9rem",
                      color: "#e9d5ff",
                      letterSpacing: "0.02em",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated glow background (follows active index) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "70%",
          height: "100%",
          background: `radial-gradient(circle at 70% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)`,
          transform: `translateY(${activeIndex * 15}px)`,
          transition: "transform 1200ms cubic-bezier(.77,0,.18,1)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default RightContent;