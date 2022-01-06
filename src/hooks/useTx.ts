import { useCallback, useState, useEffect, useMemo } from 'react'
import { CreateTxOptions, TxInfo } from '@terra-money/terra.js'
import { useWallet } from '@terra-money/wallet-provider'
import { useMutation, useQuery } from 'react-query'
import { useTerraWebapp } from '../context'
import useTransactionError from './useTransactionError'
import useContractError from './useContractError'
import { TerraError } from '../types'

type Params = {
  onPosting?: () => void
  onBroadcasting?: (txHash: string) => void
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void
  onError?: (error: TerraError, txHash?: string, txInfo?: TxInfo) => void
}

export const useTx = ({
  onPosting,
  onBroadcasting,
  onSuccess,
  onError,
}: Params) => {
  const { client } = useTerraWebapp()
  const { post } = useWallet()

  const [txHash, setTxHash] = useState<string | undefined>(undefined)

  const { mutate } = useMutation(
    (opts: CreateTxOptions) => {
      return post(opts)
    },
    {
      onMutate: () => {
        setTxHash(undefined)
        onPosting?.()
      },
      onError: (e: unknown) => {
        const error = useContractError(e)

        onError?.(error)
      },
      onSuccess: res => {
        setTxHash(res.result.txhash)
        onBroadcasting?.(res.result.txhash)
      },
    },
  )

  const { data: txInfo } = useQuery(
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

  const submit = useCallback(
    async ({ msgs, fee }) => {
      if (fee == null || msgs == null || msgs.length < 1) {
        return
      }

      mutate({
        msgs,
        fee,
      })
    },
    [mutate],
  )

  useEffect(() => {
    const error = useTransactionError(txInfo)

    if (txInfo != null && txHash != null) {
      if (error) {
        onError?.(error, txHash, txInfo)
      } else {
        onSuccess?.(txHash, txInfo)
      }
    }
  }, [txInfo, onError, onSuccess, txHash])

  return useMemo(() => {
    return {
      submit,
      txHash,
    }
  }, [submit, txHash])
}

export default useTx
