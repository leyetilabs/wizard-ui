import { useMemo } from "react";
import { Coins, Coin, MsgExecuteContract } from "@terra-money/terra.js";
import { useLCDClient } from "@terra-money/wallet-provider";
import useSWR from "swr";

import useAddress from "./useAddress";

type Params = {
  msgs: MsgExecuteContract[] | null;
  gasAdjustment?: number;
};

export const useEstimateFee = ({ msgs, gasAdjustment = 1.2 }: Params) => {
  const address = useAddress();
  const client = useLCDClient();

  const { data, error } = useSWR(
    ["fee", msgs],
    async () => {
      if (msgs == null || error != null || address == null) {
        throw new Error("Msgs is null or Error is not null");
      }

      const txOptions = {
        msgs,
        gasPrices: new Coins([new Coin("uusd", 0.15)]),
        gasAdjustment,
        feeDenoms: ["uusd"],
      };

      const accountInfo = await client.auth.accountInfo(address);

      return client.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.getSequenceNumber(),
            publicKey: accountInfo.getPublicKey(),
          },
        ],
        txOptions
      );
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(() => {
    return {
      fee: data,
      isLoading: !error && !data,
      error,
    };
  }, [data, error]);
};

export default useEstimateFee;
