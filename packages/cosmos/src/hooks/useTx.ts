import { useCallback, useReducer } from "react";

import { PostTxParams, useKeplr } from "../context";
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
  | { type: "BROADCAST_ERROR"; txHash: string; txInfo: any }
  | { type: "BROADCAST_SUCCESS"; txHash: string; txInfo: any };

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

// const txInfoFetcher = async (txHash: string, cwClient: any): Promise<any> => {
//   return cwClient.getTx(txHash);
// };

// const TX_TIMEOUT_INTERVAL = 60 * 500;
// const RETRY_COUNT = 30;

export function useTx(): Tx {
  const { post: postTx } = useKeplr();

  const [{ txStep, txInfo, txHash, txError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const { data: txInfoData } = useQuery(
  //   ["tx-info", txHash],
  //   () => txInfoFetcher(txHash ?? "", cwClient),
  //   {
  //     enabled: Boolean(txHash),
  //     retryDelay: TX_TIMEOUT_INTERVAL / RETRY_COUNT,
  //     retry: RETRY_COUNT,
  //   }
  // );

  // Start listening to broadcast success
  // useEffect(() => {
  //   if (txInfoData != null && txStep === "broadcasting") {
  //     if (txInfoData.code) {
  //       console.log("BROADCAST_ERROR");
  //       dispatch({
  //         type: ActionType.BROADCAST_ERROR,
  //         txHash: txInfoData.txhash,
  //         txInfo: txInfoData,
  //       });
  //     } else {
  //       console.log("BROADCAST_SUCCESS");
  //       dispatch({
  //         type: ActionType.BROADCAST_SUCCESS,
  //         txHash: txInfoData.txhash,
  //         txInfo: txInfoData,
  //       });
  //     }
  //   }
  // }, [txStep, txInfoData, txHash, dispatch]);

  const canSubmit = txStep !== "broadcasting";

  const submit = useCallback(
    async ({
      contractAddress,
      msg,
      funds,
    }: Pick<PostTxParams, "contractAddress" | "msg" | "funds">) => {
      if (!canSubmit) {
        throw Error(`Invalid state for post ${txStep}`);
      }
      dispatch({ type: ActionType.POSTING });

      try {
        const res = await postTx({ contractAddress, msg, fee: "auto", funds });

        if (!res.transactionHash) {
          throw Error("Failed");
        }

        dispatch({
          type: ActionType.BROADCAST_SUCCESS,
          txHash: res.transactionHash,
          txInfo: {},
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: ActionType.POST_ERROR,
          txError: "error",
        });
      }
    },
    [canSubmit, txStep, dispatch]
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
