import React from "react";
import {
  Modal,
  ModalOverlay,
  Box,
  Button,
  Link,
  Text,
  ModalContent,
  ModalBody,
  HStack,
  VStack,
  Center,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { truncate } from "@wizard-ui/react";
import {
  CheckCircle as CheckCircleIcon,
  Slash as SlashIcon,
} from "lucide-react";

import { Tx, TxState } from "../types";

const TITLES: Record<string, string> = {
  estimating: "Estimating fees",
  posting: "Waiting for Terra Station...",
  postError: "User Denied",
  broadcasting: "Waiting for Terra Station...",
  broadcastSuccess: "Your transaction is complete",
  broadcastError: "Something went wrong",
};

const SUB_TITLES: Record<string, string> = {
  estimating:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  postError:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  posting:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  broadcasting:
    "Transaction broadcasted. There is no need to send another until it has been complete.",
  broadcastSuccess:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
  broadcastError:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit nullam condimentum massa dictumst.",
};

interface TransactionModalHeaderProps {
  state: TxState;
}

function TransactionModalHeader({ state }: TransactionModalHeaderProps) {
  const isSuccess = state.txStep === "broadcastSuccess";
  const isError = ["broadcastError", "postError"].includes(state.txStep);
  const showSpinner = !isSuccess && !isError;

  return (
    <>
      <Center>
        {showSpinner && (
          <Spinner size="xl" thickness="6px" color="gray.200" mb={8} mt={8} />
        )}
        {isSuccess && (
          <Icon as={CheckCircleIcon} boxSize={16} color="green.300" mb={6} />
        )}
        {isError && <Icon as={SlashIcon} boxSize={16} color="red.300" mb={6} />}
      </Center>

      <VStack mb={12}>
        <Text fontWeight={600} color="gray.100">
          {TITLES[state.txStep]}
        </Text>
        <Text color="whiteAlpha.600" textAlign="center" fontSize="sm">
          {SUB_TITLES[state.txStep]}
        </Text>
      </VStack>
    </>
  );
}
interface TransactionModalStepsItemProps {
  isActive?: boolean;
  isPending?: boolean;
}

function TransactionModalStepsItem({
  isActive,
  isPending,
}: TransactionModalStepsItemProps) {
  let color = "whiteAlpha.600";

  if (isPending) {
    color = "gray.300";
  }

  if (isActive) {
    color = "gray.200";
  }

  return <Box bg={color} h={2} w="full" borderRadius="xl" />;
}

interface TransactionModalStepsProps {
  state: TxState;
}

function TransactionModalSteps({ state }: TransactionModalStepsProps) {
  return (
    <HStack spacing={2}>
      <TransactionModalStepsItem
        isPending={["estimating"].includes(state.txStep)}
        isActive={[
          "posting",
          "broadcasting",
          "broadcastSuccess",
          "broadcastError",
        ].includes(state.txStep)}
      />
      <TransactionModalStepsItem
        isPending={["posting"].includes(state.txStep)}
        isActive={[
          "broadcasting",
          "broadcastSuccess",
          "broadcastError",
        ].includes(state.txStep)}
      />
      <TransactionModalStepsItem
        isPending={["broadcasting"].includes(state.txStep)}
        isActive={["broadcastSuccess", "broadcastError"].includes(state.txStep)}
      />
      <TransactionModalStepsItem
        isActive={["broadcastSuccess", "broadcastError"].includes(state.txStep)}
      />
    </HStack>
  );
}
interface TransactionModalTxIdProps {
  state: TxState;
}

function TransactionModalTxId({ state }: TransactionModalTxIdProps) {
  if (state.txHash == null) {
    return <div />;
  }

  return (
    <Box
      border="1px solid"
      borderColor="gray.800"
      p={4}
      borderRadius="xl"
      mt={12}
    >
      <Text fontWeight={500} color="gray.100">
        Transaction ID
      </Text>
      {state.txHash != null && (
        <Link
          color="blue.500"
          href={`https://finder.terra.money/mainnet/tx/${state.txHash}`}
          isExternal
          fontSize="sm"
        >
          {truncate(state.txHash)}
        </Link>
      )}
    </Box>
  );
}

interface TransactionModalProps {
  tx: Tx;
  onClose: () => void;
}

export function TransactionModal({ tx, onClose }: TransactionModalProps) {
  const { txInfo, txHash, txStep, txError } = tx;
  const state = { txInfo, txHash, txStep, txError };

  return (
    <Modal onClose={onClose} isOpen={state.txStep !== "idle"} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={12}>
          <TransactionModalHeader state={state} />

          <TransactionModalSteps state={state} />

          <TransactionModalTxId state={state} />

          <Center mt={12}>
            <Button variant="ghost" size="lg" px={8} onClick={onClose}>
              Cancel
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
