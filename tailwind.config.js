/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F96162',
        // Refined Mono 디자인 토큰
        ink: '#111111',
        paper: '#F7F6F4',
        accent: '#FF4D2E',
        line: '#E7E4DF',
        muted: '#8A857E',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpeg')`,
      },
    },
  },
  plugins: [],
};
