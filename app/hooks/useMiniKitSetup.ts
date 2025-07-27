"use client";

import { useEffect, useState } from "react";
import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { useAccount } from "wagmi";

export function useMiniKitSetup() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const { isConnected } = useAccount();
  const addFrame = useAddFrame();
  const [frameAdded, setFrameAdded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Inicializar frame
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    } else {
      setIsReady(true);
    }
  }, [isFrameReady, setFrameReady]);

  // Función para agregar frame
  const handleAddFrame = async () => {
    try {
      const result = await addFrame();
      setFrameAdded(Boolean(result));
      return result;
    } catch (error) {
      console.error("Error adding frame:", error);
      return false;
    }
  };

  // Estado del frame
  const frameStatus = {
    isReady,
    isConnected,
    canAddFrame: context && !context.client.added,
    isFrameAdded: frameAdded || (context?.client.added ?? false),
  };

  return {
    ...frameStatus,
    handleAddFrame,
    context,
  };
}