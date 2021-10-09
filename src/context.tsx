import React, {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
} from 'react'
import { Coin, Dec, LCDClient } from '@terra-money/terra.js'
import { useWallet, NetworkInfo } from '@terra-money/wallet-provider'
import { useQuery } from 'react-query'

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
  })

type Props = {
  children: ReactNode
}

export const TerraWebappProvider: FC<Props> = ({ children }) => {
  const { network } = useWallet()

  const client = useMemo(() => {
    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    })
  }, [network])

  const { data: taxCap } = useQuery('taxCap', () => {
    return client.treasury.taxCap('uusd')
  })

  const { data: taxRate } = useQuery('taxRate', () => {
    return client.treasury.taxRate()
  })

  const value = useMemo(() => {
    return {
      network,
      client,
      taxCap,
      taxRate,
    }
  }, [network, client, taxCap, taxRate])

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
