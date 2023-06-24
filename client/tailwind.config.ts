import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      wowen: '#2B3D00',
      highlight: '#D8FE4D',
      white: '#FFFFFF',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
