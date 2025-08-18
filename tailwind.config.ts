import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Rove Health brand colors
        "deep-plum": "var(--deep-plum)",
        "ink-dark": "var(--ink-dark)",
        "plum": "var(--plum)",
        "blush": "var(--blush)",
        "mint": "var(--mint)",
        "ivory": "var(--ivory)",
        "rose-gold": "var(--rose-gold)",
        "champagne": "var(--champagne)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(5deg)" },
          "66%": { transform: "translateY(10px) rotate(-3deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(110, 59, 110, 0.3), 0 0 60px rgba(110, 59, 110, 0.1)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(110, 59, 110, 0.5), 0 0 80px rgba(110, 59, 110, 0.2)",
            transform: "scale(1.02)"
          },
        },
        "grid-flow": {
          "0%": { transform: "translateX(-50px)" },
          "100%": { transform: "translateX(50px)" },
        },
        "molecule-drift": {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "25%": { transform: "translateX(100px) translateY(-50px) rotate(90deg)" },
          "50%": { transform: "translateX(200px) translateY(0) rotate(180deg)" },
          "75%": { transform: "translateX(100px) translateY(50px) rotate(270deg)" },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-left": {
          from: {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-right": {
          from: {
            opacity: "0",
            transform: "translateX(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "grid-flow": "grid-flow 20s linear infinite",
        "molecule-drift": "molecule-drift 15s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fade-in-left": "fade-in-left 0.8s ease-out 0.2s both",
        "fade-in-right": "fade-in-right 0.8s ease-out 0.4s both",
        heartbeat: "heartbeat 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
