import { Keplr as WindowKeplr } from "@keplr-wallet/types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";

import {
  EventEmitter,
  SendTransactionOptions,
  WalletName,
  scopePollingDetectionStrategy,
  WalletReadyState,
} from "../base";
import { BaseMessageSignerWalletAdapter } from "../signer";
import {
  WalletAccountError,
  WalletConnectionError,
  WalletDisconnectedError,
  WalletDisconnectionError,
  WalletError,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletPublicKeyError,
  WalletSendTransactionError,
  WalletSignTransactionError,
} from "../errors";

interface KeplrWalletEvents {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
}

interface KeplrWallet extends SigningCosmWasmClient {
  publicKey?: any;
  signTransaction(transaction: any): Promise<any>;
  signAllTransactions(transactions: any[]): Promise<any[]>;
  signAndSendTransaction(
    transaction: any,
    options?: any
  ): Promise<{ signature: any }>;
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

interface KeplrWindow extends Window {
  keplr?: WindowKeplr;
}

declare const window: KeplrWindow;

export interface KeplrWalletAdapterConfig {
  endpoint: string;
  chainId: string;
}

export const KeplrWalletName = "Keplr Wallet" as WalletName;

export class KeplrWalletAdapter extends BaseMessageSignerWalletAdapter {
  name = KeplrWalletName;
  url =
    "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad";
  icon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSI1MTIiIHI9IjUxMiIgZmlsbD0iIzAwNTJGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1MiA1MTJDMTUyIDcxMC44MjMgMzEzLjE3NyA4NzIgNTEyIDg3MkM3MTAuODIzIDg3MiA4NzIgNzEwLjgyMyA4NzIgNTEyQzg3MiAzMTMuMTc3IDcxMC44MjMgMTUyIDUxMiAxNTJDMzEzLjE3NyAxNTIgMTUyIDMxMy4xNzcgMTUyIDUxMlpNNDIwIDM5NkM0MDYuNzQ1IDM5NiAzOTYgNDA2Ljc0NSAzOTYgNDIwVjYwNEMzOTYgNjE3LjI1NSA0MDYuNzQ1IDYyOCA0MjAgNjI4SDYwNEM2MTcuMjU1IDYyOCA2MjggNjE3LjI1NSA2MjggNjA0VjQyMEM2MjggNDA2Ljc0NSA2MTcuMjU1IDM5NiA2MDQgMzk2SDQyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";

  private _connecting: boolean;
  private _wallet: KeplrWallet | null;
  private _chainId: string;
  private _endpoint: string;
  private _publicKey: any | null;
  private _readyState: WalletReadyState =
    typeof window === "undefined" || typeof document === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected;

  constructor(config: KeplrWalletAdapterConfig) {
    super();
    this._connecting = false;
    this._wallet = null;
    this._publicKey = null;
    this._chainId = config.chainId;
    this._endpoint = config.endpoint;

    if (this._readyState !== WalletReadyState.Unsupported) {
      scopePollingDetectionStrategy(() => {
        if (window?.keplr) {
          this._readyState = WalletReadyState.Installed;
          this.emit("readyStateChange", this._readyState);
          return true;
        }
        return false;
      });
    }
  }

  get publicKey(): any | null {
    return this._publicKey;
  }

  get connecting(): boolean {
    return this._connecting;
  }

  get connected(): boolean {
    return !!this._publicKey;
  }

  get readyState(): WalletReadyState {
    return this._readyState;
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;
      if (this._readyState !== WalletReadyState.Installed)
        throw new WalletNotReadyError();

      this._connecting = true;

      let wallet = null;
      let accounts = null;

      try {
        await window.keplr!.enable(this._chainId);

        const offlineSigner = window.keplr!.getOfflineSigner(this._chainId);

        accounts = await offlineSigner.getAccounts();

        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        wallet = await SigningCosmWasmClient.connectWithSigner(
          this._endpoint,
          offlineSigner
        );
      } catch (error: any) {
        throw new WalletConnectionError(error?.message, error);
      }
      if (accounts.length == 0) throw new WalletAccountError();

      let publicKey: any;
      try {
        publicKey = accounts[0].address;
      } catch (error: any) {
        throw new WalletPublicKeyError(error?.message, error);
      }

      this._wallet = wallet as KeplrWallet;
      this._publicKey = publicKey;

      this.emit("connect", publicKey);
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    const wallet = this._wallet;
    if (wallet) {
      // wallet.off("disconnect", this._disconnected);

      this._wallet = null;
      this._publicKey = null;

      try {
        await wallet.disconnect();
      } catch (error: any) {
        this.emit("error", new WalletDisconnectionError(error?.message, error));
      }
    }

    this.emit("disconnect");
  }

  async sendTransaction(
    transaction: any,
    connection: any,
    options: any = {}
  ): Promise<any> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        transaction = {};

        const { signers, ...sendOptions } = options;
        signers?.length && transaction.partialSign(...signers);

        sendOptions.preflightCommitment || connection.commitment;

        const { signature } = await wallet.signAndSendTransaction(
          transaction,
          sendOptions
        );
        return signature;
      } catch (error: any) {
        if (error instanceof WalletError) throw error;
        throw new WalletSendTransactionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async signTransaction({
    signerAddress,
    messages,
    fee,
    memo,
  }: {
    signerAddress: string;
    messages: EncodeObject[];
    fee: StdFee;
    memo: string;
  }): Promise<any> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        return await wallet.sign(signerAddress, messages, fee, memo);
      } catch (error: any) {
        throw new WalletSignTransactionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async signAllTransactions(transactions: any[]): Promise<any[]> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        return (await wallet.signAllTransactions(transactions)) || transactions;
      } catch (error: any) {
        throw new WalletSignTransactionError(error?.message, error);
      }
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  private _disconnected = () => {
    const wallet = this._wallet;
    if (wallet) {
      // wallet.off("disconnect", this._disconnected);

      this._wallet = null;
      this._publicKey = null;

      this.emit("error", new WalletDisconnectedError());
      this.emit("disconnect");
    }
  };
}
