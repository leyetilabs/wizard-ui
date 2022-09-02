import React from "react";
import type { FC, ReactNode } from "react";
import type { WalletError } from "@wizard-ui/core";

import { CWClientProvider } from "./CWClientProvider";
import { WalletModalProvider } from "./WalletModalProvider";
import { WalletProvider } from "./WalletProvider";

export interface WizardProviderProps {
  children: ReactNode;
  wallets: any[];
  endpoint: string;
  chainId?: string;
  autoConnect?: boolean;
  onError?: (error: WalletError) => void;
  localStorageKey?: string;
}

export const WizardProvider: FC<WizardProviderProps> = ({
  children,
  endpoint,
  ...rest
}) => {
  return (
    <CWClientProvider endpoint={endpoint}>
      <WalletProvider {...rest}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </CWClientProvider>
  );
};
