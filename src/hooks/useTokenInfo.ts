import { useCallback } from "react";

import { useTerra } from "../TerraContext";

export const useTokenInfo = () => {
  const {
    data,
    networkInfo: { name },
  } = useTerra();

  const getSymbol = useCallback(
    (token: string) => {
      if (data == null) {
        return token;
      }

      return data[name].tokens[token]?.symbol ?? token;
    },
    [name, data]
  );

  const getIcon = useCallback(
    (token: string) => {
      if (data == null) {
        return "";
      }

      const info = data[name].tokens[token];

      if (info?.icon) {
        return info?.icon;
      }

      return "";
    },
    [name, data]
  );

  return {
    getSymbol,
    getIcon,
  };
};

export default useTokenInfo;
