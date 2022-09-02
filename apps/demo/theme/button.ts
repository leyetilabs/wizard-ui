import {
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/styled-system";
import { getColor } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontWeight: 500,
  borderRadius: "lg",
  _disabled: {
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  return {
    borderColor: `${c}.300`,
    _hover: {
      bg: `${c}.50`,
    },
    _active: {
      bg: "white",
    },
    _focus: {
      bg: "white",
      borderColor: `${c}.300`,
      boxShadow: `0 0 0 4px ${getColor(theme, `${c}.100`)}`,
    },
  };
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  return {
    bg: `${c}.600`,
    color: "white",
    _hover: {
      bg: `${c}.700`,
      _disabled: {
        bg: `${c}.200`,
      },
    },
    _active: {
      bg: `${c}.600`,
    },
    _focus: {
      boxShadow: "none",
    },
  };
};

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  return {
    bg: `${c}.900`,
    color: `${c}.100`,
    _hover: {
      bg: `${c}.900`,
      color: `${c}.400`,
      _disabled: {
        bg: `${c}.900`,
      },
    },
    _active: {
      bg: `${c}.900`,
    },
    _focus: {
      boxShadow: "none",
    },
  };
};

const variants = {
  outline: variantOutline,
  solid: variantSolid,
  ghost: variantGhost,
};

const sizes: Record<string, SystemStyleObject> = {
  sm: {
    fontSize: "sm",
  },
  md: {
    fontSize: "sm",
  },
  lg: {
    h: "44px",
    fontSize: "sm",
    px: 2.5,
  },
  xl: {
    h: "48px",
    fontSize: "md",
    px: 3,
  },
  "2xl": {
    fontSize: "lg",
  },
};

const defaultProps = {
  variant: "ghost",
};

const styles = {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};

export default styles;
