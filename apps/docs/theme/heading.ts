import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontWeight: "400",
};

const sizes: Record<string, SystemStyleObject> = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1,
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1,
  },
  "2xl": {
    fontSize: ["2xl", null, "40px"],
    lineHeight: [1.2, null, "56px"],
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2],
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2],
  },
  md: { fontSize: "xl", lineHeight: 1.2 },
  sm: { fontSize: "md", lineHeight: 1.2 },
  xs: { fontSize: "sm", lineHeight: 1.2 },
};

const variants = {
  variants: {
    brand: {
      fontWeight: "400",
      fontSize: "lg",
    },
  },
};

const styles = {
  baseStyle,
  variants,
  sizes,
};

export default styles;
