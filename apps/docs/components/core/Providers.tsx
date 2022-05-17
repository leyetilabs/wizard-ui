import * as React from "react";
import { TerraProvider } from "@wizard-ui/terra";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from "../../theme";

const queryClient = new QueryClient();

type Props = {
  children?: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <TerraProvider>
          <CSSReset />
          {children}
        </TerraProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
