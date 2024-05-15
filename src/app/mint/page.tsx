'use client'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from './_config';
import Header from '../../components/header'
import CollectionsDisplay from './collections';

const queryClient = new QueryClient();

const MintPage = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            <Header navigation={
                [
                    {name: 'Lore', href: '/lore'},
                    {name: 'Merch', href: '/merch'},
                    {name: 'Mint', href: '/mint'}
                ]}
                rightElement = {<ConnectButton/>}
            />
            {/* <ConnectButton /> */}
            <CollectionsDisplay />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default MintPage