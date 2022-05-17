import { useCallback, useEffect, useReducer } from "react";
import { LCDClient, TxInfo } from "@terra-money/terra.js";
import { useQuery } from "react-query";
import { useLCDClient, useWallet } from "@terra-money/wallet-provider";

import { estimateFee } from "../helpers";
import { useAddress } from ".";
import { Tx, TxState } from "../types";

enum ActionType {
  RESET = "RESET",
  ESTIMATING = "ESTIMATING",
  POSTING = "POSTING",
  POST_ERROR = "POST_ERROR",
  BROADCASTING = "BROADCASTING",
  BROADCAST_ERROR = "BROADCAST_ERROR",
  BROADCAST_SUCCESS = "BROADCAST_SUCCESS",
}

type Action =
  | { type: "RESET" }
  | { type: "POSTING" }
  | { type: "ESTIMATING" }
  | { type: "POST_ERROR"; txError: string }
  | { type: "BROADCASTING"; txHash: string }
  | { type: "BROADCAST_ERROR"; txHash: string; txInfo: TxInfo }
  | { type: "BROADCAST_SUCCESS"; txHash: string; txInfo: TxInfo };

const initialState = {
  txStep: "idle",
  txHash: undefined,
  txInfo: undefined,
  txError: undefined,
};

const reducer = (state: TxState, action: Action) => {
  switch (action.type) {
    case ActionType.RESET:
      return {
        ...state,
        ...initialState,
      };
    case ActionType.ESTIMATING:
      return {
        ...state,
        txStep: "estimating",
      };
    case ActionType.POSTING:
      return {
        ...state,
        txStep: "posting",
      };
    case ActionType.POST_ERROR:
      return {
        ...state,
        txStep: "postError",
        txError: action.txError,
      };
    case ActionType.BROADCASTING:
      return {
        ...state,
        txStep: "broadcasting",
        txHash: action.txHash,
      };
    case ActionType.BROADCAST_ERROR:
      return {
        ...state,
        txStep: "broadcastError",
        txHash: action.txHash,
        txInfo: action.txInfo,
      };
    case ActionType.BROADCAST_SUCCESS:
      return {
        ...state,
        txStep: "broadcastSuccess",
        txHash: action.txHash,
        txInfo: action.txInfo,
      };
    default:
      return state;
  }
};

const txInfoFetcher = async (
  txHash: string,
  lcd: LCDClient
): Promise<TxInfo> => {
  return lcd.tx.txInfo(txHash);
};

const TX_TIMEOUT_INTERVAL = 60 * 500;
const RETRY_COUNT = 30;

export function useTx(): Tx {
  const connectedWallet = useAddress();
  const { post: postTx } = useWallet();
  const lcdClient = useLCDClient();

  const [{ txStep, txInfo, txHash, txError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { data: txInfoData } = useQuery(
    ["tx-info", txHash],
    () => txInfoFetcher(txHash ?? "", lcdClient),
    {
      enabled: Boolean(txHash),
      retryDelay: TX_TIMEOUT_INTERVAL / RETRY_COUNT,
      retry: RETRY_COUNT,
    }
  );

  // Start listening to broadcast success
  useEffect(() => {
    if (txInfoData != null && txStep === "broadcasting") {
      if (txInfoData.code) {
        dispatch({
          type: ActionType.BROADCAST_ERROR,
          txHash: txInfoData.txhash,
          txInfo: txInfoData,
        });
      } else {
        dispatch({
          type: ActionType.BROADCAST_SUCCESS,
          txHash: txInfoData.txhash,
          txInfo: txInfoData,
        });
      }
    }
  }, [txStep, txInfoData, txHash, dispatch]);

  const canSubmit = txStep !== "broadcasting";

  const submit = useCallback(
    async ({ msgs }: any) => {
      if (!canSubmit || connectedWallet == null) {
        throw Error(`Invalid state for post ${txStep}`);
      }

      dispatch({ type: ActionType.ESTIMATING });

      const fee = await estimateFee({
        client: lcdClient,
        address: connectedWallet,
        msgs,
      });

      dispatch({ type: ActionType.POSTING });

      try {
        const res = await postTx({
          msgs,
          fee,
        });

        if (!res.success) {
          throw Error("Failed");
        }

        dispatch({
          type: ActionType.BROADCASTING,
          txHash: res.result.txhash,
        });
      } catch (err) {
        dispatch({
          type: ActionType.POST_ERROR,
          txError: "error",
        });
      }
    },
    [canSubmit, connectedWallet, lcdClient, txStep, dispatch, postTx]
  );

  const reset = useCallback(() => {
    dispatch({ type: ActionType.RESET });
  }, [dispatch]);

  return {
    submit,
    canSubmit,
    txStep,
    txInfo,
    txHash,
    txError,
    reset,
  };
}
