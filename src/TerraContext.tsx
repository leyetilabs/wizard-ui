import { FC, useEffect, useMemo, useState, useCallback } from "react";
import { useWallet } from "@terra-money/wallet-provider";
import { LCDClient, Coins } from "@terra-money/terra.js";

import { makeContext } from "./makeContext";

import networks, { defaultNetwork, LocalNetworkInfo } from "./networks";
import { useAddress } from "./hooks/useAddress";
import { getCW20Balances, getLpBalances } from "./getBalances";
import { formatPairsToRoutes } from "./helpers";

import { Routes, Tokens, Pair, Data } from "./types";

type TerraContext = {
  isReady: boolean;
  networkInfo: LocalNetworkInfo;
  pairs: Pair[] | any[];
  routes: Routes | any[];
  client: LCDClient;
  balances: Coins | null;
  lpBalances: Coins | null;
  tokens: Tokens | any[];
  data: any;
};

const context = makeContext<TerraContext>("useTerra");

const [useTerra, Provider] = context;

export { useTerra };

type Props = {
  children: React.ReactNode;
  data: Data;
};

export const TerraProvider: FC<Props> = ({ children, data }) => {
  const { network } = useWallet();
  const address = useAddress();
  const [balances, setBalances] = useState<Coins | null>(null);
  const [lpBalances, setLpBalances] = useState<Coins | null>(null);

  const client = useMemo(() => {
    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    });
  }, [network]);

  const networkInfo = useMemo(() => {
    return networks[network.name] ?? defaultNetwork;
  }, [network.name]);

  const pairs = useMemo(() => {
    return data[network.name].pairs;
  }, [network.name]);

  const tokens = useMemo(() => {
    return data[network.name].tokens;
  }, [network.name]);

  const routes = useMemo(() => {
    if (!pairs) {
      return [];
    }

    return formatPairsToRoutes(pairs);
  }, [pairs]);

  const fetchBalances = useCallback(async () => {
    if (!(address && tokens)) {
      return;
    }

    try {
      const [cw20TokensBalance, nativeTokensBalance] = await Promise.all([
        getCW20Balances(networkInfo.mantle, tokens, address),
        client.bank.balance(address),
      ]);

      setBalances(nativeTokensBalance.add(cw20TokensBalance));
    } catch (e) {
      console.log(e);
    }
  }, [address, client, networkInfo, tokens]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  const fetchLpBalances = useCallback(async () => {
    if (!(address && pairs)) {
      return;
    }

    try {
      const result = await getLpBalances(networkInfo.mantle, pairs, address);
      setLpBalances(result);
    } catch (e) {
      console.log(e);
    }
  }, [address, networkInfo, pairs]);

  useEffect(() => {
    fetchLpBalances();
  }, [fetchLpBalances]);

  const isReady = pairs?.length > 0 && !!tokens && !!routes;

  return (
    <Provider
      value={{
        isReady,
        networkInfo,
        pairs,
        balances,
        lpBalances,
        routes,
        client,
        tokens,
        data,
      }}
    >
      {children}
    </Provider>
  );
};
