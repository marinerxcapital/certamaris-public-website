import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      navy: {
        DEFAULT: "#0B2A4A",
        ink: "#0B2A4A",
        deep: "#071D33",
      },
      ocean: {
        DEFAULT: "#126FAA",
        light: "#4FADE0",
        wash: "#E7F3FB",
      },
      paper: {
        DEFAULT: "#F5F8FA",
        raised: "#EEF3F6",
      },
      structural: {
        DEFAULT: "#5C6D7E",
        hairline: "rgba(11,42,74,0.12)",
        hairlineStrong: "rgba(11,42,74,0.22)",
      },
      status: {
        ok: "#147A4C",
        okBg: "#E7F5EC",
        caution: "#B4740A",
        cautionBg: "#FBF1DF",
        critical: "#B3261E",
        criticalBg: "#FBEAE9",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      maxWidth: {
        shell: "1440px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,42,74,0.06), 0 8px 24px -12px rgba(11,42,74,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
