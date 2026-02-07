"use client";

import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "@wagmi/core";
import { metaMask } from "@wagmi/connectors";
import { ReactNode } from "react";

// Configure Sepolia RPC - using public RPC for now
// You can replace with your own RPC endpoint for better reliability
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";

// Create wagmi config
const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected({ shimDisconnect: true }),
    metaMask({ shimDisconnect: true }),
  ],
  transports: {
    [sepolia.id]: http(sepoliaRpcUrl),
  },
});

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

