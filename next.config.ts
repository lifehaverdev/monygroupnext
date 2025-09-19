import mdx from '@next/mdx';
import remarkPrism from 'remark-prism';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkPrism],
  },
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    // Enable automatic inlining of small global CSS (≈5 kB) to eliminate render-blocking <link>
    // Docs: https://nextjs.org/docs/app/api-reference/next-config-js/experimental#css
    css: true,
    optimizePackageImports: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
};

export default withMDX(nextConfig);
