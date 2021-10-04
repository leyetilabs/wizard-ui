import { useCallback, useEffect, useState, useMemo } from "react";
import {
  Coins,
  Coin,
  MsgExecuteContract,
  CreateTxOptions,
} from "@terra-money/terra.js";
import { useWallet, UserDenied, Timeout } from "@terra-money/wallet-provider";

import { useTerraWebapp } from "../context";
import { useAddress } from "./useAddress";
import { useMutation, useQuery } from "react-query";

type Params = {
  msgs: MsgExecuteContract[];
  onSuccess?: () => void;
  onError?: () => void;
};

export const useTransaction = ({ msgs, onSuccess, onError }: Params) => {
  const { post } = useWallet();
  const address = useAddress();
  const { client } = useTerraWebapp();

  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const { data: fee, isLoading: isEstimating } = useQuery(
    ["fee", msgs],
    () => {
      return client.tx.estimateFee(address, msgs, {
        gasPrices: new Coins([new Coin("uusd", 0.15)]),
        feeDenoms: ["uusd"],
      });
    },
    {
      enabled: address != null && msgs != null,
    }
  );

  const { data: txInfo } = useQuery(
    ["txInfo", txHash],
    () => {
      if (txHash == null) {
        return Promise.reject();
      }

      return client.tx.txInfo(txHash);
    },
    {
      enabled: txHash != null,
    }
  );

  const { mutate, isLoading: isPosting } = useMutation(
    (data: CreateTxOptions) => {
      return post(data);
    },
    {
      onMutate: () => {
        setIsBroadcasting(true);
      },
      onError: (error: any) => {
        setIsBroadcasting(false);

        if (error instanceof Timeout) {
          setError("Timeout");
        } else if (error instanceof UserDenied) {
          reset();
          setError("User Denied");
          onError?.();
        } else {
          setError(error);
          onError?.();
        }
      },
      onSuccess: (data) => {
        // Boom baby!
        setTxHash(data.result.txhash);
        setResult(data);
        onSuccess?.();
      },
      onSettled: () => {
        reset();
      },
    }
  );

  const reset = () => {
    setResult(null);
    setError(null);
    setIsBroadcasting(false);
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
    console.log("txInfo", txInfo);
  }, [txInfo]);

  useEffect(() => {
    console.log("txInfo", fee);
  }, [fee]);

  return {
    fee,
    submit,
    result,
    txHash,
    error,
    isEstimating,
    isReady,
    isPosting,
    isBroadcasting,
    reset,
  };
};

export default useTransaction;
