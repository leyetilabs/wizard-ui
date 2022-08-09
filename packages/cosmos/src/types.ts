import { PostTxParams } from "./context";

export interface TxState {
  txStep: string;
  txHash: string | undefined;
  txInfo: any | undefined;
  txError: string | undefined;
}

export type Tx = {
  canSubmit: boolean;
  submit(
    params: Pick<PostTxParams, "contractAddress" | "msg" | "funds">
  ): Promise<void>;
  reset(): void;
} & TxState;

export type BalanceResponse = {
  balance: string;
};

export interface Action<T, P> {
  type: T;
  payload: P;
}
