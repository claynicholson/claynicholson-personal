/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "term-base": "#1e1e2e",
        "term-surface": "#313244",
        "term-text": "#cdd6f4",
        "term-overlay": "#6c7086",
        "term-blue": "#89b4fa",
        "term-green": "#a6e3a1",
        "term-mauve": "#cba6f7",
        "term-pink": "#f38ba8",
        "term-teal": "#89dceb",
        "term-yellow": "#f9e2af",
        "term-rosewater": "#f5e0dc",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  safelist: [
    "bg-term-pink",
    "bg-term-mauve",
    "bg-term-blue",
    "bg-term-teal",
    "bg-term-green",
    "bg-term-yellow",
    "text-term-pink",
    "text-term-mauve",
    "text-term-blue",
    "text-term-teal",
    "text-term-green",
    "text-term-yellow",
  ],
  plugins: [],
};
