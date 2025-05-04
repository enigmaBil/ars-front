/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./public/**/*.html",
    "./src/**/*.{html,scss,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Montserrat', 'sans-sherif'],
      serif: ['Heebo', "serif"]
    }
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/typography")
  ],
}

