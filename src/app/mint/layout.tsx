import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Header from '@/components/header'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'

import Web3ModalProvider from '@/context'

export const metadata: Metadata = {
  title: 'Mony Group Mint Platform',
  description: 'Mint NFTs from'
}

export default function ProjectLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <Web3ModalProvider initialState={initialState}>
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
    </Web3ModalProvider>
  )
}