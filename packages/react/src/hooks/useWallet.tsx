import React, { createContext, useContext } from "react";
import type {
  BaseSignerWalletAdapter,
  WalletName,
  WalletReadyState,
} from "@wizard-ui/core";

export interface Wallet {
  adapter: any;
  readyState: WalletReadyState;
}

export interface WalletContextState {
  autoConnect: boolean;
  wallets: Wallet[];
  wallet: Wallet | null;
  publicKey: any | null;
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;

  select(walletName: WalletName): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  sendTransaction(
    transaction: any,
    connection: any,
    options?: any
  ): Promise<any>;

  signTransaction: BaseSignerWalletAdapter["signTransaction"] | undefined;
}

const EMPTY_ARRAY: ReadonlyArray<never> = [];

const DEFAULT_CONTEXT = {
  autoConnect: false,
  connecting: false,
  connected: false,
  disconnecting: false,
  select(_name: WalletName) {
    console.error(constructMissingProviderErrorMessage("get", "select"));
  },
  connect() {
    return Promise.reject(
      console.error(constructMissingProviderErrorMessage("get", "connect"))
    );
  },
  disconnect() {
    return Promise.reject(
      console.error(constructMissingProviderErrorMessage("get", "disconnect"))
    );
  },
  sendTransaction(_transaction: any, _connection: any, _options?: any) {
    return Promise.reject(
      console.error(
        constructMissingProviderErrorMessage("get", "sendTransaction")
      )
    );
  },
  signTransaction(_transaction: any) {
    return Promise.reject(
      console.error(
        constructMissingProviderErrorMessage("get", "signTransaction")
      )
    );
  },
} as WalletContextState;
Object.defineProperty(DEFAULT_CONTEXT, "wallets", {
  get() {
    console.error(constructMissingProviderErrorMessage("read", "wallets"));
    return EMPTY_ARRAY;
  },
});
Object.defineProperty(DEFAULT_CONTEXT, "wallet", {
  get() {
    console.error(constructMissingProviderErrorMessage("read", "wallet"));
    return null;
  },
});
Object.defineProperty(DEFAULT_CONTEXT, "publicKey", {
  get() {
    console.error(constructMissingProviderErrorMessage("read", "publicKey"));
    return null;
  },
});

function constructMissingProviderErrorMessage(
  action: string,
  valueName: string
) {
  return (
    "You have tried to " +
    ` ${action} "${valueName}"` +
    " on a WalletContext without providing one." +
    " Make sure to render a WalletProvider" +
    " as an ancestor of the component that uses " +
    "WalletContext"
  );
}

export const WalletContext = createContext<WalletContextState>(
  DEFAULT_CONTEXT as WalletContextState
);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
