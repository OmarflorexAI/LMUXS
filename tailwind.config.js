/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dominican: {
          red: '#CE1126',
          blue: '#002D62',
          gold: '#D4A843',
        },
        dark: '#FAFAFA',
        surface: '#FFFFFF',
        'surface-alt': '#F3F3F6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      transitionDuration: {
        400: '400ms',
      },
      backgroundOpacity: {
        6: '0.06',
        8: '0.08',
        15: '0.15',
      },
    },
  },
  plugins: [],
}
