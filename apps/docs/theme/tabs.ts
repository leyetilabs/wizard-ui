import { tabsAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";

const baseStyleTabpanel: SystemStyleObject = {
  p: 0,
  pt: 8,
};

const baseStyleTab: SystemStyleObject = {
  _focus: {
    boxShadow: "none",
  },
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  tabpanel: baseStyleTabpanel,
  tab: baseStyleTab,
});

const styles = {
  baseStyle,
};

export default styles;
