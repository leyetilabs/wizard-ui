import alias from "./alias";
import { getNativeQuery } from "./query";

const mapPairs = (pairs: any[]) => {
  return pairs.map(({ contract }) => ({
    name: contract,
    contract,
    msg: { pool: {} },
  }));
};

const formatResult = (result: any, pairs: any) => {
  return Object.entries(result).map(([pairContract, value]: any) => {
    let result = {};

    if (value != null) {
      result = JSON.parse(value.result);
    }

    const pair = pairs.find(({ contract }: any) => {
      return contract === pairContract;
    });

    console.log(result);

    return {
      ...pair,
      // pool: result,
    };
  });
};

export const getPairs = async (network: any, pairs: any): Promise<any> => {
  const query = mapPairs(pairs);
  const document = alias(query, "getPairs");

  const result = await getNativeQuery({
    url: network.mantle,
    document,
  });

  return formatResult(result, pairs);
};
