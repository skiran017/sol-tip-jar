import React from 'react';
import {useTipJar} from '../../hooks/tipjar';
import TipWidget from './TipWidget';
import { ChakraProvider } from '@chakra-ui/react';

export interface TipWidgetWrapper {
  recieverAddress: string;
  network: string;
}
export function TipWidgetWrapper({
  recieverAddress,
  network = 'devnet',
}: TipWidgetWrapper) {
  const {
    phantomWalletExists,
    connectWallet,
    sendTransaction,
    transactionStatus,
    userWalletAddressLoaded,
    resetTipJar,
  } = useTipJar({ network });
  const handleConnectWallet = () => {
    connectWallet();
  };
  const handleSendTransaction = (tipValue: number) => {
    sendTransaction(tipValue, recieverAddress);
  };
  return (
    <ChakraProvider>
      <TipWidget
        sendTransaction={handleSendTransaction}
        userWalletAddressLoaded={userWalletAddressLoaded}
        phantomWalletExists={phantomWalletExists}
        transactionStatus={transactionStatus}
        connectWallet={handleConnectWallet}
        resetTipJar={resetTipJar}
      />
    </ChakraProvider>
  );
}
