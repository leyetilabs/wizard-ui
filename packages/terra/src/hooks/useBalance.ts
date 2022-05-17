import { Coins } from "@terra-money/terra.js";
import { useLCDClient } from "@terra-money/wallet-provider";
import BigNumber from "bignumber.js";
import { useQuery } from "react-query";

import { useAddress } from "../hooks/useAddress";
import { BalanceResponse } from "../types";

function isBalanceResponse(
  value: BalanceResponse | [Coins]
): value is BalanceResponse {
  return value.hasOwnProperty("balance");
}

/**
 *
 * @param token - contract address or native denom
 * @param contractAddress - override connected wallet address
 * @returns string;
 */
export const useBalance = (
  token: string,
  contractAddress?: string
): BigNumber.Value | null => {
  const client = useLCDClient();
  const terraAddress = useAddress();
  const address = contractAddress ?? terraAddress;

  // TODO: Fix type to have Coins and Balance
  const { data, error } = useQuery(["balance", token, address], () => {
    if (address == null) {
      throw new Error("Error in fetching balance");
    }

    // TODO: isNativeToken function
    if (token.startsWith("u")) {
      return client.bank.balance(address);
    }

    return client.wasm.contractQuery(token, {
      balance: {
        address,
      },
    });
  });

  if (!error && !data) {
    return null;
  }

  if (data == null) {
    return null;
  }

  // @ts-expect-error
  if (isBalanceResponse(data)) {
    return data.balance;
  }

  // @ts-expect-error
  return data[0].get(token)?.amount.toString() ?? null;
};

export default useBalance;
