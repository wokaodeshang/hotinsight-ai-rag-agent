import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#64748b",
        line: "#e2e8f0",
        brand: "#e23d28",
        ocean: "#0f766e",
        violet: "#6d5dfc",
        amber: "#b7791f",
      },
      boxShadow: {
        panel: "0 12px 28px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
