import React from "react";
import {
  WalletControllerChainOptions,
  getChainOptions,
  StaticWalletProvider,
  WalletProvider,
} from "@terra-money/wallet-provider";
import App, { AppProps, AppContext } from "next/app";
import { TerraProvider } from "@wizard-ui/terra";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "modules/common";
import theme from "../theme";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  pageProps,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) => {
  const main = (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <TerraProvider>
            <CSSReset />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </TerraProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );

  return typeof window !== "undefined" ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const chainOptions = await getChainOptions();
  return { ...appProps, ...chainOptions };
};

export default MyApp;
