import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  pair: string;
};

const contracts: { [key: string]: any } = {
  mainnet: {
    pair: "",
  },
  testnet: {
    pair: "terra1mxy8lmf2jeyr7js7xvm046fssyfa5a9pm78fpn",
  },
};

export const useContracts = (): Contracts => {
  const {
    network: { name },
  } = useWallet();

  return useMemo(() => {
    return contracts[name];
  }, [name]);
};

export default useContracts;
