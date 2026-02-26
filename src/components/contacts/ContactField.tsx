// src/components/contact/ContactField.tsx

import {
    type FC,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    useState,
    useEffect,
  } from "react";
  
  interface BaseProps {
    label: string;
    id: string;
    accentColor?: string;
  }
  
  type InputProps = BaseProps &
    InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
  
  type TextareaProps = BaseProps &
    TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };
  
  type ContactFieldProps = InputProps | TextareaProps;
  
  const ContactField: FC<ContactFieldProps> = ({
    label,
    id,
    accentColor = "#7c9fff",
    multiline,
    ...rest
  }) => {
    const [focused, setFocused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDark, setIsDark] = useState(false);
  
    useEffect(() => {
      const update = () => {
        setIsMobile(window.innerWidth <= 768);
        setIsDark(document.documentElement.classList.contains("dark"));
      };
  
      update();
      window.addEventListener("resize", update);
  
      const observer = new MutationObserver(update);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
  
      return () => {
        window.removeEventListener("resize", update);
        observer.disconnect();
      };
    }, []);
  
    const fieldStyle: React.CSSProperties = {
      width: "100%",
      background: focused
        ? isDark
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.04)"
        : isDark
        ? "rgba(255,255,255,0.03)"
        : "rgba(0,0,0,0.02)",
      border: `1px solid ${
        focused
          ? accentColor + "88"
          : isDark
          ? "rgba(120,120,180,0.15)"
          : "rgba(0,0,0,0.12)"
      }`,
      borderRadius: "6px",
      padding: isMobile ? "0.55rem 0.65rem" : "0.55rem 0.8rem",
      color: "var(--text-primary)",
      fontSize: isMobile ? "0.75rem" : "0.82rem",
      lineHeight: 1.2,
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
      boxShadow: focused ? `0 0 0 2px ${accentColor}18` : "none",
      resize: "none",
    };
  
    const labelStyle: React.CSSProperties = {
      display: "block",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      fontSize: isMobile ? "0.55rem" : "0.6rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: focused
        ? accentColor
        : isDark
        ? "rgba(160,160,200,0.45)"
        : "rgba(0,0,0,0.45)",
      marginBottom: "0.25rem",
      lineHeight: 1.05,
      transition: "color 0.2s",
    };
  
    const handlers = {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor={id} style={labelStyle}>
          {label}
        </label>
  
        {multiline ? (
          <textarea
            id={id}
            rows={isMobile ? 2 : 3}
            style={fieldStyle}
            {...handlers}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            style={fieldStyle}
            {...handlers}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    );
  };
  
  export default ContactField;