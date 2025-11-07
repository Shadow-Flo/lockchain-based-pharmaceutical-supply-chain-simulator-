/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Poppins', 'Inter', 'sans-serif'],
        'body': ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        lumacure: {
          teal: '#00E6D2',
          'teal-light': '#33EFDD',
          'teal-dark': '#00B8A9',
          navy: '#0B1E3F',
          'navy-light': '#1A2F52',
          'navy-dark': '#081729',
          pearl: '#F5F7FA',
          'pearl-dark': '#E8ECF0',
          lavender: '#8A9EFF',
          'lavender-light': '#A8B5FF',
          'lavender-dark': '#6B7FFF',
        },
        primary: {
          50: '#f0fdfc',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00E6D2',
          600: '#00B8A9',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0B1E3F',
        },
        success: '#00E6D2',
        warning: '#fbbf24',
        danger: '#ef4444',
        info: '#8A9EFF',
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-out',
        'slideInRight': 'slideInRight 0.6s ease-out',
        'slideInLeft': 'slideInLeft 0.6s ease-out',
        'slideInUp': 'slideInUp 0.6s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'trace': 'trace 3s ease-in-out infinite',
        'network-pulse': 'networkPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 230, 210, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 230, 210, 0.6)',
            transform: 'scale(1.05)'
          },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(0, 230, 210, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 230, 210, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        trace: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        networkPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'network-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300E6D2" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}