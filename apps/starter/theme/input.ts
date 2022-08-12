import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/styled-system";

const size: Record<string, SystemStyleObject> = {
  md: {
    height: "55px",
  },
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  md: {
    field: size.md,
    addon: size.md,
  },
};

const variantOutline: PartsStyleFunction<typeof parts> = () => {
  return {
    field: {
      bg: "whiteAlpha.200",
      borderColor: "whiteAlpha.100",
      color: "gray.100",
      _hover: {
        borderColor: "whiteAlpha.300",

        _disabled: {
          borderColor: "gray.800",
        },
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 1,
        color: "gray.500",
      },
      _invalid: {
        borderColor: "red.500",
        boxShadow: "none",
        _focus: {
          borderColor: "red.500",
          boxShadow: "none",
        },
      },
      _focus: {
        zIndex: 1,
        borderColor: "whiteAlpha.300",
        boxShadow: "none",
      },
      _placeholder: { opacity: 1, color: "gray.500", fontSize: "md" },
    },
  };
};

const variants = {
  outline: variantOutline,
};

const defaultProps = {
  variant: "outline",
};

const styles = {
  sizes,
  variants,
  defaultProps,
};

export default styles;
