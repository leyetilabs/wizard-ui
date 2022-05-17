import React, { FC } from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { truncate } from "@wizard-ui/react";
import { useAddress } from "@wizard-ui/terra";
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

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, disconnect } = useWallet();
  const address = useAddress();

  if (status === WalletStatus.WALLET_CONNECTED && address != null) {
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
              <MenuItem onClick={disconnect}>Disconnect</MenuItem>
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

export default TerraWallet;
