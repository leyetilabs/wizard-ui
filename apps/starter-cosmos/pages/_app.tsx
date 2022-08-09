import React from "react";
import { AppProps } from "next/app";
import { GasPrice } from "@cosmjs/stargate";
import { CosmosProvider, KeplrProvider } from "@wizard-ui/cosmos";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "modules/common";
import theme from "../theme";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const main = (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <CosmosProvider>
            <CSSReset />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CosmosProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );

  return (
    <KeplrProvider
      chainId="pisco-1"
      endpoint="https://pisco.dalnim.finance"
      options={{ gasPrice: GasPrice.fromString("0.025uluna") }}
    >
      {main}
    </KeplrProvider>
  );
};

export default MyApp;
