import { useMemo, useState } from "react";
import { Button, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { MsgExecuteContract, Coin } from "@terra-money/terra.js";
import {
  num,
  AmountWithSliderInput,
  formatAmount,
  NumberFormatSpecifier,
  AmountInput,
} from "@wizard-ui/react";
import { useAddress, useTerra } from "@wizard-ui/terra";

import { MinimalLineChart, Stat } from "modules/common";

export default function Web() {
  const address = useAddress();
  const { tx } = useTerra();
  const [vaultValue, setVaultValue] = useState(1.23);
  const [amount, setAmount] = useState("");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");

  const msgs = useMemo(() => {
    if (address == null) {
      return;
    }

    const amount = num(0.5).times(10 ** 6);

    const coins = [new Coin("uluna", amount.toNumber())];

    return [
      new MsgExecuteContract(
        address,
        "terra1udsua9w6jljwxwgwsegvt6v657rg3ayfvemupnes7lrggd28s0wq7g8azm",
        {
          swap: {
            max_spread: "0.1",
            offer_asset: {
              info: { native_token: { denom: "uluna" } },
              amount: amount.toString(),
            },
            belief_price: "0.005899736340782930",
          },
        },
        coins,
      ),
    ];
  }, [address]);

  const handleClick = () => {
    if (msgs == null) {
      return;
    }

    tx.submit({ msgs });
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
