import React, { FC } from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import {
  Modal,
  ModalOverlay,
  Text,
  HStack,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Heading,
  chakra,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { status, availableConnections, connect } = useWallet();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
          >
            <Heading size="md" mb="6">
              Connect to a wallet
            </Heading>
            {status === WalletStatus.WALLET_NOT_CONNECTED && (
              <>
                {availableConnections.map(
                  ({ type, name, icon, identifier = "" }) => (
                    <chakra.button
                      transition="0.2s all"
                      p="6"
                      borderRadius="xl"
                      bg="brand.900"
                      width="100%"
                      mb="4"
                      _hover={{
                        bg: "blue.100",
                      }}
                      key={"connection-" + type + identifier}
                      onClick={() => connect(type, identifier)}
                    >
                      <HStack spacing="6">
                        <img
                          src={icon}
                          alt={name}
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                        <Text>{name}</Text>
                      </HStack>
                    </chakra.button>
                  ),
                )}
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
