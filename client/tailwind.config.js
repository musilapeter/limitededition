/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        ink: '#0A0B0F',
        pearl: '#F5F3EE',
        sand: '#D6C3A5',
        rust: '#B6573A',
        moss: '#687A5A',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top right, rgba(182,87,58,.35), transparent 35%), radial-gradient(circle at 20% 20%, rgba(104,122,90,.25), transparent 30%)',
      },
    },
  },
  plugins: [],
};
