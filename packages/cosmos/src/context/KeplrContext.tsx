import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
} from "@cosmjs/cosmwasm-stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { Coin, StdFee } from "@cosmjs/amino";

declare global {
  interface Window extends KeplrWindow {}
}

export interface PostTxParams {
  contractAddress: string;
  msg: Record<string, unknown>;
  fee: number | StdFee | "auto";
  memo?: string;
  funds?: readonly Coin[];
}

type KeplrContextData = {
  cwClient: CosmWasmClient | SigningCosmWasmClient | null;
  address: string | undefined;
  connect(): Promise<void>;
  post(params: PostTxParams): Promise<ExecuteResult>;
};

const KeplrContext = createContext<KeplrContextData>({} as KeplrContextData);

const useKeplr = () => useContext(KeplrContext);

interface Props {
  children: React.ReactNode;
  chainId: string;
  endpoint: string;
  options?: SigningCosmWasmClientOptions;
}

function KeplrProvider({ children, chainId, endpoint, options }: Props) {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [cwClient, setCWClient] = useState<CosmWasmClient | null>(null);
  const senderAddress = useRef<string | undefined>(undefined);
  const scwClient = useRef<SigningCosmWasmClient | null>(null);
  // const [scwClient, setSCWClient] = useState<SigningCosmWasmClient | null>(
  //   null
  // );

  const init = useCallback(async () => {
    const clientCosmWasm = await CosmWasmClient.connect(endpoint);

    setCWClient(clientCosmWasm);
  }, []);

  const connect = useCallback(async () => {
    if (
      !window.getOfflineSigner ||
      !window.keplr ||
      !window.getOfflineSignerAuto
    ) {
      throw new Error();
    }

    try {
      await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const scw = await SigningCosmWasmClient.connectWithSigner(
        endpoint,
        offlineSigner,
        options
      );
      const accounts = await offlineSigner.getAccounts();

      scwClient.current = scw;
      senderAddress.current = accounts[0].address;
      setAddress(accounts[0].address);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const post = ({ contractAddress, msg, fee, memo, funds }: PostTxParams) => {
    // TODO: change to use useState
    if (scwClient.current == null || senderAddress.current == null) {
      throw new Error(
        "SigningCosmClient is not instantiated or address is not set"
      );
    }

    return scwClient.current.execute(
      senderAddress.current,
      contractAddress,
      msg,
      fee,
      memo,
      funds
    );
  };

  useEffect(() => {
    init();
    connect();
  }, []);

  const providerState: KeplrContextData = {
    cwClient,
    address,
    connect,
    post,
  };

  return (
    <KeplrContext.Provider value={providerState}>
      {children}
    </KeplrContext.Provider>
  );
}

export { useKeplr, KeplrProvider };
