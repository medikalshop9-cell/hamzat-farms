/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green:    "#2ECC40",
          darkgreen:"#1a7a26",
          red:      "#E8230A",
          dark:     "#1A1A1A",
          gray:     "#3A3A3A",
          muted:    "#6B7280",
          card:     "#F7F7F7",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'Plus Jakarta Sans'", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulse2: {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease forwards",
        "pulse-slow": "pulse2 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
