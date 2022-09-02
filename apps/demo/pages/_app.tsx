import React, { useMemo } from "react";
import { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeplrWalletAdapter, CosmostationWalletAdapter } from "@wizard-ui/core";
import { GasPrice } from "@cosmjs/stargate";
import { WizardProvider } from "@wizard-ui/react";

import "@wizard-ui/react/style.css";
import { Layout } from "modules/common";
import theme from "../theme";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => "https://rpc-test.osmosis.zone", []);
  const chainId = useMemo(() => "osmo-test-4", []);
  const wallets = useMemo(
    () => [
      new KeplrWalletAdapter({
        endpoint,
        chainId,
        options: {
          gasPrice: GasPrice.fromString("0.015uosmo"),
        },
      }),
      new CosmostationWalletAdapter({
        endpoint,
        chainId,
        chainName: "osmosis testnet",
        options: {
          gasPrice: GasPrice.fromString("0.015uosmo"),
        },
      }),
    ],
    [endpoint, chainId],
  );

  return (
    <ChakraProvider theme={theme}>
      <WizardProvider endpoint={endpoint} wallets={wallets} chainId={chainId}>
        <QueryClientProvider client={queryClient}>
          <CSSReset />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </WizardProvider>
    </ChakraProvider>
  );
};

export default MyApp;
