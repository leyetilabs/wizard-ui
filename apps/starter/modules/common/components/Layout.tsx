import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { Navbar } from "modules/common";

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  if (isInitializing) {
    return null;
  }

  return (
    <Box>
      {!isInitializing && (
        <Flex direction="column" height="100%">
          <Navbar />
          <Box flex="1" p="4">
            {children}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Layout;
