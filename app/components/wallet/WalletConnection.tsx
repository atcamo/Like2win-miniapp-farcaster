"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";

export function WalletConnection() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { isFrameReady, setFrameReady } = useMiniKit();
  const [mounted, setMounted] = useState(false);

  // Evitar hidration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Inicializar frame cuando esté listo
  useEffect(() => {
    if (!isFrameReady && mounted) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady, mounted]);

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    const coinbaseConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseConnector) {
      connect({ connector: coinbaseConnector });
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            {formatAddress(address)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant="gradient"
        size="sm"
        onClick={handleConnect}
        disabled={isConnecting}
        className="min-w-[120px]"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
      {connectError && (
        <span className="text-xs text-red-500 max-w-[200px] text-right">
          {connectError.message.includes("User rejected")
            ? "Connection cancelled"
            : "Connection failed"}
        </span>
      )}
    </div>
  );
}