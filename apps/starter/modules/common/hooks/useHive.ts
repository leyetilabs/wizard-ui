import { useConnectedWallet } from "@terra-money/wallet-provider";
import { request } from "graphql-request";
import useSwr from "swr";

type Params = {
  name: string | string[];
  query: any;
  variables?: {
    [key: string]: any;
  };
  options?: any;
};

export const useHive = ({ name, query, variables, options }: Params) => {
  const wallet = useConnectedWallet();
  const network = wallet?.network?.name ?? "mainnet";
  let GRAPHQL = "https://hive.terra.dev/graphql";

  if (network == "testnet") {
    GRAPHQL = "https://testnet-hive.terra.dev/graphql";
  }

  const { data } = useSwr(
    name,
    () => {
      return request(GRAPHQL, query, variables);
    },
    options,
  );

  return data;
};

export default useHive;
