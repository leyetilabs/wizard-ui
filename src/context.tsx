import React, {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
} from 'react'
import { Coin, Dec, LCDClient, Account } from '@terra-money/terra.js'
import { useWallet, NetworkInfo } from '@terra-money/wallet-provider'
import { useQuery } from 'react-query'

import { useAddress } from './hooks/useAddress'

const DEFAULT_NETWORK = {
  name: 'mainnet',
  chainID: 'colombus-5',
  lcd: 'https://lcd.terra.dev',
}

type TerraWebapp = {
  network: NetworkInfo
  client: LCDClient
  taxCap: Coin | undefined
  taxRate: Dec | undefined
  accountInfo: Account | undefined
}

type Config = {
  lcdClientUrl?: string
}

export const TerraWebappContext: Context<TerraWebapp> =
  createContext<TerraWebapp>({
    network: DEFAULT_NETWORK,
    client: new LCDClient({
      URL: DEFAULT_NETWORK.lcd,
      chainID: DEFAULT_NETWORK.chainID,
    }),
    taxCap: undefined,
    taxRate: undefined,
    accountInfo: undefined,
  })

type Props = {
  children: ReactNode
  config?: Config
}

export const TerraWebappProvider: FC<Props> = ({ children, config }) => {
  const { network } = useWallet()
  const address = useAddress()

  const client = useMemo(() => {
    if (config?.lcdClientUrl) {
      return new LCDClient({
        URL: config?.lcdClientUrl,
        chainID: network.chainID,
      })
    }

    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    })
  }, [network])

  const { data: taxCap } = useQuery(['taxCap', network.chainID], () => {
    return client.treasury.taxCap('uusd')
  })

  const { data: taxRate } = useQuery(['taxRate', network.chainID], () => {
    return client.treasury.taxRate()
  })

  const { data: accountInfo } = useQuery(
    ['accountInfo', network.chainID],
    () => {
      return client.auth.accountInfo(address)
    },
  )

  const value = useMemo(() => {
    return {
      network,
      client,
      taxCap,
      taxRate,
      accountInfo,
    }
  }, [network, client, taxCap, taxRate, accountInfo])

  return (
    <TerraWebappContext.Provider value={value}>
      {children}
    </TerraWebappContext.Provider>
  )
}

export function useTerraWebapp(): TerraWebapp {
  return useContext(TerraWebappContext)
}

export const TerraWebappConsumer: Consumer<TerraWebapp> =
  TerraWebappContext.Consumer
