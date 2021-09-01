import { Coin, Coins } from "@terra-money/terra.js";

import { getNativeQuery } from "./query";
import alias from "./alias";

interface Msg {
  balance: {
    address: string;
  };
}

interface Item {
  name: string;
  contract: string;
  msg: Msg;
}

const mapPairs = (pairs: any[], address: string) => {
  return pairs.map(({ lpToken }) => ({
    name: lpToken,
    contract: lpToken,
    msg: { balance: { address } },
  }));
};

const formatResult = (tokens: any) => {
  return Object.entries(tokens).map(([token, value]: any) => {
    if (value == null) {
      return new Coin(token, "0");
    }

    const { balance } = JSON.parse(value.result);

    return new Coin(token, balance);
  });
};

const formatTokensToQuery = (list: any, address: string): Item[] => {
  return Object.values(list).map(({ token }: any) => ({
    name: token,
    contract: token,
    msg: { balance: { address } },
  }));
};

export const getCW20Balances = async (
  mantle: string,
  tokens: any,
  address: string
) => {
  const filteredTokens = Object.values(tokens).filter((token: any) => {
    return token.protocol !== "Native";
  });
  const query = formatTokensToQuery(filteredTokens, address);
  const document = alias(query, "getCW20Balances");

  const data = await getNativeQuery({
    url: mantle,
    document,
    variables: { address },
  });

  const mappedTokens = formatResult(data);

  return new Coins(mappedTokens);
};

export const getLpBalances = async (
  mantle: string,
  pairs: any[],
  address: string
) => {
  const query = mapPairs(pairs, address);

  const document = alias(query, "getLpBalances");

  const data = await getNativeQuery({
    url: mantle,
    document,
    variables: { address },
  });

  const mappedTokens = formatResult(data);

  return new Coins(mappedTokens);
};
