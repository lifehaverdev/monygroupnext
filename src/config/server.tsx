import { http } from 'viem';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Your WalletConnect Cloud project ID
export const projectId = '815947931436f8a2b677d1d27dc02ec2';

// Create a metadata object
const metadata = {
  name: 'MonyGroup',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const serverConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/umImd99xY47XFAHi4JpUPqCLjUQV_jgc'),
  },
});
