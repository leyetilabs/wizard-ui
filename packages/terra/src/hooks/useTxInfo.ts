import { useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { useLCDClient } from "@terra-money/wallet-provider";
import useSWR from "swr";

type Params = {
  txHash: string | null;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useTxInfo = ({ txHash, onSuccess, onError }: Params) => {
  const client = useLCDClient();

  const { data, error } = useSWR(
    ["txInfoFromHook", txHash],
    () => {
      if (txHash == null) {
        return null;
      }

      return client.tx.txInfo(txHash);
    },
    {
      shouldRetryOnError: true,
      errorRetryInterval: 1000,
      dedupingInterval: 0,
      errorRetryCount: 5,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    if (data != null && txHash != null) {
      if (data.code) {
        onError?.(txHash, data);
      } else {
        onSuccess?.(txHash, data);
      }
    }
  }, [data, onError, onSuccess, txHash]);

  return {
    isLoading: !data && !error,
    txInfo: data,
  };
};

export default useTxInfo;
