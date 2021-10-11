import { useCallback, useState, useEffect } from 'react'
import {
  Coins,
  Coin,
  MsgExecuteContract,
  CreateTxOptions,
  StdFee,
} from '@terra-money/terra.js'
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
import { useAddress } from './useAddress'
import useDebounceValue from './useDebounceValue'

export enum TxStep {
  /**
   * Idle
   */
  Idle = 0,
  /**
   * Estimating fees
   */
  Estimating = 1,
  /**
   * Ready to post transaction
   */
  Ready = 2,
  /**
   * Signing transaction in Terra Station
   */
  Posting = 3,
  /**
   * Broadcasting
   */
  Broadcasting = 4,
  /**
   * Succesful
   */
  Success = 5,
  /**
   * Failed
   */
  Failed = 6,
}

type Params = {
  msgs: MsgExecuteContract[] | null
  onSuccess?: (txHash: string) => void
  onError?: (txHash?: string) => void
}

export const useTransaction = ({ msgs, onSuccess, onError }: Params) => {
  const { client } = useTerraWebapp()
  const { post } = useWallet()
  const address = useAddress()
  const debouncedMsgs = useDebounceValue(msgs, 200)

  const [txStep, setTxStep] = useState<TxStep>(TxStep.Idle)
  const [txHash, setTxHash] = useState<string | undefined>(undefined)
  const [error, setError] = useState<unknown | null>(null)

  const { data: fee } = useQuery<unknown, unknown, StdFee | null>(
    ['fee', debouncedMsgs],
    () => {
      if (debouncedMsgs == null || txStep != TxStep.Idle) {
        return null
      }

      setError(null)
      setTxStep(TxStep.Estimating)

      return client.tx.estimateFee(address, debouncedMsgs, {
        gasPrices: new Coins([new Coin('uusd', 0.38)]),
        gasAdjustment: 1.2,
        feeDenoms: ['uusd'],
      })
    },
    {
      enabled: debouncedMsgs != null && txStep == TxStep.Idle,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: () => {
        setTxStep(TxStep.Ready)
      },
      onError: e => {
        setTxStep(TxStep.Idle)

        // @ts-expect-error - don't know anything about error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setError(e.response.data.error)
      },
    },
  )

  const { mutate } = useMutation(
    (data: CreateTxOptions) => {
      return post(data)
    },
    {
      onMutate: () => {
        setTxStep(TxStep.Posting)
      },
      onError: (e: unknown) => {
        setTxStep(TxStep.Failed)

        if (e instanceof UserDenied) {
          setError('User Denied')
        } else if (e instanceof CreateTxFailed) {
          setError(`Create Tx Failed: ${e.message}`)
        } else if (e instanceof TxFailed) {
          setError(`Tx Failed: ${e.message}`)
        } else if (e instanceof Timeout) {
          setError('Timeout')
        } else if (e instanceof TxUnspecifiedError) {
          setError(`Unspecified Error: ${e.message}`)
        } else {
          setError(
            `Unknown Error: ${e instanceof Error ? e.message : String(e)}`,
          )
        }

        onError?.()
      },
      onSuccess: data => {
        setTxStep(TxStep.Broadcasting)
        setTxHash(data.result.txhash)
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

  const reset = () => {
    setTxStep(TxStep.Idle)
    setError(null)
    setTxHash(undefined)
  }

  const submit = useCallback(async () => {
    if (fee == null || msgs == null || msgs.length < 1) {
      return
    }

    mutate({
      msgs,
      fee,
    })
  }, [msgs, fee, mutate])

  useEffect(() => {
    if (txInfo != null && txHash != null) {
      if (txInfo.code) {
        setTxStep(TxStep.Failed)
        onError?.(txHash)
      } else {
        setTxStep(TxStep.Success)
        onSuccess?.(txHash)
      }
    }
  }, [txInfo, onError, onSuccess, txHash])

  return {
    fee,
    submit,
    txStep,
    txHash,
    error,
    reset,
  }
}

export default useTransaction
