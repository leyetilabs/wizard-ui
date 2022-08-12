import React from "react";
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";
import { Image } from "@chakra-ui/react";

import type { Wallet } from "../hooks";

export interface WalletIconProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: Wallet | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
  return (
    wallet && (
      <Image
        src={wallet.adapter.icon}
        alt={`${wallet.adapter.name} icon`}
        boxSize="1.5rem"
        {...props}
      />
    )
  );
};
