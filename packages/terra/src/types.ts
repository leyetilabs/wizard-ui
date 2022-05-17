import { TxInfo } from "@terra-money/terra.js";

export interface TxState {
  txStep: string;
  txHash: string | undefined;
  txInfo: TxInfo | undefined;
  txError: string | undefined;
}

type SubmitOptions = {
  msgs: any[];
};

export type Tx = {
  canSubmit: boolean;
  submit(params: SubmitOptions): Promise<void>;
  reset(): void;
} & TxState;

export type BalanceResponse = {
  balance: string;
};

export interface Action<T, P> {
  type: T;
  payload: P;
}
