// src/components/services/ServicePanel.tsx

import React from "react";
import type { ServiceItem } from "./services.data";
import ServiceContent from "./ServiceContent";
import ServiceVisual from "./ServiceVisual";

interface Props {
  service: ServiceItem;
  isMobile: boolean;
  panelWidth: number;
  panelHeight: number;
}

const ServicePanel: React.FC<Props> = ({
  service,
  isMobile,
  panelWidth,
  panelHeight,
}) => (
  <>
    <div
      style={{
        width: panelWidth,
        height: panelHeight,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 0 : "clamp(20px,2.5vw,44px)",
        overflow: "hidden",

        /* subtle adaptive depth */
        transition: "background 0.4s ease",
      }}
    >
      <ServiceContent
        service={service}
        isMobile={isMobile}
      />

      {!isMobile && (
        <ServiceVisual service={service} />
      )}
    </div>

    {/* Adaptive depth layer (very subtle, no layout change) */}
    <style>
      {`
        :root {
          --svc-panel-glow: rgba(0,0,0,0.03);
        }

        html.dark {
          --svc-panel-glow: rgba(255,255,255,0.02);
        }
      `}
    </style>
  </>
);

export default ServicePanel;