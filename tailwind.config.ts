import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-agency-sans)",
          "Aeonik",
          "Aeonik Pro",
          "Inter",
          "SF Pro Display",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        "agency-window":
          "0 24px 90px rgba(0, 0, 0, 0.42), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
        "agency-row":
          "0 18px 38px rgba(0, 0, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
      },
    },
  },
  plugins: [],
};

export default config;
