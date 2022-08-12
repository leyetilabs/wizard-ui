import { useMutation } from "@tanstack/react-query";
import { Coin } from "@cosmjs/stargate";

import { useWallet } from "./useWallet";

interface UseExecuteContract {
  address: string;
}

export const useExecuteContract = ({ address }: UseExecuteContract) => {
  const { address: senderAddress, client } = useWallet();

  return useMutation(
    ({
      msg,
      memo,
      funds,
    }: {
      msg: Record<string, unknown>;
      funds?: Coin[];
      memo?: string;
    }) => {
      if (
        senderAddress == null ||
        client == null ||
        address == null ||
        msg == null
      ) {
        throw new Error("Error in executing contract");
      }

      return client.execute(senderAddress, address, msg, "auto", memo, funds);
    }
  );
};

export default useExecuteContract;
