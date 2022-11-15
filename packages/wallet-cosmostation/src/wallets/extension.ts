import {
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
} from "@cosmjs/cosmwasm-stargate";
import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import {
  WalletName,
  scopePollingDetectionStrategy,
  WalletReadyState,
  BaseWalletAdapter,
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
} from "@wizard-ui/core";

interface CosmostationWallet extends SigningCosmWasmClient {
  address?: any;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

interface CosmostationWindow extends Window {
  cosmostation?: any;
}

declare const window: CosmostationWindow;

export interface CosmostationWalletAdapterConfig {
  endpoint: string;
  chainId: string;
  chainName: string;
  options?: SigningCosmWasmClientOptions;
}

export const CosmostationWalletName = "Cosmostation Wallet" as WalletName;

export class CosmostationWalletAdapter extends BaseWalletAdapter {
  name = CosmostationWalletName;
  url =
    "https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf?utm_source=chrome-ntp-icon";
  icon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDBIOEMzLjU4MTcyIDAgMCAzLjU4MTcyIDAgOFYyMEMwIDI0LjQxODMgMy41ODE3MiAyOCA4IDI4SDIwQzI0LjQxODMgMjggMjggMjQuNDE4MyAyOCAyMFY4QzI4IDMuNTgxNzIgMjQuNDE4MyAwIDIwIDBaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMjIuMDU1IDEyLjc1OEwxOC41NzggNi43MTAwMUwxMS44MjYgNi43MDAwMUw4LjQ0MDk4IDEyLjU0MUwxMS45MDkgMTguNTY5IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTUuNzk5OTkgMTUuMzg4TDkuMjc3OTkgMjEuNDMzTDE2LjAyOCAyMS40NDZMMTkuNDE1IDE1LjYwNEwxNS45NDcgOS41NzcwMyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";

  private _connecting: boolean;
  private _wallet: CosmostationWallet | null;
  private _chainId: string;
  private _chainName: string;
  private _endpoint: string;
  private _options: SigningCosmWasmClientOptions | undefined;
  private _address: any | null;
  private _readyState: WalletReadyState =
    typeof window === "undefined" || typeof document === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected;

  constructor(config: CosmostationWalletAdapterConfig) {
    super();
    this._connecting = false;
    this._wallet = null;
    this._address = null;
    this._chainName = config.chainName;
    this._chainId = config.chainId;
    this._endpoint = config.endpoint;
    this._options = config.options;

    if (this._readyState !== WalletReadyState.Unsupported) {
      scopePollingDetectionStrategy(() => {
        if (window?.cosmostation) {
          this._readyState = WalletReadyState.Installed;
          this.emit("readyStateChange", this._readyState);
          return true;
        }
        return false;
      });
    }
  }

  get address(): any | null {
    return this._address;
  }

  get connecting(): boolean {
    return this._connecting;
  }

  get connected(): boolean {
    return !!this._address;
  }

  get readyState(): WalletReadyState {
    return this._readyState;
  }

  get signingClient(): SigningCosmWasmClient | null {
    return this._wallet;
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;
      if (this._readyState !== WalletReadyState.Installed)
        throw new WalletNotReadyError();

      this._connecting = true;

      let wallet = null;
      let accounts = null;

      const { getOfflineSigner } = await import("@cosmostation/cosmos-client");

      try {
        // @TODO: Use the cosmostation package instead of the browser API
        await window.cosmostation.cosmos.request({
          method: "cos_requestAccount",
          params: { chainName: this._chainName },
        });

        const offlineSigner = await getOfflineSigner(this._chainId);

        accounts = await offlineSigner.getAccounts();

        // Initialize the gaia api with the offline signer that is injected by Cosmostation extension.
        wallet = await SigningCosmWasmClient.connectWithSigner(
          this._endpoint,
          offlineSigner,
          this._options
        );
      } catch (error: any) {
        throw new WalletConnectionError(error?.message, error);
      }
      if (accounts.length == 0) throw new WalletAccountError();

      let address: any;
      try {
        address = accounts[0].address;
      } catch (error: any) {
        throw new WalletPublicKeyError(error?.message, error);
      }

      this._wallet = wallet as CosmostationWallet;
      this._address = address;

      this.emit("connect", address);
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
      this._address = null;

      try {
        await wallet.disconnect();
      } catch (error: any) {
        this.emit("error", new WalletDisconnectionError(error?.message, error));
      }
    }

    this.emit("disconnect");
  }

  async sendTransaction({
    signerAddress,
    messages,
    fee,
    memo,
  }: {
    signerAddress: string;
    messages: EncodeObject[];
    fee: number | StdFee | "auto";
    memo?: string;
  }): Promise<any> {
    try {
      const wallet = this._wallet;
      if (!wallet) throw new WalletNotConnectedError();

      try {
        return await wallet.signAndBroadcast(
          signerAddress,
          messages,
          fee,
          memo
        );
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

  private _disconnected = () => {
    const wallet = this._wallet;
    if (wallet) {
      // wallet.off("disconnect", this._disconnected);

      this._wallet = null;
      this._address = null;

      this.emit("error", new WalletDisconnectedError());
      this.emit("disconnect");
    }
  };
}
