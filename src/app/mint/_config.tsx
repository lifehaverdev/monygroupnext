'use client'

import {
    getDefaultConfig
  } from '@rainbow-me/rainbowkit';
import { http } from 'viem';

import {
mainnet,
polygon,
optimism,
arbitrum,
base,
} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Mony Mint',
    projectId: '4444444',
    chains: [mainnet],//, base],
    transports: {
      [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/umImd99xY47XFAHi4JpUPqCLjUQV_jgc'),
      //[base.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
    },
  });