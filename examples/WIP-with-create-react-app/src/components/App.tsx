import React from "react";
import { Box, Text, Heading, Link, Flex } from "@chakra-ui/react";

import { Layout } from "./Layout";

export function App() {
  return (
    <Layout>
      <Flex maxW="container.xl" mx="auto" justify="center">
        <Box bg="whiteAlpha.50" p="6" borderRadius="lg">
          <Heading mb="4">🧙‍♂️ Welcome ser!</Heading>

          <Text>
            Go checkout the{" "}
            <Link
              href="https://wizard-ui.com"
              isExternal
              textDecoration="underline"
            >
              docs
            </Link>
            . Or if you have questions{" "}
            <Link
              href="https://twitter.com/arthuryeti"
              isExternal
              textDecoration="underline"
            >
              send me a tweet
            </Link>
            .
          </Text>
        </Box>
      </Flex>
    </Layout>
  );
}
