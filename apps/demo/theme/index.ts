import { extendTheme } from "@chakra-ui/react";

import Accordion from "./accordion";
import Button from "./button";
import Heading from "./heading";
import Input from "./input";
import Menu from "./menu";
import Modal from "./modal";
import Popover from "./popover";
import Spinner from "./spinner";
import Slider from "./slider";
import Tabs from "./tabs";
import Tooltip from "./tooltip";
import ProvideLiquidity from "./provide-liquidity";

import shadows from "./shadows";

export default extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "#030309",
      },

      "*": {
        scrollbarWidth: "6px",
        scrollbarColor: "#7F56D9 transparent",
      },

      "*::-webkit-scrollbar": {
        width: "6px",
      },

      "*::-webkit-scrollbar-track": {
        bg: "transparent",
      },

      "*::-webkit-scrollbar-thumb": {
        bg: "#7F56D9",
        borderRadius: "1.5rem",
      },
    },
  },
  shadows,
  fonts: {
    heading:
      "'Protipo',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    body: "'Protipo',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    mono: "Menlo, monospace",
  },
  components: {
    Accordion,
    Button,
    Heading,
    Input,
    Menu,
    Modal,
    Popover,
    Spinner,
    Slider,
    Tabs,
    Tooltip,
    ProvideLiquidity,
  },
  textStyles: {
    h1: {
      fontWeight: 700,
      color: "gray.900",
      fontSize: "xl",
      mb: 2,
      letterSpacing: 0.5,
    },
    bold: {
      color: "gray.700",
      fontWeight: 700,
    },
    light: {
      color: "gray.500",
      fontSize: "sm",
    },
  },
});
