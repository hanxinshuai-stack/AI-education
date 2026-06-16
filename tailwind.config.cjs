/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e74c3c",
        safety: "#27ae60",
        warning: "#e67e22",
        ink: "#1a1a2e",
        paper: "#f5f4ef",
      },
    },
  },
  plugins: [],
};
