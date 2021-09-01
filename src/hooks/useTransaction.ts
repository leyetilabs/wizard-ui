import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@terra-money/wallet-provider";
import { Coins, Coin, StdFee, MsgExecuteContract } from "@terra-money/terra.js";

import { useTerra } from "../TerraContext";
import { useAddress } from "./useAddress";

type Params = {
  msgs: MsgExecuteContract[];
  onSuccess?: (d: any) => void;
  onError?: (d: any) => void;
};

export const useTransaction = ({ msgs, onSuccess, onError }: Params) => {
  const { post } = useWallet();
  const address = useAddress();
  const { client } = useTerra();

  const [fee, setFee] = useState<StdFee | null>(null);
  const [result, setResult] = useState<any>(null);

  const [error, setError] = useState<string | null>(null);

  const getFee = useCallback(async () => {
    if (msgs == null || msgs.length < 1) {
      return;
    }

    setFee(null);
    setError(null);

    try {
      const data = await client.tx.estimateFee(address, msgs, {
        gasPrices: new Coins([new Coin("uusd", 0.15)]),
        feeDenoms: ["uusd"],
      });

      setFee(data);
    } catch (e) {
      setFee(null);
      setError("Error");
    }
  }, [address, client, msgs]);

  const reset = () => {
    setFee(null);
    setResult(null);
    setError(null);
  };

  const submit = useCallback(async () => {
    if (fee == null || msgs == null || msgs.length < 1) {
      return;
    }

    setError(null);

    try {
      const response = await post({
        msgs,
        fee,
      });

      setResult(response);
      onSuccess?.(response);
    } catch (e) {
      setFee(null);
      setError("Error");
      onError?.(e);
    }
  }, [post, msgs, fee]);

  useEffect(() => {
    getFee();
  }, [getFee]);

  const isReady = fee != null && msgs != null && msgs.length > 0;

  return {
    fee,
    submit,
    result,
    error,
    isReady,
    reset,
  };
};

export default useTransaction;
