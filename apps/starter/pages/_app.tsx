import React, { useMemo } from "react";
import { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { KeplrWalletAdapter } from "@wizard-ui/core";
import {
  ConnectionProvider,
  WalletProvider,
  WalletModalProvider,
} from "@wizard-ui/react";

import { Layout } from "modules/common";
import theme from "../theme";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => "https://rpc-test.osmosis.zone", []);
  const chainId = useMemo(() => "osmo-test-4", []);
  const wallets = useMemo(
    () => [new KeplrWalletAdapter({ endpoint, chainId })],
    [endpoint, chainId],
  );

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <ChakraProvider theme={theme}>
  //       <CSSReset />
  //       <Layout>
  //         <Component {...pageProps} />
  //       </Layout>
  //     </ChakraProvider>
  //   </QueryClientProvider>
  // );
  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} chainId={chainId} autoConnect>
          <WalletModalProvider>
            <QueryClientProvider client={queryClient}>
              <CSSReset />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  );
};

export default MyApp;
