/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "dark-blue2": "#19304E",
      "dark-blue": "#254774",
      blue: "#0EA5E9",
      sky: "#06B6D4",
      red: "#dc2626",
      "light-blue": "#8BADDA",
      yellow: "#C78705",
      green: "#22c55e",
      gray: "rgb(100 116 139)",
      grayDark: "#445771",

      // color body
      "bg-body": "#F8FAFC",

      white: "#fff",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
