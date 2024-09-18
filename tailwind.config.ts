import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["selector", '[data-mantine-color-scheme="dark"]'],
  theme: {
    colors: {
      dark: {
        0: '#C9C9C9',
        1: '#b8b8b8',
        2: '#828282',
        3: '#696969',
        4: '#424242',
        5: '#3b3b3b',
        6: '#2e2e2e',
        7: '#242424',
        8: '#1f1f1f',
        9: '#141414',
      },
      primary: {
        0: 'var(--mantine-color-primary-0)',
        1: 'var(--mantine-color-primary-1)',
        2: 'var(--mantine-color-primary-2)',
        3: 'var(--mantine-color-primary-3)',
        4: 'var(--mantine-color-primary-4)',
        5: 'var(--mantine-color-primary-5)',
        6: 'var(--mantine-color-primary-6)',
        7: 'var(--mantine-color-primary-7)',
        8: 'var(--mantine-color-primary-8)',
        9: 'var(--mantine-color-primary-9)',
      },
      secondary: {
        0: 'var(--mantine-color-secondary-0)',
        1: 'var(--mantine-color-secondary-1)',
        2: 'var(--mantine-color-secondary-2)',
        3: 'var(--mantine-color-secondary-3)',
        4: 'var(--mantine-color-secondary-4)',
        5: 'var(--mantine-color-secondary-5)',
        6: 'var(--mantine-color-secondary-6)',
        7: 'var(--mantine-color-secondary-7)',
        8: 'var(--mantine-color-secondary-8)',
        9: 'var(--mantine-color-secondary-9)',
      }
    },
    extend: {},
  },
  plugins: [],
};
export default config;
