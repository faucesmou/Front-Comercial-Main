/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      gridTemplateRows: {
        1: "repeat(1, minmax(0, 1fr))",
        layout: "200px minmax(900px,1fr) 100px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
