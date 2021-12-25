import React from "react";
import { Button, ButtonProps as ChakraBtnProps } from "@chakra-ui/react";

type ButtonProps = {
  text: string | number;
} & ChakraBtnProps;

export default function TWButton({ text, ...props }: ButtonProps) {
  return (
    <Button _active={{bgColor:"#4b42c4"}} _hover={{bgColor:"#4b42c4"}} bgColor="#6558F5" color="#fff" {...props}>
      {text}
    </Button>
  );
}
