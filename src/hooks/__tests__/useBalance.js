import React from 'react'
import {
  StaticWalletProvider,
  WalletStatus,
  ConnectType,
} from '@terra-money/wallet-provider'
import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from 'react-query'

import { TerraWebappProvider } from '../../context'
import { useBalance } from '../useBalance'

jest.mock('@terra-money/wallet-provider', () => {
  const originalModule = jest.requireActual('@terra-money/wallet-provider')
  const newModule = jest.requireActual('@terra-dev/use-wallet')

  return {
    ...originalModule,
    ...newModule,
  }
})

const network = {
  name: 'testnet',
  chainID: 'bombay-12',
  lcd: 'https://bombay-lcd.terra.dev',
}

const createWrapper = () => {
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

test('balance of native token', async () => {
  const { result, waitForValueToChange } = renderHook(
    () => useBalance('uusd'),
    {
      wrapper: createWrapper(),
    },
  )

  await waitForValueToChange(() => result.current, {
    timeout: 2500,
  })

  expect(result.current).toBe('7071578255')
})

test('balance of empty native token', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useBalance('ukrw'), {
    wrapper: createWrapper(),
  })

  await waitForNextUpdate({
    timeout: 2500,
  })

  expect(result.current).toBe('0')
})

test('balance of cw20 token', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBalance('terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x'),
    {
      wrapper: createWrapper(),
    },
  )

  await waitForNextUpdate({
    timeout: 2500,
  })

  expect(result.current).toBe('0')
})

test('balance of wrong cw20 token', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBalance('dsqdsddsqdsdq'),
    {
      wrapper: createWrapper(),
    },
  )

  await waitForNextUpdate({
    timeout: 2500,
  })

  expect(result.current).toBe('0')
})
