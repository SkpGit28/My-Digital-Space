const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#0070F3',
        secondary: '#7928CA',
        border: '#EAEAEA',
        background: '#FFFFFF',
        foreground: '#000000',
        muted: '#666666',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
