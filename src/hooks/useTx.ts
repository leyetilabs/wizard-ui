import { useMemo } from 'react'
import { Fee, MsgExecuteContract, TxInfo } from '@terra-money/terra.js'
import {
  useWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError,
  Timeout,
} from '@terra-money/wallet-provider'

type Params = {
  onPosting?: () => void
  onBroadcasting?: (txHash: string) => void
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void
  onError?: (txHash?: string, txInfo?: TxInfo) => void
}

export const useTx = ({ onPosting, onBroadcasting, onError }: Params) => {
  const { post } = useWallet()

  const submit = async ({
    msgs,
    fee,
  }: {
    msgs: MsgExecuteContract[]
    fee: Fee
  }) => {
    if (fee == null || msgs == null || msgs.length < 1) {
      return
    }

    onPosting?.()

    try {
      const res = await post({
        msgs,
        fee,
      })

      onBroadcasting?.(res.result.txhash)
    } catch (e) {
      let error = `Unknown Error: ${e instanceof Error ? e.message : String(e)}`

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
    }
  }

  return useMemo(() => {
    return {
      submit,
    }
  }, [submit])
}

export default useTx
