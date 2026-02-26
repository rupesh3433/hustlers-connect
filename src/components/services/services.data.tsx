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
  accentDim: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
}

// ─── Shared SVG wrapper ───────────────────────────────────────────────────────

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

// ─── Icons ────────────────────────────────────────────────────────────────────

/** 1 — Social Media */
export const IconSocial = ({ c }: { c: string }) => (
  <Ico c={c}>
    <circle cx="24" cy="24" r="5.5" stroke={c} strokeWidth="2" />
    <circle cx="7"  cy="14" r="4"   stroke={c} strokeWidth="1.8" />
    <circle cx="41" cy="14" r="4"   stroke={c} strokeWidth="1.8" />
    <circle cx="7"  cy="34" r="4"   stroke={c} strokeWidth="1.8" />
    <circle cx="41" cy="34" r="4"   stroke={c} strokeWidth="1.8" />
    <line x1="11"   y1="16" x2="19.5" y2="21" stroke={c} strokeWidth="1.4" opacity=".65" />
    <line x1="37"   y1="16" x2="28.5" y2="21" stroke={c} strokeWidth="1.4" opacity=".65" />
    <line x1="11"   y1="32" x2="19.5" y2="27" stroke={c} strokeWidth="1.4" opacity=".65" />
    <line x1="37"   y1="32" x2="28.5" y2="27" stroke={c} strokeWidth="1.4" opacity=".65" />
  </Ico>
);

/** 2 — Video Editing */
export const IconVideo = ({ c }: { c: string }) => (
  <Ico c={c}>
    {/* Film strip frame */}
    <rect x="3" y="12" width="42" height="26" rx="3" stroke={c} strokeWidth="2" />
    {/* Sprocket holes — left */}
    <rect x="6"  y="15" width="4" height="5" rx="1" fill={c} opacity=".5" />
    <rect x="6"  y="23" width="4" height="5" rx="1" fill={c} opacity=".5" />
    <rect x="6"  y="31" width="4" height="5" rx="1" fill={c} opacity=".5" />
    {/* Sprocket holes — right */}
    <rect x="38" y="15" width="4" height="5" rx="1" fill={c} opacity=".5" />
    <rect x="38" y="23" width="4" height="5" rx="1" fill={c} opacity=".5" />
    <rect x="38" y="31" width="4" height="5" rx="1" fill={c} opacity=".5" />
    {/* Play triangle */}
    <polygon points="19,18 19,32 33,25" fill={c} opacity=".9" />
    {/* Top / bottom edge bars */}
    <line x1="3"  y1="8"  x2="45" y2="8"  stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".4" />
    <line x1="3"  y1="42" x2="45" y2="42" stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".4" />
  </Ico>
);

/** 3 — Web Dev */
export const IconWeb = ({ c }: { c: string }) => (
  <Ico c={c}>
    <rect x="3" y="8" width="42" height="30" rx="3.5" stroke={c} strokeWidth="2" />
    <line x1="3" y1="16" x2="45" y2="16" stroke={c} strokeWidth="2" />
    <circle cx="9"  cy="12" r="1.5" fill={c} />
    <circle cx="15" cy="12" r="1.5" fill={c} opacity=".7" />
    <circle cx="21" cy="12" r="1.5" fill={c} opacity=".4" />
    <rect x="8"  y="21" width="14" height="2.5" rx="1.25" fill={c} opacity=".7" />
    <rect x="8"  y="26" width="20" height="2.5" rx="1.25" fill={c} opacity=".5" />
    <rect x="8"  y="31" width="10" height="2.5" rx="1.25" fill={c} opacity=".3" />
    <rect x="28" y="21" width="12" height="12" rx="2" stroke={c} strokeWidth="1.5" opacity=".55" />
  </Ico>
);

/** 4 — Brand Deals */
export const IconBrandDeals = ({ c }: { c: string }) => (
  <Ico c={c}>
    {/* Handshake silhouette */}
    <path d="M4 26 L14 18 L20 22 L24 20 L28 22 L34 18 L44 26" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Hands gripping */}
    <circle cx="24" cy="20" r="3.5" fill={c} opacity=".85" />
    {/* Dollar / value line */}
    <line x1="24" y1="10" x2="24" y2="6" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity=".6" />
    <circle cx="24" cy="4.5" r="2.5" fill={c} opacity=".7" />
    {/* Contract lines */}
    <rect x="10" y="30" width="28" height="3"  rx="1.5" fill={c} opacity=".28" />
    <rect x="14" y="36" width="20" height="2.5" rx="1.25" fill={c} opacity=".2" />
    {/* Up-arrow accent */}
    <polyline points="36,34 40,28 44,34" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".7" />
    <line x1="40" y1="28" x2="40" y2="40" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
  </Ico>
);

