/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#faf9f6',
          card: '#ffffff',
          muted: '#f4f2ec',
          border: '#e7e4dc',
        },
        ink: {
          DEFAULT: '#191c1f',
          heading: '#111315',
          body: '#2d3136',
          muted: '#5e6470',
          faint: '#8a92a0',
        },
        classic: {
          primary: '#1c2530',
          'primary-hover': '#0f1721',
          accent: '#8b5a2b',
          'accent-hover': '#714620',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'classic': '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
        'classic-md': '0 4px 14px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
