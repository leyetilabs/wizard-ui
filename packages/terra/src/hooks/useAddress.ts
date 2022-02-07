import { useMemo } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";

/**
 * Wallet address of connected wallet
 * @returns string;
 */
export const useAddress = (): string | null => {
  const wallet = useConnectedWallet();

  return useMemo(() => {
    if (wallet == null) {
      return null;
    }

    return wallet.terraAddress;
  }, [wallet]);
};

export default useAddress;
