import React from "react";
import { WalletButton } from "@wizard-ui/react";

export function Navbar() {
  return (
    <div className="flex justify-between items-center backdrop-blur-2xl sticky top-0 px-10 h-20 z-10 border-b border-gray-800">
      <div>
        <p className="text-white">Cosmos</p>
      </div>
      <div>
        <WalletButton />
      </div>
    </div>
  );
}
