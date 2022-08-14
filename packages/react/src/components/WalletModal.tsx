import React, { useCallback, useMemo } from "react";
import type { FC } from "react";
import type { WalletName } from "@wizard-ui/core";
import { WalletReadyState } from "@wizard-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  ModalBody,
  Heading,
  VStack,
} from "@chakra-ui/react";

// import { Collapse } from "./Collapse";
import { useWalletModal, useWallet, Wallet } from "../hooks";
import { WalletListItem } from "./WalletListItem";

export interface WalletModalProps {
  className?: string;
  container?: string;
}

export const WalletModal: FC<WalletModalProps> = ({ className = "" }) => {
  const { wallets, select } = useWallet();
  const { visible, setVisible } = useWalletModal();

  const [installedWallets, otherWallets] = useMemo(() => {
    const installed: Wallet[] = [];
    const notDetected: Wallet[] = [];
    const loadable: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    }

    return [installed, [...loadable, ...notDetected]];
  }, [wallets]);

  const hideModal = useCallback(() => {
    setTimeout(() => setVisible(false), 150);
  }, []);

  const handleClose = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const handleWalletClick = useCallback(
    (walletName: WalletName) => {
      select(walletName);
      handleClose();
    },
    [select, handleClose]
  );

  return (
    <Modal isOpen={visible} onClose={handleClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
          >
            <Heading
              size="sm"
              mb="8"
              textTransform="uppercase"
              color="whiteAlpha.600"
            >
              Connect wallet
            </Heading>
            <VStack width="full">
              {installedWallets.map((wallet) => (
                <WalletListItem
                  key={wallet.adapter.name}
                  handleClick={() => handleWalletClick(wallet.adapter.name)}
                  wallet={wallet}
                />
              ))}
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
