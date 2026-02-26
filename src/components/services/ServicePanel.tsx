// src/components/services/ServicePanel.tsx
// One carousel slide: ServiceContent (always) + ServiceVisual (desktop only).
// This is what goes inside the moving track.

import React from "react";
import type { ServiceItem } from "./services.data";
import ServiceContent from "./ServiceContent";
import ServiceVisual  from "./ServiceVisual";

interface Props {
  service: ServiceItem;
  isMobile: boolean;
  /** Width of the track container — panel fills this exactly */
  panelWidth: number;
  /** Height available for the panel */
  panelHeight: number;
}

const ServicePanel: React.FC<Props> = ({ service, isMobile, panelWidth, panelHeight }) => (
  <div style={{
    width: panelWidth,
    height: panelHeight,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: isMobile ? 0 : "clamp(20px,2.5vw,44px)",
    overflow: "hidden",
  }}>
    <ServiceContent service={service} isMobile={isMobile} />
    {!isMobile && <ServiceVisual service={service} />}
  </div>
);

export default ServicePanel;