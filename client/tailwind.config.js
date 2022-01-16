module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue_131921: "#131921",
        blue_232f3e: "#232f3e",
        white_eaeded: "#eaeded",
        orange_da8c6b: "#da8c6b",
        orange_f3a847: "#f3a848",
        orange_e5c399: "#e5c399",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
