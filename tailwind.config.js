/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    colors: {
      "anti-flash-white": "#EFEFEF",
      "byzantine-blue": "#3454D1",
      turquoise: "#34D1BF",
      black: "#070707",
      cerise: "#D1345B",
    },
  },
  plugins: [],
};
