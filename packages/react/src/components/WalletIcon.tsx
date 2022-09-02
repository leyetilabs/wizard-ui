import React from "react";
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

import type { Wallet } from "../hooks";

export interface WalletIconProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: Wallet | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
  if (!wallet) {
    return null;
  }

  return (
    <img
      src={wallet.adapter.icon}
      alt={`${wallet.adapter.name} icon`}
      {...props}
    />
  );
};
