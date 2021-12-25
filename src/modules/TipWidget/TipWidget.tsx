import React from "react";
import {
  Flex,
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import TWButton from "../../components/Button";

interface TipWidget {
  popularOptions?: Array<number>;
  connectWallet: () => void;
  phantomWalletExists: boolean;
  userWalletAddressLoaded: boolean;
  sendTransaction: (tipVal: number) => void;
  transactionStatus:
    | "idle"
    | "submitting"
    | "submitted"
    | "confirmed"
    | "error";
  resetTipJar: () => void;
}

export default function TipWidget({
  popularOptions = [0.02, 0.04, 0.06, 0.08],
  connectWallet,
  phantomWalletExists,
  userWalletAddressLoaded,
  sendTransaction,
  transactionStatus,
  resetTipJar,
}: TipWidget) {
  const [tipValue, setTipValue] = React.useState<number>(0.02);
  const handleTipChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;
    setTipValue(+value);
  };
  const handleIncrementChange = () => {
    setTipValue((oldTipVal: number) => {
      return +(oldTipVal + 0.01).toFixed(2);
    });
  };
  const handleDecrementChange = () => {
    if (tipValue > 0) {
      setTipValue((oldTipVal: number) => {
        return +(oldTipVal - 0.01).toFixed(2);
      });
    }
  };
  const handleQuickSelect = (value: number) => {
    setTipValue(value);
  };
  const handleTipSubmit = () => {
    if (tipValue > 0) {
      sendTransaction(tipValue);
    }
  };
  const handleReset = () => {
    setTipValue(0.02);
    resetTipJar();
  };
  const handlePhantomRedirect = () => {
    window.open("https://phantom.app/", "_blank");
  };
  if (!phantomWalletExists) {
    return (
      <Flex
        border="1px solid #ccc"
        p={4}
        borderRadius="8px"
        w="400px"
        direction="column"
        wrap="nowrap"
      >
        <Flex textAlign="center" direction="column">
          <Text fontSize="1.8rem">Solana wallet not found</Text>
          <Text mt={2} fontSize="1.2rem">
            Please get your Phantom Wallet below
          </Text>
        </Flex>
        <Flex justifyContent="center" mt={4}>
          <TWButton
            onClick={handlePhantomRedirect}
            text="Get Phantom"
            w="165px"
          />
        </Flex>
      </Flex>
    );
  }
  if (transactionStatus === "confirmed") {
    return (
      <Flex
        border="1px solid #ccc"
        p={4}
        borderRadius="8px"
        w="400px"
        direction="column"
        wrap="nowrap"
      >
        <Flex textAlign="center" direction="column">
          <Text fontSize="1.8rem">Thankyou</Text>
          <Text mt={2} fontSize="1.2rem">
            I am grateful for your support.
          </Text>
        </Flex>
        <Flex justifyContent="center" mt={4}>
          <TWButton onClick={handleReset} text="Done" w="165px" />
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex
      border="1px solid #ccc"
      p={4}
      borderRadius="8px"
      w="400px"
      direction="column"
      wrap="nowrap"
    >
      <Flex justifyContent="space-between">
        <Box mr={3}>
          <IconButton
            borderRadius="8px"
            bgColor="#6558F5"
            mr={2}
            _active={{ bgColor: "#4b42c4" }}
            _hover={{ bgColor: "#4b42c4" }}
            aria-label="increment-val"
            onClick={handleIncrementChange}
            icon={<TriangleUpIcon color="#fff" />}
          />
          <IconButton
            borderRadius="8px"
            bgColor="#6558F5"
            _active={{ bgColor: "#4b42c4" }}
            _hover={{ bgColor: "#4b42c4" }}
            aria-label="decrement-val"
            onClick={handleDecrementChange}
            icon={<TriangleDownIcon color="#fff" />}
          />
        </Box>
        <Box w="72%">
          <InputGroup size="md">
            <Input
              pr="4"
              py="0"
              fontSize="1.3rem"
              value={tipValue}
              onChange={handleTipChange}
              type="number"
              textAlign="right"
              size="md"
              variant="outline"
            />
            <InputRightAddon fontWeight="bold" children="SOL" />
          </InputGroup>
        </Box>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Text fontSize="18px" fontWeight="600">
          Popular
        </Text>
        <Flex ml={4}>
          {popularOptions.map((option: number, idx: number) => (
            <TWButton
              text={option}
              onClick={() => handleQuickSelect(option)}
              mr={idx !== popularOptions.length - 1 ? 2 : undefined}
            />
          ))}
        </Flex>
      </Flex>

      <Flex justifyContent="center" mt={5}>
        {!userWalletAddressLoaded && (
          <TWButton onClick={connectWallet} text="Connect" w="165px" />
        )}
        {userWalletAddressLoaded && (
          <TWButton
            disabled={
              tipValue <= 0 ||
              transactionStatus === "submitting" ||
              transactionStatus === "submitted"
            }
            onClick={handleTipSubmit}
            text="Tip Me"
            isLoading={
              transactionStatus === "submitting" ||
              transactionStatus === "submitted"
            }
            w="165px"
          />
        )}
      </Flex>
    </Flex>
  );
}
