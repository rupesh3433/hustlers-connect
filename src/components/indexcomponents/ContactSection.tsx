// src/components/indexcomponents/ContactSection.tsx

import { type FC, useEffect, useState } from "react";
import ContactHeading from "../contacts/ContactHeading";
import ContactInfo from "../contacts/ContactInfo";
import ContactForm from "../contacts/ContactForm";

const ContactSection: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "0.75rem" : "1.2rem",
        boxSizing: "border-box",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <div
        className="cs-wrapper"
        style={{
          width: "100%",
          maxWidth: "1100px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: isMobile ? "0.9rem" : "1.6rem",
        }}
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <ContactHeading />
        </div>

        <div
          className="cs-grid"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "0.9rem" : "2.2rem",
            alignItems: "start",
          }}
        >
          <ContactInfo />
          <ContactForm />
        </div>
      </div>

      <style>{`
        section::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;