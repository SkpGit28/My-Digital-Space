/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add other paths if needed
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        elevated: "var(--elevated)",
        foreground: "var(--foreground)",
        
        // Semantic Colors
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        muted: {
          DEFAULT: "var(--text-secondary)",
          foreground: "var(--text-primary)",
        },
        border: "var(--border-subtle)",
        "nav-border": "var(--nav-border)",
        "footer-bg": "var(--footer-bg)",
        
        // New Status Colors (For StrategyBridge & Environment)
        status: {
          rose: "var(--status-rose)",
          orange: "var(--status-orange)",
          blue: "var(--status-blue)",
          emerald: "var(--status-emerald)",
        },

        // Specialty
        glass: {
          bg: "var(--glass-bg)",
          border: "var(--glass-border)",
        },
        work: {
          bg: "var(--work-card-bg)", // Note: This will need 'bg-[image:var(--work-card-bg)]' usage if it's a gradient
          border: "var(--work-card-border)",
          text: "var(--work-card-text)",
        }
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-base)',
        'md': 'var(--shadow-md)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)', // The Tinted Glow
      },
    },
  },
  plugins: [],
};