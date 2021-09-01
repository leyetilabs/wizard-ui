import { useMemo } from "react";

import { useTerra } from "../TerraContext";

export const useBalance = (token: string) => {
  const { balances } = useTerra();

  return useMemo(() => {
    if (!token) {
      return "0";
    }

    const tokenBalance = balances?.get(token)?.amount.toString();

    return tokenBalance || "0";
  }, [balances, token]);
};

export default useBalance;
