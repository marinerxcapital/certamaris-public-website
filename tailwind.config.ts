import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      navy: {
        DEFAULT: "#061E36",
        ink: "#061E36",
        deep: "#041526",
      },
      ocean: {
        DEFAULT: "#126FAA",
        deep: "#0E5A8A",
        light: "#4FADE0",
        wash: "#E7F3FB",
      },
      paper: {
        DEFAULT: "#F5F8FA",
        raised: "#EEF3F6",
      },
      structural: {
        /* Darker body copy for contrast over Pixel Grid (was #5C6D7E) */
        DEFAULT: "#243748",
        hairline: "rgba(6,30,54,0.14)",
        hairlineStrong: "rgba(6,30,54,0.26)",
      },
      status: {
        ok: "#147A4C",
        okBg: "#E7F5EC",
        /* Synced with --status-caution in globals.css (4.72:1 on cautionBg) */
        caution: "#94610B",
        cautionBg: "#FBF1DF",
        critical: "#B3261E",
        criticalBg: "#FBEAE9",
        info: "#0E5A8A",
        infoBg: "#E7F3FB",
        inactive: "#5C6D7E",
        inactiveBg: "#EEF2F5",
      },
      brass: {
        DEFAULT: "#B8823A",
        soft: "rgba(184,130,58,0.32)",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      maxWidth: {
        shell: "var(--shell-max)",
        prose: "var(--content-max-prose)",
        measure: "var(--content-max-measure)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-control)",
        card: "var(--radius-card)",
        glass: "var(--radius-glass)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        raised: "var(--shadow-raised)",
        overlay: "var(--shadow-overlay)",
        focus: "var(--focus-ring)",
      },
      spacing: {
        "icon-xs": "var(--icon-xs)",
        "icon-sm": "var(--icon-sm)",
        "icon-md": "var(--icon-md)",
        "icon-lg": "var(--icon-lg)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        standard: "var(--duration-standard)",
        reveal: "var(--duration-reveal)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
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
