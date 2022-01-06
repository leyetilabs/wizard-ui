import { TxInfo } from '@terra-money/terra.js'
import { errors } from '../constants'
import { TerraError, TransactionError } from '../types'

export const useTransactionErrorType = (txInfo?: TxInfo): TerraError => {
  if (txInfo) {
    const { codespace, code } = txInfo
    if (codespace && code) {
      return errors?.[codespace]?.[code] || TransactionError.UNKNOWN_ERROR
    }
  }
  return TransactionError.UNKNOWN_ERROR
}

export default useTransactionErrorType
