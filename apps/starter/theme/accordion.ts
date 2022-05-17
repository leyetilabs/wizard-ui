import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";

const baseStyleRoot: SystemStyleObject = {
  border: "1px solid",
  borderColor: "gray.300",
  borderRadius: "lg",
};

const baseStyleContainer: SystemStyleObject = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _first: {
    borderTopWidth: 0,
  },
  _last: {
    borderBottomWidth: 0,
  },
};

const baseStyleButton: SystemStyleObject = {
  fontWeight: 700,
  color: "gray.900",
  px: 5,
  py: 5,

  _focus: {
    boxShadow: "none",
  },
};

const baseStylePanel: SystemStyleObject = {
  px: 5,
  pb: 6,
};

const baseStyle: PartsStyleObject<typeof parts> = {
  root: baseStyleRoot,
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel,
};

const styles = {
  parts: parts.keys,
  baseStyle,
};

export default styles;
