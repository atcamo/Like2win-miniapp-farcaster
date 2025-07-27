"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { Button } from "../ui/Button";

// Ejemplo de contrato simple para donations/tips
const DONATION_CONTRACT = {
  address: "0x..." as `0x${string}`, // Aquí irá la dirección del contrato
  abi: [
    {
      name: "donate",
      type: "function",
      stateMutability: "payable",
      inputs: [],
      outputs: [],
    },
  ],
} as const;

export function TransactionExample() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("0.001");
  
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDonate = () => {
    if (!isConnected) return;

    writeContract({
      ...DONATION_CONTRACT,
      functionName: "donate",
      value: parseEther(amount),
    });
  };

  if (!isConnected) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Test Transactions</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to test Web3 functionality
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Test Transaction</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700"
            step="0.001"
            min="0"
          />
        </div>

        <Button
          onClick={handleDonate}
          disabled={isWritePending || isConfirming}
          variant="gradient"
          className="w-full"
        >
          {isWritePending
            ? "Preparing..."
            : isConfirming
            ? "Confirming..."
            : `Donate ${amount} ETH`}
        </Button>

        {/* Estados de transacción */}
        {hash && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Transaction Hash:</p>
            <p className="font-mono break-all">{hash}</p>
          </div>
        )}

        {isSuccess && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✅ Transaction confirmed!
            </p>
          </div>
        )}

        {(writeError || confirmError) && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-300 text-sm">
              ❌ Error: {(writeError || confirmError)?.message}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>💡 This is a demo component for testing Web3 transactions</p>
        </div>
      </div>
    </div>
  );
}