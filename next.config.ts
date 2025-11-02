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
    // Ensure third-party libs like @react-three/fiber get the full React build
    delete config.resolve?.alias?.react;
    delete config.resolve?.alias?.['react-dom'];
    return config;
  }
};

export default withMDX(nextConfig);
