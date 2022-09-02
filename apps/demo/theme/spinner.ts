import { cssVar, SystemStyleObject } from "@chakra-ui/styled-system";

const $size = cssVar("spinner-size");

const sizes: Record<string, SystemStyleObject> = {
  "2xl": {
    [$size.variable]: "5rem",
  },
};

const styles = {
  sizes,
};

export default styles;
