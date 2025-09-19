import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const fluid = (min: number, max: number, minVW = 320, maxVW = 1280) =>
  `clamp(${min}rem, calc(${min}rem + (${max} - ${min}) * ((100vw - ${minVW}px) / (${maxVW - minVW}))), ${max}rem)`;

export default {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './app/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"RedHatTextVar"', 'var(--font-geist-sans)', 'sans-serif'],
        serif: ['"RemiliaMincho"', 'serif'],
      },
      colors: {
        primary: '#B71E34',
        background: 'var(--color-background)',
        surface: {
          DEFAULT: '#ffffff',
          dark: '#111111',
        },
        muted: {
          DEFAULT: '#71717a',
          dark: '#a1a1aa',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#2e2e32',
        },
        text: {
          DEFAULT: 'var(--color-foreground)',
          light: '#171717',
          dark: '#ededed',
        },
      },
      fontSize: {
        xs: fluid(0.75, 0.8125),
        sm: fluid(0.875, 0.9375),
        base: fluid(1, 1.0625),
        lg: fluid(1.125, 1.1875),
        xl: fluid(1.25, 1.375),
        '2xl': fluid(1.5, 1.625),
        '3xl': fluid(1.875, 2),
        '4xl': fluid(2.25, 2.5),
        '5xl': fluid(3, 3.25),
        '6xl': fluid(3.75, 4),
        '7xl': fluid(4.5, 5),
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addUtilities, theme }) => {
      const fontSizes = ['1', '2', '3', '4'];
      const headingUtilities = fontSizes.reduce<Record<string, any>>((acc, n, idx) => {
        acc[`.heading-${n}`] = {
          fontSize: theme(`fontSize.${['4xl','3xl','2xl','xl'][idx]}`),
          fontWeight: 700,
          lineHeight: theme('lineHeight.tight'),
        };
        return acc;
      }, {});
      addUtilities(headingUtilities, { variants: ['responsive'] });
    }),
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.bg-gradient-primary': {
          backgroundImage: `linear-gradient(135deg, ${theme('colors.primary')} 0%, ${theme('colors.primary')}66 100%)`,
        },
      });
    }),
  ],
} satisfies Config;
