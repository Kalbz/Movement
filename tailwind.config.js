/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: true,
  },
  safelist: [
  {
    pattern: /(btn|btn-(primary|secondary|accent|info|success|warning|error)|bg-base-100|text-primary|text-secondary|card|shadow-xl)/,
  },
],

};
