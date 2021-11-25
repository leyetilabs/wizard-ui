import { useConnectedWallet } from '@terra-money/wallet-provider'

/**
 * Wallet address of connected wallet
 * @returns string;
 */
export const useAddress = (): string => {
  const wallet = useConnectedWallet()
  return wallet?.terraAddress ?? ''
}

export default useAddress
