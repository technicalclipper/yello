"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { sepolia } from "wagmi/chains";

export function useWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const isCorrectNetwork = chain?.id === sepolia.id;
  const isWrongNetwork = isConnected && !isCorrectNetwork;

  const connectWallet = async () => {
    // Try injected connector first (browser wallet)
    const injectedConnector = connectors.find((c) => c.id === "injected" || c.id === "metaMask");
    const connector = injectedConnector || connectors[0];
    
    if (connector) {
      connect({ connector });
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return {
    address,
    isConnected,
    isCorrectNetwork,
    isWrongNetwork,
    connectWallet,
    disconnectWallet,
    isConnecting: isPending,
    chain,
  };
}

