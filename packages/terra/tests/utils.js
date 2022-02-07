import React from 'react'
import {
  StaticWalletProvider,
  WalletStatus,
  ConnectType,
} from '@terra-money/wallet-provider'
import { QueryClient, QueryClientProvider } from 'react-query'

import { TerraWebappProvider } from '../src/context'

const network = {
  name: 'testnet',
  chainID: 'bombay-12',
  lcd: 'https://bombay-lcd.terra.dev',
}

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <StaticWalletProvider
        defaultNetwork={network}
        status={WalletStatus.WALLET_CONNECTED}
        wallets={[
          {
            terraAddress: 'terra1hajtg9chne7vt0ue0jp95jtl6zclndnw7qqm7l',
            connectType: ConnectType.CHROME_EXTENSION,
          },
        ]}
      >
        <TerraWebappProvider>{children}</TerraWebappProvider>
      </StaticWalletProvider>
    </QueryClientProvider>
  )
}
