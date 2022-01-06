// ---------------------------------------------
// HandleMsg
// ---------------------------------------------
export type IncreaseAllowance = {
  increase_allowance: {
    spender: string
    amount: string
  }
}

export type Send = {
  send: {
    amount: string
    contract: string
    msg: string
  }
}

// ---------------------------------------------
// QueryMsg
// ---------------------------------------------
export type Balance = {
  balance: {
    address: string
  }
}

export type BalanceResponse = {
  balance: string
}

export type TokenInfo = {
  token_info: {}
}

export type TokenInfoResponse = {
  decimals: number
  name: string
  symbol: string
  total_supply: string
}

export enum ContractError {
  USER_DENIED = 'USER_DENIED',
  CREATE_TX_FAILED = 'CREATE_TX_FAILED',
  TX_FAILED = 'TX_FAILED',
  TIMEOUT = 'TIEMOUT',
  TX_UNSPECIFIED_ERROR = 'TX_UNSPECIFIED_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum TransactionError {
  PARSE_ERROR = 'PARSE_ERROR',
  // nonce is incorrect with the signature
  INVALID_SEQUENCE = 'INVALID_SEQUENCE',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  UNKNOWN_REQUEST = 'UNKNOWN_REQUEST',
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  INVALID_PUBKEY = 'INVALID_PUBKEY',
  UNKNOWN_ADDRESS = 'UNKNOWN_ADDRESS',
  INVALID_COINS = 'INVALID_COINS',
  OUT_OF_GAS = 'OUT_OF_GAS',
  MEMO_TOO_LARGE = 'MEMO_TOO_LARGE',
  INSUFFICIENT_FEE = 'INSUFFICIENT_FEE',
  MAX_SIGNATURES_REACHED = 'MAX_SIGNATURES_REACHED',
  NO_SIGNATURES = 'NO_SIGNATURES',
  FAILED_TO_ENCODE_JSON = 'FAILED_TO_ENCODE_JSON',
  FAILED_TO_DECODE_JSON = 'FAILED_TO_DECODE_JSON',
  // request contains invalid data
  INVALID_REQUEST = 'INVALID_REQUEST',
  TX_ALREADY_IN_MEMPOOL = 'TX_ALREADY_IN_MEMPOOL',
  MEMPOOL_FULL = 'MEMPOOL_FULL',
  TX_TOO_LARGE = 'TX_TOO_LARGE',
  KEY_NOT_FOUND = 'KEY_NOT_FOUND',
  INVALID_ACCOUNT_PASSWORD = 'INVALID_ACCOUNT_PASSWORD',
  TX_SIGNER_NOT_MATCH = 'TX_SIGNER_NOT_MATCH',
  INVALID_GAS_ADJUSTMENT = 'INVALID_GAS_ADJUSTMENT',
  INVALID_HEIGHT = 'INVALID_HEIGHT',
  INVALID_VERSION = 'INVALID_VERSION',
  INVALID_CHAIN_ID = 'INVALID_CHAIN_ID',
  INVALID_TYPE = 'INVALID_TYPE',
  TX_TIMEOUT_HEIGHT = 'TX_TIMEOUT_HEIGHT',
  UNKNOWN_EXTENSION_OPTIONS = 'INVALID_EXTENSION_OPTIONS',
  // account sequence in user info does not match real account sequence number
  INCORRECT_ACCOUNT_SEQUENCE = 'INVALID_ACCOUNT_SEQUENCE',
  PROTOBUF_PACKING_FAILED = 'PROTOBUF_PACKING_FAILED',
  PROTOBUG_UNPACKING_FAILED = 'PROTOBUF_UNPACKING_FAILED',
  // an invariant or assertion failed, this is a programmer error not user facing one
  INTERNAL_LOGIC_ERROR = 'INTERNAL_LOGIC_ERROR',
  // two goroutine try to access the same resource and one of them fail
  CONFLICT = 'CONFLICT',
  // we are calling a branch of a code not supported
  FEATURE_NOT_SUPPORTED = 'FEATURE_NOT_SUPPORTED',
  // requested entity does not exist in the state
  NOT_FOUND = 'NOT_FOUND',
  // could be DB or file writing error
  INTERNAL_IO_ERROR = 'INTERNAL_IO_ERROR',
  // required parameter in config is not set
  ERROR_IN_APP_TOML = 'ERROR_IN_APP_TOML',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export type TerraErrorMapping = {
  [codespace: string]: {
    [code: number]: TransactionError
  }
}

export type TerraError = TransactionError | ContractError
