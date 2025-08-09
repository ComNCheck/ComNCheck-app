/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "#3a3a3a",
        background: "#FAFAFA",
        tint: "#0077FF",
        icon: "#687076",
        point: "D6E6FC",
        tabIconDefault: "#687076",
      },
    },
  },
  plugins: [],
};
