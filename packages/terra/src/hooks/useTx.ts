import { useMemo } from "react";
import { Fee, MsgExecuteContract, TxInfo } from "@terra-money/terra.js";
import {
  useWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  TxUnspecifiedError,
  Timeout,
} from "@terra-money/wallet-provider";

type Params = {
  onPosting?: () => void;
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useTx = ({ onPosting, onBroadcasting, onError }: Params) => {
  const { post } = useWallet();

  const submit = async ({
    msgs,
    fee,
  }: {
    msgs: MsgExecuteContract[];
    fee: Fee;
  }) => {
    if (fee == null || msgs == null || msgs.length < 1) {
      return;
    }

    onPosting?.();

    try {
      const res = await post({
        msgs,
        fee,
      });

      onBroadcasting?.(res.result.txhash);
    } catch (e) {
      let error = "UNKNOWN_ERROR";

      if (e instanceof UserDenied) {
        error = "USER_DENIED";
      } else if (e instanceof CreateTxFailed) {
        error = "CREATE_TX_FAILED";
      } else if (e instanceof TxFailed) {
        error = "TX_FAILED";
      } else if (e instanceof Timeout) {
        error = "TIMEOUT";
      } else if (e instanceof TxUnspecifiedError) {
        error = "TX_UNSPECIFIED_ERROR";
      } else {
        error = "UNKNOWN_ERROR";
      }

      onError?.(error);
    }
  };

  return useMemo(() => {
    return {
      submit,
    };
  }, [submit]);
};

export default useTx;
