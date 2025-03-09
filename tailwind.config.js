/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#F23834",
        "custom-yellow": "#F2B258",
        peach: "#F87777", 
        "sand-dune": "#F0D1A8",
        "light-brown": "#C4A49F",
        "custom-green": "#5C9967",
        "custom-black": "#63605F",
        "custom-white": "#FFF5E1"
      },
    },
  },
  plugins: [],
};
