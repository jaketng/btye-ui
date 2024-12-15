/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use ES module import for DaisyUI
  daisyui: {
    themes: ["winter"], // Set the theme to 'winter'
  },
};
