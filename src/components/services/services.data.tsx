// src/components/services/services.data.tsx
// Single source of truth: types · icons · visuals · data

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  id: number;
  label: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
  accentDim: string; // darker shade for glows / gradients
  icon: React.ReactNode;
  visual: React.ReactNode;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const Ico = ({ children, c }: { children: React.ReactNode; c: string }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    width="100%"
    height="100%"
    style={{ filter: `drop-shadow(0 0 6px ${c}66)` }}
  >
    {children}
  </svg>
);

export const IconWeb = ({ c }: { c: string }) => (
  <Ico c={c}>
    <rect
      x="3"
      y="8"
      width="42"
      height="30"
      rx="3.5"
      stroke={c}
      strokeWidth="2"
    />
    <line x1="3" y1="16" x2="45" y2="16" stroke={c} strokeWidth="2" />
    <circle cx="9" cy="12" r="1.5" fill={c} />
    <circle cx="15" cy="12" r="1.5" fill={c} opacity=".7" />
    <circle cx="21" cy="12" r="1.5" fill={c} opacity=".4" />
    <rect
      x="8"
      y="21"
      width="14"
      height="2.5"
      rx="1.25"
      fill={c}
      opacity=".7"
    />
    <rect
      x="8"
      y="26"
      width="20"
      height="2.5"
      rx="1.25"
      fill={c}
      opacity=".5"
    />
    <rect
      x="8"
      y="31"
      width="10"
      height="2.5"
      rx="1.25"
      fill={c}
      opacity=".3"
    />
    <rect
      x="28"
      y="21"
      width="12"
      height="12"
      rx="2"
      stroke={c}
      strokeWidth="1.5"
      opacity=".55"
    />
  </Ico>
);

export const IconMarketing = ({ c }: { c: string }) => (
  <Ico c={c}>
    <polyline
      points="4,38 14,26 22,32 32,16 44,10"
      stroke={c}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="44" cy="10" r="3.5" fill={c} />
    <circle cx="32" cy="16" r="2.5" fill={c} opacity=".7" />
    <circle cx="22" cy="32" r="2.5" fill={c} opacity=".7" />
    <rect x="4" y="34" width="5" height="8" rx="1" fill={c} opacity=".35" />
    <rect x="15" y="29" width="5" height="13" rx="1" fill={c} opacity=".45" />
    <rect x="26" y="22" width="5" height="20" rx="1" fill={c} opacity=".55" />
    <line
      x1="4"
      y1="42"
      x2="44"
      y2="42"
      stroke={c}
      strokeWidth="1.5"
      opacity=".25"
    />
  </Ico>
);

export const IconSocial = ({ c }: { c: string }) => (
  <Ico c={c}>
    <circle cx="24" cy="24" r="5.5" stroke={c} strokeWidth="2" />
    <circle cx="7" cy="14" r="4" stroke={c} strokeWidth="1.8" />
    <circle cx="41" cy="14" r="4" stroke={c} strokeWidth="1.8" />
    <circle cx="7" cy="34" r="4" stroke={c} strokeWidth="1.8" />
    <circle cx="41" cy="34" r="4" stroke={c} strokeWidth="1.8" />
    <line
      x1="11"
      y1="16"
      x2="19.5"
      y2="21"
      stroke={c}
      strokeWidth="1.4"
      opacity=".65"
    />
    <line
      x1="37"
      y1="16"
      x2="28.5"
      y2="21"
      stroke={c}
      strokeWidth="1.4"
      opacity=".65"
    />
    <line
      x1="11"
      y1="32"
      x2="19.5"
      y2="27"
      stroke={c}
      strokeWidth="1.4"
      opacity=".65"
    />
    <line
      x1="37"
      y1="32"
      x2="28.5"
      y2="27"
      stroke={c}
      strokeWidth="1.4"
      opacity=".65"
    />
  </Ico>
);

