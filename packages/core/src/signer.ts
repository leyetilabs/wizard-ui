import type { WalletAdapter } from "./base";
import { BaseWalletAdapter } from "./base";
import {
  WalletSendTransactionError,
  WalletSignTransactionError,
} from "./errors";

export abstract class BaseSignerWalletAdapter
  extends BaseWalletAdapter
  implements WalletAdapter
{
  async sendTransaction(
    transaction: any,
    connection: any,
    options: any = {}
  ): Promise<any> {
    let emit = true;
    try {
      try {
        transaction = {};

        const { signers, ...sendOptions } = options;
        signers?.length && transaction.partialSign(...signers);

        transaction = await this.signTransaction(transaction);

        const rawTransaction = transaction.serialize();

        return await connection.sendRawTransaction(rawTransaction, sendOptions);
      } catch (error: any) {
        // If the error was thrown by `signTransaction`, rethrow it and don't emit a duplicate event
        if (error instanceof WalletSignTransactionError) {
          emit = false;
          throw error;
        }
        throw new WalletSendTransactionError(error?.message, error);
      }
    } catch (error: any) {
      if (emit) {
        this.emit("error", error);
      }
      throw error;
    }
  }

  abstract signTransaction(transaction: any): Promise<any>;
}

export abstract class BaseMessageSignerWalletAdapter extends BaseSignerWalletAdapter {}
