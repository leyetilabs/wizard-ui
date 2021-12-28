import { useCallback, useState, useEffect, useMemo } from 'react'
import { CreateTxOptions, TxInfo } from '@terra-money/terra.js'
import {
  useWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError,
  Timeout,
} from '@terra-money/wallet-provider'
import { useMutation, useQuery } from 'react-query'

import { useTerraWebapp } from '../context'

type Params = {
  onPosting?: () => void
  onBroadcasting?: (txHash: string) => void
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void
  onError?: (txHash?: string, txInfo?: TxInfo) => void
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
        let error = `Unknown Error: ${
          e instanceof Error ? e.message : String(e)
        }`

        if (e instanceof UserDenied) {
          error = 'User Denied'
        } else if (e instanceof CreateTxFailed) {
          error = `Create Tx Failed: ${e.message}`
        } else if (e instanceof TxFailed) {
          error = `Tx Failed: ${e.message}`
        } else if (e instanceof Timeout) {
          error = 'Timeout'
        } else if (e instanceof TxUnspecifiedError) {
          error = `Unspecified Error: ${e.message}`
        } else {
          error = `Unknown Error: ${e instanceof Error ? e.message : String(e)}`
        }

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
    if (txInfo != null && txHash != null) {
      if (txInfo.code) {
        onError?.(txHash, txInfo)
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