export const IconGraphics = ({ c }: { c: string }) => (
  <Ico c={c}>
    <circle cx="24" cy="24" r="15" stroke={c} strokeWidth="2" />
    <path
      d="M24 9C24 9 33 16.5 33 24S24 39 24 39 15 31.5 15 24 24 9 24 9Z"
      stroke={c}
      strokeWidth="1.5"
      opacity=".42"
    />
    <circle cx="24" cy="24" r="4.5" fill={c} opacity=".18" />
    <circle cx="24" cy="24" r="2" fill={c} />
    <circle cx="35" cy="13" r="3.5" fill={c} opacity=".78" />
    <circle cx="13" cy="13" r="3.5" fill={c} opacity=".32" />
    <circle cx="35" cy="35" r="3.5" fill={c} opacity=".55" />
  </Ico>
);

// ─── Visuals ──────────────────────────────────────────────────────────────────

export const VisualWeb = ({ a, d }: { a: string; d: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="gw" cx="55%" cy="45%" r="55%">
        <stop offset="0%" stopColor={a} stopOpacity=".22" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="gw2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity=".18" />
        <stop offset="100%" stopColor={d} stopOpacity=".06" />
      </linearGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="165" ry="115" fill="url(#gw)" />
    {/* Browser frame */}
    <rect
      x="40"
      y="22"
      width="300"
      height="198"
      rx="10"
      fill="url(#gw2)"
      stroke={a}
      strokeWidth="1.2"
      opacity=".5"
    />
    <line
      x1="40"
      y1="50"
      x2="340"
      y2="50"
      stroke={a}
      strokeWidth="1.2"
      opacity=".4"
    />
    <circle cx="57" cy="36" r="4.5" fill={a} opacity=".6" />
    <circle cx="73" cy="36" r="4.5" fill={a} opacity=".35" />
    <circle cx="89" cy="36" r="4.5" fill={a} opacity=".2" />
    <rect
      x="108"
      y="29"
      width="140"
      height="14"
      rx="7"
      stroke={a}
      strokeWidth="1"
      opacity=".22"
    />
    {/* Layout skeleton */}
    <rect
      x="56"
      y="64"
      width="108"
      height="58"
      rx="4"
      fill={a}
      fillOpacity=".08"
      stroke={a}
      strokeWidth="1"
      opacity=".28"
    />
    <rect
      x="56"
      y="130"
      width="248"
      height="7"
      rx="3.5"
      fill={a}
      opacity=".18"
    />
    <rect
      x="56"
      y="144"
      width="190"
      height="7"
      rx="3.5"
      fill={a}
      opacity=".13"
    />
    <rect x="56" y="160" width="88" height="22" rx="6" fill={a} opacity=".28" />
    <rect
      x="174"
      y="64"
      width="130"
      height="118"
      rx="5"
      stroke={a}
      strokeWidth="1"
      opacity=".2"
    />
    {/* Floating card */}
    <rect
      x="208"
      y="168"
      width="150"
      height="82"
      rx="9"
      fill="#050514"
      stroke={a}
      strokeWidth="1.4"
      opacity=".88"
    />
    <rect x="222" y="183" width="55" height="8" rx="4" fill={a} opacity=".55" />
    <rect x="222" y="198" width="85" height="6" rx="3" fill={a} opacity=".28" />
    <rect
      x="222"
      y="226"
      width="46"
      height="16"
      rx="5"
      fill={a}
      opacity=".38"
    />
    {/* Dot accent */}
    <circle cx="328" cy="26" r="5" fill={a} opacity=".55" />
    <circle cx="318" cy="26" r="3" fill={a} opacity=".28" />
  </svg>
);

export const VisualMarketing = ({ a }: { a: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="gm" cx="50%" cy="55%" r="55%">
        <stop offset="0%" stopColor={a} stopOpacity=".2" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="190" cy="145" rx="160" ry="110" fill="url(#gm)" />
    {/* Bars */}
    {[
      [52, 180, 34, 74, 0.22],
      [96, 148, 34, 106, 0.34],
      [140, 112, 34, 142, 0.48],
      [184, 80, 34, 174, 0.63],
      [228, 52, 34, 202, 0.8],
    ].map(([x, y, w, h, op], i) => (
      <rect
        key={i}
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill={a}
        opacity={op}
      />
    ))}
    <line
      x1="42"
      y1="256"
      x2="282"
      y2="256"
      stroke={a}
      strokeWidth="1.4"
      opacity=".22"
    />
    {/* Up arrow */}
    <polyline
      points="284,42 314,12 344,42"
      stroke={a}
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
      opacity=".92"
    />
    <line
      x1="314"
      y1="12"
      x2="314"
      y2="88"
      stroke={a}
      strokeWidth="2.4"
      strokeLinecap="round"
      opacity=".92"
    />
    {/* Metric card */}
    <rect
      x="32"
      y="30"
      width="130"
      height="64"
      rx="9"
      fill="#040413"
      stroke={a}
      strokeWidth="1.4"
      opacity=".92"
    />
    <text
      x="48"
      y="65"
      fontFamily="monospace"
      fontSize="22"
      fill={a}
      opacity=".95"
    >
      +248%
    </text>
    <text
      x="48"
      y="82"
      fontFamily="'DM Sans',sans-serif"
      fontSize="10"
      fill={a}
      opacity=".48"
    >
      Growth Rate
    </text>
    {/* Trend line */}
    <polyline
      points="42,220 80,195 120,205 165,165 210,150 255,110"
      stroke={a}
      strokeWidth="1.5"
      strokeDasharray="4 3"
      opacity=".35"
    />
  </svg>
);

export const VisualSocial = ({ a }: { a: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="gs" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor={a} stopOpacity=".14" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="165" ry="115" fill="url(#gs)" />
    {/* Network nodes */}
    {(
      [
        [190, 140, 13, 0.85],
        [105, 82, 9, 0.42],
        [278, 76, 9, 0.42],
        [62, 190, 7, 0.32],
        [320, 190, 7, 0.32],
        [190, 248, 7, 0.32],
        [142, 38, 5, 0.22],
        [260, 234, 5, 0.22],
      ] as [number, number, number, number][]
    ).map(([x, y, r, op], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={a} opacity={op} />
    ))}
    {/* Connections */}
    {(
      [
        [190, 140, 105, 82],
        [190, 140, 278, 76],
        [190, 140, 62, 190],
        [190, 140, 320, 190],
        [190, 140, 190, 248],
        [105, 82, 142, 38],
        [278, 76, 260, 234],
      ] as [number, number, number, number][]
    ).map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={a}
        strokeWidth="1.1"
        opacity=".25"
      />
    ))}
    {/* Ping rings on central node */}
    <circle cx="190" cy="140" r="24" stroke={a} strokeWidth="1" opacity=".2" />
    <circle
      cx="190"
      cy="140"
      r="36"
      stroke={a}
      strokeWidth="0.8"
      opacity=".12"
    />
    {/* Card */}
    <rect
      x="244"
      y="100"
      width="118"
      height="72"
      rx="9"
      fill="#040413"
      stroke={a}
      strokeWidth="1.4"
      opacity=".92"
    />
    <circle cx="265" cy="125" r="9.5" fill={a} opacity=".25" />
    <rect
      x="282"
      y="119"
      width="62"
      height="7"
      rx="3.5"
      fill={a}
      opacity=".42"
    />
    <rect
      x="282"
      y="133"
      width="46"
      height="5"
      rx="2.5"
      fill={a}
      opacity=".22"
    />
    <rect
      x="254"
      y="148"
      width="36"
      height="14"
      rx="5"
      fill={a}
      opacity=".28"
    />
    <rect
      x="298"
      y="148"
      width="36"
      height="14"
      rx="5"
      stroke={a}
      strokeWidth="1"
      opacity=".38"
    />
  </svg>
);

export const VisualGraphics = ({ a, d }: { a: string; d: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="gg" cx="48%" cy="50%" r="55%">
        <stop offset="0%" stopColor={a} stopOpacity=".16" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="185" cy="142" rx="162" ry="118" fill="url(#gg)" />
    {/* Concentric circles */}
    <circle
      cx="178"
      cy="140"
      r="92"
      stroke={a}
      strokeWidth="1.2"
      opacity=".32"
      strokeDasharray="6 4"
    />
    <circle cx="178" cy="140" r="62" stroke={a} strokeWidth="1" opacity=".22" />
    <circle cx="178" cy="140" r="32" fill={a} opacity=".1" />
    {/* Triangle */}
    <polygon
      points="178,62 260,200 96,200"
      stroke={a}
      strokeWidth="1.8"
      fill="none"
      opacity=".44"
    />
    {/* Colour palette circles */}
    <circle cx="298" cy="62" r="22" fill="#7C3AED" opacity=".85" />
    <circle cx="342" cy="84" r="15" fill={a} opacity=".72" />
    <circle cx="276" cy="90" r="11.5" fill="#EF4444" opacity=".65" />
    {/* Swatches */}
    {[
      [40, 214, a, 0.75],
      [72, 202, d, 0.62],
      [104, 220, "#EF4444", 0.55],
      [136, 208, "#818CF8", 0.48],
    ].map(([x, y, f, op], i) => (
      <rect
        key={i}
        x={x as number}
        y={y as number}
        width="24"
        height="56"
        rx="4"
        fill={f as string}
        opacity={op as number}
      />
    ))}
    {/* Pencil stroke */}
    <path d="M310 192 L326 152 L336 155 L320 195Z" fill={a} opacity=".42" />
    <circle cx="190" cy="140" r="3" fill={a} opacity=".9" />
  </svg>
);

// ─── Service Data ─────────────────────────────────────────────────────────────

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    label: "Web Dev",
    title: "Web Development",
    tagline: "Engineered for speed, built to convert.",
    description:
      "We architect full-stack experiences that merge pixel-perfect design with rock-solid engineering — from blazing SPAs to enterprise platforms optimised for performance and scale.",
    tags: ["React / Next.js", "Node.js", "PostgreSQL", "DevOps", "CMS"],
    accent: "#60A5FA",
    accentDim: "#1D4ED8",
    icon: <IconWeb c="#60A5FA" />,
    visual: <VisualWeb a="#60A5FA" d="#1D4ED8" />,
  },
  {
    id: 2,
    label: "Digital Mktg",
    title: "Digital Marketing",
    tagline: "Data as the engine. Growth as the destination.",
    description:
      "We run omnichannel campaigns calibrated to your audience — search, programmatic, social. Every decision backed by live analytics and attribution that makes every rupee accountable.",
    tags: ["SEO / SEM", "Paid Media", "Analytics", "Funnels", "CRO"],
    accent: "#A78BFA",
    accentDim: "#6D28D9",
    icon: <IconMarketing c="#A78BFA" />,
    visual: <VisualMarketing a="#A78BFA" />,
  },
  {
    id: 3,
    label: "Social Media",
    title: "Social Media Mgmt",
    tagline: "Presence that commands. Content that converts.",
    description:
      "From strategy to scheduling we own your channels end-to-end — original content, community, influencer co-ordination and real-time dashboards so you stay top-of-feed and top-of-mind.",
    tags: ["Content Strategy", "Community", "Influencers", "Analytics", "Ads"],
    accent: "#818CF8",
    accentDim: "#3730A3",
    icon: <IconSocial c="#818CF8" />,
    visual: <VisualSocial a="#818CF8" />,
  },
  {
    id: 4,
    label: "Graphics",
    title: "Graphics Designing",
    tagline: "Visual language that speaks before words do.",
    description:
      "Brand identity, campaign artwork, motion and UI illustration — crafted with intention and a sharp eye for colour. Visuals that are impossible to ignore and impossible to forget.",
    tags: ["Brand Identity", "UI Illustration", "Motion", "Print", "3D Assets"],
    accent: "#F87171",
    accentDim: "#991B1B",
    icon: <IconGraphics c="#F87171" />,
    visual: <VisualGraphics a="#F87171" d="#991B1B" />,
  },
];
