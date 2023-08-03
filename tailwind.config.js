/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{html,js,jsx,tsx}" ],
  theme: {
    extend: {
      height: {
        '100vh': '100vh',
      },
      colors: {
        'custom-gray': '#333333',
      },
    },
  },
  plugins: [],

}

