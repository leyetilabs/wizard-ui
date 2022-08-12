import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";

import type { WalletAdapter } from "./base";
import { BaseWalletAdapter } from "./base";

export abstract class BaseSignerWalletAdapter
  extends BaseWalletAdapter
  implements WalletAdapter
{
  abstract sendTransaction({
    signerAddress,
    messages,
    fee,
    memo,
  }: {
    signerAddress: string;
    messages: EncodeObject[];
    fee: number | StdFee | "auto";
    memo?: string;
  }): Promise<any>;

  abstract signTransaction({
    signerAddress,
    messages,
    fee,
    memo,
  }: {
    signerAddress: string;
    messages: EncodeObject[];
    fee: StdFee;
    memo: string;
  }): Promise<any>;
}
