/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5D3FE6',
          light: '#3c2ba0',
          bg_light: '#150E33',
          bg_dark: '#050114',
        },
      },
    },
  },
  plugins: [],
};
