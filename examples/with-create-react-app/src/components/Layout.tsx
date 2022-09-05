import React from "react";
import { Box } from "@chakra-ui/react";

import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <Box>
      <Navbar />
      <Box flex="1" p="4">
        {children}
      </Box>
    </Box>
  );
}
