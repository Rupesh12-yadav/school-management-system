/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fbbf24", // your main yellow
        secondary: "#1f2937", // dark text
        background: "#ffffff", // white background
        light: "#f9fafb", // light gray sections
        border: "#e5e7eb", // light border
      },
    },
  },
  plugins: [],
};
