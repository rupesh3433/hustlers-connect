// src/components/contact/ContactSection.tsx

import type { FC } from "react";
import ContactHeading from "../contacts/ContactHeading";
import ContactInfo from "../contacts/ContactInfo";
import ContactForm from "../contacts/ContactForm";

const ContactSection: FC = () => (
  <section
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // ← ensures vertical centering too
      padding: "0.75rem",
      boxSizing: "border-box",
      overflow: "hidden",
    }}
  >
    <div
      className="cs-wrapper"
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto", // ← critical for horizontal centering
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        alignItems: "center", // ← centers heading + grid
      }}
    >
      {/* Heading */}
      <div style={{ width: "100%", textAlign: "center" }}>
        <ContactHeading />
      </div>

      {/* Info + Form */}
      <div
        className="cs-grid"
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          alignItems: "start",
          justifyContent: "center", // ← ensures grid centered
        }}
      >
        <ContactInfo />
        <ContactForm />
      </div>
    </div>

    <style>{`
      /* Tablet */
      @media (max-width: 1024px) {
        .cs-wrapper {
          gap: 0.8rem !important;
        }

        .cs-grid {
          gap: 0.9rem !important;
        }
      }

      /* Mobile */
      @media (max-width: 768px) {
        .cs-grid {
          grid-template-columns: 1fr !important;
          gap: 0.75rem !important;
        }

        .cs-wrapper {
          gap: 0.75rem !important;
        }
      }

      section::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </section>
);

export default ContactSection;