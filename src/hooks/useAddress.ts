import { useConnectedWallet } from '@terra-money/wallet-provider'

/**
 * Wallet address of connected wallet
 * @returns string;
 */
export const useAddress = (): string => {
  const connectedWallet = useConnectedWallet()
  return connectedWallet?.terraAddress ?? ''
}

export default useAddress
