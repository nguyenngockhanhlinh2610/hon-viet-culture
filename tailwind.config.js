/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        heritage: {
          burgundy: '#992626',
          burgundyDark: '#5C0D0D',
          gold: '#E5A93C',
          amber: '#F3C669',
          cream: '#FEF5CC',
          paper: '#FFFDF5',
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
