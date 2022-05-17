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

import shadows from "./shadows";

export default extendTheme({
  styles: {
    global: {
      "*": {
        scrollbarHeight: "6px",
        scrollbarWidth: "6px",
        scrollbarColor: "#2D3748 transparent",
      },

      "*::-webkit-scrollbar": {
        height: "6px",
        width: "6px",
      },

      "*::-webkit-scrollbar-track": {
        bg: "transparent",
      },

      "*::-webkit-scrollbar-thumb": {
        bg: "gray.700",
        borderRadius: "1.5rem",
      },
    },
  },
  shadows,
  fonts: {
    heading:
      "'Roboto Mono',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    body: "'Roboto Mono',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
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
