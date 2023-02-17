/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-stats": "#CCD0D7",
        "blue-stats": "#0074F0",
        "green-price-change": "#66FE90",
        "green-price-change-dark": "#0174EF",
        "red-price-change": "#fecaca",
        "red-price-change-dark": "#b91c1c",
      },
    },
  },
  plugins: [],
};
