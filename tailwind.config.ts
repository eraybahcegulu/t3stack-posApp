import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      gridTemplateColumns:{
        card: "repeat(auto-fill, minmax(200px, 1fr))"
      },
    },
  },
  darkMode: "class",

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [nextui()],
} satisfies Config;
