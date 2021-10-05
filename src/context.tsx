import {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
} from "react";
import { LCDClient } from "@terra-money/terra.js";
import { useWallet, NetworkInfo } from "@terra-money/wallet-provider";

const DEFAULT_NETWORK = {
  name: "mainnet",
  chainID: "colombus-5",
  lcd: "https://lcd.terra.dev",
};

type TerraWebapp = {
  network: NetworkInfo;
  client: LCDClient;
};

export const TerraWebappContext: Context<TerraWebapp> =
  createContext<TerraWebapp>({
    network: DEFAULT_NETWORK,
    client: new LCDClient({
      URL: DEFAULT_NETWORK.lcd,
      chainID: DEFAULT_NETWORK.chainID,
    }),
  });

type Props = {
  children: ReactNode;
};

export const TerraWebappProvider: FC<Props> = ({ children }) => {
  const { network } = useWallet();

  const client = useMemo(() => {
    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    });
  }, [network]);

  return (
    <TerraWebappContext.Provider
      value={{
        network,
        client,
      }}
    >
      {children}
    </TerraWebappContext.Provider>
  );
};

export function useTerraWebapp(): TerraWebapp {
  return useContext(TerraWebappContext);
}

export const TerraWebappConsumer: Consumer<TerraWebapp> =
  TerraWebappContext.Consumer;
