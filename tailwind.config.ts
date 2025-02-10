import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shrinkMove: {
          "0%": { transform: "scale(1) translate(0, 0)", opacity: "1" },
          "100%": { transform: "scale(0.5) translate(-100%, -100%)", opacity: "1" },
        },
        shrinkOnly: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.5)", opacity: "1" },
        },
      },
      animation: {
        shrinkMove: "shrinkMove 1s ease-in-out forwards",
        shrinkOnly: "shrinkOnly 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
