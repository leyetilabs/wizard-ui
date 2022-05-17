import React from "react";
import { Box } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { Navbar } from "modules/common";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  if (isInitializing) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box flex="1" p="4">
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
