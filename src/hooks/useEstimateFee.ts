import { useMemo } from 'react'
import { Coins, Coin, MsgExecuteContract, Fee } from '@terra-money/terra.js'

import { useQuery } from 'react-query'
import { useTerraWebapp } from '../context'
import useAddress from './useAddress'

type Params = {
  msgs: MsgExecuteContract[] | null
  enabled?: boolean
  gasAdjustment?: number
}

export const useEstimateFee = ({
  msgs,
  enabled = true,
  gasAdjustment = 1.2,
}: Params) => {
  const { client } = useTerraWebapp()
  const address = useAddress()

  const { data, isLoading, error } = useQuery<Fee | null>(
    ['fee', msgs],
    async () => {
      if (msgs == null || error != null) {
        throw new Error('Msgs is null or Error is not null')
      }

      const txOptions = {
        msgs,
        gasPrices: new Coins([new Coin('uusd', 0.15)]),
        gasAdjustment,
        feeDenoms: ['uusd'],
      }

      const accountInfo = await client.auth.accountInfo(address)

      return client.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.getSequenceNumber(),
            publicKey: accountInfo.getPublicKey(),
          },
        ],
        txOptions,
      )
    },
    {
      enabled: msgs != null && msgs.length > 0 && enabled,
      refetchOnWindowFocus: false,
      retry: false,
    },
  )

  return useMemo(() => {
    return {
      fee: data,
      isLoading,
      error,
    }
  }, [data, isLoading, error])
}

export default useEstimateFee
