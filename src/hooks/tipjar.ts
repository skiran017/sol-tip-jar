import { useState, useEffect, useCallback } from "react";
import {
  Connection,
  Transaction,
  clusterApiUrl,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Cluster,
  Commitment,
  ConnectionConfig,
  PublicKey,
} from "@solana/web3.js";

export interface TipJarHook {
  network: string | undefined;
}
declare global {
  interface Window {
    solana: any;
  }
}
export type TransactionStatus =
  | "idle"
  | "submitting"
  | "submitted"
  | "confirmed"
  | "error";
export function useTipJar({ network = "devnet" }: TipJarHook) {
  const NETWORK = clusterApiUrl(network as Cluster);
  const [walletAddress, setWalletAddress] = useState(null);
  const [phantomWalletExists, setPhantomWalletExists] = useState(false);
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>("idle");

  const [logs, setLogs] = useState<Array<string>>([]);

  useEffect(() => {
    window.addEventListener("load", async () => {
      await checkIfWalletIsConnected();
    });
  }, []);
  const opts: {
    preflightCommitment: Commitment | ConnectionConfig | undefined;
  } = {
    preflightCommitment: "processed",
  };
  const addLog = useCallback(
    (log) => setLogs((logs) => [...logs, ">  " + log]),
    []
  );
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          setPhantomWalletExists(true);
        }
        // The solana object gives us a function that will allow us to connect directly with the user's wallet
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "Connected with Public key:",
          response?.publickKey?.toString()
        );
        //set the user's publickey in the state to be used later
        setWalletAddress(response?.publicKey?.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      // console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      setPhantomWalletExists(true);
    }
  };
  const getProvider = () => {
    if ("solana" in window) {
      const anyWindow = window;
      const provider = anyWindow.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
  };
  const resetTipJar = () => {
    if (transactionStatus !== "idle") {
      setTransactionStatus("idle");
    }
  };
  const provider = getProvider();
  const connection = new Connection(NETWORK, opts.preflightCommitment);

  //create Transfer Transation
  const createTransferTransaction = async (
    tipValue: number,
    recieverWalletAddress: string
  ) => {
    if (!provider.publicKey) return;
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recieverWalletAddress as unknown as PublicKey,
        lamports: LAMPORTS_PER_SOL * tipValue,
      })
    );
    transaction.feePayer = provider.publicKey;
    addLog("Getting recent blockhash");
    const anyTransaction = transaction;
    anyTransaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    return transaction;
  };

  //
  const sendTransaction = async (
    tipValue: number,
    recieverWalletAddress: string
  ) => {
    try {
      const transaction = await createTransferTransaction(
        tipValue,
        recieverWalletAddress
      );
      if (!transaction) return;
      let signed = await provider.signTransaction(transaction);
      addLog("Got signature, submitting transaction");
      setTransactionStatus("submitting");
      let signature = await connection.sendRawTransaction(signed.serialize());
      addLog("Submitted transaction " + signature + ", awaiting confirmation");
      setTransactionStatus("submitted");
      await connection.confirmTransaction(signature);
      addLog("Transaction " + signature + " confirmed");
      setTransactionStatus("confirmed");
    } catch (err) {
      console.warn(err);
      addLog("[error] sendTransaction: " + JSON.stringify(err));
      setTransactionStatus("error");
    }
  };

  return {
    phantomWalletExists,
    transactionStatus,
    userWalletAddressLoaded: walletAddress !== null,
    logs,
    connectWallet,
    sendTransaction,
    resetTipJar,
  };
}
