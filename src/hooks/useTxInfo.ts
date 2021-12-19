import { useEffect } from 'react'
import { TxInfo } from '@terra-money/terra.js'
import { useQuery } from 'react-query'

import { useTerraWebapp } from '../context'

type Params = {
  txHash: string | null
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void
  onError?: (txHash?: string, txInfo?: TxInfo) => void
}

export const useTxInfo = ({ txHash, onSuccess, onError }: Params) => {
  const { client } = useTerraWebapp()

  const { data, isLoading } = useQuery(
    ['txInfo', txHash],
    () => {
      if (txHash == null) {
        return
      }

      return client.tx.txInfo(txHash)
    },
    {
      enabled: txHash != null,
      retry: true,
    },
  )

  useEffect(() => {
    if (data != null && txHash != null) {
      if (data.code) {
        onError?.(txHash, data)
      } else {
        onSuccess?.(txHash, data)
      }
    }
  }, [data, onError, onSuccess, txHash])

  return {
    isLoading,
    txInfo: data,
  }
}

export default useTxInfo
