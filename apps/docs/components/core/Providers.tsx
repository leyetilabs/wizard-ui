import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import theme from "../../theme";

type Props = {
  children?: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}
