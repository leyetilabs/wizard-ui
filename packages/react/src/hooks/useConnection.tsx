import React, { createContext, useContext } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export interface ConnectionContextState {
  connection: CosmWasmClient | null;
}

export const ConnectionContext = createContext<ConnectionContextState>(
  {} as ConnectionContextState
);

export function useConnection(): ConnectionContextState {
  return useContext(ConnectionContext);
}
