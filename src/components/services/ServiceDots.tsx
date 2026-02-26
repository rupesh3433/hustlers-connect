// src/components/services/ServiceDots.tsx

import React from "react";
import type { ServiceItem } from "./services.data";

interface Props {
  services: ServiceItem[];
  active: ServiceItem;
  realIdx: number;
  slideDuration: number;
  onSelect: (i: number) => void;
}

const ServiceDots: React.FC<Props> = ({
  services,
  active,
  realIdx,
  slideDuration,
  onSelect,
}) => (
  <footer
    style={{
      flexShrink: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 7,
      paddingBottom: "clamp(10px,1.6vh,18px)",
    }}
  >
    {services.map((s, i) => {
      const on = i === realIdx;

      return (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          style={{
            all: "unset",
            cursor: "pointer",
            width: on ? 22 : 7,
            height: 7,
            borderRadius: 4,

            background: on
              ? active.accent
              : "var(--svc-dot-inactive)",

            boxShadow: on
              ? `0 0 12px ${active.accent}aa`
              : "none",

            transition: `
              width ${slideDuration}ms cubic-bezier(.22,1,.36,1),
              background .4s ease,
              box-shadow .4s ease
            `,
          }}
        />
      );
    })}

    <style>
      {`
        :root {
          --svc-dot-inactive: rgba(0,0,0,0.18);
        }

        html.dark {
          --svc-dot-inactive: rgba(255,255,255,0.16);
        }
      `}
    </style>
  </footer>
);

export default ServiceDots;