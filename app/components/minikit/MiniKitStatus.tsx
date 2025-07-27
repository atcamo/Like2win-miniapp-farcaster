"use client";

import { useMiniKitSetup } from "../../hooks/useMiniKitSetup";
import { Button } from "../ui/Button";

export function MiniKitStatus() {
  const { isReady, canAddFrame, isFrameAdded, handleAddFrame } = useMiniKitSetup();

  if (!isReady) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        Initializing MiniKit...
      </div>
    );
  }

  if (canAddFrame) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddFrame}
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        Add to Farcaster
      </Button>
    );
  }

  if (isFrameAdded) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Added to Farcaster
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-green-600">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      MiniKit Ready
    </div>
  );
}