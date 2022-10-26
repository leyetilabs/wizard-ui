import { useQuery } from "@tanstack/react-query";

import { useWallet } from "./useWallet";

interface UseQueryContract {
  address: string;
  msg: Record<string, unknown>;
}

export const useQueryContract = ({ address, msg }: UseQueryContract) => {
  const { client } = useWallet();

  return useQuery(["contract", address, client, msg], () => {
    if (address == null || client == null || msg == null) {
      throw new Error("Error in querying contract");
    }

    return client.queryContractSmart(address, msg);
  });
};

export default useQueryContract;
