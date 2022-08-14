import React, { FC } from "react";
import { useWallet, useWalletModal, WalletModalButton } from "@wizard-ui/react";
import { truncate } from "@wizard-ui/core";
import {
  HStack,
  Box,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDown as ChevronDownIcon, Bell as BellIcon } from "lucide-react";

export const CosmosWallet: FC = () => {
  const { setVisible } = useWalletModal();
  const { address, disconnect } = useWallet();

  if (address != null) {
    return (
      <Box>
        <HStack spacing="3">
          <IconButton
            aria-label="notifications"
            icon={<BellIcon size="1rem" />}
          />
          <Menu placement="bottom-end">
            <MenuButton as={Button} rightIcon={<ChevronDownIcon size="1rem" />}>
              {truncate(address)}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setVisible(true)}>
                Change wallet
              </MenuItem>
              <MenuItem onClick={disconnect}>Disconnect</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    );
  }

  return <WalletModalButton />;
};
