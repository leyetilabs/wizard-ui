import { useConnectedWallet } from "@terra-money/wallet-provider";

export const useAddress = () => {
  const connectedWallet = useConnectedWallet();
  return connectedWallet?.terraAddress ?? "";
};

export default useAddress;
