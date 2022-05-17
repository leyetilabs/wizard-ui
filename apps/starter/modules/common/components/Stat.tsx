import { Box, Text } from "@chakra-ui/react";

interface Props {
  label: string;
  value: string | number;
}

export function Stat({ label, value }: Props) {
  return (
    <Box>
      <Text color="whiteAlpha.500" fontSize="xs">
        {label}
      </Text>
      <Text color="gray.100" fontSize="2xl" fontWeight={700}>
        {value}
      </Text>
    </Box>
  );
}
