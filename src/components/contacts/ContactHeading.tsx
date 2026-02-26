// src/components/contact/ContactHeading.tsx

import type { FC } from "react";

const ContactHeading: FC = () => (
  <div
    style={{
      marginBottom: "1rem", // reduced from 1.6rem
      textAlign: "center",
    }}
  >

    {/* Main Heading */}
    <h2
      style={{
        fontSize: "clamp(1.45rem, 3vw, 2.1rem)", // slightly reduced scale
        fontWeight: 700,
        lineHeight: 1.02, // tighter
        margin: "0 0 0.45rem", // reduced
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        background:
          "linear-gradient(135deg, #7c9fff 0%, #a855f7 50%, #e0304e 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Let's Build Something{" "}
      <span style={{ fontWeight: 500 }}>Together.</span>
    </h2>

    {/* Subtext */}
    <p
      style={{
        fontSize: "0.72rem", // slightly smaller
        color: "rgba(200,200,230,0.55)",
        margin: 0,
        lineHeight: 1.2, // tighter
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      We respond within 24 hours.
    </p>
  </div>
);

export default ContactHeading;