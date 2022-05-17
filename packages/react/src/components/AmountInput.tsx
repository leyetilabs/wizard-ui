import React from "react";
import { Box, Flex, Input, InputProps } from "@chakra-ui/react";
import { useRifm } from "rifm";

import {
  numberAccept,
  parseNumber,
  formatFloatingPointNumber,
  formatAmount,
  NumberFormatSpecifier,
  num,
} from "../helpers";

export type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  max?: string;
} & Omit<InputProps, "value" | "onChange">;

export function AmountInput({
  max,
  label,
  value,
  onChange,
  ...props
}: AmountInputProps) {
  const rifm = useRifm({
    accept: numberAccept,
    value,
    onChange: (value) => onChange(parseNumber(value)),
    format: (v) => formatFloatingPointNumber(v, 5),
  });

  return (
    <>
      <Flex justify="space-between" mb="2" color="gray.100" fontSize="sm">
        <Box>{label}</Box>
        {max != null && (
          <Box cursor="pointer" onClick={() => onChange(max)}>
            {formatAmount(max, {
              formatSpecifier: NumberFormatSpecifier.LARGE_NUMBER,
            })}
          </Box>
        )}
      </Flex>
      <Input
        type="tel"
        value={rifm.value}
        onChange={rifm.onChange}
        isInvalid={max != null ? num(value).gt(max) : false}
        {...props}
      />
    </>
  );
}
