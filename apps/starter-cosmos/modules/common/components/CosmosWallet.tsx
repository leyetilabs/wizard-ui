import React, { FC } from "react";
import { truncate } from "@wizard-ui/react";
import { useKeplr } from "@wizard-ui/cosmos";
import {
  HStack,
  useDisclosure,
  Box,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDown as ChevronDownIcon, Bell as BellIcon } from "lucide-react";

import ConnectWalletModal from "./ConnectWalletModal";

export const CosmosWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useKeplr();

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
              <MenuItem>Copy Address</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    );
  }

  return (
    <>
      <Button type="button" onClick={onOpen}>
        Connect wallet
      </Button>
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
