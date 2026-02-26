// src/components/indexcomponents/ContactSection.tsx

import type { FC } from "react";
import ContactHeading from "../contacts/ContactHeading";
import ContactInfo from "../contacts/ContactInfo";
import ContactForm from "../contacts/ContactForm";

const ContactSection: FC = () => (
  // ✅ bg-transparent — ThemeBackground handles all background theming
  <section
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.75rem",
      boxSizing: "border-box",
      overflow: "hidden",
      background: "transparent",
    }}
  >
    <div
      className="cs-wrapper"
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        alignItems: "center",
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
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <ContactInfo />
        <ContactForm />
      </div>
    </div>

    <style>{`
      @media (max-width: 1024px) {
        .cs-wrapper { gap: 0.8rem !important; }
        .cs-grid    { gap: 0.9rem !important; }
      }
      @media (max-width: 768px) {
        .cs-grid    { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
        .cs-wrapper { gap: 0.75rem !important; }
      }
      section::-webkit-scrollbar { display: none; }
    `}</style>
  </section>
);

export default ContactSection;