import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Text,
  HStack,
  ModalContent,
  Flex,
  ModalBody,
  Heading,
  chakra,
} from "@chakra-ui/react";
import { useWallet } from "@wizard-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ConnectWalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { connect } = useWallet();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
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
            <chakra.button
              transition="0.2s all"
              p="4"
              borderRadius="xl"
              bg="brand.900"
              width="100%"
              mb="4"
              _hover={{
                bg: "whiteAlpha.100",
              }}
              onClick={() => connect()}
            >
              <HStack spacing="6">
                {/* <img
                  src={icon}
                  alt={name}
                  style={{ width: "1.5rem", height: "1.5rem" }}
                /> */}
                <Text>Keplr</Text>
              </HStack>
            </chakra.button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletModal;