/** 5 — Business Scaling */
export const IconBusiness = ({ c }: { c: string }) => (
  <Ico c={c}>
    {/* Org chart nodes */}
    <rect x="19" y="3"  width="10" height="8" rx="2" fill={c} opacity=".85" />
    <rect x="4"  y="20" width="10" height="8" rx="2" fill={c} opacity=".6" />
    <rect x="19" y="20" width="10" height="8" rx="2" fill={c} opacity=".6" />
    <rect x="34" y="20" width="10" height="8" rx="2" fill={c} opacity=".6" />
    {/* Connectors */}
    <line x1="24" y1="11" x2="24" y2="20" stroke={c} strokeWidth="1.6" opacity=".45" />
    <line x1="24" y1="16" x2="9"  y2="20" stroke={c} strokeWidth="1.6" opacity=".35" />
    <line x1="24" y1="16" x2="39" y2="20" stroke={c} strokeWidth="1.6" opacity=".35" />
    {/* Growth arrow */}
    <polyline points="6,44 14,36 22,40 32,30 42,22" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".75" />
    <circle cx="42" cy="22" r="2.8" fill={c} opacity=".9" />
  </Ico>
);

/** 6 — AI Agents */
export const IconAI = ({ c }: { c: string }) => (
  <Ico c={c}>
    {/* CPU / chip body */}
    <rect x="13" y="13" width="22" height="22" rx="3" stroke={c} strokeWidth="2" />
    {/* Inner core */}
    <rect x="19" y="19" width="10" height="10" rx="1.5" fill={c} opacity=".3" stroke={c} strokeWidth="1.2" />
    {/* Pins — top */}
    <line x1="18" y1="13" x2="18" y2="8"  stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="13" x2="24" y2="8"  stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="30" y1="13" x2="30" y2="8"  stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    {/* Pins — bottom */}
    <line x1="18" y1="35" x2="18" y2="40" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="35" x2="24" y2="40" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="30" y1="35" x2="30" y2="40" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    {/* Pins — left */}
    <line x1="13" y1="18" x2="8"  y2="18" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="13" y1="24" x2="8"  y2="24" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="13" y1="30" x2="8"  y2="30" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    {/* Pins — right */}
    <line x1="35" y1="18" x2="40" y2="18" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="35" y1="24" x2="40" y2="24" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="35" y1="30" x2="40" y2="30" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    {/* Pulse dot */}
    <circle cx="24" cy="24" r="2" fill={c} opacity=".95" />
  </Ico>
);

// ─── Visuals ──────────────────────────────────────────────────────────────────

/** 1 — Social Media visual */
export const VisualSocial = ({ a }: { a: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="vs1" cx="50%" cy="50%" r="55%">
        <stop offset="0%"   stopColor={a} stopOpacity=".14" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="165" ry="115" fill="url(#vs1)" />
    {/* Network nodes */}
    {([ [190,140,13,.85],[105,82,9,.42],[278,76,9,.42],[62,190,7,.32],[320,190,7,.32],[190,248,7,.32],[142,38,5,.22],[260,234,5,.22] ] as [number,number,number,number][]).map(([x,y,r,op],i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={a} opacity={op} />
    ))}
    {([ [190,140,105,82],[190,140,278,76],[190,140,62,190],[190,140,320,190],[190,140,190,248],[105,82,142,38],[278,76,260,234] ] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={a} strokeWidth="1.1" opacity=".25" />
    ))}
    <circle cx="190" cy="140" r="24" stroke={a} strokeWidth="1"   opacity=".2" />
    <circle cx="190" cy="140" r="36" stroke={a} strokeWidth=".8"  opacity=".12" />
    {/* Stats card */}
    <rect x="244" y="100" width="118" height="72" rx="9" fill="#040413" stroke={a} strokeWidth="1.4" opacity=".92" />
    <circle cx="265" cy="125" r="9.5" fill={a} opacity=".25" />
    <rect x="282" y="119" width="62" height="7"  rx="3.5" fill={a} opacity=".42" />
    <rect x="282" y="133" width="46" height="5"  rx="2.5" fill={a} opacity=".22" />
    <rect x="254" y="148" width="36" height="14" rx="5"   fill={a} opacity=".28" />
    <rect x="298" y="148" width="36" height="14" rx="5"   stroke={a} strokeWidth="1" opacity=".38" />
    {/* Follower count badge */}
    <rect x="28" y="30" width="120" height="58" rx="9" fill="#040413" stroke={a} strokeWidth="1.3" opacity=".88" />
    <text x="42" y="65" fontFamily="monospace" fontSize="20" fill={a} opacity=".95">+12.4K</text>
    <text x="42" y="80" fontFamily="'DM Sans',sans-serif" fontSize="10" fill={a} opacity=".48">New Followers</text>
  </svg>
);

