/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f0f0f",
        glass: "rgba(255, 255, 255, 0.05)",
        accent: "#08fdd8",
      },
    },
  },
  plugins: [],
};
