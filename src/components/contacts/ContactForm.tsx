// src/components/contact/ContactForm.tsx

import { type FC, type FormEvent, useState } from "react";
import ContactField from "./ContactField";
import ButtonCustom from "../shared/ButtonCustom";

const ContactForm: FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <div
        style={{
          background: "var(--contact-form-bg)",
          border: "1px solid var(--contact-form-border)",
          borderRadius: "14px",
          padding: "1rem 1.4rem",
          backdropFilter: "blur(14px)",
          boxShadow: "var(--contact-form-shadow)",
          position: "relative",
          overflow: "hidden",
          transition:
            "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        {/* Top Accent Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "18%",
            right: "18%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(60,107,255,0.4), transparent)",
            opacity: 0.7,
          }}
          aria-hidden="true"
        />

        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--contact-form-label)",
            margin: "0 0 1rem",
            lineHeight: 1.1,
            fontFamily:
              "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          Send a message
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.55rem",
          }}
        >
          {/* Name + Email */}
          <div
            className="cf-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.2rem",
            }}
          >
            <ContactField
              id="cf-name"
              label="Name"
              type="text"
              placeholder="Jane Smith"
              required
              value={form.name}
              onChange={set("name")}
              accentColor="#7c9fff"
            />
            <ContactField
              id="cf-email"
              label="Email"
              type="email"
              placeholder="jane@example.com"
              required
              value={form.email}
              onChange={set("email")}
              accentColor="#a855f7"
            />
          </div>

          <ContactField
            id="cf-subject"
            label="Subject"
            type="text"
            placeholder="Project enquiry…"
            value={form.subject}
            onChange={set("subject")}
            accentColor="#e0304e"
          />

          <ContactField
            id="cf-message"
            label="Message"
            multiline
            placeholder="Tell us what you have in mind…"
            required
            value={form.message}
            onChange={set("message")}
            accentColor="#a855f7"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "0.2rem",
            }}
          >
            {sent ? (
              <ButtonCustom
                background="green"
                size="medium"
                disabled
                enablePressAnimation={false}
              >
                ✓ Message Sent
              </ButtonCustom>
            ) : (
              <ButtonCustom
                type="submit"
                background="midnightflare"
                size="medium"
                isLoading={loading}
                enableRipple
                enablePressAnimation
              >
                Send Message →
              </ButtonCustom>
            )}
          </div>
        </form>
      </div>

      <style>
        {`
          :root {
            --contact-form-bg: rgba(0,0,0,0.04);
            --contact-form-border: rgba(0,0,0,0.08);
            --contact-form-label: rgba(0,0,0,0.55);
            --contact-form-shadow:
              0 10px 40px rgba(0,0,0,0.05),
              0 20px 80px rgba(0,0,0,0.03);
          }

          html.dark {
            --contact-form-bg: rgba(255,255,255,0.03);
            --contact-form-border: rgba(255,255,255,0.08);
            --contact-form-label: rgba(200,200,230,0.5);
            --contact-form-shadow:
              0 0 40px rgba(60,107,255,0.05),
              0 0 70px rgba(168,85,247,0.03);
          }

          @media (max-width: 768px) {
            .cf-row {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ContactForm;