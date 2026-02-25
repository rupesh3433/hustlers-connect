import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        brand: {
          primary: "#2563EB",
          secondary: "#7C3AED",
          success: "#16A34A",
          danger: "#DC2626",
          warning: "#F59E0B",
          neutral: "#4B5563",
        },

        surface: {
          DEFAULT: "#0b0b0f",
          elevated: "#111118",
          glass: "rgba(255,255,255,0.05)",
        },

        border: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.2)",
        },
      },

      fontSize: {
        xs2: ["0.7rem", { lineHeight: "1rem" }],
        sm2: ["0.85rem", { lineHeight: "1.25rem" }],
        cta: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        hero: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
        display: ["3.5rem", { lineHeight: "1.1", fontWeight: "800" }],
      },

      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
        pill: "9999px",
      },

      boxShadow: {
        subtle: "0 2px 8px rgba(0,0,0,0.25)",
        glow: "0 0 20px rgba(59,130,246,0.4)",
        glowStrong: "0 0 35px rgba(124,58,237,0.5)",
        innerSoft: "inset 0 2px 6px rgba(255,255,255,0.05)",
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(59,130,246,0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(59,130,246,0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        pulseGlow: "pulseGlow 2s infinite ease-in-out",
        float: "float 3s ease-in-out infinite",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounceSoft: "cubic-bezier(.68,-0.55,.27,1.55)",
      },

      transitionDuration: {
        250: "250ms",
        400: "400ms",
        600: "600ms",
      },

      backdropBlur: {
        xs: "2px",
        strong: "20px",
      },
    },
  },

  plugins: [],
};

export default config;