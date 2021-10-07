import { useCallback, useState, useMemo, useEffect } from "react";
import {
  Coins,
  Coin,
  MsgExecuteContract,
  CreateTxOptions,
} from "@terra-money/terra.js";
import {
  useWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError,
  Timeout,
} from "@terra-money/wallet-provider";
import { useMutation, useQuery } from "react-query";

import { useTerraWebapp } from "../context";
import { useAddress } from "./useAddress";
import useDebounceValue from "./useDebounceValue";

type Params = {
  msgs: MsgExecuteContract[];
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useTransaction = ({ msgs, onSuccess, onError }: Params) => {
  const { post } = useWallet();
  const address = useAddress();
  const { client } = useTerraWebapp();
  const debouncedMsgs = useDebounceValue(msgs, 200);

  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const [error, setError] = useState<any>(null);

  const { data: fee, isLoading: isEstimating } = useQuery(
    ["fee", debouncedMsgs],
    () => {
      setError(null);

      console.log("ouii 2");

      return client.tx.estimateFee(address, msgs, {
        gasPrices: new Coins([new Coin("uusd", 0.38)]),
        gasAdjustment: 1.2,
        feeDenoms: ["uusd"],
      });
    },
    {
      enabled: address != null && debouncedMsgs != null,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (e: any) => {
        setError(e.response.data.error);
      },
    }
  );

  const { mutate } = useMutation(
    (data: CreateTxOptions) => {
      return post(data);
    },
    {
      onMutate: () => {
        setIsBroadcasting(true);
      },
      onError: (e: unknown) => {
        setIsBroadcasting(false);

        if (e instanceof UserDenied) {
          setError("User Denied");
        } else if (e instanceof CreateTxFailed) {
          setError("Create Tx Failed: " + e.message);
        } else if (e instanceof TxFailed) {
          setError("Tx Failed: " + e.message);
        } else if (e instanceof Timeout) {
          setError("Timeout");
        } else if (e instanceof TxUnspecifiedError) {
          setError("Unspecified Error: " + e.message);
        } else {
          setError(
            "Unknown Error: " + (e instanceof Error ? e.message : String(e))
          );
        }

        onError?.(error);
      },
      onSuccess: (data) => {
        setTxHash(data.result.txhash);
        setResult(data);
      },
    }
  );

  const { data: txInfo } = useQuery(
    ["txInfo", txHash],
    () => {
      // @ts-expect-error
      return client.tx.txInfo(txHash);
    },
    {
      enabled: txHash != null,
      retry: true,
    }
  );

  const reset = () => {
    setIsBroadcasting(false);
    setResult(null);
    setError(null);
  };

  const submit = useCallback(async () => {
    if (fee == null || msgs == null || msgs.length < 1) {
      return;
    }

    setError(null);

    mutate({
      msgs,
      fee,
    });
  }, [msgs, fee, mutate]);

  const isReady = useMemo(() => {
    if (fee == null || msgs == null || isEstimating) {
      return false;
    }

    return msgs.length > 0;
  }, [fee, msgs, isEstimating]);

  useEffect(() => {
    if (txInfo != null && txHash != null) {
      setIsBroadcasting(false);
      if (txInfo.code) {
        onError?.(txHash);
      } else {
        onSuccess?.(txHash);
      }
    }
  }, [txInfo]);

  return {
    fee,
    submit,
    result,
    txHash,
    error,
    isEstimating,
    isReady,
    isBroadcasting,
    reset,
  };
};

export default useTransaction;
