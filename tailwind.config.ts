/* eslint-disable import/no-named-as-default-member */
import type { Config } from "tailwindcss";
// import {content, plugin} from 'flowbite-react/tailwind'
import flowbite from "flowbite-react/tailwind";
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    flowbite.content()
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
