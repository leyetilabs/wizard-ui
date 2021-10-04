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

type TerraWebapp = {
  network: NetworkInfo;
  client: LCDClient;
};

export const TerraWebappContext: Context<TerraWebapp | undefined> =
  createContext<TerraWebapp | undefined>(undefined);

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
