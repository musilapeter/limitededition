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
        electricLime: '#2F6B3E',
        hotPink: '#1F2937',
        vividViolet: '#374151',
        cyberTurquoise: '#264996',
        softLavender: '#F5F5F5',
        mutedClay: '#F5F5F5',
        pureBlack: '#000000',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top right, rgba(55,65,81,.12), transparent 35%), radial-gradient(circle at 20% 20%, rgba(38,73,150,.12), transparent 30%)',
      },
    },
  },
  plugins: [],
};
