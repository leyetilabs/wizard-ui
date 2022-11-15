import { useState } from "react";
import { Button, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { NumberFormatSpecifier, formatAmount } from "@wizard-ui/core";
import { useWallet } from "@wizard-ui/react";

import {
  MinimalLineChart,
  Stat,
  ProvideLiquidity,
  TokenInput,
} from "modules/common";

export default function Web() {
  const { address, signingClient } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [vaultValue, setVaultValue] = useState(1.23);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("uxprt");
  const [amount2, setAmount2] = useState("");

  const handleClick = async () => {
    setIsLoading(true);

    await signingClient?.execute(
      address,
      "osmo12z0kqd9y28znzjk7pa8e0646nmhrctxnw0nj7265hzgazzml7uuqe88thx",
      {
        increase_allowance: {
          spender:
            "osmo1wp2tmuuln0dvt7dtlgus06r2skt04esurfcz605ummrqga7ae5uqhuegt2",
          amount: "1000",
        },
      },
      "auto",
    );

    setIsLoading(false);
  };

  const tokens = [
    {
      id: "uluna",
      icon: "/icons/luna.png",
      name: "LUNA",
      description: "Terra Luna",
      amount: 320,
      price: 0.22,
    },
    {
      id: "uxprt",
      icon: "/icons/xprt.svg",
      name: "XPRT",
      description: "Persistence",
      amount: 1000,
      price: 1.2,
      isHighlighted: true,
    },
  ];

  return (
    <SimpleGrid
      columns={3}
      gap="8"
      maxW="container.xl"
      mx="auto"
      alignItems="flex-start"
    >
      <Box bg="whiteAlpha.50" p="6" borderRadius="lg">
        <Text
          color="gray.100"
          fontWeight="600"
          mb="2"
          fontSize="lg"
          fontFamily="heading"
        >
          Deposit
        </Text>

        <Text color="whiteAlpha.600" fontSize="sm" mb="6">
          Before you deposit, the vault needs your permission to invest your
          USDC in the vault’s strategy.
        </Text>

        <Box mb="8">
          <TokenInput
            tokens={tokens}
            tokenValue={token}
            amountValue={amount}
            onAmountChange={setAmount}
            onTokenChange={setToken}
            max="121222"
            withSlider
            isMulti
          />
        </Box>

        <Button
          type="button"
          size="xl"
          colorScheme="teal"
          onClick={handleClick}
          width="full"
          isLoading={isLoading}
        >
          Submit tx
        </Button>
      </Box>

      <Box bg="whiteAlpha.50" borderRadius="lg">
        <Box px="6" pt="6" pb="4">
          <Text
            color="gray.100"
            fontWeight="600"
            mb="2"
            fontSize="lg"
            fontFamily="heading"
          >
            Vault Performance
          </Text>

          <Text color="whiteAlpha.600" fontSize="sm" mb="6">
            T-yvUSDC-P-ETH earns yield on its USDC deposits by running a weekly
            automated ETH put-selling strategy
          </Text>

          <Stat
            label="Yield (cumulative)"
            value={formatAmount(vaultValue, {
              formatSpecifier: NumberFormatSpecifier.DEFAULT_PERCENTAGE,
            })}
          />
        </Box>

        <MinimalLineChart
          onHover={setVaultValue}
          onLeave={() => setVaultValue(1.23)}
        />
      </Box>

      <Box bg="whiteAlpha.50" p="6" borderRadius="lg">
        <Text
          color="gray.100"
          fontWeight="600"
          mb="2"
          fontSize="lg"
          fontFamily="heading"
        >
          Provide Liquidity
        </Text>

        <Text color="whiteAlpha.600" fontSize="sm" mb="6">
          Before you deposit, the vault needs your permission to invest your
          USDC in the vault’s strategy.
        </Text>

        {/* <ProvideLiquidity /> */}
      </Box>
    </SimpleGrid>
  );
}
