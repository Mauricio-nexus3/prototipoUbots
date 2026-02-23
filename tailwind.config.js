module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'st-tropaz': {
          50: '#ebf1ff',
          100: '#ceddff',
          200: '#9ec0ff',
          300: '#69a7ff',
          400: '#0090fc',
          500: '#007ad6',
          600: '#0065b3',
          700: '#005192',
          800: '#003563',
          900: '#001127',
        },
        'lightning-yellow': {
          50: '#feeedb',
          100: '#fedcab',
          200: '#fbc02f',
          300: '#e4ae2a',
          400: '#c69723',
          500: '#a47d1b',
          600: '#816113',
          700: '#5d450b',
          800: '#3a2a04',
          900: '#181001',
        },
        ubots: {
          blue: '#005192', // st-tropaz-700 assigned as primary
          yellow: '#fbc02f', // lightning-yellow-200 assigned as secondary
        },
        success: '#10B981', // Emerald 500
        error: '#EF4444', // Red 500
        warning: '#F59E0B', // Amber 500
      },
      borderRadius: {
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      spacing: {
        // Tailwind default is 4px (0.25rem) per unit, preserving defaults.
      },
    },
  },
  variants: {},
  plugins: [],
}
