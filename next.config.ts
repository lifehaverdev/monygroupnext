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
    optimizePackageImports: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
  webpack(config: import('webpack').Configuration) {
    const alias = config.resolve?.alias as Record<string, unknown> | undefined;
    if (alias) {
      delete alias['react'];
      delete alias['react-dom'];
    }
    return config;
  }
};

export default withMDX(nextConfig);
