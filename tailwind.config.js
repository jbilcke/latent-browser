/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,md}',
    './safelist.txt',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-safelist-generator')({
      path: 'safelist.txt',
      // https://tailwindcss.com/docs/theme#configuration-reference
      patterns: [
        'text-{fontSize}',
        'font-{fontWeight}',
        'font-{fontFamily}',
        'flex',
        'flex-{flex}',
        'basis-{flexBasis}',
        'leading-{lineHeight}',
        'shadow-{boxShadow}',
        'list-{listStyleType}',
        'm-{margin}',
        'mt-{margin}',
        'mb-{margin}',
        'mx-{margin}',
        'my-{margin}',
        'ml-{margin}',
        'mr-{margin}',

        'p-{padding}',
        'pt-{padding}',
        'pb-{padding}',
        'px-{padding}',
        'py-{padding}',
        'pl-{padding}',
        'pr-{padding}',

        'h-{height}',
        'w-{width}',

        /*
        '{flexGrow}',
        '{flexShrink}',
        '{flexFamily}',
        */
        'rounded-{borderRadius}',
        'border-{borderWidth}',
        'border-{borderColor}',
        'bg-{backgroundColor}',
        'text-{colors}',
        'hover:bg-{backgroundColor}',
        'hover:text-{colors}',
      ],
    }),
  ],
}
