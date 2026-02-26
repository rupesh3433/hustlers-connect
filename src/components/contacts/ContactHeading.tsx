import type { FC } from "react";

const ContactHeading: FC = () => (
  <div
    style={{
      marginBottom: "0.2rem",
      textAlign: "center",
    }}
  >
    <h2
      style={{
        fontSize: "clamp(1.45rem, 3vw, 2.1rem)",
        fontWeight: 600,
        lineHeight: 1.02,
        margin: "0 0 0.45rem",
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

    <p
      style={{
        fontSize: "0.72rem",
        color: "var(--contact-subtext)",
        margin: 1,
        lineHeight: 0,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      We respond within 24 hours.
    </p>

    <style>
      {`
        :root {
          --contact-subtext: rgba(0,0,0,0.55);
        }

        html.dark {
          --contact-subtext: rgba(200,200,230,0.55);
        }
      `}
    </style>
  </div>
);

export default ContactHeading;