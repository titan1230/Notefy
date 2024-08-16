import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        Grey_Qo: ["Grey Qo", "cursive"],
      },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00a2c4",
          "primary-content": "#000a0e",
          "secondary": "#952900",
          "secondary-content": "#edd4cd",
          "accent": "#00a7ae",
          "accent-content": "#000a0b",
          "neutral": "#36171b",
          "neutral-content": "#d4cbcc",
          "base-100": "#B0E0E6",
          "base-200": "#86B6C5",
          "base-300": "#0b1b2c",
          "base-content": "#cad0d5",
          "info": "#0096ff",
          "info-content": "#000816",
          "success": "#a2ca00",
          "success-content": "#0a0f00",
          "warning": "#ff9800",
          "warning-content": "#160800",
          "error": "#ff3a63",
          "error-content": "#160103",
        },
      },
    ],
  },
  plugins: [require("tailwindcss-animate"), require('daisyui'),require('tailwind-scrollbar-hide'),],
} satisfies Config

export default config