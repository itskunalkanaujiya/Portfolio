import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'
import tailwindcssAnimate from 'tailwindcss-animate'
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        primary: {
          DEFAULT: "#7C3AED",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#00E5FF",
          foreground: "#050816",
        },
        surface: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-purple-blue": "linear-gradient(135deg, #7C3AED 0%, #00E5FF 100%)",
        "gradient-purple-pink": "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
        "gradient-mesh": "radial-gradient(at 0% 0%, rgba(124,58,237,0.35) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(0,229,255,0.25) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(236,72,153,0.25) 0, transparent 50%), radial-gradient(at 0% 100%, rgba(124,58,237,0.25) 0, transparent 50%)",
      },
      animation: {
        blob: "blob 12s infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [typography, tailwindcssAnimate],
};
export default config;
