import React, { useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { ConnectionContext } from "../hooks";

export interface ConnectionProviderProps {
  children: ReactNode;
  endpoint: string;
}

export const ConnectionProvider: FC<ConnectionProviderProps> = ({
  children,
  endpoint,
}) => {
  const [connection, setConnection] = useState<CosmWasmClient | null>(null);

  useEffect(() => {
    async function getConnection() {
      const clientCosmWasm = await CosmWasmClient.connect(endpoint);
      setConnection(clientCosmWasm);
    }

    getConnection();
  }, []);

  return (
    <ConnectionContext.Provider value={{ connection }}>
      {children}
    </ConnectionContext.Provider>
  );
};
