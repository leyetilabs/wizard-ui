import { useState } from "react";
import {
  Button,
  Box,
  Text,
  SimpleGrid,
  createStylesContext,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { NumberFormatSpecifier, formatAmount } from "@wizard-ui/core";
import { toUtf8 } from "@cosmjs/encoding";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { useWallet } from "@wizard-ui/react";

import {
  MinimalLineChart,
  Stat,
  AmountWithSliderInput,
  TokenInput,
} from "modules/common";

interface Props {
  assets: any[];
  totalSupply: number;
}

export function ProvideLiquidity({ assets, totalSupply }: Props) {
  const { address, signingClient } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [vaultValue, setVaultValue] = useState(1.23);
  const [amount, setAmount] = useState("");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [token1, setToken1] = useState("uxprt");
  const [token2, setToken2] = useState("uluna");

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
    <Box>
      <Box mb="8">
        <TokenInput
          tokens={tokens}
          tokenValue={token1}
          amountValue={amount1}
          onAmountChange={setAmount1}
          onTokenChange={setToken1}
          withSlider
          max="12000"
        />
      </Box>

      <Box mb="8">
        <TokenInput
          tokens={tokens}
          tokenValue={token2}
          amountValue={amount2}
          onAmountChange={setAmount2}
          onTokenChange={setToken2}
          max="12"
        />
      </Box>

      <Button
        colorScheme="teal"
        type="button"
        size="xl"
        w="full"
        onClick={() => console.log("sds")}
      >
        Provide Liquidity
      </Button>
    </Box>
  );
}
