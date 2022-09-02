import { useState } from "react";
import { Button, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { NumberFormatSpecifier, formatAmount } from "@wizard-ui/core";
import { toUtf8 } from "@cosmjs/encoding";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { useWallet } from "@wizard-ui/react";

import {
  MinimalLineChart,
  Stat,
  AmountWithSliderInput,
  AmountInput,
} from "modules/common";

export default function Web() {
  const { address, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [vaultValue, setVaultValue] = useState(1.23);
  const [amount, setAmount] = useState("");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    const messages = [
      {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: MsgExecuteContract.fromPartial({
          sender: address,
          contract:
            "osmo12z0kqd9y28znzjk7pa8e0646nmhrctxnw0nj7265hzgazzml7uuqe88thx",
          msg: toUtf8(
            JSON.stringify({
              increase_allowance: {
                spender:
                  "osmo1wp2tmuuln0dvt7dtlgus06r2skt04esurfcz605ummrqga7ae5uqhuegt2",
                amount: "1000",
              },
            }),
          ),
        }),
      },
    ];

    await sendTransaction({
      signerAddress: address,
      messages,
      fee: "auto",
    });

    setIsLoading(false);
  };

  return (
    <SimpleGrid
      columns={3}
      gap="8"
      maxW="container.xl"
      mx="auto"
      alignItems="flex-start"
    >
      <Box bg="whiteAlpha.50" p="6" borderRadius="lg">
        <Text color="gray.100" mb="2" fontWeight={600}>
          Deposit
        </Text>

        <Text color="whiteAlpha.600" fontSize="sm" mb="6">
          Before you deposit, the vault needs your permission to invest your
          USDC in the vault’s strategy.
        </Text>

        <Box mb="8">
          <AmountWithSliderInput
            label="Amount"
            max="6"
            value={amount}
            onChange={setAmount}
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
          <Text color="gray.100" mb="2" fontWeight={600}>
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
        <Text color="gray.100" mb="2" fontWeight={600}>
          Provide Liquidity
        </Text>

        <Text color="whiteAlpha.600" fontSize="sm" mb="6">
          Before you deposit, the vault needs your permission to invest your
          USDC in the vault’s strategy.
        </Text>

        <Box mb="8">
          <AmountInput label="Amount" value={amount1} onChange={setAmount1} />
        </Box>

        <Box mb="8">
          <AmountInput
            label="Amount"
            value={amount2}
            onChange={setAmount2}
            max="12"
          />
        </Box>

        <Button
          type="button"
          size="xl"
          colorScheme="teal"
          onClick={handleClick}
          width="full"
        >
          Submit tx
        </Button>
      </Box>
    </SimpleGrid>
  );
}
