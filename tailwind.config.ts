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
        plate: "#F1E7DA",
        espresso: "#3B2418",
        copper: "#C4733B",
        copperDeep: "#A25A27",
        caramel: "#E3B58A",
        amber: "#D9A066",
        olive: "#4A5D3A",
        oliveMid: "#6B7F4E",
        oliveSoft: "#8A9A62",
        mocha: "#8A4A22",
        ink: "#2B1B12",
        muted: "#6E5B4B",
      },
      fontFamily: {
        display: ['"Aref Ruqaa"', "Tahoma", "serif"],
        price: ['"Noto Naskh Arabic"', "Tahoma", "serif"],
        sans: ["var(--font-vazir)", "Tahoma", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "cup-drop": {
          "0%": { opacity: "0", transform: "translateY(-12px) rotate(-4deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out both",
        "cup-drop": "cup-drop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
