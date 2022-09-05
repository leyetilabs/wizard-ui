import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeplrWalletAdapter, CosmostationWalletAdapter } from "@wizard-ui/core";
import { GasPrice } from "@cosmjs/stargate";
import { WizardProvider } from "@wizard-ui/react";
import "@wizard-ui/react/style.css";

import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

const MyApp = () => {
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
    new CosmostationWalletAdapter({
      endpoint,
      chainId,
      chainName: "osmosis testnet",
      options: {
        gasPrice: GasPrice.fromString("0.015uosmo"),
      },
    }),
  ];

  return (
    <ChakraProvider>
      <WizardProvider endpoint={endpoint} wallets={wallets} chainId={chainId}>
        <QueryClientProvider client={queryClient}>
          <CSSReset />
          <App />
        </QueryClientProvider>
      </WizardProvider>
    </ChakraProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
