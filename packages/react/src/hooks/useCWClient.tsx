import React, { createContext, useContext } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const CWClientContext = createContext<CosmWasmClient | null>(
  {} as CosmWasmClient | null
);

export function useCWClient(): CosmWasmClient | null {
  return useContext(CWClientContext);
}
