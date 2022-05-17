import React, { createContext, useCallback, useContext } from "react";

import { TransactionModal } from "../components";
import { useTx } from "../hooks";
import { Tx } from "../types";

type TerraContextData = {
  tx: Tx;
};

const TerraContext = createContext<TerraContextData>({} as TerraContextData);

const useTerra = () => useContext(TerraContext);

interface Props {
  children: React.ReactNode;
  showTxModal?: boolean;
}

function TerraProvider({ showTxModal = true, children }: Props) {
  const tx = useTx();
  const { reset: resetTxState } = tx;

  const onTransactionModalClose = useCallback(() => {
    resetTxState();
  }, [resetTxState]);

  const providerState: TerraContextData = {
    tx,
  };

  return (
    <TerraContext.Provider value={providerState}>
      {showTxModal && (
        <TransactionModal tx={tx} onClose={onTransactionModalClose} />
      )}
      {children}
    </TerraContext.Provider>
  );
}

export { useTerra, TerraProvider };
