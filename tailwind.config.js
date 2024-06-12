/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'primarybg-text': 'var(--color-primarybg-text)',
        'secondary': 'var(--color-secondary)',
        'secondarybg-text': 'var(--color-secondarybg-text)',
        'secondarybg-link': 'var(--color-secondarybg-link)',
        'bodybg': 'var(--color-bodybg)',
      },
    },
    plugins: [],
  }
}

