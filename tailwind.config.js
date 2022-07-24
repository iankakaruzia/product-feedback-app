/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem' // 72px
      },
      backgroundImage: {
        'suggestions-header-mobile':
          "url('/assets/suggestions/mobile/background-header.png')",
        'suggestions-header-tablet':
          "url('/assets/suggestions/tablet/background-header.png')",
        'suggestions-header-desktop':
          "url('/assets/suggestions/desktop/background-header.png')"
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif']
      },
      fontSize: {
        heading1: [
          '1.5rem', // 24px
          {
            letterSpacing: '-0.33px',
            lineHeight: '2.1875rem' // 35px
          }
        ],
        heading2: [
          '1.25rem', // 20px
          {
            letterSpacing: '-0.25px',
            lineHeight: '1.8125rem' // 29px
          }
        ],
        heading3: [
          '1.125rem', // 18px
          {
            letterSpacing: '-0.25px',
            lineHeight: '1.625rem' // 26px
          }
        ],
        heading4: [
          '0.875rem', // 14px
          {
            letterSpacing: '-0.2px',
            lineHeight: '1.25rem' // 20px
          }
        ],
        body1: ['1rem', '1.4375rem'], // 16px, 23px
        body2: ['0.9375rem', '1.375rem'], // 15px, 22px
        body3: ['0.8125rem', '1.1875rem'] // 13px, 19px
      },
      boxShadow: {
        lg: '0px 10px 40px -7px rgba(55, 63, 104, 0.350492)'
      },
      borderRadius: {
        xl: '0.625rem' // 10px
      },
      colors: {
        gray: {
          100: '#F7F8FD',
          200: '#F2F4FE',
          500: '#647196',
          600: '#656EA3',
          700: '#3A4374',
          800: '#373F68'
        },
        orange: {
          500: '#F49F85'
        },
        purple: {
          500: '#C75AF6',
          700: '#AD1FEA'
        },
        red: {
          300: '#E98888',
          500: '#D73737'
        },
        blue: {
          300: '#62BCFA',
          500: '#7C91F9',
          700: '#4661E6'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
