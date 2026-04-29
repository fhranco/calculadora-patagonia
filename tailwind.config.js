/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eef5fc',
          100: '#d9e9f9',
          200: '#bcdaf4',
          300: '#8ec1ea',
          400: '#5ba3de',
          500: '#2161a8', // Tu azul corporativo
          600: '#1d528f', 
          700: '#184478',
          800: '#143861',
          900: '#112d4d',
        },
        yellow: {
          50: '#fffcf0',
          100: '#fff7d6',
          200: '#ffeaa8',
          300: '#ffd870',
          400: '#fed863', 
          500: '#fec62b', // Tu amarillo/oro corporativo
          600: '#e5ad19',
          700: '#cc9713',
          800: '#a3770e',
          900: '#7c5a0a',
        }
      }
    },
  },
  plugins: [],
};
