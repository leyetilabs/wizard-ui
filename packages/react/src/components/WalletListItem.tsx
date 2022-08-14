import type { FC, MouseEventHandler } from "react";
import { WalletReadyState } from "@wizard-ui/core";
import type { Wallet } from "@wizard-ui/react";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";

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
    <Button onClick={handleClick} tabIndex={tabIndex} width="full">
      <Flex justifyContent="space-between" alignItems="center" width="full">
        <HStack>
          <WalletIcon wallet={wallet} />
          <Text>{wallet.adapter.name}</Text>
        </HStack>
        {wallet.readyState === WalletReadyState.Installed && (
          <Text color="gray.700">Installed</Text>
        )}
      </Flex>
    </Button>
  );
};
