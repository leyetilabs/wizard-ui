import React, { useState } from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Flex,
  SliderProps,
} from "@chakra-ui/react";
import { formatAmount, NumberFormatSpecifier } from "@wizard-ui/core";

interface SliderInputStepButtonProps {
  sliderValue: number;
  value: number;
  onClick: (value: number) => void;
}

function SliderInputStepButton({
  sliderValue,
  value,
  onClick,
}: SliderInputStepButtonProps) {
  const ml = value == 0 ? "0" : `${(value * 100).toString()}%`;
  const borderColor = sliderValue > value ? "blackAlpha.700" : "whiteAlpha.300";
  const bgColor = sliderValue > value ? "whiteAlpha.600" : "blackAlpha.700";

  return (
    <Box
      boxSizing="content-box"
      position="absolute"
      transform="translate(-50%) rotate(45deg)"
      boxSize="1.5"
      bg={bgColor}
      border="2px solid"
      borderColor={borderColor}
      zIndex="2"
      overflow="visible"
      cursor="pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClick(value);
      }}
      ml={ml}
      _hover={{ borderColor: "white" }}
    />
  );
}

type SliderInputProps = {
  value: number;
  onChange: (value: number) => void;
} & SliderProps;

export function SliderInput({ value, onChange, ...props }: SliderInputProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipValue = formatAmount(value, {
    formatSpecifier: NumberFormatSpecifier.PERCENTAGE,
  });

  return (
    <Box px="2">
      <Flex align="center" position="relative">
        <Slider
          id="slider"
          defaultValue={0}
          min={0}
          step={0.01}
          max={1}
          value={value}
          onChange={onChange}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          focusThumbOnChange={false}
          h="25px"
          {...props}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="blackAlpha.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={tooltipValue}
          >
            <SliderThumb zIndex="4" />
          </Tooltip>
        </Slider>
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <SliderInputStepButton
            key="v"
            sliderValue={value}
            value={v}
            onClick={onChange}
          />
        ))}
      </Flex>
    </Box>
  );
}
