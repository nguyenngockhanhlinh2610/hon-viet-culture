/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        heritage: {
          burgundy: '#A3161A',
          burgundyDark: '#6E0D11',
          gold: '#D9A74A',
          amber: '#F3C669',
          cream: '#FAF6EC',
          paper: '#FFFFFF',
          ink: '#2C1E1A',
          muted: '#6B5B53',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
