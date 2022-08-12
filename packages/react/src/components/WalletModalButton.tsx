import React, { useCallback } from "react";
import type { FC, MouseEvent } from "react";
import { Button } from "@chakra-ui/react";

// import { Button } from "./Button";
import type { ButtonProps } from "./Button";
import { useWalletModal } from "../hooks";

export const WalletModalButton: FC<ButtonProps> = ({
  children = "Select Wallet",
  onClick,
  ...props
}) => {
  const { visible, setVisible } = useWalletModal();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) setVisible(!visible);
    },
    [onClick, visible]
  );

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};
