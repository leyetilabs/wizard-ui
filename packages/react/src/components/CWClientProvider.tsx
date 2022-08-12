import React, { useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { CWClientContext } from "../hooks";

export interface CWClientProviderProps {
  children: ReactNode;
  endpoint: string;
}

export const CWClientProvider: FC<CWClientProviderProps> = ({
  children,
  endpoint,
}) => {
  const [client, setClient] = useState<CosmWasmClient | null>(null);

  useEffect(() => {
    async function getCWClient() {
      const client = await CosmWasmClient.connect(endpoint);
      setClient(client);
    }

    getCWClient();
  }, []);

  return (
    <CWClientContext.Provider value={client}>
      {children}
    </CWClientContext.Provider>
  );
};
