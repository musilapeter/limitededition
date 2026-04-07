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
        ink: '#1F1F1F',
        pearl: '#FFFFFF',
        electricLime: '#F68B1E',
        hotPink: '#E67E00',
        vividViolet: '#F68B1E',
        cyberTurquoise: '#264996',
        softLavender: '#F5F5F5',
        mutedClay: '#F5F5F5',
        pureBlack: '#000000',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top right, rgba(246,139,30,.2), transparent 35%), radial-gradient(circle at 20% 20%, rgba(38,73,150,.12), transparent 30%)',
      },
    },
  },
  plugins: [],
};
