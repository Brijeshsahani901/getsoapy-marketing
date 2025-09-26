module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '480px',
        md: '769px',
        lg: '1025px',
        xl: '1441px',
      },
    },
    extend: {
      colors: {
        primary: '#0F8A5F',
        slate: '#1E2A33',
        amber: '#F2A000',
        bgLight: '#F5F7F8',
        neutralDark: '#2B2B2B',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
