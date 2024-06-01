'use client'

import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { createWeb3Modal } from '@web3modal/wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { State, WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
// import { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { config, projectId } from '../_config';
import Header from '../../../components/header'
import { cookieToInitialState } from 'wagmi'

const queryClient = new QueryClient();
if (!projectId) throw new Error('Project ID is not defined')

  // Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export const metadata: Metadata = {
  title: 'Mony Group Mint Platform',
  description: 'Mint NFTs from'
}


export default function ProjectLayout({
  children
}: {
  children: ReactNode
  initialState?: State
}) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <WagmiProvider config={config} initialState={initialState}>
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
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}