/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    'src/**/*.{js,jsx,ts,tsx,md,txt}',

    // UI Kits
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
   //  'node_modules/daisyui/dist/**/*.js',
    // 'node_modules/react-daisyui/dist/**/*.js'
  ],
  // darkMode: 'dark',
  theme: {
    extend: {
      boxShadow: {
        // 'combo': '0px -12px 10px 7px #000000, inset 0px 8px 12px -12px #000000',
        // 'inset': 'inset 0px 8px 12px -12px #000000',
        //  'drop': '0px -12px 10px 7px #000000',
        // 'subtle': '0px -16px 10px 7px #000000',
        'noogle': '0 1px 6px 0 #20212451',
      },
      colors: {
        // new color system (theme-based)
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        negative: 'var(--color-negative)',
        positive: 'var(--color-positive)',
        'primary-background': 'var(--background-primary)',
        'sec-background': 'var(--background-sec)',
        'primary-text': 'var(--color-text-primary)',
 
        light: {
          bg: '#ffffff',
          highlight: '#1a0dab',
          primary: '#4d5156',
          secondary: '#70757a',
        },
        dark: {
          bg: '#202124',
          highlight: '#8ab4f8',
          primary: '#bdc1c6',
          secondary: '#9aa0a6',
        },
        toolbar: {
          bg: '#DDD6C6',
          fg: '#F7F6F3',
          hover: '#E5E0D5', // '#E8EED9',
          text: '#212124',
          placeholder: '#5A5A5B',
          input: '#D5D4D2',
        },
      },
      fontFamily: {
        google: ['Google Sans', 'Helvetica', 'Arial', 'sans-serif'],
        roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        '30px': '30px',
      }
    },
    /*
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
    */

  },
  variants: {
    backgroundColor: ['active'],
  },
  plugins: [
    require('tailwind-scrollbar'),

    require('@tailwindcss/forms'),
    // UI kits
    require('flowbite/plugin'),
    // require('daisyui'),
    // require('tailgrids/plugin'),
  ],
}