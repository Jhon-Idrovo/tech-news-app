const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      base: colors.gray[100],
      primary: colors.yellow[300],

      "txt-base": colors.black,
      "txt-primary": colors.black,

      secondary: colors.white,
      "txt-secondary": colors.black,

      "btn-base": colors.yellow[300],
      "btn-primary": colors.black,
      "btn-txt-primary": colors.yellow[300],

      //dark mode colors
      "base-dark": colors.black,
      "primary-dark": colors.gray[700],
      "secondary-dark": colors.gray[700],

      "txt-base-dark": colors.gray[100],
      "txt-primary-dark": colors.gray[100],
      "txt-secondary-dark": colors.gray[100],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
