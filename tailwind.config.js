/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Enable DaisyUI
  daisyui: {
    themes: ["winter"], // Set the theme to 'winter'
  },
};
