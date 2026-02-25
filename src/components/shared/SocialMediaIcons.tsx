import React, { useState } from "react";

interface SocialLink {
  label: string;
  href: string;
  shadowColor: string;
  icon: React.ReactNode;
}

interface SocialMediaIconsProps {
  links?: SocialLink[];
  className?: string;
  size?: number;
}

const defaultLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    shadowColor: "rgba(220, 39, 67, 0.55)",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-grad)"
          d="M7.75 2h8.5C19.66 2 22 4.34 22 7.75v8.5C22 19.66 19.66 22 16.25 22h-8.5C4.34 22 2 19.66 2 16.25v-8.5C2 4.34 4.34 2 7.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm4.25 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-.88a1.12 1.12 0 110 2.25 1.12 1.12 0 010-2.25z"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    shadowColor: "rgba(24, 119, 242, 0.55)",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path fill="#1877f2" d="M13 22v-9h3l1-4h-4V7c0-1 .3-2 2-2h2V1h-3c-4 0-6 2-6 6v2H5v4h3v9h5z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    shadowColor: "rgba(255, 0, 0, 0.55)",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path fill="#ff0000" d="M21.8 8.001s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C15.9 4.5 12 4.5 12 4.5h-.1s-3.9 0-6.9.2c-.4.1-1.3.1-2.1 1-.6.7-.8 2.3-.8 2.3S2 9.7 2 11.4v1.2c0 1.7.2 3.4.2 3.4s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.8.2 6.6.2 6.6.2s3.9 0 6.9-.2c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.7.2-3.4v-1.2c0-1.7-.2-3.4-.2-3.4zM10 14.5v-5l5 2.5-5 2.5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    shadowColor: "rgba(0, 119, 181, 0.55)",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path fill="#0077b5" d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1 4.98 2.12 4.98 3.5zM.22 8h4.54v12H.22V8zM8.09 8h4.35v1.64h.06c.61-1.16 2.1-2.39 4.33-2.39 4.63 0 5.49 3.05 5.49 7.01V20h-4.54v-5.25c0-1.25-.02-2.85-1.74-2.85-1.75 0-2.02 1.36-2.02 2.76V20H8.09V8z" />
      </svg>
    ),
  },
];

const SocialIcon: React.FC<{ social: SocialLink; size: number }> = ({ social, size }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        cursor: "pointer",
        textDecoration: "none",
        transformStyle: "preserve-3d",
        transition: "transform 0.2s cubic-bezier(.34,1.56,.64,1), filter 0.2s ease",
        transform: pressed
          ? "translateY(2px) scale(0.88)"
          : hovered
          ? "translateY(-6px) scale(1.25) rotateX(-12deg) rotateY(6deg)"
          : "translateY(0) scale(1) rotateX(0deg) rotateY(0deg)",
        filter: hovered
          ? `drop-shadow(0 12px 18px ${social.shadowColor}) drop-shadow(0 2px 4px ${social.shadowColor}) brightness(1.15) saturate(1.2)`
          : pressed
          ? `drop-shadow(0 2px 6px ${social.shadowColor})`
          : `drop-shadow(0 5px 10px ${social.shadowColor}) drop-shadow(0 1px 3px rgba(0,0,0,0.15))`,
      }}
    >
      {social.icon}
    </a>
  );
};

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({
  links = defaultLinks,
  className = "",
  size = 40,
}) => {
  if (!links || links.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        perspective: "800px",
      }}
    >
      {links.map((social) => (
        <SocialIcon key={social.label} social={social} size={size} />
      ))}
    </div>
  );
};

export { SocialMediaIcons };
export default React.memo(SocialMediaIcons);