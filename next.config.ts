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
};

export default withMDX(nextConfig);
