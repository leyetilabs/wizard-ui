import React, { useMemo } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { KeplrWalletAdapter } from "@wizard-ui/core";
import { ConnectionProvider, WalletProvider } from "@wizard-ui/react";

import theme from "../../theme";

const queryClient = new QueryClient();

type Props = {
  children?: React.ReactNode;
};

export function Providers({ children }: Props) {
  const endpoint = useMemo(() => "https://pisco.dalnim.finance", []);
  const chainId = useMemo(() => "pisco-1", []);
  const wallets = useMemo(() => [new KeplrWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* <WalletProvider wallets={wallets} chainId={chainId} autoConnect> */}
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          {children}
        </ChakraProvider>
      </QueryClientProvider>
      {/* </WalletProvider> */}
    </ConnectionProvider>
  );
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <ChakraProvider theme={theme}>
  //       <CSSReset />
  //       {children}
  //     </ChakraProvider>
  //   </QueryClientProvider>
  // );
}
