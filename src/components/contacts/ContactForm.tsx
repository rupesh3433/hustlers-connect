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
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(120,120,200,0.10)",
        borderRadius: "12px",
        padding: "1.3rem 1.3rem",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 0 40px rgba(60,107,255,0.05), 0 0 70px rgba(168,85,247,0.03)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "18%",
          right: "18%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(60,107,255,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(200,200,230,0.5)",
          margin: "0 0 0.9rem",
          lineHeight: 1.1,
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        Send a message
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
        }}
      >
        {/* Row — Name + Email */}
        <div
          className="cf-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.55rem",
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

        {/* Action row */}
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
  );
};

export default ContactForm;