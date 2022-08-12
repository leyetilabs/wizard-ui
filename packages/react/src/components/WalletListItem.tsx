import React from "react";
import type { FC, MouseEventHandler } from "react";
import { WalletReadyState } from "@wizard-ui/core";
import type { Wallet } from "@wizard-ui/react";
import {
  Button,
  ModalOverlay,
  Text,
  HStack,
  ModalContent,
  Flex,
  ModalBody,
  Heading,
  chakra,
} from "@chakra-ui/react";

import { WalletIcon } from "./WalletIcon";

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({
  handleClick,
  tabIndex,
  wallet,
}) => {
  return (
    <Button
      onClick={handleClick}
      leftIcon={<WalletIcon wallet={wallet} />}
      tabIndex={tabIndex}
    >
      {wallet.adapter.name}
      {wallet.readyState === WalletReadyState.Installed && (
        <span>Detected</span>
      )}
    </Button>
  );
};
