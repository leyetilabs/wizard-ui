import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["menu", "item"]);

const ProvideLiquidity = helpers.defineMultiStyleConfig({
  baseStyle: {
    menu: {
      boxShadow: "lg",
      rounded: "lg",
      flexDirection: "column",
      py: "2",
    },
    item: {
      fontWeight: "medium",
      lineHeight: "normal",
      color: "gray.600",
    },
    button: {
      w: "full",
    },
  },
  defaultProps: {
    size: "md",
  },
});

export default ProvideLiquidity;
