import React, { useState, useCallback } from "react";
import { Box, SliderProps } from "@chakra-ui/react";

import { AmountInput } from "./AmountInput";
import { SliderInput } from "./SliderInput";
import { num } from "../helpers";

interface Props {
  max: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  sliderProps?: Omit<SliderProps, "value" | "onChange">;
}

export function AmountWithSliderInput({
  max,
  value,
  onChange,
  label,
  sliderProps,
}: Props) {
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = useCallback(
    (value: string) => {
      let newSliderVaue = num(value).div(max).toNumber();

      if (newSliderVaue > 1) {
        newSliderVaue = 1;
      }

      if (value == "") {
        newSliderVaue = 0;
      }

      setSliderValue(newSliderVaue);
      onChange(value);
    },
    [max]
  );

  const handleSliderChange = useCallback(
    (value: number) => {
      const newAmount = num(value).times(max).toNumber();

      onChange(newAmount.toString());
      setSliderValue(value);
    },
    [max]
  );

  return (
    <Box>
      <AmountInput
        label={label}
        value={value}
        onChange={handleChange}
        max={max}
        mb="4"
      />
      <SliderInput
        value={sliderValue}
        onChange={handleSliderChange}
        {...sliderProps}
      />
    </Box>
  );
}
