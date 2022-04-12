import React, { FC } from "react";
import { Flex, Box, HStack, Heading } from "@chakra-ui/react";

import TerraWallet from "./TerraWallet";

const Navbar: FC = () => {
  return (
    <Box p="4">
      <Flex justifyContent="space-between">
        <Box flex="1">
          <Heading>Terra Starter</Heading>
        </Box>
        <HStack flex="1" spacing="6" justify="flex-end">
          <TerraWallet />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
