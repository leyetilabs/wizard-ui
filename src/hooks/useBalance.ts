import { useQuery } from 'react-query'
import { Coins } from '@terra-money/terra.js'

import { useAddress } from '../hooks/useAddress'
import { useTerraWebapp } from '../context'
import { BalanceResponse } from '../types'

function isBalanceResponse(
  value: BalanceResponse | [Coins],
): value is BalanceResponse {
  return value.hasOwnProperty('balance')
}

/**
 *
 * @param token - contract address or native denom
 * @param contractAddress - override connected wallet address
 * @returns string;
 */
export const useBalance = (
  token: string,
  contractAddress?: string,
): string | null => {
  const { client } = useTerraWebapp()
  const terraAddress = useAddress()
  const address = contractAddress ?? terraAddress

  // TODO: Fix type to have Coins and Balance
  const { data, isLoading } = useQuery<
    unknown,
    unknown,
    BalanceResponse | [Coins]
  >(['balance', token, address], () => {
    // TODO: isNativeToken function
    if (token.startsWith('u')) {
      return client.bank.balance(address)
    }

    return client.wasm.contractQuery(token, {
      balance: {
        address,
      },
    })
  })

  if (isLoading) {
    return '0'
  }

  if (data == null) {
    return null
  }

  if (isBalanceResponse(data)) {
    return data.balance
  }

  return data[0].get(token)?.amount.toString() ?? null
}

export default useBalance
