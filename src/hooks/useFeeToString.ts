import { useMemo } from "react";
import { StdFee } from "@terra-money/terra.js";
import { useTerra } from "../TerraContext";
import { coinsToString } from "../helpers";

export const useFeeToString = (fee: StdFee) => {
  const { tokens } = useTerra();

  return useMemo(() => {
    if (fee == null || !tokens) {
      return null;
    }

    // @ts-expect-error
    return coinsToString(fee.amount, tokens);
  }, [fee, tokens]);
};

export default useFeeToString;
