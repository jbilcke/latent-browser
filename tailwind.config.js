/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    'src/**/*.{js,jsx,ts,tsx,md,txt}',
  ],
  theme: {
    extend: {
      fontFamily: {
        google: ['Google Sans', 'Helvetica', 'Arial', 'sans-serif'],
        roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}