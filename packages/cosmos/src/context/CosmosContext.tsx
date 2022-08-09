import React, { createContext, useCallback, useContext } from "react";

import { TransactionModal } from "../components";
import { useTx } from "../hooks";
import { Tx } from "../types";

type CosmosContextData = {
  tx: Tx;
};

const CosmosContext = createContext<CosmosContextData>({} as CosmosContextData);

const useCosmos = () => useContext(CosmosContext);

interface Props {
  children: React.ReactNode;
  showTxModal?: boolean;
}

function CosmosProvider({ showTxModal = true, children }: Props) {
  const tx = useTx();
  const { reset: resetTxState } = tx;

  const onTransactionModalClose = useCallback(() => {
    resetTxState();
  }, [resetTxState]);

  const providerState: CosmosContextData = {
    tx,
  };

  return (
    <CosmosContext.Provider value={providerState}>
      {showTxModal && (
        <TransactionModal tx={tx} onClose={onTransactionModalClose} />
      )}
      {children}
    </CosmosContext.Provider>
  );
}

export { useCosmos, CosmosProvider };
