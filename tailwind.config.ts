import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode color palette
        background: {
          DEFAULT: "#0a0a0a", // near-black
          secondary: "#1a1a1a", // charcoal
          tertiary: "#252525", // lighter charcoal
          elevated: "#2a2a2a", // for elevated cards
        },
        foreground: {
          DEFAULT: "#ededed", // primary text
          secondary: "#b3b3b3", // secondary text
          tertiary: "#808080", // tertiary text
          muted: "#4d4d4d", // muted text
        },
        border: {
          DEFAULT: "#2a2a2a",
          light: "#3a3a3a",
          dark: "#1a1a1a",
        },
        // Accent colors for fintech/trading
        accent: {
          DEFAULT: "#3b82f6", // blue
          success: "#10b981", // green
          warning: "#f59e0b", // amber
          error: "#ef4444", // red
        },
        // Trading-specific colors
        trading: {
          profit: "#10b981", // green for gains
          loss: "#ef4444", // red for losses
          neutral: "#6b7280", // gray for neutral
        },
        // Gradient colors
        gradient: {
          from: "#1a1a1a",
          via: "#2a2a2a",
          to: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-geist-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        // Typography scale
        "xs": ["0.75rem", { lineHeight: "1rem" }], // 12px
        "sm": ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        "base": ["1rem", { lineHeight: "1.5rem" }], // 16px
        "lg": ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        "xl": ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
      },
      spacing: {
        // Extended spacing scale
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
      },
      borderRadius: {
        // Border radius tokens
        "xs": "0.25rem", // 4px
        "sm": "0.375rem", // 6px
        "DEFAULT": "0.5rem", // 8px
        "md": "0.75rem", // 12px
        "lg": "1rem", // 16px
        "xl": "1.5rem", // 24px
        "2xl": "2rem", // 32px
        "full": "9999px",
      },
      boxShadow: {
        // Soft shadows for cards
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        "DEFAULT": "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)",
        // Glassmorphism shadow
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        // For glassmorphism effects
        "xs": "2px",
      },
      backgroundImage: {
        // Gradient backgrounds
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-card": "linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(42, 42, 42, 0.6) 100%)",
      },
      animation: {
        // Micro-animations
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

