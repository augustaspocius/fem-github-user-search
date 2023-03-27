/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: "var(--clr-primary)",
       primarydimmed:"var(--clr-primary-dimmed)",
       dm_darkblue: "var(--clr-dark-darkblue)", 
       dm_white: "var(--clr-dark-white)",
       dm_black: "var(--clr-dark-black)",
       dm_blue: "var(--clr-dark-blue)",
       lm_white: "var(--clr-light-white)",
       lm_whitegrey: "var(--clr-light-whitegrey)",
       lm_dark: "var(--clr-light-dark)",
       lm_darkblue: "var(--clr-light-darkblue)",
       lm_greyblue: "var(--clr-light-greyblue)",
       
      },
      fontFamily: {
        spacemono: ['Space Mono', 'sans-serif'],
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
}
