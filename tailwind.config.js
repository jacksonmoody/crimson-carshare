/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        crimson: "#A51C30",
        "crimson-dark": "#8f192c",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#A51C30",
          "primary-content": "#FFFFFF",
          secondary: "#ed1b34",
          accent: "#ec8f9c",
          neutral: "#000000",
          "base-100": "#FFFFFF",
          info: "#95b5df",
          success: "#4db848",
          warning: "#fcb315",
          error: "#ed1b34",
          "error-content": "#FFFFFF",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
