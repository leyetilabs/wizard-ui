import React, { useState } from "react";
import type { FC, ReactNode } from "react";

import { WalletModalContext } from "../hooks";
import { WalletModal } from "./WalletModal";
import type { WalletModalProps } from "./WalletModal";

export interface WalletModalProviderProps extends WalletModalProps {
  children: ReactNode;
}

export const WalletModalProvider: FC<WalletModalProviderProps> = ({
  children,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
      <WalletModal {...props} />
    </WalletModalContext.Provider>
  );
};
