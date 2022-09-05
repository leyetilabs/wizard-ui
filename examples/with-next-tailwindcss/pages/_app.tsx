import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeplrWalletAdapter } from "@wizard-ui/core";
import { GasPrice } from "@cosmjs/stargate";
import { WizardProvider } from "@wizard-ui/react";
import "@wizard-ui/react/style.css";

import "../styles/globals.css";
import { Layout } from "../components/Layout";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  // You can also provide a custom RPC endpoint
  const endpoint = "https://rpc-test.osmosis.zone";
  const chainId = "osmo-test-4";
  const wallets = [
    new KeplrWalletAdapter({
      endpoint,
      chainId,
      options: {
        gasPrice: GasPrice.fromString("0.015uosmo"),
      },
    }),
  ];

  return (
    <WizardProvider endpoint={endpoint} wallets={wallets} chainId={chainId}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </WizardProvider>
  );
};

export default MyApp;
