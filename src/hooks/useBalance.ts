import { useQuery } from "react-query";

import useAddress from "../hooks/useAddress";
import { useTerraWebapp } from "../context";
import { isNativeToken } from "../asset";

/**
 *
 * @param token - contract address or native denom
 * @param contractAddress - override connected wallet address
 * @returns string;
 */
export const useBalance = (token: string, contractAddress?: string) => {
  const { client } = useTerraWebapp();
  const terraAddress = useAddress();
  const address = contractAddress ?? terraAddress;

  // TODO: Fix type to have Coins and Balance
  const { data, isLoading } = useQuery<any>(["balance", token, address], () => {
    if (isNativeToken(token)) {
      return client.bank.balance(address);
    }

    return client.wasm.contractQuery(token, {
      balance: {
        address,
      },
    });
  });

  if (isLoading || data == null) {
    return "0";
  }

  if (data.balance) {
    return data.balance;
  }

  return data.get(token)?.amount.toString();
};

export default useBalance;
