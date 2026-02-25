import React from "react";
import type { ServiceItem } from "./ServicesSection";

interface LeftCounterProps {
  services: ServiceItem[];
  activeIndex: number;
}

const LeftCounter: React.FC<LeftCounterProps> = ({ services, activeIndex }) => {
  const total = services.length;
  const progressPercent = total > 1 ? (activeIndex / (total - 1)) * 100 : 0;

  return (
    <div
      style={{
        width: "35%",
        height: "100vh",
        position: "relative",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      {/* Sliding numbers / titles */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
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
                alignItems: "center",
                fontSize: "clamp(2rem, 6vw, 4rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              <span style={{ opacity: 0.6, marginRight: "0.5rem" }}>
                {String(service.id).padStart(2, "0")}
              </span>
              <span>{service.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress spine */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: 2,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${progressPercent}%`,
            backgroundColor: "#a855f7",
            transition: "height 850ms cubic-bezier(.77,0,.18,1)",
            boxShadow: "0 0 12px #a855f7",
          }}
        />
      </div>

      {/* Static decorative text */}
      <div
        style={{
          fontSize: "0.8rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginTop: "2rem",
        }}
      >
        {activeIndex + 1} / {total}
      </div>
    </div>
  );
};

export default LeftCounter;