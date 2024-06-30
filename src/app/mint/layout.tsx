import React from 'react'
import { headers } from 'next/headers'
import Header from '@/components/header'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'

import Web3ModalProvider from '@/context'

export default function ProjectLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <Web3ModalProvider initialState={initialState}>
      <Header navigation={
          [
              {name: 'Lore', href: '/lore'},
              {name: 'Merch', href: '/merch'},
              {name: 'Mint', href: '/mint'}
          ]}
          rightElement = {<w3m-button/>}
      />
      {children}
    </Web3ModalProvider>
  )
}