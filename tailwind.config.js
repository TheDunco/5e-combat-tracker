/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwind-heropatterns')({
      // as per tailwind docs you can pass variants
      variants: [],

      // the list of patterns you want to generate a class for
      // the names must be in kebab-case
      // an empty array will generate all 87 patterns
      patterns: [],

      // The foreground colors of the pattern
      colors: {
        default: '#9C92AC',
        pink: '#EC489A',
        gray: '#D1D5DB',
        dark: '#1F2937',
      },

      // The foreground opacity
      opacity: {
        default: '0.4',
        10: '0.1',
        20: '0.2',
        30: '0.3',
        50: '0.5',
        70: '0.7',
        100: '1.0',
      },
    }),
  ],
};
