import type { Config } from "tailwindcss";
import {content, plugin} from 'flowbite-react/tailwind'
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    content()
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin"), plugin()],
} satisfies Config;
