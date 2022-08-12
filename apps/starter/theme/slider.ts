import type {
  SystemStyleObject,
  PartsStyleObject,
} from "@chakra-ui/styled-system";

const baseStyleTrack: SystemStyleObject = {
  bg: "whiteAlpha.200",
  _disabled: {
    bg: "whiteAlpha.500",
  },
};

const baseStyleFilledTrack: SystemStyleObject = {
  bg: "whiteAlpha.200",
};

const baseStyle: PartsStyleObject = {
  track: baseStyleTrack,
  filledTrack: baseStyleFilledTrack,
};

const defaultProps = {
  size: "md",
};

export default {
  baseStyle,
  defaultProps,
};
