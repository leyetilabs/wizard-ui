const baseStyleList = {
  boxShadow: "lg",
  minW: "9rem",
  py: 0,
  borderRadius: "lg",
  bg: "gray.900",
  borderColor: "gray.800",
};

const baseStyleItem = {
  color: "gray.100",
  py: "0.7rem",
  fontSize: "sm",
  fontWeight: 500,
  _focus: {
    bg: "gray.900",
    color: "gray.400",
  },
  _active: {
    bg: "gray.900",
  },
};

const baseStyle = {
  list: baseStyleList,
  item: baseStyleItem,
};

const styles = {
  baseStyle,
};

export default styles;
