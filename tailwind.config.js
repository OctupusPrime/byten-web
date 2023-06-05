/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "note-item": {
          red: "#FF000030",
          green: "#00FF0030",
          blue: "#0000FF30",
          yellow: "#FFFF0030",
          magenta: "#FF00FF30",
          cyan: "#00FFFF30",
          orange: "#FFA50030",
          purple: "#80008030",
          "dark-green": "#00800030",
          navy: "#00008030",
        },
        "dark-note-item": {
          red: "#4C0000",
          green: "#004C00",
          blue: "#00004C",
          yellow: "#4C4C00",
          magenta: "#4C004C",
          cyan: "#004C4C",
          orange: "#4C2A00",
          purple: "#260026",
          "dark-green": "#004C00",
          navy: "#00004C",
        },
      },
    },
  },
  plugins: [],
};
