import {
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError,
  Timeout,
} from '@terra-money/wallet-provider'
import { ContractError } from '../types'

export const useContractError = (e: unknown): ContractError => {
  if (e instanceof UserDenied) {
    return ContractError.USER_DENIED
  } else if (e instanceof CreateTxFailed) {
    return ContractError.CREATE_TX_FAILED
  } else if (e instanceof TxFailed) {
    return ContractError.TX_FAILED
  } else if (e instanceof Timeout) {
    return ContractError.TIMEOUT
  } else if (e instanceof TxUnspecifiedError) {
    return ContractError.TX_UNSPECIFIED_ERROR
  } else {
    return ContractError.UNKNOWN_ERROR
  }
}

export default useContractError
