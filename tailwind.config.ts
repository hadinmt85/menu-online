import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF5EE",
        sand: {
          DEFAULT: "#F1E7DA",
          dark: "#E2D2BE",
        },
        espresso: {
          DEFAULT: "#3B2418",
          light: "#5A3B2A",
          dark: "#2A1810",
        },
        copper: {
          DEFAULT: "#C4733B",
          dark: "#9A5528",
          soft: "#F7E9DC",
          light: "#E8C4A4",
        },
        olive: {
          DEFAULT: "#4A5D3A",
          light: "#6B7F55",
          soft: "#EDF1E7",
        },
        ink: "#2B1B12",
        muted: "#6E5B4B",
      },
      fontFamily: {
        sans: ["var(--font-vazir)", "Tahoma", "Segoe UI", "sans-serif"],
        display: ["Lalezar", "var(--font-vazir)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px -4px rgba(59, 36, 24, 0.14)",
        card: "0 14px 34px -18px rgba(59, 36, 24, 0.4)",
        lift: "0 28px 55px -28px rgba(59, 36, 24, 0.55)",
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -14px, 0) scale(1.03)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.96) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease-out both",
        drift: "drift 11s ease-in-out infinite",
        "pop-in": "pop-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
