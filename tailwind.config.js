/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        heritage: {
          burgundy: '#7B1113',
          burgundyDark: '#5C0B0D',
          gold: '#D4AF37',
          amber: '#E5A93C',
          cream: '#FDFBF7',
          paper: '#FAF3E0',
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
