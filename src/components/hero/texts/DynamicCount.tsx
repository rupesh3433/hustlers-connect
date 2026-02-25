import React, { useEffect, useRef, useState } from "react";

interface DynamicCountProps {
  duration?: number;
  className?: string;
}

const STATS = [
  { label: "Views", target: 500_000_000 },
  { label: "Followers", target: 4_000_000 },
];

const format = (n: number) => `${Math.floor(n / 1_000_000)}M+`;

const AnimatedCounter: React.FC<{ target: number; duration: number }> = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const frame = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    const tick = (ts: number) => {
      if (!start.current) start.current = ts;
      const p = Math.min((ts - start.current) / duration, 1);
      setCount(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration]);

  return <>{format(count)}</>;
};

const DynamicCount: React.FC<DynamicCountProps> = ({
  duration = 1600,
  className = "",
}) => (
  <div
    className={className}
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: "2px",
    }}
  >
    {/* Top Label */}
    <p
      style={{
        margin: 0,
        fontSize: "11px",
        fontWeight: 800,
        color: "rgba(255,255,255,0.35)",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
      }}
    >
      Generating...
    </p>

    {/* Stats Row */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      {STATS.map((stat, i) => (
        <React.Fragment key={stat.label}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontSize: "clamp(25px, 3vw, 25px)",
                fontWeight: 700,
                lineHeight: 1,
                background: "linear-gradient(90deg, #4f8eff, #b44fff, #ff3b6b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <AnimatedCounter target={stat.target} duration={duration} />
            </span>

            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.01em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </span>
          </div>

          {i < STATS.length - 1 && (
            <div
              style={{
                width: "1px",
                height: "24px",
                background: "rgba(255,255,255,0.08)",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default React.memo(DynamicCount);