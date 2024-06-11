import type { Config } from 'tailwindcss'
import { content } from 'flowbite-react/tailwind'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    content()
  ],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [
    require('flowbite/plugin'), {
      charts: true
    }
  ]
} satisfies Config
