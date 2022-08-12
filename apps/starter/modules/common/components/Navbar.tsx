import React from "react";
import { Flex, Box, HStack, Text } from "@chakra-ui/react";

import { CosmosWallet } from "./CosmosWallet";

export function Navbar() {
  return (
    <Flex
      backdropFilter="blur(40px)"
      position="sticky"
      height="80px"
      top="0"
      align="center"
      px="10"
      zIndex="10"
      justify="space-between"
      borderBottom="1px solid #1c1c22"
      _before={{
        bg: "rgba(255, 255, 255, 0.01)",
        w: "full",
        h: "full",
        content: '" "',
        left: "0",
        position: "absolute",
      }}
    >
      <Box flex="1">
        <Text color="white">Cosmos</Text>
      </Box>
      <HStack flex="1" spacing="6" justify="flex-end">
        <CosmosWallet />
      </HStack>
    </Flex>
  );
}
