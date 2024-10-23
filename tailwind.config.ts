import containerQueries from "@tailwindcss/container-queries";
import type { Config } from "tailwindcss";

import { shadcnPreset } from "./src/config/theme/shadcn-preset";

const config: Config = {
  presets: [shadcnPreset],

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xl: "2rem",
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
