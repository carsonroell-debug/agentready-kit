import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0a0a0b",
          surface: "#111113",
          border: "#1e1e21",
          muted: "#71717a",
          text: "#a1a1aa",
          accent: "#3b82f6",
          accent2: "#7c3aed",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
