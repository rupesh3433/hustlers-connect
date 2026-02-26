import {
  type FC,
  type ReactNode,
  useEffect,
  useState,
} from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const verticalPadding = isMobile ? "0.45rem" : "0.65rem";
  const horizontalPadding = isMobile ? "0.7rem" : "0.85rem";
  const iconSize = isMobile ? 30 : 34;

  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: isMobile ? "0.6rem" : "0.75rem",
        padding: `${verticalPadding} ${horizontalPadding}`,
        borderRadius: "10px",
        border: "1px solid var(--contact-border)",
        background: "var(--contact-bg)",
        backdropFilter: "blur(8px)",
        transition:
          "border-color 0.25s ease, background 0.25s ease, transform 0.2s ease",
        cursor: href ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${accentColor}55`;
        el.style.background = "var(--contact-hover)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--contact-border)";
        el.style.background = "var(--contact-bg)";
        el.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: iconSize,
          height: iconSize,
          borderRadius: "10px",
          background: `${accentColor}18`,
          border: `1px solid ${accentColor}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accentColor,
          fontSize: isMobile ? "0.8rem" : "0.9rem",
        }}
      >
        {icon}
      </div>

      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: isMobile ? "0.6rem" : "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--contact-label)",
            margin: "0 0 0.12rem",
            lineHeight: 1.1,
            fontFamily:
              "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          {label}
        </p>

        <p
          style={{
            fontSize: isMobile ? "0.8rem" : "0.85rem",
            color: "var(--contact-value)",
            margin: 0,
            lineHeight: 1.25,
            fontFamily:
              "Inter, system-ui, -apple-system, sans-serif",
            wordBreak: "break-word",
          }}
        >
          {value}
        </p>
      </div>

      <style>
        {`
          :root {
            --contact-bg: rgba(0,0,0,0.04);
            --contact-hover: rgba(0,0,0,0.07);
            --contact-border: rgba(0,0,0,0.08);
            --contact-label: rgba(0,0,0,0.55);
            --contact-value: rgba(0,0,0,0.85);
          }

          html.dark {
            --contact-bg: rgba(255,255,255,0.03);
            --contact-hover: rgba(255,255,255,0.06);
            --contact-border: rgba(255,255,255,0.08);
            --contact-label: rgba(200,200,230,0.5);
            --contact-value: #e5e7ff;
          }
        `}
      </style>
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