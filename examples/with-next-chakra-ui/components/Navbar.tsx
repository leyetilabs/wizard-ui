import React from "react";
import { Flex, Box, HStack, Text } from "@chakra-ui/react";
import { WalletButton } from "@wizard-ui/react";

export function Navbar() {
  return (
    <Flex
      position="sticky"
      height="80px"
      top="0"
      align="center"
      px="10"
      zIndex="10"
      justify="space-between"
      borderBottomWidth="1px"
      borderBottomColor="gray.700"
    >
      <Box flex="1">
        <Text color="white">Wizard UI</Text>
      </Box>
      <HStack flex="1" spacing="6" justify="flex-end">
        <WalletButton />
      </HStack>
    </Flex>
  );
}
