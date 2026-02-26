// src/components/contact/ContactInfoItem.tsx
import type { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  accentColor?: string;
}

const ContactInfoItem: FC<Props> = ({
  icon,
  label,
  value,
  href,
  accentColor = "#7c9fff",
}) => {
  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "0.6rem 0.8rem",
        borderRadius: "8px",
        border: "1px solid rgba(120,120,200,0.08)",
        background: "rgba(255,255,255,0.02)",
        transition: "border-color 0.2s, background 0.2s",
        cursor: href ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${accentColor}44`;
        el.style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(120,120,200,0.08)";
        el.style.background = "rgba(255,255,255,0.02)";
      }}
    >
      {/* Icon bubble */}
      <div
        style={{
          flexShrink: 0,
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accentColor,
          fontSize: "0.85rem",
        }}
      >
        {icon}
      </div>

      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(200,200,230,0.5)",
            margin: "0 0 0.12rem",
            lineHeight: 1.1,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          {label}
        </p>

        <p
          style={{
            fontSize: "0.82rem",
            color: "#e5e7ff",
            margin: 0,
            lineHeight: 1.2,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            wordBreak: "break-word",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        display: "block",
      }}
    >
      {content}
    </a>
  ) : (
    content
  );
};

export default ContactInfoItem;