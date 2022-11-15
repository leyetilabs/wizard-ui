import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useRifm } from "rifm";
import {
  numberAccept,
  parseNumber,
  formatFloatingPointNumber,
  formatAmount,
  NumberFormatSpecifier,
  num,
} from "@wizard-ui/core";
import { ChevronDown, Search } from "lucide-react";

import { SliderInput } from "modules/common";

interface Token {
  id: string;
  icon: string;
  name: string;
  description?: string;
  amount: number;
  price: number;
  isHighlighted?: boolean;
}

interface SelectTokenItemProps {
  token: Token;
  isActive: boolean;
  onClick: (id: string) => void;
}

function SelectTokenItem({ token, isActive, onClick }: SelectTokenItemProps) {
  return (
    <Button
      variant="unstyled"
      display="flex"
      textAlign="left"
      justifyContent="space-between"
      textTransform="none"
      onClick={() => onClick(token.id)}
      opacity={isActive ? "0.4" : "1"}
      w="full"
      isDisabled={isActive}
    >
      <HStack>
        <Image src={token.icon} boxSize="8" alt="Token Icon" />
        <Box>
          <Text>{token.name}</Text>
          <Text color="whiteAlpha.500" fontSize="sm">
            {token.description}
          </Text>
        </Box>
      </HStack>
      <Box textAlign="right">
        <Text>
          {formatAmount(token.amount, {
            formatSpecifier: NumberFormatSpecifier.APPROX_FLOAT,
          })}
        </Text>
        <Text color="whiteAlpha.500" fontSize="sm">
          {formatAmount(token.price, {
            formatSpecifier: NumberFormatSpecifier.FULL_CURRENCY,
          })}
        </Text>
      </Box>
    </Button>
  );
}

interface SelectTokenModalProps {
  tokens: Token[];
  value: string;
  isOpen: boolean;
  onChange: (id: string) => void;
  onClose: () => void;
}

function SelectTokenModal({
  tokens,
  value,
  isOpen,
  onChange,
  onClose,
}: SelectTokenModalProps) {
  const [searchedTokens, setSearchedTokens] = useState<Token[] | null>([]);

  const fuse = useMemo(() => {
    return new Fuse(tokens, {
      keys: ["name"],
    });
  }, [tokens]);

  console.log(searchedTokens);

  const handleSearchChange = (e: any) => {
    const newTokens = fuse.search(e.target.value).map((v) => v.item);
    setSearchedTokens(newTokens);
  };

  const renderTokens = () => {
    let tokensToRender = tokens;
    if (searchedTokens != null && searchedTokens.length > 0) {
      tokensToRender = searchedTokens;
    }

    return tokensToRender.map((token: Token) => {
      return (
        <SelectTokenItem
          key={token.id}
          token={token}
          isActive={value == token.id}
          onClick={onChange}
        />
      );
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup my="6">
            <InputRightElement pointerEvents="none">
              <Search size={16} />
            </InputRightElement>
            <Input
              placeholder="Search by token"
              onChange={handleSearchChange}
              _placeholder={{ color: "whiteAlpha.300" }}
            />
          </InputGroup>
          <VStack justify="auto" spacing="6">
            {renderTokens()}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

type TokenInputProps = {
  tokens: Token[];
  amountValue: string;
  tokenValue: string;
  onAmountChange: (value: string) => void;
  max: string;
  maxLabel?: string;
  onTokenChange?: (value: string) => void;
  withSlider?: boolean;
  isMulti?: boolean;
};

export function TokenInput({
  max,
  maxLabel = "Available",
  amountValue,
  tokenValue,
  tokens,
  withSlider = false,
  isMulti = false,
  onAmountChange,
  onTokenChange,
}: TokenInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sliderValue, setSliderValue] = useState(0);
  const rifm = useRifm({
    accept: numberAccept,
    value: amountValue,
    onChange: (value) => onAmountChange(parseNumber(value)),
    format: (v) => formatFloatingPointNumber(v, 5),
  });

  const tokenName = useMemo(() => {
    const token = tokens.find((t) => t.id == tokenValue);

    if (token == null) {
      return tokenValue;
    }

    return token.name;
  }, [tokens, tokenValue]);

  const tokenIcon = useMemo(() => {
    const token = tokens.find((t) => t.id == tokenValue);

    if (token == null) {
      return tokenValue;
    }

    return token.icon;
  }, [tokens, tokenValue]);

  const handleMaxButton = () => {
    const evt = { target: { value: max } } as ChangeEvent<HTMLInputElement>;
    rifm.onChange(evt);
  };

  const handleTokenChange = (id: string) => {
    onClose();
    onTokenChange?.(id);
  };

  const handleAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (withSlider) {
        let newSliderVaue = num(value).div(max).toNumber();

        if (newSliderVaue > 1) {
          newSliderVaue = 1;
        }

        if (value == "") {
          newSliderVaue = 0;
        }

        setSliderValue(newSliderVaue);
      }
      rifm.onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
    },
    [max, rifm, withSlider],
  );

  const handleSliderChange = useCallback(
    (value: number) => {
      const newAmount = num(value).times(max).toNumber();

      rifm.onChange({
        target: { value: newAmount.toString() },
      } as ChangeEvent<HTMLInputElement>);
      setSliderValue(value);
    },
    [max, rifm],
  );

  return (
    <Box>
      <Flex justify="flex-end" mb="2">
        <HStack fontSize="xs">
          <Text color="whiteAlpha.500">{maxLabel}</Text>
          <Box color="gray.100" cursor="pointer" onClick={handleMaxButton}>
            {formatAmount(max, {
              formatSpecifier: NumberFormatSpecifier.APPROX_FLOAT,
            })}
          </Box>
        </HStack>
      </Flex>
      <InputGroup>
        <InputLeftElement w="auto" pl="3">
          <Button
            display="inline-flex"
            color="white"
            fontSize="md"
            bg="none"
            _hover={{
              bg: "none",
            }}
            px="1"
            py="1"
            h="auto"
            leftIcon={<Image src={tokenIcon} boxSize="24px" alt="Token Icon" />}
            rightIcon={isMulti ? <ChevronDown size={16} /> : undefined}
            onClick={isMulti ? onOpen : undefined}
          >
            {tokenName ?? tokenValue}
          </Button>
        </InputLeftElement>
        <Input
          textAlign="right"
          color="white"
          type="tel"
          value={rifm.value}
          onChange={handleAmountChange}
          placeholder="1,000.00"
          _placeholder={{ color: "whiteAlpha.300" }}
          isInvalid={num(amountValue).gt(max)}
        />
      </InputGroup>
      {withSlider && (
        <Box mt="4">
          <SliderInput value={sliderValue} onChange={handleSliderChange} />
        </Box>
      )}
      <SelectTokenModal
        tokens={tokens}
        value={tokenValue}
        isOpen={isOpen}
        onChange={(v) => handleTokenChange(v)}
        onClose={onClose}
      />
    </Box>
  );
}

// Show total value in usd