/** 2 — Video Editing visual */
export const VisualVideo = ({ a, d }: { a: string; d: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="vv2" cx="52%" cy="48%" r="56%">
        <stop offset="0%"   stopColor={a} stopOpacity=".18" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="vv2b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor={a} stopOpacity=".22" />
        <stop offset="100%" stopColor={d} stopOpacity=".06" />
      </linearGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="162" ry="112" fill="url(#vv2)" />
    {/* Main video frame */}
    <rect x="44" y="36" width="220" height="142" rx="8" fill="url(#vv2b)" stroke={a} strokeWidth="1.3" opacity=".6" />
    {/* Play button overlay */}
    <circle cx="154" cy="107" r="28" fill="#050514" stroke={a} strokeWidth="1.5" opacity=".85" />
    <polygon points="147,97 147,118 168,107" fill={a} opacity=".9" />
    {/* Timeline bar */}
    <rect x="44" y="186" width="220" height="6" rx="3" fill={a} opacity=".12" />
    <rect x="44" y="186" width="110" height="6" rx="3" fill={a} opacity=".45" />
    <circle cx="154" cy="189" r="5.5" fill={a} opacity=".9" />
    {/* Cut markers */}
    {[76,104,132].map((x,i) => (
      <line key={i} x1={x} y1="183" x2={x} y2="195" stroke={a} strokeWidth="1.4" opacity=".5" />
    ))}
    {/* Waveform */}
    {[8,14,6,18,10,22,7,16,11,20,8,15,12,9,17].map((h,i) => (
      <rect key={i} x={46 + i*14} y={204 - h/2} width="8" height={h} rx="2" fill={a} opacity=".28" />
    ))}
    {/* Floating retention badge */}
    <rect x="252" y="56" width="112" height="72" rx="9" fill="#040413" stroke={a} strokeWidth="1.4" opacity=".92" />
    <text x="268" y="90" fontFamily="monospace" fontSize="22" fill={a} opacity=".95">96%</text>
    <text x="268" y="107" fontFamily="'DM Sans',sans-serif" fontSize="10" fill={a} opacity=".48">Avg Retention</text>
    {/* Hook pulse line */}
    <polyline points="258,122 274,108 288,115 302,98 316,104 332,90" stroke={a} strokeWidth="1.5" strokeLinecap="round" opacity=".55" />
  </svg>
);

/** 3 — Web Dev visual */
export const VisualWeb = ({ a, d }: { a: string; d: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="vw3" cx="55%" cy="45%" r="55%">
        <stop offset="0%"   stopColor={a} stopOpacity=".22" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="vw3b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor={a} stopOpacity=".18" />
        <stop offset="100%" stopColor={d} stopOpacity=".06" />
      </linearGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="165" ry="115" fill="url(#vw3)" />
    <rect x="40" y="22" width="300" height="198" rx="10" fill="url(#vw3b)" stroke={a} strokeWidth="1.2" opacity=".5" />
    <line x1="40" y1="50" x2="340" y2="50" stroke={a} strokeWidth="1.2" opacity=".4" />
    <circle cx="57" cy="36" r="4.5" fill={a} opacity=".6" />
    <circle cx="73" cy="36" r="4.5" fill={a} opacity=".35" />
    <circle cx="89" cy="36" r="4.5" fill={a} opacity=".2" />
    <rect x="108" y="29" width="140" height="14" rx="7" stroke={a} strokeWidth="1" opacity=".22" />
    <rect x="56"  y="64"  width="108" height="58" rx="4" fill={a} fillOpacity=".08" stroke={a} strokeWidth="1" opacity=".28" />
    <rect x="56"  y="130" width="248" height="7"  rx="3.5" fill={a} opacity=".18" />
    <rect x="56"  y="144" width="190" height="7"  rx="3.5" fill={a} opacity=".13" />
    <rect x="56"  y="160" width="88"  height="22" rx="6"   fill={a} opacity=".28" />
    <rect x="174" y="64"  width="130" height="118" rx="5"  stroke={a} strokeWidth="1" opacity=".2" />
    <rect x="208" y="168" width="150" height="82"  rx="9"  fill="#050514" stroke={a} strokeWidth="1.4" opacity=".88" />
    <rect x="222" y="183" width="55"  height="8"   rx="4"  fill={a} opacity=".55" />
    <rect x="222" y="198" width="85"  height="6"   rx="3"  fill={a} opacity=".28" />
    <rect x="222" y="226" width="46"  height="16"  rx="5"  fill={a} opacity=".38" />
    <circle cx="328" cy="26" r="5"  fill={a} opacity=".55" />
    <circle cx="318" cy="26" r="3"  fill={a} opacity=".28" />
  </svg>
);

/** 4 — Brand Deals visual */
export const VisualBrandDeals = ({ a, d: _d }: { a: string; d: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="vb4" cx="50%" cy="50%" r="56%">
        <stop offset="0%"   stopColor={a} stopOpacity=".18" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="160" ry="112" fill="url(#vb4)" />
    {/* Deal / contract sheet */}
    <rect x="90" y="50" width="160" height="200" rx="8" fill="#040413" stroke={a} strokeWidth="1.3" opacity=".7" />
    {[70,88,106,124,142,160].map((y,i) => (
      <rect key={i} x="108" y={y} width={i % 3 === 2 ? 80 : 120} height="6" rx="3" fill={a} opacity={.18 + i * .03} />
    ))}
    {/* Stamp / seal */}
    <circle cx="200" cy="200" r="24" stroke={a} strokeWidth="2" opacity=".7" />
    <circle cx="200" cy="200" r="18" fill={a}   opacity=".12" />
    <text x="188" y="205" fontFamily="monospace" fontSize="10" fill={a} opacity=".85">DEAL</text>
    {/* Revenue metric card */}
    <rect x="248" y="60" width="116" height="72" rx="9" fill="#040413" stroke={a} strokeWidth="1.4" opacity=".92" />
    <text x="264" y="95"  fontFamily="monospace"           fontSize="22" fill={a} opacity=".95">$24K</text>
    <text x="264" y="112" fontFamily="'DM Sans',sans-serif" fontSize="10" fill={a} opacity=".48">Avg Deal Value</text>
    {/* Upward trend */}
    <polyline points="258,128 272,116 286,120 302,102 318,88 334,74" stroke={a} strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
    <circle cx="334" cy="74" r="3.5" fill={a} opacity=".85" />
    {/* Handshake icon float */}
    <rect x="16" y="100" width="64" height="42" rx="8" fill="#040413" stroke={a} strokeWidth="1.2" opacity=".8" />
    <path d="M24 125 L34 118 L40 122 L48 118 L56 122 L66 118" stroke={a} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
    <text x="28" y="136" fontFamily="'DM Sans',sans-serif" fontSize="9" fill={a} opacity=".45">Partnership</text>
  </svg>
);

/** 5 — Business Scaling visual */
export const VisualBusiness = ({ a, d: _d }: { a: string; d: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="vbs5" cx="50%" cy="55%" r="56%">
        <stop offset="0%"   stopColor={a} stopOpacity=".2" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="190" cy="145" rx="160" ry="110" fill="url(#vbs5)" />
    {/* Org chart */}
    <rect x="152" y="28"  width="76" height="40" rx="6" fill="#040413" stroke={a} strokeWidth="1.4" opacity=".85" />
    <text x="168" y="53"  fontFamily="monospace" fontSize="11" fill={a} opacity=".7">CEO</text>
    <line x1="190" y1="68"  x2="190" y2="86"  stroke={a} strokeWidth="1.5" opacity=".4" />
    <line x1="110" y1="86"  x2="270" y2="86"  stroke={a} strokeWidth="1.5" opacity=".3" />
    {[70, 154, 238].map((x, i) => (
      <React.Fragment key={i}>
        <line x1={x + 30} y1="86" x2={x + 30} y2="104" stroke={a} strokeWidth="1.2" opacity=".3" />
        <rect x={x} y="104" width="60" height="32" rx="5" fill="#040413" stroke={a} strokeWidth="1.2" opacity={.55 + i * .1} />
      </React.Fragment>
    ))}
    {/* Revenue bars */}
    {[[52,210,34,64,.25],[96,180,34,94,.38],[140,148,34,126,.52],[184,110,34,164,.68],[228,72,34,202,.85]].map(([x,y,w,h,op],i) => (
      <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill={a} opacity={op} />
    ))}
    <line x1="42" y1="244" x2="282" y2="244" stroke={a} strokeWidth="1.2" opacity=".2" />
    {/* CEO card */}
    <rect x="258" y="148" width="108" height="68" rx="9" fill="#040413" stroke={a} strokeWidth="1.4" opacity=".92" />
    <text x="272" y="180" fontFamily="monospace"           fontSize="18" fill={a} opacity=".95">3×</text>
    <text x="272" y="196" fontFamily="'DM Sans',sans-serif" fontSize="10" fill={a} opacity=".48">Revenue Growth</text>
    {/* Up arrow */}
    <polyline points="298,48 318,22 338,48" stroke={a} strokeWidth="2.4" strokeLinecap="round" fill="none" opacity=".88" />
    <line x1="318" y1="22" x2="318" y2="90" stroke={a} strokeWidth="2.4" strokeLinecap="round" opacity=".88" />
  </svg>
);

/** 6 — AI Agents visual */
export const VisualAI = ({ a, d: _d }: { a: string; d: string }) => (
  <svg viewBox="0 0 380 280" fill="none" width="100%" height="100%">
    <defs>
      <radialGradient id="vai6" cx="50%" cy="48%" r="56%">
        <stop offset="0%"   stopColor={a} stopOpacity=".16" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="162" ry="112" fill="url(#vai6)" />
    {/* Central chip */}
    <rect x="148" y="98"  width="84"  height="84"  rx="10" fill="#040413" stroke={a} strokeWidth="1.8" opacity=".88" />
    <rect x="164" y="114" width="52"  height="52"  rx="6"  fill={a}       opacity=".08"  stroke={a} strokeWidth="1.2" />
    <rect x="176" y="126" width="28"  height="28"  rx="3"  fill={a}       opacity=".18" />
    <circle cx="190" cy="140" r="7"   fill={a} opacity=".9" />
    {/* Pins */}
    {[162,178,196,212].map((x,i) => (
      <React.Fragment key={i}>
        <line x1={x} y1="98"  x2={x} y2="82"  stroke={a} strokeWidth="2" strokeLinecap="round" opacity=".55" />
        <line x1={x} y1="182" x2={x} y2="198" stroke={a} strokeWidth="2" strokeLinecap="round" opacity=".55" />
      </React.Fragment>
    ))}
    {[112,128,152,168].map((y,i) => (
      <React.Fragment key={i}>
        <line x1="148" x2="132" y1={y} y2={y} stroke={a} strokeWidth="2" strokeLinecap="round" opacity=".55" />
        <line x1="232" x2="248" y1={y} y2={y} stroke={a} strokeWidth="2" strokeLinecap="round" opacity=".55" />
      </React.Fragment>
    ))}
    {/* Orbit ring */}
    <circle cx="190" cy="140" r="68" stroke={a} strokeWidth="1"   strokeDasharray="5 4" opacity=".22" />
    <circle cx="190" cy="140" r="90" stroke={a} strokeWidth=".75" strokeDasharray="3 5" opacity=".12" />
    {/* Orbit dots */}
    {[[258,140,.85],[190,72,.65],[122,140,.5],[190,208,.5]].map(([x,y,op],i) => (
      <circle key={i} cx={x} cy={y} r="5.5" fill={a} opacity={op} />
    ))}
    {/* Automation badge */}
    <rect x="268" y="52" width="100" height="64" rx="9" fill="#040413" stroke={a} strokeWidth="1.4" opacity=".9" />
    <text x="280" y="82"  fontFamily="monospace"           fontSize="14" fill={a} opacity=".95">AUTO</text>
    <text x="280" y="100" fontFamily="'DM Sans',sans-serif" fontSize="9"  fill={a} opacity=".48">24/7 Active</text>
    {/* Data flow lines */}
    {[[30,80,130,80],[30,100,110,120],[30,120,108,140]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={a} strokeWidth="1.2" strokeDasharray="4 3" opacity=".3" />
    ))}
    <rect x="8" y="64" width="38" height="70" rx="6" fill="#040413" stroke={a} strokeWidth="1.1" opacity=".7" />
    {[72,84,96,104,116,128].map((y,i) => (
      <rect key={i} x="14" y={y} width={i%2===0?24:18} height="4" rx="2" fill={a} opacity=".25" />
    ))}
  </svg>
);

// ─── Service Data ─────────────────────────────────────────────────────────────

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    label: "Social Media",
    title: "Social Media Growth",
    tagline: "We engineer attention into authority.",
    description:
      "We don't manage pages — we build influence systems. Platform-specific growth strategy across Instagram, YouTube, TikTok, Facebook, X and LinkedIn, powered by audience psychology, hook optimisation and community DM funnels that turn followers into revenue.",
    tags: ["Growth Strategy", "Content Calendar", "Hook Optimisation", "DM Funnels", "Analytics"],
    accent:    "#818CF8",
    accentDim: "#3730A3",
    icon:   <IconSocial c="#818CF8" />,
    visual: <VisualSocial a="#818CF8" />,
  },
  {
    id: 2,
    label: "Video Editing",
    title: "Video Editing & Visual Identity",
    tagline: "We turn raw footage into addictive content.",
    description:
      "This is not editing — this is retention engineering. Short-form reels optimised for the first 3 seconds, long-form YouTube structuring, kinetic typography, CTR-tuned thumbnails and a brand-specific visual style guide that makes every frame unmissable.",
    tags: ["Short-Form Reels", "Long-Form YouTube", "Motion Graphics", "Thumbnail Design", "Brand Style Guide"],
    accent:    "#F472B6",
    accentDim: "#9D174D",
    icon:   <IconVideo c="#F472B6" />,
    visual: <VisualVideo a="#F472B6" d="#9D174D" />,
  },
  {
    id: 3,
    label: "Web Dev",
    title: "Web Development & Brand Infrastructure",
    tagline: "From social traffic to owned revenue ecosystem.",
    description:
      "You are not building websites — you are building owned assets. High-converting personal brand sites, creator monetisation funnels, landing pages, email automation, membership platforms and e-commerce systems. Performance-optimised and SEO-ready from day one.",
    tags: ["Personal Brand Sites", "Monetisation Funnels", "Email Automation", "Course Platforms", "SEO Foundation"],
    accent:    "#60A5FA",
    accentDim: "#1D4ED8",
    icon:   <IconWeb c="#60A5FA" />,
    visual: <VisualWeb a="#60A5FA" d="#1D4ED8" />,
  },
  {
    id: 4,
    label: "Brand Deals",
    title: "Brand Deals & Strategic Negotiations",
    tagline: "We maximise creator income per impression.",
    description:
      "Most creators lose money here because they lack leverage. We handle brand outreach, media kit positioning, rate negotiation, contract handling and long-term retainer structuring — so every partnership is optimised for maximum payout and recurring income.",
    tags: ["Brand Outreach", "Media Kit", "Rate Negotiation", "Contract Handling", "Retainer Deals"],
    accent:    "#FB923C",
    accentDim: "#9A3412",
    icon:   <IconBrandDeals c="#FB923C" />,
    visual: <VisualBrandDeals a="#FB923C" d="#9A3412" />,
  },
  {
    id: 5,
    label: "Biz Scaling",
    title: "Business Scaling & Monetisation",
    tagline: "We turn creators into CEOs.",
    description:
      "This is where you separate amateurs from operators. Revenue model design, digital product strategy, offer creation, team building, SOP development, financial tracking and a clear roadmap from personal brand to scalable company — built for operators, not hobbyists.",
    tags: ["Revenue Design", "Digital Products", "Team Systems", "SOP Development", "Brand-to-Company"],
    accent:    "#34D399",
    accentDim: "#065F46",
    icon:   <IconBusiness c="#34D399" />,
    visual: <VisualBusiness a="#34D399" d="#065F46" />,
  },
  {
    id: 6,
    label: "AI Agents",
    title: "AI Agents & Automation Systems",
    tagline: "Automate the repetitive. Scale the strategic.",
    description:
      "This is your leverage play — and most agencies don't have it. AI-powered content ideation, automated DM funnels, lead qualification bots, CRM automation, AI chat support, workflow automation for editing and posting, and data-driven optimisation systems that run 24/7.",
    tags: ["AI Content Systems", "DM Funnels", "Lead Bots", "CRM Automation", "Workflow Automation"],
    accent:    "#A78BFA",
    accentDim: "#5B21B6",
    icon:   <IconAI c="#A78BFA" />,
    visual: <VisualAI a="#A78BFA" d="#5B21B6" />,
  },
];