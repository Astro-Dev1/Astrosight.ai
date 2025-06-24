import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Fixed folder path to standard 'src'
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Dynamic theming variables
        foreground: "var(--foreground)",
        primary: "#ff5722", // Example custom color
        secondary: "#009688",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
         wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: "fadeIn 1.5s ease-in-out",
        slideIn: "slideIn 1s ease-in-out",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"], // Custom font support
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Animations plugin
    require("@tailwindcss/typography"), // Typography plugin
    require("@tailwindcss/forms"), // Form styles plugin
    require("@tailwindcss/aspect-ratio"), // Aspect-ratio utility
  ],
};

export default config;
