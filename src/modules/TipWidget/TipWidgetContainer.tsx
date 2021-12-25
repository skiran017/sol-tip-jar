import React from "react";
import useTipJar from "../../hooks/tipjar";
import TipWidget from "./TipWidget";

interface TipWidgetWrapper {
    recieverAddress: string;
    network: string;
}
export default function TipWidgetWrapper({recieverAddress,network='devnet'}:TipWidgetWrapper) {
  const {
    phantomWalletExists,
    connectWallet,
    sendTransaction,
    transactionStatus,
    userWalletAddressLoaded,
    resetTipJar
  } = useTipJar({ network});
  const handleConnectWallet = () => {
    connectWallet();
  };
  const handleSendTransaction = (tipValue: number) => {
      sendTransaction(tipValue, recieverAddress)
  };
  return (
    <TipWidget
      sendTransaction={handleSendTransaction}
      userWalletAddressLoaded={userWalletAddressLoaded}
      phantomWalletExists={phantomWalletExists}
      transactionStatus={transactionStatus}
      connectWallet={handleConnectWallet}
      resetTipJar={resetTipJar}
    />
  );
}
